import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { PickleballGlobe } from './PickleballGlobe';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    if (titleRef.current) {
      const originalText = "Game-Changing Analysis for Game-Winning Results.";
      let formattedText = originalText
        .split("")
        .map((char) => `<span class="char">${char}</span>`)
        .join("");

      // Set text with spans around each character and a white cursor
      titleRef.current.innerHTML = `${formattedText}<span class="cursor">|</span>`;

      const chars = titleRef.current.querySelectorAll(".char");
      const cursor = titleRef.current.querySelector(".cursor");

      // Load a key click sound
      const keyClick = new Audio("/sounds/key-click.mp3");

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // Typewriter effect with key click sound
      chars.forEach((char, index) => {
        tl.to(char, { opacity: 1, duration: 0.05 }, index * 0.05).call(() => {
          keyClick.currentTime = 0;
          keyClick.play();
        });
      });

      // Move cursor dynamically while typing
      tl.to(
        cursor,
        { x: "0.5em", duration: 0.05, repeat: chars.length, ease: "none" },
        0
      );

      // Blink cursor after typing finishes
      tl.to(
        cursor,
        {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.5"
      );

      // Animate subtitle and CTA after typing finishes
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      ).fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      );
    }

    // Floating effect for hero section
    gsap.to(heroRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Gradient animation for the text
    gsap.to(".text-gradient-animated", {
      backgroundPosition: "200% center",
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Add the PickleballGlobe component */}
      <PickleballGlobe />

      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-90 dark:opacity-80"
        style={{
          background: 'linear-gradient(135deg, hsla(139, 86%, 36%, 1) 6%, hsla(209, 70%, 62%, 1) 78%)',
          filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#0DAC3F", endColorstr="#5CA1E2", GradientType=1)',
        }}
      ></div>

      {/* Decorative elements */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-forest-light/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-azure-light/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-mint-light/20 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={heroRef}
        className="container mx-auto px-4 py-20 z-10 text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Tag positioned above the title */}
          <div className="mb-6 inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm animate-pulse-soft">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            <p className="text-sm font-medium text-forest-darkest">
              New: AI-Powered Shot Analysis
            </p>
          </div>

          <div className="relative mb-6">
            <h1
              ref={titleRef}
              className="text-gradient-animated text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-forest-darkest bg-gradient-to-r from-forest-darkest/30 via-forest-medium/30 to-forest-darkest/30 bg-[length:200%_auto] inline-block"
            >
              {/* Title will be dynamically updated here */}
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-forest-dark mb-8 max-w-2xl mx-auto"
          >
            Revolutionize your pickleball play with AI-driven insights that
            transform every match into a learning opportunity.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-forest-medium text-white hover:bg-forest-dark hover-scale text-lg px-6 py-6 h-auto shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              Upload Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
