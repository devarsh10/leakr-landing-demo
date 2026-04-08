import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Start your session",
    description: "Open Leakr and hit start — that's it.",
  },
  {
    number: "02",
    title: "Work without thinking",
    description: "We track everything in the background so you can focus.",
  },
  {
    number: "03",
    title: "Log what you built",
    description: "End your session and record what you actually shipped.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
        <h2 className="text-4xl md:text-[52px] font-semibold text-foreground tracking-tight mb-12 leading-tight">
          How it works
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative space-y-3"
            >
              <span className="inline-block text-xs font-mono text-muted-foreground bg-background px-2 relative z-10">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
