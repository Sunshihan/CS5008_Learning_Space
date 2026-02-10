
import React, { useState, useEffect } from 'react';
import { RegisterMap } from '../components/RegisterMap';
import { MiniALU } from '../components/MiniALU';
import { Cpu, RefreshCw, Layers, Zap, Microchip, Activity, Clock, Box, Database, ArrowUp } from 'lucide-react';

export const CPUArch: React.FC = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const cycleData = [
    { label: 'FETCH', desc: 'Grab instruction from RAM into the instruction register.', icon: RefreshCw },
    { label: 'DECODE', desc: 'Identify what the bits mean (ADD? SUB? MOV?).', icon: Layers },
    { label: 'EXECUTE', desc: 'Fire the circuits in the ALU to get the result.', icon: Zap },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="space-y-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-[#d4c3b3]/30 text-[10px] font-black uppercase tracking-[0.3em] text-[#65a30d] mb-4">
          <Activity className="w-3 h-3" /> Class 03: CPU Architecture
        </div>
        <h1 className="text-5xl font-extrabold text-[#43302b] tracking-tight">The Beating Heart: CPU.</h1>
        <p className="text-[#43302b]/60 text-xl leading-relaxed max-w-3xl mx-auto font-medium italic">
          Imagine a chef in a kitchen. The registers are his workspace (tiny but instant), the cache is his nearby fridge, and RAM is the grocery store down the street.
        </p>
      </section>

      {/* The Speed Pyramid */}
      <section className="boho-card rounded-[3rem] p-12 shadow-xl border-none overflow-hidden relative">
         <div className="absolute top-0 right-0 p-12 opacity-[0.02] -rotate-12"><Database className="w-64 h-64" /></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
               <h3 className="text-3xl font-bold text-[#43302b]">The Memory Pyramid</h3>
               <p className="text-[#43302b]/60 font-medium leading-relaxed">
                 Why don't we just use RAM for everything? <strong>Physics.</strong> Electricity takes time to travel. To go fast, we need data to live inside the CPU.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold transition-transform group-hover:scale-110">1</div>
                     <div>
                        <span className="font-bold text-[#43302b] block">Registers (~0.5ns)</span>
                        <span className="text-xs text-[#43302b]/50 italic">The chef's hands. Speed is everything.</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 rounded-full bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center font-bold transition-transform group-hover:scale-110">2</div>
                     <div>
                        <span className="font-bold text-[#43302b] block">Cache (L1/L2/L3) (~1-10ns)</span>
                        <span className="text-xs text-[#43302b]/50 italic">The nearby fridge. A bit bigger, a bit slower.</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 rounded-full bg-[#43302b]/10 text-[#43302b] flex items-center justify-center font-bold transition-transform group-hover:scale-110">3</div>
                     <div>
                        <span className="font-bold text-[#43302b] block">RAM (~100ns)</span>
                        <span className="text-xs text-[#43302b]/50 italic">The grocery store. Huge but "miles" away.</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col items-center">
               <div className="w-full max-w-xs space-y-1">
                  <div className="h-10 w-1/4 mx-auto bg-[#d97706] rounded-t-lg shadow-sm border border-white/20 flex items-center justify-center text-[10px] text-white font-black">REG</div>
                  <div className="h-14 w-2/4 mx-auto bg-[#65a30d] shadow-sm border border-white/20 flex items-center justify-center text-[10px] text-white font-black">CACHE</div>
                  <div className="h-20 w-3/4 mx-auto bg-[#43302b] rounded-b-lg shadow-sm border border-white/20 flex items-center justify-center text-[10px] text-white/50 font-black">RAM (MAIN MEMORY)</div>
               </div>
               <div className="mt-6 flex flex-col items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-[#d97706] animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4c3b3]">Higher Speed • Lower Capacity</span>
               </div>
            </div>
         </div>
      </section>

      {/* The Fetch-Decode-Execute Visualizer */}
      <section className="boho-card rounded-[3rem] p-12 shadow-xl bg-gradient-to-br from-white to-[#fdfaf6]">
        <h3 className="text-xl font-black mb-12 text-center uppercase tracking-[0.4em] text-[#d4c3b3]">The Cycle of Logic</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
           <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-[#d4c3b3]/30 z-0" />
           
           {cycleData.map((step, i) => (
             <div key={step.label} className={`relative z-10 flex flex-col items-center text-center space-y-6 transition-all duration-700 ${
               cycle === i ? 'scale-110 opacity-100' : 'opacity-30 scale-95'
             }`}>
                <div className={`p-8 rounded-full bg-white border-4 shadow-sm transition-all ${
                  cycle === i ? 'border-[#d97706] shadow-lg scale-110' : 'border-transparent'
                }`}>
                  <step.icon className={`w-10 h-10 ${cycle === i ? 'text-[#d97706] animate-pulse' : 'text-[#43302b]/30'}`} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#43302b] tracking-widest">{step.label}</h4>
                  <p className="mt-4 text-sm text-[#43302b]/50 leading-relaxed font-medium max-w-[220px]">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <MiniALU />
      
      <RegisterMap />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="boho-card rounded-[2.5rem] p-10 space-y-6">
          <div className="p-4 bg-[#65a30d]/10 rounded-2xl w-fit">
            <Microchip className="w-8 h-8 text-[#65a30d]" />
          </div>
          <h3 className="text-2xl font-bold text-[#43302b]">The Control Unit</h3>
          <p className="text-[#43302b]/60 leading-relaxed font-medium">
            Think of the Control Unit as the "Brain's Brain." It's a traffic cop that opens and closes specific electronic gates so that data flows exactly where it needs to go for a given instruction.
          </p>
          <div className="bg-[#faf7f2] p-6 rounded-2xl border border-[#d4c3b3]/20 font-mono text-xs text-[#43302b]/70 space-y-3">
             <div className="flex justify-between"><span>RIP: Instruction Pointer</span> <span className="text-[#d97706]/60">Where am I?</span></div>
             <div className="flex justify-between"><span>Instruction Register</span> <span className="text-[#65a30d]/60">What am I doing?</span></div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-[#d4c3b3]/20 shadow-sm flex items-start gap-6">
            <Clock className="w-12 h-12 text-[#d97706]/30 shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-[#43302b] mb-2">The Clock Signal</h4>
              <p className="text-sm text-[#43302b]/60 leading-relaxed">
                The CPU doesn't run continuously; it pulses. Each "Tick" (Gigahertz) is a heartbeat that moves an instruction one step further down the pipeline.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-[#d4c3b3]/20 shadow-sm flex items-start gap-6">
            <Box className="w-12 h-12 text-[#65a30d]/30 shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-[#43302b] mb-2">Pipelining</h4>
              <p className="text-sm text-[#43302b]/60 leading-relaxed">
                While one instruction is being Executed, the next is being Decoded, and the one after that is being Fetched. It's like an assembly line for math!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
