import { useEffect, useState } from "react";

export type ResumeState = "checking" | "available" | "missing";

/**
 * Confirms the PDF really exists. Dev servers and SPA hosts answer 200 with
 * index.html for unknown paths, so the content type is checked too.
 */
export function useResumeAvailable(path: string): ResumeState {
  const [state, setState] = useState<ResumeState>("checking");

  useEffect(() => {
    let cancelled = false;
    setState("checking");
    fetch(path, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled) setState(res.ok && type.includes("pdf") ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setState("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}
