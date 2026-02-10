
import React from 'react';
import { AssemblyLab } from '../components/AssemblyLab';
import { Binary, Scroll, FileCode, Terminal, ChevronRight, Scale, Info, Layers, HandMetal } from 'lucide-react';

export const Assembly: React.FC = () => {
  const instructions = [
    { name: 'mov dest, src', desc: 'Copies value from src into dest. "mov rax, 5" sets rax to 5.' },
    { name: 'add dest, src', desc: 'Adds src to dest (dest += src). Affects flags.' },
    { name: 'cmp a, b', desc: 'Subtracts b from a internally to set flags (for jumps).' },
    { name: 'jne label', desc: 'Jump if Not Equal (Zero Flag is 0).' },
    { name: 'push src', desc: 'Subtracts 8 from RSP and writes src to memory.' },
    { name: 'pop dest', desc: 'Reads from RSP and adds 8 to RSP.' },
    { name: 'call label', desc: 'Pushes RIP and jumps to the function address.' },
    { name: 'ret', desc: 'Pops return address into RIP and resumes.' },
  ];

  const registers = [
    { name: 'RAX', role: 'Return value & Accumulator' },
    { name: 'RDI', role: '1st Argument' },
    { name: 'RSI', role: '2nd Argument' },
    { name: 'RDX', role: '3rd Argument' },
    { name: 'RCX', role: '4th Argument' },
    { name: 'R8, R9', role: '5th, 6th Arguments' },
    { name: 'RSP', role: 'Stack Pointer (Current Top)' },
    { name: 'RBP', role: 'Base Pointer (Start of Frame)' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="space-y-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-[#d4c3b3]/30 text-[10px] font-black uppercase tracking-[0.3em] text-[#d97706] mb-4">
          <Binary className="w-3 h-3" /> Class 04: x86-64 Assembly
        </div>
        <h1 className="text-5xl font-extrabold text-[#43302b] tracking-tight">The Assembly Loom.</h1>
        <p className="text-[#43302b]/60 text-xl leading-relaxed max-w-3xl mx-auto font-medium italic">
          If C is a blueprint, Assembly is the hands-on bricklaying. There are no "if" statements here—only comparisons and jumps.
        </p>
      </section>

      <AssemblyLab />

      {/* Register Roles & Calling Convention */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 boho-card rounded-[2.5rem] p-10 shadow-lg h-fit bg-[#faf7f2]/50 border-none">
          <h3 className="text-2xl font-bold mb-8 text-[#43302b] flex items-center gap-3">
             <HandMetal className="w-6 h-6 text-[#d97706]" />
             The AMD64 ABI
          </h3>
          <p className="text-sm text-[#43302b]/60 leading-relaxed mb-8">
            How do functions "talk" to each other? They use the <strong>System V ABI</strong> rules. Think of these registers as specific boxes where you must put your data before calling someone.
          </p>
          <div className="space-y-3 font-mono text-[11px]">
            {registers.map(reg => (
              <div key={reg.name} className="flex justify-between items-center p-3 bg-white rounded-xl border border-[#d4c3b3]/20 shadow-sm group hover:border-[#d97706]/40 transition-all">
                <span className="font-black text-[#d97706]">{reg.name}</span>
                <span className="text-[#43302b]/40 italic group-hover:text-[#43302b] transition-colors">{reg.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
           <div className="boho-card rounded-[2.5rem] p-10 shadow-lg">
             <h3 className="text-2xl font-bold mb-8 text-[#43302b] flex items-center gap-3">
               <Scroll className="w-6 h-6 text-[#d97706]" />
               The Instruction Manual
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
               {instructions.map(ins => (
                 <div key={ins.name} className="group p-4 hover:bg-[#faf7f2] rounded-2xl transition-all border border-transparent hover:border-[#d4c3b3]/20">
                    <div className="font-mono text-[#d97706] font-bold mb-1">{ins.name}</div>
                    <div className="text-xs text-[#43302b]/50 leading-relaxed">{ins.desc}</div>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-[#43302b] rounded-[2.5rem] p-10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-[0.05]"><Layers className="w-48 h-48 text-white" /></div>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="space-y-4 max-w-sm relative z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      The Stack Frame
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Every function call creates a "Frame" in memory. When you `push` something, you are putting it on a stack of plates. <strong>RSP</strong> points to the top plate.
                    </p>
                 </div>
                 <div className="flex-1 w-full bg-white/5 rounded-2xl p-6 border border-white/10 space-y-2">
                    <div className="h-8 bg-white/5 border border-white/5 rounded flex items-center justify-center text-[10px] font-mono text-white/20">Previous Frame</div>
                    <div className="h-8 bg-[#d97706]/20 border border-[#d97706]/40 rounded flex items-center justify-center text-[10px] font-mono font-bold text-[#d97706]">Return Address</div>
                    <div className="h-12 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[10px] font-mono text-white/60 uppercase tracking-widest">Local Vars</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Syscalls */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="boho-card rounded-[2.5rem] p-12 shadow-lg">
           <div className="flex items-center gap-4 mb-8">
              <Terminal className="w-8 h-8 text-[#d97706]" />
              <h3 className="text-3xl font-bold text-[#43302b]">System Calls</h3>
           </div>
           <p className="text-[#43302b]/60 leading-relaxed mb-10 font-medium">
             How does assembly actually "do" things like printing? It can't! It has to ask the Kernel (Operating System) for permission. This hand-off is called a <strong>Syscall</strong>.
           </p>
           <div className="space-y-4">
              <div className="flex justify-between p-4 bg-white border border-[#d4c3b3]/20 rounded-2xl">
                 <div className="font-mono text-sm text-[#43302b]"><span className="text-[#d97706] font-bold">RAX: 1</span></div>
                 <div className="text-[10px] font-black uppercase text-[#43302b]/30 tracking-widest">write()</div>
              </div>
              <div className="flex justify-between p-4 bg-white border border-[#d4c3b3]/20 rounded-2xl">
                 <div className="font-mono text-sm text-[#43302b]"><span className="text-[#d97706] font-bold">RAX: 60</span></div>
                 <div className="text-[10px] font-black uppercase text-[#43302b]/30 tracking-widest">exit()</div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 overflow-hidden border border-[#d4c3b3]/30 relative shadow-inner">
           <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
              <FileCode className="w-80 h-80 text-[#d97706]" />
           </div>
           <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-[#43302b] mb-10">Assembler vs Linker</h3>
           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-[#d97706]/10 text-[#d97706] flex items-center justify-center rounded-lg font-bold">1</div>
                 <div>
                    <h4 className="font-bold text-[#43302b]">NASM (Assembler)</h4>
                    <p className="text-xs text-[#43302b]/50 italic">Translates .asm text into an .o (object) file of machine code.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center rounded-lg font-bold">2</div>
                 <div>
                    <h4 className="font-bold text-[#43302b]">LD (Linker)</h4>
                    <p className="text-xs text-[#43302b]/50 italic">Takes one or more .o files and links them into a final executable file (ELF).</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
