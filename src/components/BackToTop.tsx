import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="glass fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-lg transition hover:-translate-y-0.5 hover:border-blue"
    >
      <ArrowUp size={18} aria-hidden />
    </button>
  );
}
