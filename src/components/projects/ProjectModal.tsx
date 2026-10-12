import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { memberNames, type Project } from "../../config/content";
import ProjectArt from "./ProjectArt";
import { statusLabel } from "./ProjectCard";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previous?.focus();
    };
  }, [onClose]);

  const details = [
    { label: "Problem", text: project.problem },
    { label: "Solution", text: project.solution },
    { label: "My contribution", text: project.contribution },
  ].filter((d): d is { label: string; text: string } => Boolean(d.text));

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-soft bg-surface sm:rounded-3xl"
      >
        <div className="relative aspect-[16/7] overflow-hidden">
          <ProjectArt project={project} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-blue">{project.category}</span>
            {project.status && <span className="chip">{statusLabel[project.status]}</span>}
          </div>
          <h3 id="project-dialog-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">By {memberNames(project.owners)}</p>
          <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

          {details.length > 0 && (
            <dl className="mt-6 space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-sm font-medium text-ink">{d.label}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{d.text}</dd>
                </div>
              ))}
            </dl>
          )}

          <h4 className="mt-6 text-sm font-medium">Technology stack</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>

          {(project.repoUrl || project.demoUrl) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Github size={16} aria-hidden /> View source
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <ExternalLink size={16} aria-hidden /> Live demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
