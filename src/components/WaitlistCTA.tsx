import { motion } from "framer-motion";

const WaitlistCTA = () => {
  return (
    <section id="early-access" className="w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-[hsl(var(--surface))] rounded-2xl p-10 md:p-14 text-center"
        >
          <h2 className="text-4xl md:text-[52px] font-semibold text-foreground tracking-tight mb-4 leading-tight">
            Ready to own your time?
          </h2>
          <p className="text-base text-muted-foreground font-light mb-8 max-w-md mx-auto">
            Join hundreds of freelancers and teams already on the waitlist.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto w-full"
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full sm:flex-1 h-12 rounded-full border border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-primary-foreground text-sm px-8 h-12 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Join the waitlist
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
