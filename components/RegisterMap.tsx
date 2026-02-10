
import React, { useState } from 'react';
import { Layers, Zap } from 'lucide-react';

export const RegisterMap: React.FC = () => {
  const [val, setVal] = useState('0x12345678DEADBEEF');

  return (
    <div className="boho-card p-10 rounded-[3rem] shadow-xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#d97706]/10 rounded-2xl">
           <Layers className="w-7 h-7 text-[#d97706]" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#43302b]">The rax Vessel</h3>
          <p className="text-[#43302b]/50 font-medium">Visualizing the layers of a 64-bit register.</p>
        </div>
      </div>
      
      <div className="mb-12 group">
        <label className="text-[10px] text-[#43302b]/40 font-black block mb-4 uppercase tracking-[0.4em] group-hover:text-[#d97706] transition-colors">64-bit Core Value</label>
        <div className="relative">
          <input 
            type="text" 
            value={val} 
            onChange={(e) => setVal(e.target.value)}
            className="w-full bg-white border-2 border-[#d4c3b3]/10 rounded-[2rem] p-6 font-mono text-[#43302b] text-2xl font-bold focus:outline-none focus:border-[#d97706]/50 shadow-sm transition-all"
          />
          <Zap className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d97706]/30" />
        </div>
      </div>

      <div className="space-y-8">
        {/* rax */}
        <div className="relative h-20 bg-white rounded-[2rem] overflow-hidden flex border border-[#d4c3b3]/20 shadow-sm">
          <div className="w-1/2 bg-[#faf7f2] border-r border-[#d4c3b3]/20 flex items-center justify-center font-mono text-xs text-[#43302b]/30 font-bold uppercase tracking-widest">Upper 32</div>
          <div className="w-1/2 bg-[#d97706]/5 flex items-center justify-center font-mono text-[#d97706] font-bold text-2xl">eax</div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <span className="text-[9px] font-bold text-[#43302b]/30 px-4 py-1.5 bg-white/80 rounded-full border border-[#d4c3b3]/20 uppercase tracking-[0.4em]">rax vessel</span>
          </div>
        </div>

        {/* eax detail */}
        <div className="flex gap-10 items-start">
          <div className="w-1/2 flex items-center justify-end pr-6">
             <div className="h-0.5 w-16 bg-[#d4c3b3]/20 rounded-full" />
          </div>
          <div className="w-1/2 space-y-8">
             <div className="relative h-16 bg-white border-2 border-[#d4c3b3]/10 rounded-[1.5rem] flex overflow-hidden shadow-sm">
                <div className="w-1/2 border-r border-[#d4c3b3]/10 flex items-center justify-center text-[9px] text-[#43302b]/30 font-bold uppercase tracking-widest">Upper 16</div>
                <div className="w-1/2 bg-[#65a30d]/5 flex items-center justify-center font-mono font-bold text-[#65a30d] text-xl">ax</div>
             </div>

             <div className="flex gap-6">
                <div className="flex-1"></div>
                <div className="flex-1 flex gap-6">
                   <div className="flex-1 h-16 bg-[#d97706]/5 border-2 border-[#d97706]/10 rounded-[1.5rem] flex items-center justify-center font-mono font-bold text-[#d97706] text-lg hover:bg-[#d97706]/10 transition-all cursor-default shadow-sm">ah</div>
                   <div className="flex-1 h-16 bg-[#65a30d]/5 border-2 border-[#65a30d]/10 rounded-[1.5rem] flex items-center justify-center font-mono font-bold text-[#65a30d] text-lg hover:bg-[#65a30d]/10 transition-all cursor-default shadow-sm">al</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-[13px] font-medium leading-relaxed">
        <div className="p-8 bg-white rounded-[2rem] border border-[#d4c3b3]/20 shadow-sm">
          <span className="text-[#d97706] font-black block mb-3 uppercase tracking-widest">MOV RAX, 5</span>
          <p className="text-[#43302b]/60">This operation fills the entire 64-bit vessel with value 5, clearing everything that was previously inside.</p>
        </div>
        <div className="p-8 bg-white rounded-[2rem] border border-[#d4c3b3]/20 shadow-sm">
          <span className="text-[#65a30d] font-black block mb-3 uppercase tracking-widest">MOV EAX, 5</span>
          <p className="text-[#43302b]/60">This fills the lower 32-bit chamber. Interestingly, the upper chamber is automatically emptied (zero-extended).</p>
        </div>
      </div>
    </div>
  );
};
