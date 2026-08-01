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

    function drawRipples() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      const centerX = canvas!.width / 2;
      const centerY = canvas!.height * 0.4;
      
      // Draw concentric rings
      const numRings = 5;
      const maxRadius = Math.max(canvas!.width, canvas!.height) * 0.6;
      
      for (let i = 0; i < numRings; i++) {
        // Calculate dynamic radius based on time for a slow, infinite outward pulse
        const baseRadius = (time * 0.5 + (i * maxRadius) / numRings) % maxRadius;
        
        // Opacity fades out as it gets larger
        const opacity = Math.max(0, 0.03 * (1 - baseRadius / maxRadius));
        
        ctx!.beginPath();
        ctx!.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(10, 132, 255, ${opacity})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
      
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
