"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Patients Treated", prefix: "" },
  { value: 100, suffix: "%", label: "Care Support", prefix: "", decimal: false },
  { value: 8, suffix: "", label: "Cities Served", prefix: "" },
  { value: 24, suffix: " hr", label: "Insurance Support", prefix: "" },
  { value: 30, suffix: "+", label: "Insurance Partners", prefix: "" },
  { value: 4.9, suffix: "★", label: "Patient Rating", prefix: "", decimal: true },
];

function useCountUp(target: number, duration = 1800, decimal = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<boolean>(false);

  const start = () => {
    if (ref.current) return;
    ref.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = decimal
        ? parseFloat((eased * target).toFixed(1))
        : Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return { count, start };
}

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const { count, start } = useCountUp(stat.value, 1800, stat.decimal);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-blue-200 text-[13px] font-medium">{stat.label}</div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#0a2540] via-[#0038ff] to-[#0a2540] rounded-[1.5rem] py-10 px-6 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
