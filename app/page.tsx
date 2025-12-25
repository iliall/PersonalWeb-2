'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import DitherPattern from '@/components/DitherPattern';
import ThemeSwitcher, { Theme } from '@/components/ThemeSwitcher';
import { Cerebras, Huawei, Cohere } from '@lobehub/icons';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    if (containerRef.current) {
      // Capture current dimensions before expanding
      const currentHeight = containerRef.current.offsetHeight;
      const currentWidth = containerRef.current.offsetWidth;

      // Set explicit dimensions
      containerRef.current.style.width = `${currentWidth}px`;
      containerRef.current.style.height = `${currentHeight}px`;

      // Force a reflow
      containerRef.current.offsetHeight;

      // Now expand
      setIsExpanded(true);
    }
  };

  const handleCollapse = () => {
    if (containerRef.current && contentRef.current) {
      // Step 1: Capture current expanded dimensions
      const expandedWidth = containerRef.current.offsetWidth;
      const expandedHeight = containerRef.current.offsetHeight;

      // Step 2: Lock to current expanded size
      containerRef.current.style.width = `${expandedWidth}px`;
      containerRef.current.style.height = `${expandedHeight}px`;

      // Force reflow to ensure styles are applied
      containerRef.current.offsetHeight;

      // Step 3: Make content visible to measure natural size
      const currentOpacity = contentRef.current.style.opacity;
      contentRef.current.style.opacity = '1';
      contentRef.current.style.pointerEvents = 'auto';

      // Step 4: Measure natural content dimensions
      const naturalHeight = contentRef.current.offsetHeight;
      const naturalWidth = contentRef.current.offsetWidth;

      // Restore original opacity
      contentRef.current.style.opacity = currentOpacity;
      contentRef.current.style.pointerEvents = '';

      // Step 5: Calculate target dimensions with padding
      const targetWidth = Math.min(naturalWidth + 80, 800);
      const targetHeight = naturalHeight + 64;

      // Step 6: Start the transition
      requestAnimationFrame(() => {
        if (containerRef.current) {
          // Set target dimensions (CSS transition will animate this)
          containerRef.current.style.width = `${targetWidth}px`;
          containerRef.current.style.height = `${targetHeight}px`;

          // Also trigger content fade-in
          setIsExpanded(false);

          // Step 7: Clean up explicit styles after transition
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.width = '';
              containerRef.current.style.height = '';
            }
          }, 500);
        }
      });
    }
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return {
          bg: '#F5F5F5',
          text: '#1a1a1a',
          patternColor: '#333333',
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

  const getBackgroundColor = () => {
    switch (theme) {
      case 'light':
        return 'rgba(255, 255, 255, 0.5)';
      case 'green':
        return 'rgba(0, 0, 0, 0.2)';
      default:
        return 'rgba(0, 0, 0, 0.2)';
    }
  };

  return (
    <div
      className="w-screen h-screen relative flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <DitherPattern theme={theme} color={colors.patternColor} />
      <ThemeSwitcher onThemeChange={setTheme} />

      <div
        ref={containerRef}
        className={`relative z-10 px-10 py-8 text-left rounded-2xl ${!isExpanded ? 'max-w-[800px]' : ''}`}
        style={{
          backgroundColor: getBackgroundColor(),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          ...(isExpanded && {
            width: '85vw',
            height: '80vh',
          }),
          transition: 'width 500ms ease-in-out, height 500ms ease-in-out',
        }}
      >
        <div
          ref={contentRef}
          className="flex flex-col h-full"
        >
        <div className={`transition-opacity duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 transition-all duration-300" style={{ borderColor: colors.text }}>
            <Image
              src="/profile.jpg"
              alt="Ilia Alenabi"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tighter">
              Ilia Alenabi
            </h1>
            <p className="text-base md:text-lg leading-relaxed mt-2 font-sans opacity-80">
              CS @ UWaterloo | MLE @ Cerebras
            </p>
          </div>
        </div>

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
              {' '}
              <Cerebras size={20} className="inline-block align-middle" />
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
              {' '}
              <Huawei size={16} className="inline-block align-middle" />
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
              {' '}
              <Cohere size={16} className="inline-block align-middle" />
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
                href="https://www.silverberry.ai/"
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
              Researcher @ Vector Institute - {' '}
              <a
                href="https://aclanthology.org/2025.emnlp-demos.68/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Interpreting Vision-Language Models
              </a>
            </li>
            <li className="text-sm md:text-base">
              Researcher @ Pingoo AI - {' '}
              <a
                href="https://journals.sagepub.com/doi/abs/10.1177/19322968241253568"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-1 underline-offset-2 transition-opacity duration-300 ${colors.linkHover}`}
                style={{ color: colors.text }}
              >
                Trustworthy Generative AI for Diabetes Care
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-sm md:text-base font-semibold mb-2 opacity-70 uppercase tracking-wide">Achievements</h2>
          <ul className="list-disc list-inside space-y-1.5 opacity-90">
            <li className="text-sm md:text-base">National Mathematical Olympiad - Silver Medal</li>
            <li className="text-sm md:text-base">International Combinatorics Olympiad - Silver Medal</li>
          </ul>
        </div>
        </div>

        {/* Social icons - stay visible, move to bottom when expanded */}
        <div className={`flex gap-6 flex-wrap justify-center ${isExpanded ? 'mt-auto' : ''}`}>
          <a
            href="https://github.com/iliall"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
            </svg>
            <span
              className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px] ml-[2px]"
              style={{ borderColor: colors.text }}
            />
          </a>

          <a
            onClick={isExpanded ? handleCollapse : handleExpand}
            className={`text-sm md:text-base flex items-center gap-2 no-underline transition-opacity duration-300 cursor-pointer ${colors.linkHover}`}
            style={{ color: colors.text }}
          >
            {isExpanded ? (
              <>
                {/* Arrow on LEFT when expanded */}
                <span
                  className="inline-block rotate-[135deg] border-r-2 border-b-2 p-[2px]"
                  style={{ borderColor: colors.text }}
                />
                {/* Globe icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6"/>
                  <path d="M2 8h12M8 2a10.5 10.5 0 0 1 2.5 6 10.5 10.5 0 0 1-2.5 6 10.5 10.5 0 0 1-2.5-6 10.5 10.5 0 0 1 2.5-6z"/>
                </svg>
              </>
            ) : (
              <>
                {/* Globe icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6"/>
                  <path d="M2 8h12M8 2a10.5 10.5 0 0 1 2.5 6 10.5 10.5 0 0 1-2.5 6 10.5 10.5 0 0 1-2.5-6 10.5 10.5 0 0 1 2.5-6z"/>
                </svg>
                {/* Arrow on RIGHT when not expanded */}
                <span
                  className="inline-block rotate-[-45deg] border-r-2 border-b-2 p-[2px]"
                  style={{ borderColor: colors.text }}
                />
              </>
            )}
          </a>
        </div>
        </div>

      </div>
    </div>
  );
}
