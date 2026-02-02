import React, { useState, useEffect } from 'react';

export const UrgencyBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-3 text-center text-sm font-bold">
      <div className="flex items-center justify-center gap-2">
        <span className="material-icons-round text-lg animate-pulse">local_fire_department</span>
        <span>FREE DELIVERY ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
        <span className="material-icons-round text-lg animate-pulse">local_fire_department</span>
      </div>
    </div>
  );
};