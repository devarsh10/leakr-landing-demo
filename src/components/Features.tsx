import { Eye, BookOpen, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Eye,
    title: "Auto tracking",
    description:
      "Detects when you get distracted and pauses your timer automatically.",
  },
  {
    icon: BookOpen,
    title: "Daily logs",
    description:
      "Every work session logged with proof of what you built.",
  },
  {
    icon: AlertTriangle,
    title: "Guilt trip mode",
    description:
      "If you log nothing today, we make sure you feel it tomorrow.",
  },
];

const slideVariants = [
  { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
];

const Features = () => {
  return (
    <section id="features" className="w-full bg-[hsl(var(--surface))]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={slideVariants[i]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-6 space-y-3 transition-shadow hover:shadow-md cursor-default"
            >
              <feature.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
