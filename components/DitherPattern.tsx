'use client';

import { useEffect, useRef } from 'react';

const ditherMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];

interface DitherPatternProps {
  className?: string;
  theme?: 'dark' | 'light' | 'green';
  color?: string;
}

export default function DitherPattern({ className = '', theme = 'dark', color = '#FFFFFF' }: DitherPatternProps) {
  const canvasRef = useRef<HTMLPreElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const time = useRef(0);
  const animationFrameId = useRef<number | undefined>(undefined);
  const actualCharWidth = useRef<number>(5.5);
  const cols = useRef(0);
  const rows = useRef(0);

  const CHAR_WIDTH_RENDER = 5;
  const CHAR_HEIGHT = 10;

  const generateDitherPattern = () => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const numCols = Math.ceil(width / CHAR_WIDTH_RENDER) + 20;
    const numRows = Math.ceil(height / CHAR_HEIGHT) + 10;

    cols.current = numCols;
    rows.current = numRows;

    let result = '';

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        let intensity = (Math.sin(x * 0.1 + y * 0.05 + time.current * 2) + 1) / 2;

        if (mouseX.current > 0 && mouseY.current > 0) {
          const charX = x * actualCharWidth.current;
          const charY = y * CHAR_HEIGHT;

          const mouseDx = (charX - mouseX.current) / width;
          const mouseDy = (charY - mouseY.current) / height;
          const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

          if (mouseDistance < 0.2) {
            intensity = intensity * (1 - (0.2 - mouseDistance) * 5);
          }
        }

        intensity = Math.max(0, Math.min(1, intensity));

        let digit = Math.floor(intensity * 10);
        if (digit > 9) digit = 9;

        const threshold = ditherMatrix[y % 4][x % 4] / 16;

        if (intensity < threshold) {
          digit = Math.max(0, digit - 1);
        }

        result += digit;
      }
      result += '\n';
    }

    canvasRef.current.textContent = result;

    if (canvasRef.current && cols.current > 0) {
      const lines = result.split('\n');
      if (lines[0]) {
        const tempSpan = document.createElement('span');
        tempSpan.style.fontFamily = "'Courier New', monospace";
        tempSpan.style.fontSize = '8px';
        tempSpan.style.letterSpacing = '0';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.textContent = lines[0];
        document.body.appendChild(tempSpan);

        const measuredWidth = tempSpan.offsetWidth;
        actualCharWidth.current = measuredWidth / lines[0].length;

        document.body.removeChild(tempSpan);
      }
    }
  };

  const animate = () => {
    time.current += 0.01;
    generateDitherPattern();
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    generateDitherPattern();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX.current = 0;
      mouseY.current = 0;
    };

    const handleResize = () => {
      generateDitherPattern();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <pre
      ref={canvasRef}
      className={`fixed top-0 left-0 w-screen h-screen min-h-screen font-mono text-[8px] whitespace-pre overflow-hidden opacity-30 pointer-events-none z-[1] transition-colors duration-500 ${className}`}
      style={{
        fontFamily: "'Courier New', monospace",
        lineHeight: '10px',
        letterSpacing: '0',
        color: color,
      }}
    />
  );
}
