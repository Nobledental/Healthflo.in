"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ArrowRight, ArrowUpRight, Drop, FirstAid, Dna, Brain, Wind, DropHalfBottom } from "@phosphor-icons/react";

const ORGANS = [
  { key: 'liver', name: 'Gastroenterology', icon: FirstAid },
  { key: 'heart', name: 'Cardiology', icon: null },
  { key: 'cells', name: 'Oncology', icon: Dna },
  { key: 'brain', name: 'Neurology', icon: Brain },
  { key: 'lungs', name: 'Pulmonology', icon: Wind },
  { key: 'kidneys', name: 'Urology', icon: DropHalfBottom },
];

export default function SpecializedTreatments() {
  const [selectedOrgan, setSelectedOrgan] = useState<string>("heart");

  return (
    <section>
      <h2 className="text-[14px] font-semibold text-slate-800 mb-6 flex items-center tracking-wide mt-12">
        <span className="w-2 h-2 rounded-full bg-[#0a84ff] mr-3"></span> Specialized Treatments
      </h2>
      <div className="flex gap-6 organ-tray min-h-[100px] flex-wrap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card 1: Laser Treatment */}
          <div className="glass-card p-8 flex flex-col border-2 border-white bg-white/70">
            <h3 className="text-[24px] font-bold text-[#166534] leading-tight mb-6">Laser Treatment for Piles, Fissure &amp; Fistula</h3>
            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#166534] mr-3" /> Minimally relief from pain
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#166534] mr-3" /> Less Pain
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#166534] mr-3" /> Quick Recovery
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#166534] mr-3" /> Day Care Procedure
                </li>
              </ul>
            </div>
            <button className="w-full py-3 px-6 rounded-xl border-2 border-[#166534]/30 text-[#166534] font-bold flex items-center justify-center gap-2 hover:bg-[#166534]/5 transition-colors">
              Know More <ArrowRight weight="bold" />
            </button>
          </div>

          {/* Card 2: Laser Circumcision */}
          <div className="glass-card p-8 flex flex-col border-2 border-white bg-white/70">
            <h3 className="text-[24px] font-bold text-[#0a84ff] leading-tight mb-2">Laser Circumcision</h3>
            <p className="text-[14px] text-slate-600 mb-6">Safe, quick &amp; virtually painless procedure.</p>
            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#0a84ff] mr-3" /> Painless Procedure
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#0a84ff] mr-3" /> Minimal Bleeding
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#0a84ff] mr-3" /> Fast Recovery
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#0a84ff] mr-3" /> Day Care Surgery
                </li>
              </ul>
            </div>
            <button className="w-full py-3 px-6 rounded-xl border-2 border-[#0a84ff]/30 text-[#0a84ff] font-bold flex items-center justify-center gap-2 hover:bg-[#0a84ff]/5 transition-colors">
              Know More <ArrowRight weight="bold" />
            </button>
          </div>

          {/* Card 3: Lipoma & Cyst Removal */}
          <div className="glass-card p-8 flex flex-col border-2 border-white bg-white/70">
            <h3 className="text-[24px] font-bold text-[#7c3aed] leading-tight mb-2">Lipoma &amp; Cyst Removal</h3>
            <p className="text-[14px] text-slate-600 mb-6">Safe removal of lumps with minimal scarring.</p>
            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#7c3aed] mr-3" /> Minimally Invasive
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#7c3aed] mr-3" /> Small Incision
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#7c3aed] mr-3" /> Minimal Scarring
                </li>
                <li className="flex items-center text-[15px] text-slate-700 font-medium">
                  <Check weight="bold" className="text-[#7c3aed] mr-3" /> Quick Recovery
                </li>
              </ul>
            </div>
            <button className="w-full py-3 px-6 rounded-xl border-2 border-[#7c3aed]/30 text-[#7c3aed] font-bold flex items-center justify-center gap-2 hover:bg-[#7c3aed]/5 transition-colors">
              Know More <ArrowRight weight="bold" />
            </button>
          </div>
        </div>

        {/* Organ Tray List */}
        {ORGANS.map((organ) => {
          const isSelected = selectedOrgan === organ.key;
          
          return (
            <div 
              key={organ.key}
              onClick={() => setSelectedOrgan(organ.key)}
              className={`glass-card w-[140px] h-[160px] flex-shrink-0 flex items-center justify-center relative cursor-pointer overflow-hidden transition-all duration-300 border-2 border-white bg-white/70 ${isSelected ? 'shadow-sm bg-white/90' : 'hover:bg-white/90'}`}
            >
              {isSelected ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center p-4 pb-8">
                    <Image src="https://cacvi.org/wp-content/uploads/2020/09/doctors-for-chest-pain-city-of-industry.jpg" width={140} height={160} className="w-full h-full object-contain mix-blend-multiply opacity-90" alt={organ.name} unoptimized />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-900">{organ.name}</span>
                    <div className="w-6 h-6 rounded bg-[#0a84ff] flex items-center justify-center shadow-sm border border-transparent">
                      <ArrowUpRight weight="bold" className="text-[12px] text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#e2e8f0]/50 flex items-center justify-center mb-4 border border-gray-300">
                    {organ.icon ? <organ.icon className="text-[28px] text-slate-600" /> : <Drop className="text-[28px] text-slate-600" />}
                  </div>
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="text-[12px] font-medium text-slate-600">{organ.name}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
