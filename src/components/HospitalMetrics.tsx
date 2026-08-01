"use client";

import { useEffect, useState, useRef } from "react";
import { Crosshair, Cpu, IdentificationBadge, Timer, Heart } from "@phosphor-icons/react";

export default function HospitalMetrics() {
  const [satisfaction, setSatisfaction] = useState(99.8);
  const ecgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSatisfaction(+(99.5 + Math.random() * 0.4).toFixed(1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let offset = 0;
    let animationId: number;
    const path = ecgPathRef.current;
    
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const updateECG = () => {
        offset -= 1.5;
        path.style.strokeDashoffset = `${offset}`;
        animationId = requestAnimationFrame(updateECG);
      };
      updateECG();
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <section className="w-full py-8">
        <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-white bg-white/70 backdrop-blur-xl">
          <div className="flex flex-col">
            <h2 className="text-[14px] font-semibold text-slate-800 mb-2 flex items-center tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] mr-3"></span> 
              Experience Metrics
            </h2>
            <p className="text-slate-600 text-sm">Real-time patient feedback and clinical excellence tracking.</p>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-[14px] text-slate-700 mb-1 font-semibold tracking-wide">
                <Heart weight="fill" className="text-[var(--color-accent-blue)] mr-2 text-lg" /> Patient Satisfaction
              </div>
              <div className="text-[42px] font-bold text-slate-900 leading-none flex items-baseline tracking-tight">
                {satisfaction} <span className="text-[14px] font-medium text-slate-600 ml-1 tracking-normal">%</span>
              </div>
            </div>
            <div className="w-48 h-12">
              <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 30">
                <path ref={ecgPathRef} d="M0,15 L10,15 L15,5 L20,25 L25,10 L30,20 L40,15 L50,15 L55,5 L60,25 L65,10 L70,20 L80,15 L100,15" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Telemetry Section */}
      <section>
        <h2 className="text-[14px] font-semibold text-slate-800 mb-6 flex items-center tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] mr-3"></span> Hospital Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Surgical Precision */}
          <div className="data-card glass-card p-6 flex flex-col justify-between hover:bg-white/90 transition-colors h-[220px] border-2 border-white bg-white/70">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center border border-gray-300">
                <Crosshair className="text-xl text-slate-600" />
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-slate-700">Surgical Precision</div>
                <div className="text-[16px] font-bold text-slate-900 leading-tight">99.8<span className="text-[12px] text-slate-600 font-medium">%</span></div>
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div className="bar-chart w-24">
                <div className="bar" style={{height: '30%'}}></div>
                <div className="bar" style={{height: '50%'}}></div>
                <div className="bar act" style={{height: '80%'}}></div>
                <div className="bar act" style={{height: '90%'}}></div>
                <div className="bar act" style={{height: '95%'}}></div>
              </div>
              <div className="flex items-baseline">
                <span className="text-slate-900 font-bold text-[18px]">99.8</span>
                <span className="text-[12px] ml-0.5 text-slate-600">%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Robotic Suites */}
          <div className="data-card glass-card active-blue p-6 flex flex-col justify-between relative overflow-hidden h-[220px] border-2 border-white bg-white/70">
            <div className="flex items-center space-x-3 mb-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#0a84ff] flex items-center justify-center shadow-sm border">
                <Cpu className="text-xl text-white" />
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-slate-700">Robotic Suites</div>
                <div className="text-[16px] font-bold text-slate-900 leading-tight">12 <span className="text-[12px] text-slate-600 font-medium">Active</span></div>
              </div>
            </div>
            <div className="flex-1 flex items-center mb-2">
              <svg className="w-full h-16 overflow-visible" fill="none" viewBox="0 0 100 40">
                <path d="M0,20 L10,20 L15,5 L20,35 L25,15 L30,25 L40,20 L50,20 L55,5 L60,35 L65,15 L70,25 L80,20 L100,20" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </div>
            <div className="blue-square-val shadow-md border border-transparent">
              <span className="font-bold text-[20px] leading-none tracking-tight">12</span>
              <span className="text-[11px] text-white/90 mt-1 font-medium">Suites</span>
            </div>
          </div>

          {/* Card 3: Board-Certified */}
          <div className="data-card glass-card p-6 flex flex-col justify-between hover:bg-white/90 transition-colors h-[220px] border-2 border-white bg-white/70">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center border border-gray-300">
                <IdentificationBadge className="text-xl text-slate-600" />
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-slate-700">Board-Certified</div>
                <div className="text-[16px] font-bold text-slate-900 leading-tight">150+</div>
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto relative h-16">
              <svg className="absolute bottom-4 left-0 w-full h-12 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 30">
                <path className="stroke-[#94a3b8]" d="M0,20 Q25,30 50,20 T100,20" strokeLinecap="round" strokeWidth="2.5"></path>
              </svg>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] border-2 border-white"></div>
              </div>
              <div className="absolute right-0 bottom-0 flex items-baseline">
                <span className="text-slate-900 font-bold text-[18px]">150</span>
                <span className="text-[12px] ml-0.5 text-slate-600">+</span>
              </div>
            </div>
          </div>

          {/* Card 4: Recovery Time */}
          <div className="data-card glass-card p-6 flex flex-col justify-between hover:bg-white/90 transition-colors h-[220px] border-2 border-white bg-white/70">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center border border-gray-300">
                <Timer className="text-xl text-slate-600" />
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-slate-700">Recovery Time</div>
                <div className="text-[16px] font-bold text-slate-900 leading-tight">-40<span className="text-[12px] text-slate-600 font-medium ml-0.5">% Avg</span></div>
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto relative h-16">
              <svg className="absolute bottom-4 left-0 w-full h-12 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 30">
                <path className="stroke-[#94a3b8]" d="M0,15 L10,22 L20,8 L30,22 L40,8 L50,22 L60,8 L80,15 L100,15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
              <div className="absolute bottom-4 right-8 -translate-x-1/2 -translate-y-1/2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] border-2 border-white"></div>
              </div>
              <div className="absolute right-0 bottom-0 flex items-baseline">
                <span className="text-slate-900 font-bold text-[18px]">-40</span>
                <span className="text-[12px] ml-0.5 text-slate-600">%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
