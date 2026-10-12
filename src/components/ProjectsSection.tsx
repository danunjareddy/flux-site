import { useCallback, useState } from "react";
import { projects, type PersonFilterValue, type Project } from "../config/content";
import ProjectCard from "./projects/ProjectCard";
import ProjectModal from "./projects/ProjectModal";
import PersonFilter from "./ui/PersonFilter";
import SectionHeading from "./ui/SectionHeading";

export default function ProjectsSection() {
  const [who, setWho] = useState<PersonFilterValue>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = projects.filter((p) => who === "all" || p.owners.includes(who));

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading
        id="projects-title"
        title="Selected work"
        description="Personal and academic projects that show how we approach a problem. Open one for details."
      />
      <PersonFilter value={who} onChange={setWho} label="Show projects by" />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} onOpen={setSelected} />
          </li>
        ))}
      </ul>

      {selected && <ProjectModal project={selected} onClose={close} />}
    </section>
  );
}
