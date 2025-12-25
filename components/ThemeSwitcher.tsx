'use client';

import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'green';

interface ThemeSwitcherProps {
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      onThemeChange(savedTheme);
    }
  }, [onThemeChange]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    onThemeChange(theme);
  };

  const MoonIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const LeafIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );

  const SunIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );

  const themes = [
    { name: 'dark', label: 'Dark', Icon: MoonIcon },
    { name: 'green', label: 'Green', Icon: LeafIcon },
    { name: 'light', label: 'Light', Icon: SunIcon },
  ];

  const getSliderPosition = () => {
    switch (currentTheme) {
      case 'dark':
        return 'translateX(0)';
      case 'green':
        return 'translateX(28px)';
      case 'light':
        return 'translateX(56px)';
      default:
        return 'translateX(0)';
    }
  };

  const isLightTheme = currentTheme === 'light';

  return (
    <div className="fixed top-8 right-8 z-50">
      <div className={`relative flex items-center backdrop-blur-md rounded-full p-0.5 border ${
        isLightTheme
          ? 'bg-black/10 border-black/20'
          : 'bg-white/10 border-white/20'
      }`}>
        {/* Sliding background indicator */}
        <div
          className={`absolute top-0.5 bottom-0.5 w-7 rounded-full transition-transform duration-300 ease-out ${
            isLightTheme ? 'bg-black/30' : 'bg-white/30'
          }`}
          style={{ transform: getSliderPosition() }}
        />

        {/* Theme buttons */}
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeChange(theme.name as Theme)}
            className={`relative z-10 w-7 h-7 flex items-center justify-center transition-all duration-300 rounded-full ${
              currentTheme === theme.name
                ? isLightTheme ? 'text-gray-800 scale-110' : 'text-white scale-110'
                : isLightTheme ? 'text-gray-400 hover:text-gray-600' : 'text-white/50 hover:text-white/80'
            }`}
            aria-label={`Switch to ${theme.label} theme`}
            title={`${theme.label} theme`}
          >
            <theme.Icon />
          </button>
        ))}
      </div>
    </div>
  );
}
