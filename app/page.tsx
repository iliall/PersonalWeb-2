'use client';

import { useState } from 'react';
import DitherPattern from '@/components/DitherPattern';
import ThemeSwitcher, { Theme } from '@/components/ThemeSwitcher';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');

  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return {
          bg: '#FFFFFF',
          text: '#000000',
          patternColor: '#000000',
          linkHover: 'hover:opacity-50',
        };
      case 'green':
        return {
          bg: '#06402B',
          text: '#E8F5E9',
          patternColor: '#E8F5E9',
          linkHover: 'hover:opacity-70',
        };
      default:
        return {
          bg: '#000000',
          text: '#FFFFFF',
          patternColor: '#FFFFFF',
          linkHover: 'hover:opacity-70',
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div
      className="w-screen h-screen relative flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <DitherPattern theme={theme} color={colors.patternColor} />
      <ThemeSwitcher onThemeChange={setTheme} />

      <div className="relative z-10 max-w-[800px] px-10 text-left">
        <h1 className="text-5xl md:text-6xl font-normal mb-5 tracking-tighter">
          Ilia Alenabi
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 font-sans opacity-90">
          I&apos;m a Computer Science student at university of Waterloo.
        </p>

        <div className="flex gap-8 flex-wrap">
          <a
            href="https://github.com/iliall"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            github
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[3px] ml-[3px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/ilia-alenabi/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            linkedin
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[3px] ml-[3px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="https://twitter.com/IliaAle"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            X
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[3px] ml-[3px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="mailto:ialenabi@uwaterloo.ca"
            className={`text-lg flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            email
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[3px] ml-[3px]"
              style={{ borderColor: colors.text }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
