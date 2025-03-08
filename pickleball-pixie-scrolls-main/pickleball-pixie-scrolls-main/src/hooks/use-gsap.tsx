
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimation = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Select all elements with the animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // Apply animations to each element
    animateElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

// Function for staggered animations with ScrollTrigger
export const useStaggeredScrollAnimation = (
  selector: string, 
  options = {
    duration: 0.8,
    stagger: 0.1,
    delay: 0.1,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    threshold: 0.2
  }
) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get all elements that match the selector
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    // Group elements by their common parent (for staggering within sections)
    const parents = new Map();
    
    elements.forEach((el) => {
      // Find the nearest parent with data-animate-parent attribute or fall back to direct parent
      const parent = el.closest("[data-animate-parent]") || el.parentElement;
      
      if (parent) {
        if (!parents.has(parent)) {
          parents.set(parent, []);
        }
        parents.get(parent).push(el);
      }
    });
    
    // Create animations for each group
    parents.forEach((children, parent) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: `top ${85 - options.threshold * 100}%`,
          toggleActions: "play none none reverse",
        }
      });
      
      tl.fromTo(
        children,
        { y: options.y, opacity: options.opacity },
        { 
          y: 0, 
          opacity: 1, 
          duration: options.duration, 
          stagger: options.stagger,
          delay: options.delay,
          ease: options.ease 
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]);
};

// Add the missing useRevealAnimation function
export const useRevealAnimation = (
  ref: RefObject<HTMLElement>,
  options?: Partial<{
    y: number;
    opacity: number;
    duration: number;
    stagger: number;
    ease: string;
    delay: number;
  }>
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const children = ref.current.children;
    
    if (children.length === 0) return;
    
    // Merge default options with provided options
    const defaultOptions = {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.1
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      children,
      { y: mergedOptions.y, opacity: mergedOptions.opacity },
      {
        y: 0,
        opacity: 1,
        duration: mergedOptions.duration,
        stagger: mergedOptions.stagger,
        delay: mergedOptions.delay,
        ease: mergedOptions.ease
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, options]);
};
