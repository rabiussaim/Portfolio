import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    } else {
      setIsLight(false);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isLight;
    setIsLight(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg border border-slate-700/50 dark:border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 dark:bg-slate-900/30 dark:hover:bg-slate-900/60 text-slate-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm relative overflow-hidden"
      aria-label="Toggle Theme"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)'
      }}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          size={20}
          className={`absolute transition-all duration-500 transform ${
            isLight ? 'rotate-0 scale-100 opacity-100 text-amber-500' : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon Icon */}
        <Moon
          size={20}
          className={`absolute transition-all duration-500 transform ${
            isLight ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-blue-400'
          }`}
        />
      </div>
    </button>
  );
}
