import { useEffect, useState } from "react";

const NeuroSightTitle = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Main Title */}
        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-transparent bg-gradient-cyber bg-clip-text transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            textShadow: '0 0 30px hsl(var(--primary) / 0.8)',
            filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.6))',
          }}
        >
          NEURO SIGHT
        </h1>
        
        {/* Glowing underline */}
        <div 
          className={`absolute -bottom-2 left-1/2 h-1 bg-gradient-primary transition-all duration-1000 ${
            isVisible ? 'w-full opacity-100 -translate-x-1/2' : 'w-0 opacity-0'
          }`}
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.8)',
          }}
        />
      </div>
      
      {/* Subtitle */}
      <p 
        className={`mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-3xl transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        AI/ML-powered video analysis and threat detection platform engineered
        <br />
        for forensic analysis and intelligent surveillance monitoring.
      </p>
      
      {/* System status badge */}
      <div 
        className={`mt-4 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-sm text-primary font-mono">
          National Security Guard Platform
        </span>
      </div>
    </div>
  );
};

export default NeuroSightTitle;