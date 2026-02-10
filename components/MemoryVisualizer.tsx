
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Code2, HelpCircle, Map as MapIcon, Link as LinkIcon } from 'lucide-react';

interface MemSlot {
  addr: number;
  val: string;
  label?: string;
  isPointer?: boolean;
  explanation: string;
}

export const MemoryVisualizer: React.FC = () => {
  const [slots, setSlots] = useState<MemSlot[]>([
    { addr: 1000, val: '42', label: 'x', explanation: 'Room 1000: Variable "x" initialized with 42.' },
    { addr: 1004, val: '7', label: 'y', explanation: 'Room 1004: Variable "y" stores 7.' },
    { addr: 1008, val: '1000', label: 'ptr', isPointer: true, explanation: 'Room 1008: "ptr" stores the address (1000) of variable x.' },
    { addr: 1012, val: '?', label: 'junk', explanation: 'Room 1012: Uninitialized "junk". Contains random leftover bits.' },
  ]);

  const updateVal = (index: number, newVal: string) => {
    const next = [...slots];
    next[index].val = newVal;
    setSlots(next);
  };

  const isPointingToX = slots[2].val === '1000';
  const isPointingToY = slots[2].val === '1004';

  return (
    <div className="boho-card p-10 rounded-[3.5rem] shadow-xl border-none">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold flex items-center gap-3 text-[#43302b]">
            <Sparkles className="w-7 h-7 text-[#d97706]" />
            Memory Garden
          </h3>
          <p className="text-[#43302b]/60 mt-1 text-sm font-medium italic">
            An interactive workbench tracing code to hardware.
          </p>
        </div>
        <div className="hidden lg:flex gap-2">
           <div className="px-3 py-1 bg-[#d97706]/5 rounded-full border border-[#d97706]/10 text-[9px] font-black uppercase tracking-widest text-[#d97706]">Studio Workbench</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Column 1: C Source (3/12) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex items-center gap-2 mb-3 px-2">
            <Code2 className="w-3.5 h-3.5 text-[#d97706]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43302b]/40">C Source</span>
          </div>
          <div className="bg-[#43302b] p-6 rounded-[2rem] shadow-lg border border-white/5 flex-1">
            <div className="font-mono text-[12px] text-white/90 leading-relaxed space-y-2">
              <p><span className="text-[#65a30d]">int</span> x = {slots[0].val};</p>
              <p><span className="text-[#65a30d]">int</span> y = {slots[1].val};</p>
              <p><span className="text-[#65a30d]">int*</span> ptr = &x;</p>
              <p><span className="text-[#65a30d]">int</span> junk; <span className="text-white/20 ml-1 italic font-hand">// uninitialized</span></p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] text-white/30 leading-relaxed italic font-medium">
                Pointers are variables that store memory addresses.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: RAM Segments (4/12) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3 px-2">
            <MapIcon className="w-3.5 h-3.5 text-[#d97706]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43302b]/40">RAM Segments</span>
          </div>
          
          <div className="space-y-3 bg-[#faf7f2]/50 p-4 rounded-[2.5rem] border border-[#d4c3b3]/10 flex-1 shadow-inner">
            <div className="flex text-[9px] font-black uppercase tracking-tighter text-[#43302b]/30 px-3 mb-1">
              <div className="w-10">Addr</div>
              <div className="flex-1 ml-4 text-center">Variable & Value</div>
            </div>

            {slots.map((slot, i) => (
              <div key={slot.addr} className="flex items-center gap-2 group relative">
                <span className={`font-mono font-bold text-[10px] w-10 text-right transition-all duration-300 ${
                  (isPointingToX && slot.addr === 1000) || (isPointingToY && slot.addr === 1004) 
                  ? 'text-[#65a30d] scale-110' 
                  : 'text-[#d97706] opacity-40'
                }`}>{slot.addr}</span>
                
                <div className={`flex-1 flex bg-white border-2 rounded-[1.2rem] overflow-hidden transition-all shadow-sm ${
                  slot.label === 'junk' ? 'border-dashed border-[#d4c3b3]' : 'border-[#d4c3b3]/5'
                } ${slot.isPointer ? 'border-[#d97706]/40 ring-2 ring-[#d97706]/5' : ''} group-hover:border-[#d97706]/30`}>
                  <div className={`px-2 py-1 text-[9px] font-black flex items-center border-r border-[#d4c3b3]/10 uppercase tracking-tighter min-w-[45px] justify-center ${
                    slot.isPointer ? 'bg-[#d97706]/10 text-[#d97706]' : slot.label === 'junk' ? 'bg-[#faf7f2] text-[#43302b]/30' : 'bg-[#faf7f2] text-[#43302b]/60'
                  }`}>
                    {slot.label}
                  </div>
                  <input 
                    type="text"
                    value={slot.val}
                    onChange={(e) => updateVal(i, e.target.value)}
                    className={`bg-transparent px-3 py-2.5 w-full font-mono text-sm font-bold focus:outline-none ${
                      slot.label === 'junk' ? 'text-[#43302b]/20 italic' : slot.isPointer ? 'text-[#d97706]' : 'text-[#43302b]'
                    }`}
                  />
                </div>

                <div className="relative group/tooltip">
                  <div className="p-1 cursor-help text-[#d4c3b3] hover:text-[#d97706] transition-colors rounded-full hover:bg-white shadow-sm">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-44 p-4 bg-[#43302b] text-white text-[10px] rounded-[1.2rem] shadow-2xl opacity-0 scale-95 pointer-events-none transition-all group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 z-50 leading-relaxed border border-white/10">
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#43302b] rotate-45" />
                    {slot.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Logical Flow (5/12) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3 px-2">
            <LinkIcon className="w-3.5 h-3.5 text-[#d97706]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43302b]/40">Logical Flow</span>
          </div>

          <div className="relative h-full min-h-[350px] bg-white rounded-[2.5rem] p-8 border-2 border-[#d4c3b3]/10 flex flex-col justify-center items-center shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d97706]/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-6 relative z-10 w-full">
              {/* Pointer */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#d97706]/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <div className="relative p-4 bg-white border-2 border-[#d97706] rounded-[1.5rem] shadow-xl text-center min-w-[140px]">
                  <div className="text-[8px] font-black uppercase text-[#d97706]/40 mb-1">Pointer Variable</div>
                  <div className="text-xl font-bold text-[#d97706]">{slots[2].val}</div>
                  <div className="text-[8px] font-bold text-[#43302b]/30 mt-1">Stored @1008</div>
                </div>
              </div>

              <div className="h-8 w-0.5 bg-gradient-to-b from-[#d97706] to-[#65a30d] relative">
                <ArrowRight className="w-5 h-5 text-[#65a30d] rotate-90 absolute -bottom-2.5 -left-[9px]" />
              </div>

              {/* Target */}
              <div className={`p-5 border-2 transition-all duration-700 rounded-[2.5rem] shadow-lg text-center w-full max-w-[240px] relative ${
                slots[2].val === '1012' ? 'border-dashed border-[#43302b]/20 bg-white/50' : (isPointingToX || isPointingToY) ? 'border-[#65a30d] bg-white scale-105 shadow-md' : 'border-[#d4c3b3]/20 bg-[#faf7f2]/50 grayscale opacity-30'
              }`}>
                <div className={`font-black uppercase text-[8px] mb-2 tracking-widest ${isPointingToX || isPointingToY ? 'text-[#65a30d]' : 'text-[#43302b]/20'}`}>
                  Target Address {slots[2].val}
                </div>
                <div className="space-y-0.5">
                  <span className={`block font-bold text-lg ${slots[2].val === '1012' ? 'text-[#43302b]/40 italic' : (isPointingToX || isPointingToY) ? 'text-[#43302b]' : 'text-[#43302b]/20'}`}>
                    {slots[2].val === '1012' ? '"junk"' : isPointingToX ? 'Variable "x"' : isPointingToY ? 'Variable "y"' : '??'}
                  </span>
                  <span className={`block text-sm font-mono ${slots[2].val === '1012' ? 'text-[#d97706]/40' : (isPointingToX || isPointingToY) ? 'text-[#65a30d]' : 'text-[#43302b]/10'}`}>
                    {slots[2].val === '1012' ? '???' : isPointingToX ? slots[0].val : isPointingToY ? slots[1].val : '0x0'}
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 bg-[#faf7f2] rounded-full border border-[#d4c3b3]/20 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${slots[2].val === '1012' ? 'bg-amber-400 animate-pulse' : 'bg-[#65a30d]'}`} />
                <span className="text-[7px] font-black text-[#43302b]/40 uppercase tracking-widest">{slots[2].val === '1012' ? 'Warning: Junk Memory' : 'Status: Valid Data'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
