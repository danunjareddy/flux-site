import { motion, useReducedMotion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ id, title, description }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="mb-12 max-w-2xl"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>}
    </motion.div>
  );
}
