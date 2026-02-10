
import React, { useState } from 'react';
import { Zap, Activity, Info, RefreshCw } from 'lucide-react';

export const MiniALU: React.FC = () => {
  const [valA, setValA] = useState(10);
  const [valB, setValB] = useState(5);
  const [op, setOp] = useState<'ADD' | 'SUB'>('ADD');

  const result = op === 'ADD' ? valA + valB : valA - valB;
  const flags = {
    ZF: result === 0,
    SF: result < 0,
    OF: result > 127 || result < -128, // Simulating 8-bit signed overflow
  };

  return (
    <div className="boho-card p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#d97706]/10 rounded-2xl">
          <Zap className="w-6 h-6 text-[#d97706]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#43302b]">The Logic Lab (ALU)</h3>
          <p className="text-sm text-[#43302b]/50">Perform raw math and observe the machine flags.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#43302b]/40 tracking-widest">Operand A</label>
              <input 
                type="number" 
                value={valA} 
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-full bg-white border border-[#d4c3b3]/30 rounded-2xl p-4 font-mono font-bold text-xl text-[#43302b] focus:outline-none focus:border-[#d97706]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#43302b]/40 tracking-widest">Operand B</label>
              <input 
                type="number" 
                value={valB} 
                onChange={(e) => setValB(Number(e.target.value))}
                className="w-full bg-white border border-[#d4c3b3]/30 rounded-2xl p-4 font-mono font-bold text-xl text-[#43302b] focus:outline-none focus:border-[#d97706]"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setOp('ADD')}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all ${op === 'ADD' ? 'bg-[#d97706] text-white' : 'bg-white border border-[#d4c3b3]/30 text-[#43302b]/60'}`}
            >
              ADD
            </button>
            <button 
              onClick={() => setOp('SUB')}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all ${op === 'SUB' ? 'bg-[#d97706] text-white' : 'bg-white border border-[#d4c3b3]/30 text-[#43302b]/60'}`}
            >
              SUB
            </button>
          </div>

          <div className="bg-[#43302b] rounded-3xl p-8 text-center text-white relative shadow-lg">
             <div className="text-[10px] uppercase font-black tracking-[0.3em] opacity-40 mb-2">Internal Result</div>
             <div className="text-5xl font-mono font-bold">{result}</div>
             <div className="absolute top-4 right-6 opacity-20"><Activity className="w-8 h-8" /></div>
          </div>
        </div>

        <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#d4c3b3]/20 space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#43302b]/40 mb-2 flex items-center gap-2">
            Status Flags <Info className="w-3 h-3" />
          </h4>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${flags.ZF ? 'bg-[#65a30d]/10 border-[#65a30d]/30 text-[#65a30d]' : 'bg-white border-[#d4c3b3]/20 text-[#43302b]/30'}`}>
              <div className="flex flex-col">
                <span className="font-bold">ZF (Zero Flag)</span>
                <span className="text-[9px] uppercase tracking-wider">Set if result is 0</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${flags.ZF ? 'bg-[#65a30d] animate-pulse shadow-[0_0_10px_#65a30d]' : 'bg-[#d4c3b3]/20'}`} />
            </div>

            <div className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${flags.SF ? 'bg-[#d97706]/10 border-[#d97706]/30 text-[#d97706]' : 'bg-white border-[#d4c3b3]/20 text-[#43302b]/30'}`}>
              <div className="flex flex-col">
                <span className="font-bold">SF (Sign Flag)</span>
                <span className="text-[9px] uppercase tracking-wider">Set if result is negative</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${flags.SF ? 'bg-[#d97706] animate-pulse shadow-[0_0_10px_#d97706]' : 'bg-[#d4c3b3]/20'}`} />
            </div>

            <div className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${flags.OF ? 'bg-red-100 border-red-300 text-red-600' : 'bg-white border-[#d4c3b3]/20 text-[#43302b]/30'}`}>
              <div className="flex flex-col">
                <span className="font-bold">OF (Overflow)</span>
                <span className="text-[9px] uppercase tracking-wider">Simulated 8-bit wrap</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${flags.OF ? 'bg-red-500 animate-bounce' : 'bg-[#d4c3b3]/20'}`} />
            </div>
          </div>

          <p className="text-[11px] text-[#43302b]/50 leading-relaxed italic">
            "These flags are the only reason the CPU can 'decide' things. If ZF is set, a 'Jump If Equal' instruction will trigger!"
          </p>
        </div>
      </div>
    </div>
  );
};
