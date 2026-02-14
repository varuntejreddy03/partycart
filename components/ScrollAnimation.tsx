import React, { useEffect, useRef, useState } from 'react';

// A lighter-weight version for high-performance lists
export const ViewportObserver: React.FC<{
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}> = ({ children, className = '', rootMargin = '200px', threshold = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        contentVisibility: isVisible ? 'visible' : 'auto',
        containIntrinsicSize: '1px 300px', // approximate height of a card
      }}
    >
      {isVisible ? children : null}
    </div>
  );
};

// Original hook - kept for backward compatibility if needed elsewhere
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

interface ScrollAnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimatedDiv: React.FC<ScrollAnimatedDivProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-12 scale-95 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};