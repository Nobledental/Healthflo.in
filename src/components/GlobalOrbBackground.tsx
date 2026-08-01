"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AiOrb from "./AiOrb";
import { WarningCircle, FirstAid, PhoneCall, MagnifyingGlass } from "@phosphor-icons/react";
import { useBattery } from "../hooks/useBattery";

export default function GlobalOrbBackground() {
  const { scrollY } = useScroll();
  const battery = useBattery();
  
  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  const [manualPowerSave] = useState(false);
  const powerSavingMode = isLowPower || manualPowerSave;

  // Transform scroll position into various animation states
  // Assuming 0 is top of page (Hero), 400-600 is next section (ActionGrid)
  
  // 1. Orb Y position: Starts high (behind text), moves down as you scroll
  // We use standard pixels or viewport units. 
  // Let's use pixels: starts at -150px, moves to 0px (center of viewport)
  const orbY = useTransform(scrollY, [0, 500], [-250, 0]);
  
  // 2. Orb Morph: 0 (sphere) -> 1 (water drop) -> 0 (sphere)
  // It morphs into a drop while "flowing" between sections
  const orbMorph = useTransform(scrollY, [0, 250, 500], [0, 1, 0]);
  
  // 3. Rings / Hands Opacity: Hidden at top, reveals when arriving at next section
  const ringsOpacity = useTransform(scrollY, [200, 500], [0, 1]);
  const ringsScale = useTransform(scrollY, [200, 500], [0.5, 1]);

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
  
  const aiMessage = powerSavingMode
    ? "POWER OUTAGE IN DEVICE DETECTED .... SWITCHING TO POWER SAVING MODE"
    : "Welcome to HealthFlo. How can I assist you today?";

  // We need state to read the motion value since AiOrb is not a motion component
  const [morph, setMorph] = useState(0);
  useEffect(() => {
    return orbMorph.on("change", (v) => setMorph(v));
  }, [orbMorph]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      
      {/* The Orb Container moves up/down */}
      <motion.div 
        style={{ y: orbY }}
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
      >
        {/* The AiOrb canvas */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
             <AiOrb preset={aiPreset} className="w-full h-full" isPaused={powerSavingMode} morphProgress={morph} />
          </div>
        </div>

        {/* The Radial Rings (Hands) appear on scroll */}
        <motion.div 
          style={{ opacity: ringsOpacity, scale: ringsScale }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          {/* Dialog Bubble when rings are open */}
          <div className="absolute top-[0px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center animate-fade-in-up">
            <div className={`backdrop-blur-xl border px-6 py-3 rounded-2xl shadow-xl max-w-md text-center ${powerSavingMode ? 'bg-red-500/90 border-red-500 text-white' : 'bg-white/60 border-white/80 text-slate-800'}`}>
              <p className="text-sm md:text-base font-semibold tracking-wide flex items-center justify-center gap-2">
                {powerSavingMode && <WarningCircle weight="bold" className="text-white text-xl animate-pulse" />}
                {aiMessage}
              </p>
            </div>
            <div className={`w-4 h-4 rotate-45 -mt-2 border-r border-b ${powerSavingMode ? 'bg-red-500 border-red-500' : 'bg-white/60 border-white/80'}`}></div>
          </div>

          <div className="heart-stage w-full h-full relative flex items-center justify-center">
            <div className="rings"></div>
            <div className="radial-wave"></div>
            <div className="halo-glow"></div>
            
            {/* Orbiting Dynamic Nodes */}
            {nodesToRender.map((node, idx) => (
              <div 
                key={idx} 
                className="orbit-node" 
                style={{ 
                  '--start-angle': `${node.angle}deg`, 
                  '--radius': `${node.radius}px`,
                  '--speed': node.speed 
                } as React.CSSProperties}
              >
                <div className="orbit-node-inner">
                  <div className={`node-dot ${powerSavingMode ? 'bg-red-500 border-red-200 shadow-[0_0_10px_2px_rgba(248,113,113,0.5)]' : ''}`}></div>
                  
                  {/* Text Box */}
                  <div 
                    className={`absolute whitespace-nowrap backdrop-blur-md text-xs font-bold px-3 py-2 shadow-lg rounded-md border flex items-center transition-all ${
                      powerSavingMode 
                        ? 'bg-white text-red-600 border-red-200' 
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
        </motion.div>

      </motion.div>
    </div>
  );
}
