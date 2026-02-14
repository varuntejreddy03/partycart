import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded state if src changes
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-white/5 flex items-center justify-center">
          <span className="material-icons-round text-white/10 text-2xl">image</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 will-change-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none"></div>
    </div>
  );
};
