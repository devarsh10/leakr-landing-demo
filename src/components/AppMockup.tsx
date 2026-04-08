import { Check, Pause } from "lucide-react";

const AppMockup = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground tracking-wide uppercase">Current session</p>
        <p className="text-4xl md:text-5xl font-mono font-semibold text-foreground tracking-tight">01:42:33</p>
        <p className="text-sm text-muted-foreground">Client — Acme Corp</p>
      </div>

      <div className="flex items-center gap-2 bg-amber-bg text-amber-foreground text-xs font-medium px-3 py-1.5 rounded-full w-fit">
        <Pause className="w-3 h-3" />
        YouTube detected — timer paused
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        {["Redesigned onboarding flow", "Fixed auth bug on staging"].map((task) => (
          <div key={task} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm text-foreground">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppMockup;
