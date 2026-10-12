import { useState } from "react";
import { Award, BookOpen, ExternalLink } from "lucide-react";
import { certifications, memberById, type PersonFilterValue } from "../config/content";
import PersonFilter from "./ui/PersonFilter";
import SectionHeading from "./ui/SectionHeading";

export default function CertificationsSection() {
  const [who, setWho] = useState<PersonFilterValue>("all");
  const items = certifications.filter((c) => c.show && (who === "all" || c.owner === who));
  if (certifications.every((c) => !c.show)) return null;

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section">
      <SectionHeading
        id="certifications-title"
        title="Certifications & training"
        description="Credentials and courses that back up our skills. Open a certificate image to see it in full."
      />
      <PersonFilter value={who} onChange={setWho} label="Show certifications of" />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => {
          const Icon = c.kind === "Course" ? BookOpen : Award;
          const owner = memberById(c.owner)?.shortName ?? "";
          return (
            <li
              key={c.id}
              className="glass flex flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-violet/50"
            >
              {c.image && (
                <a
                  href={c.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open certificate image: ${c.title}`}
                  className="block aspect-[16/9] overflow-hidden border-b border-soft bg-elevated"
                >
                  <img
                    src={c.image}
                    alt={`${c.title} certificate awarded to ${owner}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </a>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/10 text-violet">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="chip">{owner}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-blue">{c.issuer}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.description}</p>

                {(c.issued || c.validity) && (
                  <p className="mt-3 text-xs text-muted">{[c.issued, c.validity].filter(Boolean).join(" · ")}</p>
                )}
                {c.ids && c.ids.length > 0 && (
                  <dl className="mt-2 space-y-0.5 text-xs text-muted">
                    {c.ids.map((i) => (
                      <div key={i.label} className="flex flex-wrap gap-x-1.5">
                        <dt>{i.label}:</dt>
                        <dd className="break-all font-mono text-ink">{i.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink underline-offset-4 hover:underline"
                  >
                    Verify credential <ExternalLink size={14} aria-hidden />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
