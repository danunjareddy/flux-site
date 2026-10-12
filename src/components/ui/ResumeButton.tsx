import { Download } from "lucide-react";
import type { ResumeFile } from "../../config/content";
import { useResumeAvailable } from "../../hooks/useResumeAvailable";

interface Props {
  resume: ResumeFile;
  variant?: "primary" | "ghost";
  className?: string;
}

/** Renders a real download link only when the PDF exists; otherwise a disabled button. */
export default function ResumeButton({ resume, variant = "ghost", className = "" }: Props) {
  const state = useResumeAvailable(resume.path);
  const base = variant === "primary" ? "btn-primary" : "btn-ghost";

  if (state === "available") {
    return (
      <a href={resume.path} download={resume.downloadName} className={`${base} ${className}`}>
        <Download size={16} aria-hidden /> Download resume
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title={state === "checking" ? "Checking resume…" : "Resume PDF has not been added yet"}
      className={`${base} ${className}`}
    >
      <Download size={16} aria-hidden /> {state === "checking" ? "Download resume" : "Resume coming soon"}
    </button>
  );
}
