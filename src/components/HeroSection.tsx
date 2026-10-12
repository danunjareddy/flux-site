import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "../config/content";
import HeroVisual from "./HeroVisual";
import SocialLinks from "./ui/SocialIcons";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function HeroSection() {
  const reduce = useReducedMotion();
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.08 * i, ease: "easeOut" as const },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 30rem at 15% 0%, rgb(var(--blue) / 0.12), transparent 60%), radial-gradient(50rem 30rem at 90% 20%, rgb(var(--violet) / 0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-page items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            {...item(0)}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inset-0 rounded-full bg-emerald-400"
                style={reduce ? undefined : { animation: "ping-soft 2s ease-out infinite" }}
              />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availability}
          </motion.p>

          <motion.p {...item(1)} className="mt-8 font-display text-xl text-muted sm:text-2xl">
            <span className="font-semibold text-ink">{site.name}</span> {site.descriptor}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...item(2)}
            className="mt-3 max-w-[20ch] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            {site.headline}
          </motion.h1>
          <motion.p {...item(3)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.intro}
          </motion.p>

          <motion.div {...item(4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="btn-primary"
            >
              Start a Project
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("projects");
              }}
              className="btn-ghost"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.div {...item(5)} className="mt-8">
            <SocialLinks showLabels className="-ml-3" />
          </motion.div>
        </div>

        <motion.div {...item(3)}>
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("services");
        }}
        aria-label="Scroll to Services section"
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-muted transition hover:text-ink sm:flex"
      >
        <ArrowDown size={18} aria-hidden style={reduce ? undefined : { animation: "drift 2.4s ease-in-out infinite" }} />
      </a>
    </section>
  );
}
