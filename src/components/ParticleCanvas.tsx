"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    window.addEventListener("resize", resize);
    resize();

    let animationId: number;
    let time = 0;

    // Initialize particle accelerator dots
    const acceleratorParticles = Array.from({ length: 80 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02, // fast orbital speed
      orbitBase: Math.random() > 0.5 ? 200 : 350, // two main accelerator rings
      orbitVariance: (Math.random() - 0.5) * 15,
      size: Math.random() * 1.5 + 0.8,
      glow: Math.random() * 0.5 + 0.5
    }));

    function drawRipples() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      const centerX = canvas!.width / 2;
      const centerY = canvas!.height * 0.4;
      
      // 1. Draw concentric ripples (Halo effect)
      const numRings = 5;
      const maxRadius = Math.max(canvas!.width, canvas!.height) * 0.6;
      
      for (let i = 0; i < numRings; i++) {
        const baseRadius = (time * 0.5 + (i * maxRadius) / numRings) % maxRadius;
        const opacity = Math.max(0, 0.03 * (1 - baseRadius / maxRadius));
        
        ctx!.beginPath();
        ctx!.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(10, 132, 255, ${opacity})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // 2. Draw Particle Accelerator (White Crystals)
      acceleratorParticles.forEach((p) => {
        // Move particle along the orbit
        p.angle += p.speed;
        
        // Calculate position
        const radius = p.orbitBase + p.orbitVariance;
        // Add a slight elliptical tilt for 3D effect, or keep it perfect circle. Let's make it slightly elliptical (isometric)
        const x = centerX + Math.cos(p.angle) * radius;
        const y = centerY + Math.sin(p.angle) * radius * 0.6; 
        
        // Render crystal particle
        ctx!.beginPath();
        ctx!.arc(x, y, p.size, 0, Math.PI * 2);
        
        // Crystal white glow
        ctx!.fillStyle = `rgba(255, 255, 255, ${p.glow})`;
        ctx!.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx!.shadowBlur = 8;
        
        ctx!.fill();
        
        // Reset shadow for other drawings
        ctx!.shadowBlur = 0;
      });
      
      time += 1;
      animationId = requestAnimationFrame(drawRipples);
    }
    drawRipples();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" />;
}
