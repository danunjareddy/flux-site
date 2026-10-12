import { useState } from "react";
import { BarChart3, BrainCircuit, Cloud, Code2, Database, Globe, Wrench, type LucideIcon } from "lucide-react";
import { team, type PersonFilterValue, type SkillCategory } from "../config/content";
import PersonFilter from "./ui/PersonFilter";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<SkillCategory["icon"], LucideIcon> = {
  code: Code2,
  brain: BrainCircuit,
  chart: BarChart3,
  wrench: Wrench,
  web: Globe,
  database: Database,
  cloud: Cloud,
};

export default function SkillsSection() {
  const [who, setWho] = useState<PersonFilterValue>("all");
  const members = team.filter((m) => who === "all" || m.id === who);

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading
        id="skills-title"
        title="Skill stack"
        description="The languages, libraries, and tools each of us uses to build and evaluate projects."
      />
      <PersonFilter value={who} onChange={setWho} label="Show skills of" />

      <div className="space-y-12">
        {members.map((m) => (
          <div key={m.id}>
            <h3 className="mb-5 text-xl font-semibold">{m.name}</h3>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {m.skills.map((cat) => {
                const Icon = icons[cat.icon];
                return (
                  <li
                    key={cat.id}
                    className="glass group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-blue/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/10 text-blue">
                        <Icon size={20} aria-hidden />
                      </span>
                      <h4 className="font-semibold">{cat.title}</h4>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <li key={item} className="chip transition group-hover:text-ink">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
