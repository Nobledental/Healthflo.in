"use client";

import { useEffect, useRef, useState } from "react";
import { useBattery } from "../hooks/useBattery";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const battery = useBattery();
  
  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;

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

    const particles = Array.from({ length: 200 }).map(() => {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 0.5,
        glow: Math.random() * 0.6 + 0.4,
      };
    });

    let time = 0;

    function drawParticles() {
      if (isLowPower) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        return;
      }

      const width = canvas!.width;
      const height = canvas!.height;

      ctx!.clearRect(0, 0, width, height);
      
      const centerX = width * 0.6;
      const centerY = height * 0.5;
      
      const numRings = 4;
      const maxRadius = Math.max(width, height) * 0.5;
      for (let i = 0; i < numRings; i++) {
        const baseRadius = (time * 0.3 + (i * maxRadius) / numRings) % maxRadius;
        const opacity = Math.max(0, 0.04 * (1 - baseRadius / maxRadius));
        ctx!.beginPath();
        ctx!.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(10, 132, 255, ${opacity})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        ctx!.fillStyle = `rgba(135, 206, 250, ${p.glow})`;
        
        ctx!.shadowColor = "rgba(255, 255, 255, 1)";
        ctx!.shadowBlur = 8;
        
        ctx!.fill();
        
        ctx!.shadowBlur = 0;
      });
      
      time += 1;
      animationId = requestAnimationFrame(drawParticles);
    }
    
    if (!isLowPower) {
      drawParticles();
    } else {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isLowPower]);

  return (
    <canvas 
      ref={canvasRef} 
      id="bg-canvas" 
      className={`fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none transition-opacity duration-1000 ${isLowPower ? 'opacity-0' : 'opacity-100'}`} 
    />
  );
}
