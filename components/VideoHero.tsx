import React, { useRef, useState } from 'react';

export const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-72 aspect-[9/16] rotate-1 transition hover:rotate-0 duration-500">
      <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 transform -translate-x-1 -translate-y-1 bg-gradient-to-br from-primary/8 to-accent/8"></div>
      
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(255,87,34,0.4)] z-10 border-3 border-primary/50 bg-gradient-to-br from-surface/30 to-dark/30">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Every detail matters. Our grazing table setup by PartyCart is crafted to impress, indulge, and e.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50"></div>
        
        <div className="absolute top-5 right-5 flex gap-2">
          <button
            onClick={togglePlay}
            className="bg-primary/90 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-primary transition-all duration-300 shadow-2xl hover:scale-105 border border-primary/30"
          >
            <span className="material-icons-round text-base font-bold">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button
            onClick={toggleMute}
            className="bg-accent/90 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-accent transition-all duration-300 shadow-2xl hover:scale-105 border border-accent/30"
          >
            <span className="material-icons-round text-base font-bold">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
        </div>
        
        <div className="absolute inset-x-0 top-1/3 text-center px-6">
          <h2 className="text-white text-3xl font-black mb-1 drop-shadow-2xl tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>GRAZING TABLE</h2>
          <p className="text-white text-2xl font-black mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>X</p>
          <p className="text-white text-3xl font-black drop-shadow-2xl tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>PARTYCART</p>
        </div>
        
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-white text-xs font-bold text-center drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>Premium Grazing Setup</p>
        </div>
      </div>
    </div>
  );
};