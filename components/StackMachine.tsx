
import React, { useState } from 'react';
import { Database, Play, RotateCcw } from 'lucide-react';

export const StackMachine: React.FC = () => {
  const [step, setStep] = useState(0);
  
  const program = [
    { op: "PUSH 2", val: 2, action: "push" },
    { op: "PUSH 3", val: 3, action: "push" },
    { op: "PUSH 4", val: 4, action: "push" },
    { op: "MUL", val: null, action: "mul" }, // 3 * 4 = 12
    { op: "ADD", val: null, action: "add" }, // 2 + 12 = 14
    { op: "PUSH 5", val: 5, action: "push" },
    { op: "SUB", val: null, action: "sub" }, // 14 - 5 = 9
  ];

  const getStackAtStep = (s: number) => {
    let stack: number[] = [];
    for (let i = 0; i <= s; i++) {
      const p = program[i];
      if (p.action === "push") stack.push(p.val!);
      else if (p.action === "mul") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a * b);
      } else if (p.action === "add") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a + b);
      } else if (p.action === "sub") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a - b);
      }
    }
    return stack;
  };

  const currentStack = getStackAtStep(step);

  return (
    <div className="boho-card p-10 rounded-[3rem] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3 text-[#43302b]">
          <Database className="w-6 h-6 text-[#d97706]" />
          Stack Machine Evaluation
        </h3>
        <div className="space-y-2">
          {program.map((p, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-2xl font-mono text-sm flex justify-between items-center transition-all ${
                i === step ? 'bg-[#d97706] text-white shadow-lg scale-105 z-10' : i < step ? 'bg-[#faf7f2] text-[#43302b]/40 border border-[#d4c3b3]/10' : 'bg-white border border-[#d4c3b3]/20 text-[#43302b]'
              }`}
            >
              <span>{p.op}</span>
              {i === step && <Play className="w-4 h-4 animate-pulse" />}
            </div>
          ))}
        </div>
        <button 
          onClick={() => setStep(step === program.length - 1 ? 0 : step + 1)}
          className="w-full py-4 bg-[#43302b] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95"
        >
          {step === program.length - 1 ? <><RotateCcw className="w-4 h-4" /> Restart</> : "Execute Next Op"}
        </button>
      </div>

      <div className="flex flex-col items-center justify-end bg-[#fdfaf6] rounded-[2.5rem] border border-[#d4c3b3]/20 p-8 shadow-inner min-h-[400px]">
        <div className="w-32 h-full border-x-4 border-b-4 border-[#d4c3b3]/20 rounded-b-3xl flex flex-col-reverse p-4 gap-3">
          {currentStack.map((val, i) => (
            <div 
              key={i} 
              className="w-full h-16 rounded-[1.2rem] bg-white border-2 border-[#d4c3b3]/10 flex flex-col items-center justify-center shadow-sm animate-in slide-in-from-top-4 duration-300"
            >
              <span className="text-[10px] font-black uppercase text-[#d97706]/40">Value</span>
              <span className="text-2xl font-serif font-bold text-[#43302b]">{val}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#d4c3b3]">Evaluation Stack</p>
      </div>
    </div>
  );
};
