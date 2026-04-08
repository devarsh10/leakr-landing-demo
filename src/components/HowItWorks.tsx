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
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-16">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
