import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 select-text"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let globalCharCount = 0;

  return (
    <p
      ref={containerRef}
      className={`relative ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const wordStartIdx = globalCharCount;
        globalCharCount += word.length + 1; // +1 for the space

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const currentGlobalIndex = wordStartIdx + charIdx;
              const startRange = currentGlobalIndex / totalChars;
              const endRange = Math.min(1, (currentGlobalIndex + 1) / totalChars);

              return (
                <CharSpan
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[startRange, endRange]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
