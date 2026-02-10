
import React from 'react';
import { MemoryVisualizer } from '../components/MemoryVisualizer';
import { PenTool, Database, Map as MapIcon, Cpu, Code2, Coffee, Layers, Zap, Info, Box, ClipboardList, Trash2, MapPin, Compass, Ghost, Sparkles } from 'lucide-react';

export const IntroC: React.FC = () => {
  const dataTypes = [
    { type: 'char', size: '1 byte', bits: '8 bits', range: '-128 to 127' },
    { type: 'short', size: '2 bytes', bits: '16 bits', range: '-32,768 to 32,767' },
    { type: 'int', size: '4 bytes', bits: '32 bits', range: '-2.1B to 2.1B' },
    { type: 'long', size: '8 bytes', bits: '64 bits', range: '±9.2e18' },
    { type: 'float', size: '4 bytes', bits: '32 bits', range: '7 digits' },
    { type: 'double', size: '8 bytes', bits: '64 bits', range: '16 digits' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="space-y-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-[#d4c3b3]/30 text-[10px] font-black uppercase tracking-[0.3em] text-[#d97706] mb-4">
          <Coffee className="w-3 h-3" /> Class 01 & 02: C Programming
        </div>
        <h1 className="text-5xl font-extrabold text-[#43302b] tracking-tight text-balance">The Foundation: Manual Control in C.</h1>
        <p className="text-[#43302b]/60 text-xl leading-relaxed max-w-3xl mx-auto font-medium italic">
          C is the "lingua franca" of systems programming. It abstracts just enough hardware to be portable, yet leaves you with the keys to the engine.
        </p>
      </section>

      <MemoryVisualizer />

      {/* Simplified Pointer Logic: The Treasure Map */}
      <section className="boho-card p-12 rounded-[3.5rem] bg-gradient-to-br from-[#43302b] to-[#2a1d1a] text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-[0.05] -rotate-12">
            <Compass className="w-64 h-64 text-white" />
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
               <div className="p-4 bg-white/10 rounded-2xl w-fit">
                  <MapIcon className="w-8 h-8 text-[#d97706]" />
               </div>
               <h3 className="text-4xl font-bold">The Treasure Map Analogy</h3>
               <p className="text-white/60 text-lg leading-relaxed font-medium italic">
                 "A pointer is not the gold itself. It is a piece of paper telling you which room the gold is in."
               </p>
               
               <div className="space-y-6">
                  <div className="flex gap-4 items-start group">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#d97706] shrink-0 transition-transform group-hover:scale-110">1</div>
                     <div>
                        <h4 className="font-bold text-white">The Variable (The Gold)</h4>
                        <p className="text-sm text-white/40 leading-relaxed">Stored at a specific location like Room 1000. It is the actual data you care about.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start group">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#d97706] shrink-0 transition-transform group-hover:scale-110">2</div>
                     <div>
                        <h4 className="font-bold text-white">The Pointer (The Map)</h4>
                        <p className="text-sm text-white/40 leading-relaxed">Lives in Room 1008. If you look inside, you see the number "1000". It points to the gold's room.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start group">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#d97706] shrink-0 transition-transform group-hover:scale-110">3</div>
                     <div>
                        <h4 className="font-bold text-white">Dereferencing (Opening the Map)</h4>
                        <p className="text-sm text-white/40 leading-relaxed">When you use <code>*ptr</code>, you are telling the CPU: "Go to the room number written in this map."</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-inner">
               <div className="flex items-center gap-4">
                  <Code2 className="w-5 h-5 text-[#d97706]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Technical Syntax</span>
               </div>
               <div className="space-y-6 font-mono text-sm leading-relaxed">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-[#65a30d] mb-1">int x = 42;</div>
                     <div className="text-white/20 text-xs">// Create data '42' in a room.</div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-[#d97706] mb-1">int* ptr = &x;</div>
                     <div className="text-white/20 text-xs">// & means "Give me the room number".</div>
                  </div>
                  <div className="p-5 bg-[#65a30d]/10 rounded-2xl border border-[#65a30d]/20">
                     <div className="text-[#65a30d] mb-1">printf("%d", *ptr);</div>
                     <div className="text-white/40 text-xs">// * means "Go to the room in the map".</div>
                     <div className="text-[#65a30d] mt-2 font-bold animate-pulse">Output: 42</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Simplified Memory Segments: The Studio Analogy */}
      <section className="boho-card rounded-[3rem] p-12 shadow-xl relative overflow-hidden bg-gradient-to-br from-white to-[#faf7f2]">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] -rotate-12 pointer-events-none">
          <Database className="w-64 h-64 text-[#43302b]" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div>
              <h3 className="text-3xl font-bold text-[#43302b]">Where do variables live?</h3>
              <p className="text-[#43302b]/60 mt-4 text-lg font-medium leading-relaxed italic">
                Imagine your C program as a busy artist's studio. You have three main ways to store your supplies:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 group">
                <div className="p-4 bg-[#65a30d]/10 rounded-2xl h-fit transition-transform group-hover:scale-110">
                  <ClipboardList className="w-6 h-6 text-[#65a30d]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#43302b]">1. The Stack (The Workbench)</h4>
                  <p className="text-sm text-[#43302b]/60 leading-relaxed mt-1 font-medium">
                    Fast and automatic. When you start a function, it's like clearing a spot on your desk. When the function ends, the desk clears itself.
                    <span className="block mt-2 text-[11px] text-[#65a30d] font-bold uppercase tracking-widest">Small capacity • Self-cleaning • Local Variables</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="p-4 bg-[#d97706]/10 rounded-2xl h-fit transition-transform group-hover:scale-110">
                  <Box className="w-6 h-6 text-[#d97706]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#43302b]">2. The Heap (The Warehouse)</h4>
                  <p className="text-sm text-[#43302b]/60 leading-relaxed mt-1 font-medium">
                    Infinite but manual. You ask for a box (<code>malloc</code>), use it, and you MUST put it back (<code>free</code>). If you forget, your warehouse gets full (Memory Leak).
                    <span className="block mt-2 text-[11px] text-[#d97706] font-bold uppercase tracking-widest">Huge capacity • Managed by you • malloc/free</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="p-4 bg-[#43302b]/10 rounded-2xl h-fit transition-transform group-hover:scale-110">
                  <Layers className="w-6 h-6 text-[#43302b]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#43302b]">3. Static/Data (The Wall Decor)</h4>
                  <p className="text-sm text-[#43302b]/60 leading-relaxed mt-1 font-medium">
                    Permanent and fixed. These are your global variables or strings that are "nailed to the wall" before the program even starts. They stay there forever.
                    <span className="block mt-2 text-[11px] text-[#43302b]/40 font-bold uppercase tracking-widest">Fixed size • Permanent • Global Variables</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-[#fdf8f5] rounded-[2.5rem] border border-[#d4c3b3]/20 shadow-inner min-h-[500px]">
             <div className="w-full max-w-[200px] flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-center">
                <div className="p-4 bg-[#65a30d]/20 border-2 border-[#65a30d]/30 rounded-t-2xl text-[#65a30d] shadow-sm animate-pulse">Stack [High Address]</div>
                <div className="h-24 border-x-2 border-dashed border-[#d4c3b3]/30 flex items-center justify-center text-[#d4c3b3]">Free Space</div>
                <div className="p-4 bg-[#d97706]/20 border-2 border-[#d97706]/30 text-[#d97706] shadow-sm">Heap [Low Address]</div>
                <div className="p-4 bg-[#43302b]/10 border-2 border-[#43302b]/20 rounded-b-2xl text-[#43302b]/40">Data / Text</div>
                <div className="mt-4 text-[9px] text-[#d4c3b3] flex flex-col items-center">
                   <Zap className="w-4 h-4 mb-1" />
                   Memory Map
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Pointers & Indirection */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="boho-card rounded-[3rem] p-10 shadow-lg">
             <h3 className="text-3xl font-bold mb-6 text-[#43302b] flex items-center gap-3">
               <Zap className="w-7 h-7 text-[#d97706]" />
               Pointer Arithmetic
             </h3>
             <p className="text-[#43302b]/70 leading-relaxed mb-6 font-medium">
               Pointers are more than just numbers; they are <strong>typed addresses</strong>. When you add 1 to an <code>int*</code>, the hardware moves 4 bytes forward. This is how arrays work—the name of an array is actually just a pointer to its first element.
             </p>
             <div className="bg-[#faf7f2] p-6 rounded-2xl border border-[#d4c3b3]/20 font-mono text-sm space-y-3 shadow-inner">
               <div className="flex gap-4"><span className="text-[#d97706]">int* ptr = &x;</span> <span className="text-[#43302b]/40">// Holds 1000</span></div>
               <div className="flex gap-4"><span className="text-[#d97706]">ptr = ptr + 1;</span> <span className="text-[#43302b]/40">// Now holds 1004 (not 1001!)</span></div>
               <div className="pt-2 border-t border-[#d4c3b3]/20 text-[#65a30d]">Indirection (*) grabs the value at the address.</div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-[#d4c3b3]/20 shadow-sm relative overflow-hidden">
                <Layers className="absolute -right-4 -bottom-4 w-24 h-24 text-[#faf7f2]" />
                <h4 className="text-lg font-bold text-[#43302b] mb-4">Memory Alignment</h4>
                <p className="text-sm text-[#43302b]/60 leading-relaxed">
                  CPUs prefer to read data at specific intervals (e.g., 4 or 8 bytes). This is called "Alignment." C will often add invisible <strong>padding</strong> to structs to ensure fields align with the word size of the CPU.
                </p>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 border border-[#d4c3b3]/20 shadow-sm relative overflow-hidden">
                <Trash2 className="absolute -right-4 -bottom-4 w-24 h-24 text-[#faf7f2]" />
                <h4 className="text-lg font-bold text-[#43302b] mb-4">Manual Lifetimes</h4>
                <p className="text-sm text-[#43302b]/60 leading-relaxed">
                  Unlike Java or Python, C has no Garbage Collector. If you <code>malloc()</code> memory, it exists until YOU call <code>free()</code>. Losing the pointer before freeing is a <strong>Memory Leak</strong>.
                </p>
              </div>
           </div>
        </div>

        <div className="boho-card rounded-[3rem] p-10 shadow-lg h-fit">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#43302b]">
            <Database className="w-7 h-7 text-[#d97706]" />
            Data Vitals
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-semibold text-left">
              <thead>
                <tr className="text-[#43302b]/30 border-b border-[#d4c3b3]/20 uppercase tracking-[0.2em] text-[10px]">
                  <th className="py-4">Type</th>
                  <th className="py-4">Size</th>
                  <th className="py-4">Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4c3b3]/10">
                {dataTypes.map(dt => (
                  <tr key={dt.type} className="hover:bg-[#faf7f2] transition-colors group">
                    <td className="py-5 text-xl font-serif text-[#43302b]">{dt.type}</td>
                    <td className="py-5 text-[#43302b]/50">{dt.size}</td>
                    <td className="py-5 text-[#d97706]/70 text-xs font-bold font-mono">{dt.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-4 bg-[#d97706]/5 rounded-2xl border border-[#d97706]/10 flex gap-3">
            <Info className="w-4 h-4 text-[#d97706] shrink-0" />
            <p className="text-[10px] text-[#d97706] font-bold uppercase leading-relaxed tracking-wider">Sizes can vary by architecture (e.g., 32-bit vs 64-bit Systems).</p>
          </div>
        </div>
      </section>

      <div className="bg-white border border-[#d4c3b3]/20 rounded-[3.5rem] p-12 overflow-hidden relative shadow-xl">
         <div className="absolute -bottom-10 -right-10 opacity-5">
            <PenTool className="w-80 h-80 text-[#d97706]" />
         </div>
         <div className="flex items-center gap-4 mb-10">
           <div className="h-1 w-16 bg-[#d97706]/20 rounded-full" />
           <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-[#43302b]">The Art of the Struct</h3>
         </div>
         <pre className="font-mono text-[#d97706] bg-[#faf7f2] p-10 rounded-[2rem] border border-[#d4c3b3]/20 text-lg leading-relaxed overflow-x-auto shadow-inner">
{`// Bundling data into a cohesive textile
typedef struct {
    int id;
    char name[64];
    float velocity;
} Creature;

int main() {
    // Allocation on the stack
    Creature mon; 
    mon.id = 1;
    
    // Pointer to the struct
    Creature* ptr = &mon;
    ptr->velocity = 9.8f; // Arrow syntax for dereference
    
    return 0;
}`}
         </pre>
      </div>
    </div>
  );
};
