const WaitlistCTA = () => {
  return (
    <section id="early-access" className="w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
          Ready to own your time?
        </h2>
        <p className="text-muted-foreground font-light mb-10 max-w-md mx-auto">
          Join hundreds of freelancers and teams already on the waitlist.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full sm:flex-1 h-11 rounded-full border border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground text-sm px-6 h-11 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Join the waitlist
          </button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistCTA;
