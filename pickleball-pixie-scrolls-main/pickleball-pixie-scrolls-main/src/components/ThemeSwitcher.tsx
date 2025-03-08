
import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the theme switcher client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const iconElement = document.getElementById('theme-icon');
      if (iconElement) {
        gsap.fromTo(
          iconElement,
          { rotation: -20, scale: 0.8, opacity: 0.5 },
          { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <button
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
      onClick={() => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
      }}
      aria-label="Toggle theme"
    >
      <div id="theme-icon" className="relative">
        {theme === 'light' && <Sun className="h-5 w-5 text-foreground" />}
        {theme === 'dark' && <Moon className="h-5 w-5 text-foreground" />}
        {theme === 'system' && <Laptop className="h-5 w-5 text-foreground" />}
      </div>
    </button>
  );
};
