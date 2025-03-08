
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { useScrollAnimation } from "@/hooks/use-gsap";
import { useEffect } from "react";

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  // Initialize GSAP on page load
  useEffect(() => {
    // This runs once the page loads
    document.documentElement.classList.add('has-loaded');
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
};

export default Index;
