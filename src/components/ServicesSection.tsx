import { BarChart3, Bot, BrainCircuit, Check, Eye, Globe, type LucideIcon } from "lucide-react";
import { projects, services, type Service } from "../config/content";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<Service["icon"], LucideIcon> = {
  vision: Eye,
  chat: Bot,
  model: BrainCircuit,
  data: BarChart3,
  web: Globe,
};

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <SectionHeading
        id="services-title"
        title="What we can build for you"
        description="The kinds of projects we take on. Not sure which fits? Describe the problem and we'll work it out together."
      />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon];
          const related = s.relatedProjects
            .map((id) => projects.find((p) => p.id === id)?.title)
            .filter((t): t is string => Boolean(t));
          return (
            <li
              key={s.id}
              className="glass flex flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-blue/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink/10 text-blue">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-blue" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              {related.length > 0 && (
                <p className="mt-6 border-t border-soft pt-4 text-sm text-muted">Related work: {related.join(", ")}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
