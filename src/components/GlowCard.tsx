"use client";

import React, { useRef, useState } from "react";
import { haptic } from "@/utils/haptics";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  glowColor?: string;
  borderGlow?: boolean;
  hapticMode?: "light" | "medium" | "success" | "none";
}

export default function GlowCard({
  children,
  className = "",
  onClick,
  href,
  glowColor = "rgba(0, 102, 255, 0.22)",
  borderGlow = true,
  hapticMode = "light",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    setMousePosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const handleInteraction = () => {
    if (hapticMode === "light") haptic.light();
    else if (hapticMode === "medium") haptic.medium();
    else if (hapticMode === "success") haptic.success();
    if (onClick) onClick();
  };

  const Container = href ? "a" : "div";

  return (
    <Container
      href={href}
      onClick={handleInteraction}
      ref={cardRef as any}
      onMouseMove={handleMouseMove as any}
      onTouchMove={handleMouseMove as any}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => {
        setIsHovered(true);
        handleMouseMove(e as any);
      }}
      onTouchEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden group transition-all duration-300 ${className}`}
    >
      {/* 1. CURSOR-TRACKING BACKGROUND PLASMA SPOTLIGHT */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ease-out rounded-inherit"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 55%)`,
        }}
      />

      {/* 2. CURSOR-TRACKING GLOWING BOTTLE-GLASS BORDER HIGHLIGHT */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] -z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            padding: "2px",
            background: `radial-gradient(260px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 136, 255, 0.95), transparent 70%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* 3. CARD CONTENT */}
      {children}
    </Container>
  );
}
