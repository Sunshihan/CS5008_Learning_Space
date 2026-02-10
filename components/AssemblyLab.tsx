
import React, { useState, useEffect } from 'react';
// Added Sparkles to the imported icons from lucide-react
import { Play, RotateCcw, ArrowRight, Binary, ScrollText, Hash, Sparkles } from 'lucide-react';

export const AssemblyLab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [rax, setRax] = useState(0);
  const [rcx, setRcx] = useState(0);
  const [iteration, setIteration] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const code = [
    { asm: "mov rcx, 0", desc: "Initialize Sum (RCX) to 0" },
    { asm: "mov rax, 5", desc: "Initialize Counter (RAX) to 5" },
    { asm: ".loop:", desc: "Label: Start of loop" },
    { asm: "add rcx, rax", desc: "Add Counter to Sum" },
    { asm: "sub rax, 1", desc: "Decrement Counter" },
    { asm: "cmp rax, 0", desc: "Check if Counter is 0" },
    { asm: "jne .loop", desc: "If not zero, jump to .loop" },
    { asm: "ret", desc: "Done! Result is in RCX" },
  ];

  const reset = () => {
    setStep(0);
    setRax(0);
    setRcx(0);
    setIteration(1);
    setIsFinished(false);
  };

  const executeNext = () => {
    if (isFinished) {
      reset();
      return;
    }

    const currentAsm = code[step].asm;

    if (currentAsm.startsWith("mov rcx")) {
      setRcx(0);
      setStep(step + 1);
    } else if (currentAsm.startsWith("mov rax")) {
      setRax(5);
      setStep(step + 1);
    } else if (currentAsm === ".loop:") {
      setStep(step + 1);
    } else if (currentAsm.startsWith("add rcx")) {
      setRcx(prev => prev + rax);
      setStep(step + 1);
    } else if (currentAsm.startsWith("sub rax")) {
      setRax(prev => prev - 1);
      setStep(step + 1);
    } else if (currentAsm.startsWith("cmp rax")) {
      setStep(step + 1);
    } else if (currentAsm.startsWith("jne")) {
      if (rax > 0) {
        setStep(2); // Jump back to .loop:
        setIteration(prev => prev + 1);
      } else {
        setStep(step + 1);
      }
    } else if (currentAsm === "ret") {
      setIsFinished(true);
    }
  };

  return (
    <div className="boho-card rounded-[3rem] p-10 shadow-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#43302b]/5 rounded-2xl">
            <ScrollText className="w-6 h-6 text-[#43302b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h3 className="text-2xl font-bold text-[#43302b]">Control Flow Lab</h3>
               {iteration > 1 && !isFinished && (
                 <span className="px-2 py-0.5 bg-[#d97706]/10 text-[#d97706] text-[9px] font-black uppercase rounded-md flex items-center gap-1 border border-[#d97706]/20">
                   <Hash className="w-2 h-2" /> Iteration {iteration}
                 </span>
               )}
            </div>
            <p className="text-sm text-[#43302b]/50 italic">Step through the code to witness the Sum of 1 to 5.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={reset}
            className="p-3 hover:bg-[#faf7f2] rounded-full transition-all border border-[#d4c3b3]/20"
            title="Reset Simulation"
           >
             <RotateCcw className="w-5 h-5 text-[#43302b]/40" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-2">
          {code.map((line, i) => (
            <div 
              key={i} 
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-default ${
                step === i 
                  ? 'bg-[#d97706] text-white shadow-lg border-[#d97706] scale-[1.02] z-10' 
                  : 'bg-[#faf7f2] border-transparent text-[#43302b]/40'
              }`}
            >
              <div className="w-6 font-mono text-[10px] opacity-40">{i+1}</div>
              <div className={`flex-1 font-mono font-bold ${line.asm.startsWith('.') ? 'ml-4' : ''}`}>{line.asm}</div>
              {step === i && <ArrowRight className="w-4 h-4 animate-bounce-horizontal" />}
              <div className={`text-[10px] font-bold uppercase tracking-widest ${step === i ? 'text-white/70' : 'opacity-0'}`}>
                {line.desc}
              </div>
            </div>
          ))}
          <button 
            onClick={executeNext}
            className={`w-full mt-6 py-5 rounded-[1.5rem] font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${
              isFinished ? 'bg-[#65a30d] text-white' : 'bg-[#43302b] text-white'
            }`}
          >
            {isFinished ? (
              <><RotateCcw className="w-4 h-4" /> Start Over</>
            ) : (
              <><Play className="w-4 h-4 fill-current" /> Execute Next Instruction</>
            )}
          </button>
        </div>

        <div className="space-y-8">
           <div className="bg-[#faf7f2] rounded-[2.5rem] p-8 border border-[#d4c3b3]/20 shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4c3b3]">Hardware Registers</h4>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d]/40" />
                </div>
              </div>
              <div className="space-y-4">
                 <div className="bg-white p-6 rounded-2xl border border-[#d4c3b3]/20 flex justify-between items-center group shadow-sm">
                    <div className="flex flex-col">
                      <span className="font-mono font-black text-[#d97706] text-xs">RAX</span>
                      <span className="text-[9px] text-[#43302b]/30 uppercase font-bold tracking-tighter">Counter</span>
                    </div>
                    <span className="font-mono text-3xl font-bold text-[#43302b] transition-all">{rax}</span>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-[#d4c3b3]/20 flex justify-between items-center group shadow-sm">
                    <div className="flex flex-col">
                      <span className="font-mono font-black text-[#65a30d] text-xs">RCX</span>
                      <span className="text-[9px] text-[#43302b]/30 uppercase font-bold tracking-tighter">Accumulator</span>
                    </div>
                    <span className="font-mono text-3xl font-bold text-[#43302b] transition-all">{rcx}</span>
                 </div>
              </div>
           </div>

           <div className={`p-8 border rounded-[2.5rem] relative overflow-hidden transition-all duration-500 ${
             isFinished ? 'bg-[#65a30d]/10 border-[#65a30d]/20' : 'bg-[#faf7f2] border-[#d4c3b3]/20'
           }`}>
              <div className="absolute top-0 right-0 p-8 opacity-[0.05]"><Binary className="w-24 h-24" /></div>
              <h4 className="font-bold text-[#43302b] mb-3 flex items-center gap-2">
                Lumi's Insight
                {isFinished && <Sparkles className="w-4 h-4 text-[#d97706]" />}
              </h4>
              <p className="text-sm text-[#43302b]/60 leading-relaxed italic">
                {isFinished 
                  ? `Execution complete! The registers have settled. We summed 5+4+3+2+1 to get ${rcx} inside RCX. The loop was built using the CMP and JNE instructions.`
                  : "Watch the RAX and RCX registers. In a real CPU, these changes happen billions of times per second. Here, we can observe the discrete 'heartbeat' of each instruction."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
