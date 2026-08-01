import React, { useState, useEffect, useRef } from "react";
import { motion, MotionValue } from "framer-motion";
import AiOrb from "./AiOrb";
import { WarningCircle, FirstAid, PhoneCall, MagnifyingGlass } from "@phosphor-icons/react";
import { useBattery } from "../hooks/useBattery";

interface InteractiveOrbProps {
  opacity?: MotionValue<number> | number;
  scale?: MotionValue<number> | number;
  showSpeechBubble?: boolean;
  alwaysOpen?: boolean;
  hideDots?: boolean;
  blinkOnMount?: boolean;
  expandOnView?: boolean;
}

export default function InteractiveOrb({ 
  opacity = 1, 
  scale = 1, 
  showSpeechBubble = false,
  alwaysOpen = false,
  hideDots = false,
  blinkOnMount = false,
  expandOnView = false
}: InteractiveOrbProps) {
  const battery = useBattery();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the container is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Power saving triggers if battery < 20% and not charging
  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  const powerSavingMode = isLowPower;

  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Active if hovered, forced open, or expanded on view
  const isActive = alwaysOpen || isHovered || (expandOnView && isInView);

  useEffect(() => {
    if (blinkOnMount) {
      setIsBlinking(true);
      const timer = setTimeout(() => setIsBlinking(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [blinkOnMount]);

  const aiPreset = "Ice";

  const normalNodes = [
    { label: "Right atrium", angle: 0, radius: 210, speed: "40s", boxLeft: "20px", boxTop: "-20px" },
    { label: "Aortic valve stenosis", angle: 120, radius: 180, speed: "30s", boxLeft: "20px", boxTop: "10px" },
    { label: "Hypertrophy", angle: 240, radius: 140, speed: "25s", boxLeft: "-120px", boxTop: "10px" },
  ];

  const emergencyNodes = [
    { label: "CALL AMBULANCE", angle: 45, radius: 210, speed: "40s", boxLeft: "20px", boxTop: "-30px", icon: <WarningCircle weight="fill" className="text-red-500 mr-1.5" /> },
    { label: "FIND NEAREST HOSPITAL", angle: 135, radius: 180, speed: "30s", boxLeft: "-190px", boxTop: "-15px", icon: <FirstAid weight="fill" className="text-orange-500 mr-1.5" /> },
    { label: "CALL DOCTORS", angle: 225, radius: 210, speed: "40s", boxLeft: "-130px", boxTop: "-30px", icon: <PhoneCall weight="fill" className="text-blue-500 mr-1.5" /> },
    { label: "EXPLORE SERVICES", angle: 315, radius: 140, speed: "25s", boxLeft: "20px", boxTop: "10px", icon: <MagnifyingGlass weight="bold" className="text-emerald-500 mr-1.5" /> },
  ];

  const nodesToRender = powerSavingMode ? emergencyNodes : normalNodes;

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale }}
      className={`relative w-full h-full flex items-center justify-center group cursor-pointer transition-transform duration-300 ${isBlinking ? 'scale-110' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <AiOrb preset={aiPreset} className="w-full h-full" isPaused={powerSavingMode} />

      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div className={`absolute top-[-65px] left-1/2 -translate-x-1/2 w-[240px] bg-white/90 backdrop-blur-md border border-white/50 text-slate-800 text-[12px] leading-snug font-semibold px-4 py-3 rounded-2xl shadow-xl z-50 text-center origin-bottom transition-all duration-300 ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 animate-fade-in-up'}`}>
          I'm your AI assistant, ping me if you need any assistance!
          <div className="w-3 h-3 rotate-45 bg-white/90 border-b border-r border-white/50 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
        </div>
      )}

      {/* Hands / Radial Rings Container */}
      {/* We use fixed pixel size here so the rings don't stretch based on parent size, then scale it down based on screen/container */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out z-40 ${isActive ? 'opacity-100 scale-[0.6] md:scale-[0.8] lg:scale-100' : 'opacity-0 scale-[0.2]'}`}
      >
        <div className="absolute w-[400px] h-[400px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="rings"></div>
          <div className="radial-wave"></div>
          
          {nodesToRender.map((node, idx) => (
            <div 
              key={idx} 
              className="orbit-node transition-all duration-700 ease-out pointer-events-auto" 
              style={{ 
                '--start-angle': `${node.angle}deg`, 
                '--radius': `${node.radius}px`,
                '--speed': node.speed 
              } as React.CSSProperties}
            >
              <div className="orbit-node-inner">
                {/* Conditionally hide the blinking dot */}
                {!hideDots && (
                  <div className={`node-dot ${powerSavingMode ? 'bg-red-500 border-red-200 shadow-[0_0_10px_2px_rgba(248,113,113,0.5)]' : ''}`}></div>
                )}
                
                {/* Text Box */}
                <div 
                  className={`absolute whitespace-nowrap backdrop-blur-md text-sm font-bold px-4 py-3 shadow-lg rounded-xl border flex items-center cursor-pointer transition-all hover:scale-105 ${
                    powerSavingMode 
                      ? 'bg-white text-red-600 border-red-200 hover:bg-red-50' 
                      : 'bg-white/90 text-slate-800 border-white/40'
                  }`}
                  style={{ left: node.boxLeft, top: node.boxTop }}
                >
                  {node.icon}
                  {node.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
