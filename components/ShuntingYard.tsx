
import React, { useState, useEffect } from 'react';
import { TrainTrack, ArrowRight, ArrowDown, Calculator } from 'lucide-react';

export const ShuntingYard: React.FC = () => {
  const [step, setStep] = useState(0);
  const expression = ["2", "+", "3", "*", "4", "-", "5"];
  
  const steps = [
    { input: ["2", "+", "3", "*", "4", "-", "5"], stack: [], output: [] },
    { input: ["+", "3", "*", "4", "-", "5"], stack: [], output: ["2"] },
    { input: ["3", "*", "4", "-", "5"], stack: ["+"], output: ["2"] },
    { input: ["*", "4", "-", "5"], stack: ["+"], output: ["2", "3"] },
    { input: ["4", "-", "5"], stack: ["*", "+"], output: ["2", "3"] },
    { input: ["-", "5"], stack: ["*", "+"], output: ["2", "3", "4"] },
    { input: ["-", "5"], stack: ["+"], output: ["2", "3", "4", "*"] }, // * popped because - has lower/equal precedence
    { input: ["-", "5"], stack: [], output: ["2", "3", "4", "*", "+"] }, // + popped
    { input: ["5"], stack: ["-"], output: ["2", "3", "4", "*", "+"] },
    { input: [], stack: ["-"], output: ["2", "3", "4", "*", "+", "5"] },
    { input: [], stack: [], output: ["2", "3", "4", "*", "+", "5", "-"] },
  ];

  const current = steps[step];

  return (
    <div className="boho-card p-8 rounded-[2.5rem] shadow-xl space-y-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-3 text-[#43302b]">
          <TrainTrack className="w-6 h-6 text-[#d97706]" />
          Shunting Yard Simulation
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-4 py-2 bg-white border border-[#d4c3b3] rounded-full text-xs font-bold uppercase hover:bg-[#faf7f2] transition-colors"
          >
            Prev
          </button>
          <button 
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            className="px-4 py-2 bg-[#d97706] text-white rounded-full text-xs font-bold uppercase hover:opacity-90 transition-all shadow-md"
          >
            Next Step
          </button>
        </div>
      </div>

      <p className="text-sm text-[#43302b]/60 italic font-medium">
        "Like trains on tracks, we route numbers to the output and operators to a temporary siding (the stack)."
      </p>

      <div className="relative h-64 bg-[#fdfaf6] rounded-[2rem] border border-[#d4c3b3]/20 p-6 flex flex-col justify-between">
        {/* Input Track */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-[#d97706]/40 tracking-widest w-12">Input</span>
          <div className="flex gap-2">
            {current.input.map((val, i) => (
              <div key={i} className="w-10 h-10 rounded-xl bg-white border border-[#d4c3b3] flex items-center justify-center font-mono font-bold text-[#43302b] shadow-sm animate-in fade-in slide-in-from-left-2">
                {val}
              </div>
            ))}
            {current.input.length === 0 && <span className="text-xs text-[#d4c3b3] italic">Empty</span>}
          </div>
        </div>

        {/* The Stack (The Siding) */}
        <div className="absolute left-1/2 bottom-12 -translate-x-1/2 flex flex-col-reverse items-center gap-2">
          <span className="text-[10px] font-black uppercase text-[#d97706]/40 tracking-widest mb-1">Op Stack</span>
          <div className="w-16 h-24 border-x-2 border-b-2 border-[#d4c3b3]/30 rounded-b-xl flex flex-col-reverse p-2 gap-2 bg-[#faf7f2]/50">
            {current.stack.map((val, i) => (
              <div key={i} className="w-full h-8 rounded-lg bg-[#d97706] text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm animate-in zoom-in-95">
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Output Track */}
        <div className="flex items-center gap-3 self-end">
          <div className="flex gap-2">
            {current.output.map((val, i) => (
              <div key={i} className="w-10 h-10 rounded-xl bg-[#65a30d]/10 border border-[#65a30d]/20 flex items-center justify-center font-mono font-bold text-[#65a30d] shadow-sm animate-in fade-in slide-in-from-right-2">
                {val}
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black uppercase text-[#65a30d]/40 tracking-widest w-12 text-right">Output</span>
        </div>
      </div>

      <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#d4c3b3]/30 text-xs font-medium text-[#43302b]/70 flex items-start gap-3 italic leading-relaxed">
        <ArrowRight className="w-4 h-4 text-[#d97706] shrink-0" />
        {step === 0 && "Ready to parse: 2 + 3 * 4 - 5"}
        {step > 0 && step < 6 && `Taking '${steps[step-1].input[0]}' and routing it based on its type.`}
        {step === 6 && "Multiplication (*) has higher precedence than subtraction (-), so it pops first."}
        {step >= 10 && "The yard is clear. The expression is now in Postfix (Reverse Polish Notation)."}
      </div>
    </div>
  );
};
