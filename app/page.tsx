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
        <h1 className="text-4xl md:text-5xl font-normal mb-3 tracking-tighter">
          Ilia Alenabi
        </h1>

        <p className="text-base md:text-lg leading-relaxed mb-6 font-sans opacity-80">
          CS + AI at Waterloo | ML & Compiler Engineering
        </p>

        <div className="mb-6">
          <h2 className="text-sm md:text-base font-semibold mb-2 opacity-70 uppercase tracking-wide">Experience</h2>
          <ul className="list-disc list-inside space-y-1.5 opacity-90">
            <li className="text-sm md:text-base">
              Machine Learning Engineer @{' '}
              <a
                href="https://www.cerebras.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Cerebras
              </a>
            </li>
            <li className="text-sm md:text-base">
              Compiler Engineer @{' '}
              <a
                href="https://www.huawei.com/ca/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Huawei Canada
              </a>
            </li>
            <li className="text-sm md:text-base">
              Data Engineer @{' '}
              <a
                href="https://cohere.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Cohere
              </a>
            </li>
            <li className="text-sm md:text-base">
              Software Engineer @{' '}
              <a
                href="https://www.questrade.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Questrade
              </a>
            </li>
            <li className="text-sm md:text-base">
              Data Scientist @{' '}
              <a
                href="https://silverberrygenomix.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Silverberry
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-sm md:text-base font-semibold mb-2 opacity-70 uppercase tracking-wide">Research</h2>
          <ul className="list-disc list-inside space-y-1.5 opacity-90">
            <li className="text-sm md:text-base">
              Research Intern @{' '}
              <a
                href="https://vectorinstitute.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Vector Institute
              </a>
              {' '}- Interpreting Vision-Language Models
            </li>
            <li className="text-sm md:text-base">
              Research Intern @{' '}
              <a
                href="https://pingoo.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Pingoo AI
              </a>
              {' '}- Trustworthy Generative AI for Diabetes Care
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-sm md:text-base font-semibold mb-2 opacity-70 uppercase tracking-wide">Achievements</h2>
          <ul className="list-disc list-inside space-y-1.5 opacity-90">
            <li className="text-sm md:text-base">4.0 GPA - President&apos;s Scholarship of Distinction</li>
            <li className="text-sm md:text-base">National Math Olympiad - Silver Medal</li>
            <li className="text-sm md:text-base">Combinatorics Olympiad - Silver Medal</li>
          </ul>
        </div>

        <div className="flex gap-6 flex-wrap">
          <a
            href="https://github.com/iliall"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            github
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px] ml-[2px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/ilia-alenabi/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            linkedin
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px] ml-[2px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="https://twitter.com/IliaAle"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            X
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px] ml-[2px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            href="mailto:ialenabi@uwaterloo.ca"
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            email
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px] ml-[2px]"
              style={{ borderColor: colors.text }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
