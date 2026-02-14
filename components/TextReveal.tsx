
import React from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.05
}) => {
  return (
    <span className={`inline-block whitespace-pre ${className}`} aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          aria-hidden="true"
          style={{
            opacity: 0,
            animation: `revealChar 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards`,
            animationDelay: `${delay + index * stagger}s`,
            willChange: 'transform, opacity',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
