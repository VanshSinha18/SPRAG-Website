
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { name: "Learn", href: "/learn" },
  { name: "Ambassadors", href: "/ambassadors" },
  { name: "Clubs", href: "/clubs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Gift Cards", href: "/gift-cards", highlight: true },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Animate logo on page load
    gsap.fromTo(
      "#logo",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    // Animate nav links with stagger
    gsap.fromTo(
      ".nav-link",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      }
    );

    // Animate buttons
    gsap.fromTo(
      ".nav-button",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.5,
      }
    );

    // Add scroll listener for navbar background
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-foreground transition-all"
          id="logo"
        >
          SPRAG
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              className={`nav-link px-4 py-2 rounded-md text-foreground/90 hover:text-foreground transition-colors ${
                link.highlight
                  ? "bg-pickleball-lime/20 hover:bg-pickleball-lime/30 font-medium"
                  : "hover:bg-muted"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.highlight ? (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="14" x="3" y="5" rx="2" />
                    <path d="M21 5v4" />
                    <path d="M3 5v4" />
                    <path d="M21 15v4" />
                    <path d="M3 15v4" />
                    <path d="M7 11h10" />
                  </svg>
                  {link.name}
                </span>
              ) : (
                link.name
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitcher />
          
          <Link to="/signin" className="nav-button">
            <Button variant="ghost" className="hover-scale">
              Sign In
            </Button>
          </Link>
          
          <Link to="/signup" className="nav-button">
            <Button className="bg-pickleball-lime text-pickleball-purpleDark hover:bg-pickleball-limeDark hover-scale transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeSwitcher />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-3 rounded-md text-foreground/90 hover:text-foreground transition-colors ${
                  link.highlight
                    ? "bg-pickleball-lime/20 hover:bg-pickleball-lime/30 font-medium"
                    : "hover:bg-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.highlight ? (
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="14" x="3" y="5" rx="2" />
                      <path d="M21 5v4" />
                      <path d="M3 5v4" />
                      <path d="M21 15v4" />
                      <path d="M3 15v4" />
                      <path d="M7 11h10" />
                    </svg>
                    {link.name}
                  </span>
                ) : (
                  link.name
                )}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/signin">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-pickleball-lime text-pickleball-purpleDark hover:bg-pickleball-limeDark">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
