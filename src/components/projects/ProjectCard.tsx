import { ArrowUpRight } from "lucide-react";
import { memberById, memberNames, type Project, type ProjectStatus } from "../../config/content";
import ProjectArt from "./ProjectArt";

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

interface Props {
  project: Project;
  onOpen: (p: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  // The project's own repository, or the GitHub profile of the person who built it.
  const href = project.repoUrl || memberById(project.owners[0])?.github || "";

  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1.5 hover:border-blue/50">
      <div className="aspect-[16/9] overflow-hidden transition duration-500 group-hover:scale-[1.03]">
        <ProjectArt project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-blue">{project.category}</span>
          {project.status && <span className="chip">{statusLabel[project.status]}</span>}
        </div>
        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <p className="mt-3 text-xs text-muted">By {memberNames(project.owners)}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View project ${project.title} on GitHub (opens in a new tab)`}
              className="btn-ghost w-full"
            >
              View Project <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              aria-label={`View project: ${project.title}`}
              className="btn-ghost w-full"
            >
              View Project <ArrowUpRight size={16} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
