import { Link } from "react-router-dom";
import AppMockup from "./AppMockup";

const Hero = () => {
  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-8">
          <span className="inline-block text-xs tracking-wide text-muted-foreground border border-border rounded-full px-4 py-1.5">
            Now in early access
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground tracking-tight">
            Stop leaking<br />time.
          </h1>

          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-md">
            Leakr automatically tracks where your time goes — and holds you accountable for every hour.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/demo"
              className="bg-primary text-primary-foreground text-sm px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Try the demo
            </Link>
            <a
              href="#how-it-works"
              className="border border-foreground text-foreground text-sm px-6 py-3 rounded-full font-medium hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              See how it works
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">No credit card needed</p>
            <p className="text-xs text-muted-foreground">Free for individuals</p>
          </div>
        </div>

        <div>
          <AppMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;
