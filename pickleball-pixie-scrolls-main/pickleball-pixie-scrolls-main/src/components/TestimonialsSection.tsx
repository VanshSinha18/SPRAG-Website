import { useRef } from "react";
import { useScrollAnimation, useRevealAnimation } from "@/hooks/use-gsap";

type TestimonialProps = {
  quote: string;
  name: string;
  title: string;
  image: string;
  index: number;
};

const Testimonial = ({
  quote,
  name,
  title,
  image,
  index,
}: TestimonialProps) => {
  return (
    <div
      className="glass-card p-8 rounded-2xl animate-on-scroll transition-all duration-300"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-pickleball-lime/30">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <p className="italic text-foreground/90">{quote}</p>
    </div>
  );
};

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Initialize scroll animations
  useScrollAnimation();
  useRevealAnimation(testimonialsRef, { stagger: 0.2 });

  const testimonials = [
    {
      quote:
        "SPRAG has completely transformed my training approach. The AI insights are incredibly accurate and helpful.",
      name: "Mike Chen",
      title: "Professional Player",
      image: "/lovable-uploads/b6b46134-cf40-44d1-9f2e-a1db548f121d.png",
    },
    {
      quote:
        "As a coach, this tool has become indispensable. It helps me provide precise feedback to my students.",
      name: "Sarah Rodriguez",
      title: "Head Coach",
      image: "/lovable-uploads/5856e2ad-d21c-46e8-9446-897dea55d750.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 relative bg-background/50 dark:bg-background/80 backdrop-blur-sm"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-pickleball-purple/5 to-pickleball-lime/5 -z-10"></div>

      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Players Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from players and coaches who've experienced the SPRAG
            difference.
          </p>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
