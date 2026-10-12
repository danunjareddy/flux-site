import { Bird, HeartPulse, MessagesSquare, PawPrint, QrCode, ScanFace, Wifi, type LucideIcon } from "lucide-react";
import type { Project, ProjectIcon } from "../../config/content";

const icons: Record<ProjectIcon, LucideIcon> = {
  paw: PawPrint,
  chat: MessagesSquare,
  bird: Bird,
  scan: ScanFace,
  heart: HeartPulse,
  wifi: Wifi,
  qr: QrCode,
};

/** Real screenshot when one is configured, otherwise an abstract illustration (never a fake screenshot). */
export default function ProjectArt({ project, className = "" }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  const Icon = icons[project.icon];
  return (
    <div
      aria-hidden
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(circle at 25% 20%, rgb(var(--blue) / 0.28), transparent 55%), radial-gradient(circle at 80% 85%, rgb(var(--violet) / 0.28), transparent 55%), rgb(var(--elevated))",
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${project.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
      </svg>
      <span className="glass relative flex h-16 w-16 items-center justify-center rounded-2xl text-blue">
        <Icon size={30} />
      </span>
    </div>
  );
}
