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

  const themes = [
    { name: 'dark', color: '#000000', label: 'Dark' },
    { name: 'light', color: '#FFFFFF', label: 'Light' },
    { name: 'green', color: '#06402B', label: 'Green' },
  ];

  return (
    <div className="fixed top-8 right-8 z-50 flex gap-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => handleThemeChange(theme.name as Theme)}
          className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
            currentTheme === theme.name
              ? 'border-white shadow-lg scale-110'
              : 'border-white/30 hover:border-white/60'
          }`}
          style={{ backgroundColor: theme.color }}
          aria-label={`Switch to ${theme.label} theme`}
          title={`${theme.label} theme`}
        >
          {theme.name === 'light' && (
            <div className="w-full h-full rounded-full border-2 border-gray-300" />
          )}
        </button>
      ))}
    </div>
  );
}
