
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRef, useEffect } from "react";
import { useScrollAnimation, useRevealAnimation } from "@/hooks/use-gsap";
import gsap from "gsap";

type PlanFeature = {
  text: string;
};

type PricingPlanProps = {
  name: string;
  price: string | React.ReactNode;
  period?: string;
  features: PlanFeature[];
  popular?: boolean;
  index: number;
};

const PricingPlan = ({ name, price, period, features, popular, index }: PricingPlanProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Apply hover animation
    const card = cardRef.current;
    
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    return () => {
      card.removeEventListener("mouseenter", () => {});
      card.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl bg-card border shadow-sm animate-on-scroll transition-all duration-300 ${
        popular ? "border-pickleball-lime/50" : "border-border"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-pickleball-lime text-pickleball-purpleDark text-xs font-semibold px-3 py-1 rounded-bl-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <div className="flex items-end mb-6">
          <span className="text-3xl md:text-4xl font-bold">{price}</span>
          {period && (
            <span className="text-muted-foreground ml-1">{period}</span>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-pickleball-lime flex-shrink-0" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className={`w-full ${
            popular
              ? "bg-pickleball-lime text-pickleball-purpleDark hover:bg-pickleball-limeLight"
              : ""
          }`}
          variant={popular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  
  // Initialize scroll animations
  useScrollAnimation();
  useRevealAnimation(plansRef, { stagger: 0.2 });

  const plans = [
    {
      name: "Starter",
      price: "$15",
      period: "/month",
      features: [
        { text: "Basic video analysis" },
        { text: "Shot tracking" },
        { text: "5GB storage" },
        { text: "720p video quality" }
      ]
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      popular: true,
      features: [
        { text: "Advanced analytics" },
        { text: "Court coverage maps" },
        { text: "20GB storage" },
        { text: "1080p video quality" },
        { text: "Priority support" }
      ]
    },
    {
      name: "Team",
      price: "$Custom",
      features: [
        { text: "Everything in Pro" },
        { text: "Team management" },
        { text: "Unlimited storage" },
        { text: "4K video quality" },
        { text: "API access" }
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 relative bg-background"
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan to elevate your pickleball game to the next level.
          </p>
        </div>

        <div
          ref={plansRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <PricingPlan
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              popular={plan.popular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
