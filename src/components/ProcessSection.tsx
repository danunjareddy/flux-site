import { processSteps } from "../config/content";
import SectionHeading from "./ui/SectionHeading";

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <SectionHeading
        id="process-title"
        title="How we'll work together"
        description="A simple four-step process, so you know what to expect before you start."
      />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.title} className="glass rounded-3xl p-6">
            <span
              aria-hidden
              className="gradient-text font-display text-3xl font-bold"
            >
              {i + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
