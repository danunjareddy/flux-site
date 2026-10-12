import "dotenv/config";
import { existsSync } from "node:fs";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";
import { buildMail, parseRequest } from "./validate.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, "../dist");
const dataDir = path.resolve(here, "data");

const {
  PORT = "3001",
  SMTP_HOST,
  SMTP_PORT = "465",
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
  CORS_ORIGIN,
  BREVO_API_KEY,
  BREVO_SENDER,
} = process.env;

const recipients = (MAIL_TO ?? "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
// Brevo API (HTTPS) works on hosts that block SMTP ports. The sender address must be verified in Brevo.
const brevoSender = BREVO_SENDER || SMTP_USER || "";
const useBrevo = Boolean(BREVO_API_KEY && brevoSender && recipients.length > 0);
const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && recipients.length > 0);
const mailConfigured = useBrevo || smtpConfigured;

async function sendWithBrevo({ data, subject, text, html }) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "FLUX", email: brevoSender },
      to: recipients.map((email) => ({ email })),
      replyTo: { name: data.name, email: data.email },
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

const transporter = smtpConfigured && !useBrevo
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Local testing only, for networks or antivirus that re-sign TLS. Never use this in production.
      ...(process.env.SMTP_TLS_INSECURE === "true" ? { tls: { rejectUnauthorized: false } } : {}),
    })
  : null;

// Check the email login at startup so a wrong password shows in the terminal right away.
if (transporter) {
  transporter
    .verify()
    .then(() => console.log(`Email login OK (${SMTP_USER}). Requests go to: ${recipients.join(", ")}`))
    .catch((err) => console.error(`Email login FAILED: ${err.message}`));
}

const app = express();
app.set("trust proxy", 1); // correct client IPs behind Render, Railway, Nginx and similar
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // index.html sets the theme before first paint
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  }),
);

// Only needed when the website and this server live on different addresses.
if (CORS_ORIGIN) {
  app.use("/api", cors({ origin: CORS_ORIGIN.split(",").map((o) => o.trim()), methods: ["POST", "GET"] }));
}

app.use("/api", express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mailConfigured });
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "too_many_requests" },
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { data, errors, bot } = parseRequest(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: "invalid", fields: errors });
  }
  // Bots get a normal-looking answer and nothing is sent.
  if (bot) return res.json({ ok: true });

  // Keep a copy first, so a request is never lost if email fails.
  try {
    await mkdir(dataDir, { recursive: true });
    await appendFile(
      path.join(dataDir, "requests.jsonl"),
      `${JSON.stringify({ receivedAt: new Date().toISOString(), ...data })}\n`,
    );
  } catch (err) {
    console.error("Could not save request copy:", err.message);
  }

  if (!transporter && !useBrevo) {
    console.error("Mail is not configured. Set SMTP_* and MAIL_TO in .env. Request saved to server/data/requests.jsonl.");
    return res.status(503).json({ ok: false, error: "mail_not_configured" });
  }

  try {
    const { subject, text, html } = buildMail(data);
    if (useBrevo) {
      await sendWithBrevo({ data, subject, text, html });
    } else {
      await transporter.sendMail({
        from: MAIL_FROM || SMTP_USER,
        to: recipients,
        replyTo: { name: data.name, address: data.email },
        subject,
        text,
        html,
      });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Sending email failed:", err.message);
    return res.status(502).json({ ok: false, error: "mail_failed" });
  }
});

app.use("/api", (_req, res) => res.status(404).json({ ok: false, error: "not_found" }));

// In production this one server also serves the built website (run `npm run build` first).
if (existsSync(dist)) {
  app.use(express.static(dist, { index: "index.html", maxAge: "1h" }));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status === 400 ? 400 : 500).json({ ok: false, error: "server_error" });
});

app.listen(Number(PORT), () => {
  console.log(`FLUX server listening on http://localhost:${PORT}`);
  if (!mailConfigured) {
    console.warn("Warning: email is not configured. Copy .env.example to .env and fill it in.");
  } else {
    console.log(`Client requests will be emailed to: ${recipients.join(", ")}`);
  }
  if (existsSync(dist)) console.log("Serving the built website from /dist");
});
