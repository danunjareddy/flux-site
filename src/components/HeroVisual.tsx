import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { heroTags, site } from "../config/content";

/** Positions around the monogram, as percentages of the square stage. */
const slots = [
  { top: "8%", left: "50%", delay: "0s" },
  { top: "34%", left: "90%", delay: "0.8s" },
  { top: "78%", left: "78%", delay: "1.6s" },
  { top: "80%", left: "20%", delay: "0.4s" },
  { top: "32%", left: "9%", delay: "1.2s" },
];

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[26rem] [perspective:900px]"
      role="img"
      aria-label={`${site.name} logo surrounded by ${heroTags.join(", ")}`}
    >
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgb(var(--blue) / 0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgb(var(--violet) / 0.3), transparent 55%)",
        }}
      />
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {[100, 76, 52].map((size, i) => (
          <div
            key={size}
            aria-hidden
            className="border-soft absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              transform: "translate(-50%, -50%)",
              borderStyle: i === 1 ? "dashed" : "solid",
            }}
          />
        ))}

        <div className="glass absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl shadow-2xl">
          <img src="/logo-mark.png" alt="" className="h-[62%] w-[62%] object-contain" />
        </div>

        {heroTags.map((tag, i) => {
          const s = slots[i % slots.length];
          return (
            <span
              key={tag}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: s.top, left: s.left }}
            >
              <span
                className="glass block whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs text-ink transition-colors duration-200 hover:border-blue sm:text-sm"
                style={reduce ? undefined : { animation: `drift 6s ease-in-out ${s.delay} infinite` }}
              >
                {tag}
              </span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
