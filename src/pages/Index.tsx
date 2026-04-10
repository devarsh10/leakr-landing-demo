import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DistractionTicker from "@/components/DistractionTicker";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WhyLeakr from "@/components/WhyLeakr";
import FAQ from "@/components/FAQ";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <DistractionTicker />
      <Features />
      <HowItWorks />
      <WhyLeakr />
      <FAQ />
      <WaitlistCTA />
      <Footer />
    </div>
  );
};

export default Index;
