import { Eye, BookOpen, AlertTriangle } from "lucide-react";

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

const Features = () => {
  return (
    <section id="features" className="w-full bg-[hsl(var(--surface))]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 space-y-4"
            >
              <feature.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
