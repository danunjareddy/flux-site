import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactForm, memberById, team, type MemberId } from "../config/content";
import SectionHeading from "./ui/SectionHeading";
import SocialLinks, { MemberLinks } from "./ui/SocialIcons";

type WorkWith = "either" | MemberId;

interface Values {
  name: string;
  email: string;
  phone: string;
  workWith: WorkWith;
  projectType: string;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: Values = { name: "", email: "", phone: "", workWith: "either", projectType: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500;

/** The backend in /server. In development Vite forwards /api to it. Override with VITE_API_URL. */
const API_URL: string = (import.meta.env.VITE_API_URL as string | undefined) || "/api/contact";

function validPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^[+\d][\d\s\-().]*$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!emailPattern.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (v.phone.trim()) {
    if (!validPhone(v.phone)) e.phone = "Enter a valid phone number, for example +91 98765 43210.";
  } else if (contactForm.phoneRequired) {
    e.phone = "Enter your phone number so we can reach you.";
  }
  if (!v.projectType) e.projectType = "Choose the type of project.";
  if (!v.message.trim()) e.message = "Describe what you need built.";
  else if (v.message.trim().length < 20) e.message = "Add a little more detail (at least 20 characters).";
  return e;
}

export default function ContactSection() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [openedAt] = useState(() => Date.now());

  // "Hire Danunja" / "Hire Nikhil" buttons pre-select that person.
  useEffect(() => {
    const onHire = (e: Event) => {
      const id = (e as CustomEvent<MemberId>).detail;
      setValues((v) => ({ ...v, workWith: id }));
    };
    window.addEventListener("hire-member", onHire);
    return () => window.removeEventListener("hire-member", onHire);
  }, []);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "submitting") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as (keyof Values)[])[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    const elapsedMs = Date.now() - openedAt;
    // Basic abuse protection: bots fill the hidden field or submit instantly.
    if (honeypot || elapsedMs < MIN_FILL_MS) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          workWith: values.workWith === "either" ? "Either of us" : memberById(values.workWith)?.name ?? "",
          projectType: values.projectType,
          message: values.message.trim(),
          website: honeypot,
          elapsedMs,
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      const ok = typeof data === "object" && data !== null && (data as { ok?: unknown }).ok === true;
      if (!res.ok || !ok) {
        const msg = typeof data === "object" && data !== null ? (data as { error?: unknown }).error : null;
        setErrorMsg(
          msg === "mail_not_configured"
            ? "The server is running but email is not set up yet. Add SMTP_USER and SMTP_PASS in .env and restart."
            : msg === "mail_failed"
              ? "The server could not send the email. Check SMTP_USER and SMTP_PASS in .env (Gmail needs an App Password)."
              : msg === "too_many_requests"
                ? "Too many requests. Please wait a few minutes and try again."
                : msg === "invalid"
                  ? "Some details are not valid. Please check the form."
                  : "Cannot reach the backend. Run npm run dev:all (not npm run dev) so the server on port 3001 is running.",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues(empty);
    } catch {
      setErrorMsg("The request could not be sent. Check your connection and try again, or use the contact links on this page.");
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-2xl border border-soft bg-surface/70 px-4 py-3 text-base text-ink placeholder:text-muted/70 transition focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30";

  const renderError = (key: keyof Values) =>
    errors[key] ? (
      <p id={`contact-${key}-error`} className="mt-1.5 text-sm text-red-400">
        {errors[key]}
      </p>
    ) : null;

  const aria = (key: keyof Values) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  const membersWithLinks = team.filter((m) => m.github || m.linkedin);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading id="contact-title" title="Tell us about your project." />
          <p className="-mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Share what you need built and how to reach you. Your request goes to both of us, and we'll reply with
            questions or a quote.
          </p>
          <SocialLinks showLabels className="-ml-3 mt-6" />
          {membersWithLinks.length > 0 && (
            <div className="mt-4 space-y-1">
              {membersWithLinks.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <span className="w-20 text-sm text-muted">{m.shortName}</span>
                  <MemberLinks member={m} className="-ml-3" />
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} noValidate className="glass relative rounded-3xl p-6 sm:p-8" aria-label="Project request">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} className={field} {...aria("name")} />
              {renderError("name")}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                Email address
              </label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set("email")} className={field} {...aria("email")} />
              {renderError("email")}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium">
                Phone / WhatsApp number{contactForm.phoneRequired ? "" : " (optional)"}
              </label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required={contactForm.phoneRequired} value={values.phone} onChange={set("phone")} className={field} {...aria("phone")} />
              {renderError("phone")}
            </div>
            <div>
              <label htmlFor="contact-workWith" className="mb-1.5 block text-sm font-medium">
                Who would you like to work with?
              </label>
              <select id="contact-workWith" name="workWith" value={values.workWith} onChange={set("workWith")} className={field}>
                <option value="either">Either of us</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-projectType" className="mb-1.5 block text-sm font-medium">
              Project type
            </label>
            <select id="contact-projectType" name="projectType" required value={values.projectType} onChange={set("projectType")} className={field} {...aria("projectType")}>
              <option value="">Choose a type</option>
              {contactForm.projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {renderError("projectType")}
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Project details
            </label>
            <textarea id="contact-message" name="message" rows={5} required placeholder="What problem are you trying to solve, and what data do you have?" value={values.message} onChange={set("message")} className={`${field} resize-y`} {...aria("message")} />
            {renderError("message")}
          </div>

          {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full sm:w-auto">
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
              </>
            ) : (
              <>
                <Send size={16} aria-hidden /> Send project request
              </>
            )}
          </button>

          <div aria-live="polite" className="mt-4">
            {status === "success" && (
              <p className="flex items-start gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden /> Request sent to both of us. Thanks
                for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                {errorMsg ||
                  "The request could not be sent. Check your connection and try again, or use the contact links on this page."}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
