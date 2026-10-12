// Pure helpers for the contact endpoint. No dependencies, so they are easy to test.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Strip control characters (keeps tab, newline, carriage return).
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const clean = (value, max) =>
  typeof value === "string" ? value.replace(CONTROL, "").trim().slice(0, max) : "";

export function validPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^[+\d][\d\s\-().]*$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

/**
 * Validates a request body.
 * Returns { data, errors, bot }. `bot` is true when the honeypot is filled
 * or the form was submitted implausibly fast.
 */
export function parseRequest(body) {
  const b = body && typeof body === "object" ? body : {};
  const data = {
    name: clean(b.name, 100),
    email: clean(b.email, 254),
    phone: clean(b.phone, 30),
    workWith: clean(b.workWith, 100) || "Either of us",
    projectType: clean(b.projectType, 100),
    message: clean(b.message, 5000),
  };

  const errors = {};
  if (!data.name) errors.name = "Name is required.";
  if (!data.email) errors.email = "Email is required.";
  else if (!EMAIL.test(data.email)) errors.email = "Email is not valid.";
  if (data.phone && !validPhone(data.phone)) errors.phone = "Phone number is not valid.";
  if (!data.projectType) errors.projectType = "Project type is required.";
  if (!data.message) errors.message = "Project details are required.";
  else if (data.message.length < 20) errors.message = "Project details are too short.";

  const honeypotFilled = clean(b.website, 200) !== "";
  const elapsed = Number(b.elapsedMs);
  const tooFast = Number.isFinite(elapsed) && elapsed < 2000;

  return { data, errors, bot: honeypotFilled || tooFast };
}

export const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Builds the email that both of you receive. */
export function buildMail(data) {
  const subject = `New project request: ${data.projectType}`.replace(/[\r\n]+/g, " ");
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "Not provided"],
    ["Wants to work with", data.workWith],
    ["Project type", data.projectType],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Project details:", data.message].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;max-width:640px">
  <h2 style="margin:0 0 12px">New project request</h2>
  <table cellpadding="6" style="border-collapse:collapse">
    ${rows.map(([k, v]) => `<tr><td style="color:#555;vertical-align:top"><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`).join("\n    ")}
  </table>
  <h3 style="margin:20px 0 6px">Project details</h3>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
  <p style="color:#777;font-size:12px;margin-top:24px">Reply to this email to answer the client directly.</p>
</div>`;
  return { subject, text, html };
}
