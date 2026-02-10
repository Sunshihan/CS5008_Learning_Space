
import React from 'react';
import { Sparkles, FileCode, Workflow, ChevronRight, Binary, List, Boxes, PenTool, Braces, Wand2, Calculator, Info, Search, ShieldCheck, Cpu } from 'lucide-react';
import { ShuntingYard } from '../components/ShuntingYard';
import { StackMachine } from '../components/StackMachine';

export const Compiler: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <section className="space-y-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-[#d4c3b3]/30 text-[10px] font-black uppercase tracking-[0.3em] text-[#d97706] mb-4">
          <Sparkles className="w-3 h-3" /> Classes 05 & 06: Compiler Workshop
        </div>
        <h1 className="text-5xl font-extrabold text-[#43302b] tracking-tight">The Jive Compiler Workshop.</h1>
        <p className="text-[#43302b]/60 text-xl leading-relaxed max-w-3xl mx-auto font-medium italic">
          "A compiler is not just a tool; it is a bridge between human creativity and mechanical execution."
        </p>
      </section>

      {/* Compiler Cheat Sheet - Exam Prep */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Lexing', desc: 'Text → Tokens' },
          { label: 'Parsing', desc: 'Tokens → AST' },
          { label: 'Semantics', desc: 'Type Checking' },
          { label: 'IR Gen', desc: 'AST → Bytecode' },
          { label: 'CodeGen', desc: 'Bytecode → x86' },
        ].map((phase, i) => (
          <div key={i} className="bg-white border border-[#d4c3b3]/20 p-4 rounded-2xl text-center shadow-sm">
            <div className="text-[10px] font-black text-[#d97706] uppercase tracking-widest mb-1">Phase 0{i+1}</div>
            <div className="font-bold text-[#43302b] text-sm">{phase.label}</div>
            <div className="text-[10px] text-[#43302b]/40 italic">{phase.desc}</div>
          </div>
        ))}
      </section>

      {/* 1. Lexical Analysis & Grammar */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#fdf8f5] p-4 rounded-3xl border border-[#d4c3b3]/20 shadow-sm">
              <Search className="w-8 h-8 text-[#d97706]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#43302b]">Lexical Analysis</h2>
              <p className="text-[#43302b]/60 font-medium italic">Turning a stream of characters into a stream of meaning.</p>
            </div>
          </div>
          
          <div className="boho-card rounded-[2.5rem] p-10 space-y-6">
            <p className="text-[#43302b]/70 leading-relaxed font-medium">
              The <strong>Scanner (Lexer)</strong> uses Regular Expressions to group characters into <strong>Tokens</strong>. For the exam, remember that white space is usually ignored, and comments are stripped here.
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-white rounded-xl border border-[#d4c3b3]/10">
                <div className="text-[#d97706] font-bold mb-1">Input Text</div>
                <div className="text-[#43302b]/40">"let x = 42;"</div>
              </div>
              <div className="p-4 bg-[#65a30d]/5 rounded-xl border border-[#65a30d]/10">
                <div className="text-[#65a30d] font-bold mb-1">Tokens</div>
                <div className="text-[#43302b]/60 uppercase tracking-tighter">[LET, ID(x), EQUAL, INT(42), SEMI]</div>
              </div>
            </div>
            <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#d4c3b3]/20 text-[11px] text-[#43302b]/60 italic">
              Research Note: Jive uses a <strong>Finite Automaton (DFA)</strong> internally to recognize these patterns efficiently.
            </div>
          </div>
        </div>

        <div className="boho-card rounded-[2.5rem] p-10 shadow-lg border-none bg-[#43302b] text-white/90">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <Braces className="w-6 h-6 text-[#d97706]" />
            EBNF Grammar Rules
          </h3>
          <div className="space-y-4 font-mono text-xs opacity-80">
             <div className="p-3 bg-white/5 rounded-xl border border-white/10">
               <span className="text-[#d97706]">program</span> = {"{ function_def | statement }"} ;
             </div>
             <div className="p-3 bg-white/5 rounded-xl border border-white/10">
               <span className="text-[#d97706]">statement</span> = let_decl | if_stmt | return_stmt | expr_stmt ;
             </div>
             <div className="p-3 bg-white/5 rounded-xl border border-white/10">
               <span className="text-[#d97706]">expr</span> = assignment | binary_op | primary ;
             </div>
          </div>
          <p className="mt-8 text-xs text-white/40 leading-relaxed">
            Exam Tip: <strong>Ambiguity</strong> in grammars (like the dangling else) is resolved by carefully ordering your recursive descent calls or by defining operator precedence.
          </p>
        </div>
      </section>

      {/* 2. Pratt Parsing Deep Dive */}
      <section className="boho-card rounded-[3rem] p-12 shadow-xl border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
          <Wand2 className="w-64 h-64 text-[#d97706]" />
        </div>
        <div className="max-w-3xl space-y-8 relative z-10">
          <h2 className="text-4xl font-extrabold text-[#43302b]">Pratt Parsing & Binding Power</h2>
          <p className="text-lg text-[#43302b]/60 leading-relaxed font-medium">
            Standard recursive descent struggles with operator precedence. Jive uses <strong>Pratt Parsing</strong>, which assigns "Binding Power" to tokens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-[#d97706]">Nud (Null Denotation)</h4>
              <p className="text-sm text-[#43302b]/60 italic">Used for tokens with no left side (literals, prefixes like -x, or parentheses).</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-[#65a30d]">Led (Left Denotation)</h4>
              <p className="text-sm text-[#43302b]/60 italic">Used for infix/postfix operators that consume the expression on their left (like +, *, and [ ]).</p>
            </div>
          </div>
          <div className="bg-[#faf7f2] p-8 rounded-[2rem] border border-[#d4c3b3]/30 font-mono text-xs">
            <div className="text-[#d97706] mb-2 font-bold">// Precedence Levels</div>
            <div className="grid grid-cols-2 gap-2 text-[#43302b]/60">
              <div>LOWEST = 0</div>
              <div>EQUALS = 1</div>
              <div>LESS_GREATER = 2</div>
              <div>SUM = 3</div>
              <div>PRODUCT = 4</div>
              <div>PREFIX = 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shunting Yard & Postfix */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold text-[#43302b]">Postfix Transformation</h2>
          <p className="text-[#43302b]/60 font-medium italic">
            Before we generate bytecode, we often visualize expressions in <strong>Reverse Polish Notation (RPN)</strong>. No parentheses are needed in RPN because precedence is built into the order!
          </p>
        </div>
        <ShuntingYard />
      </section>

      {/* 4. Semantic Analysis & Symbol Tables */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="boho-card rounded-[2.5rem] p-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#65a30d]/10 p-4 rounded-3xl">
              <ShieldCheck className="w-8 h-8 text-[#65a30d]" />
            </div>
            <h3 className="text-2xl font-bold text-[#43302b]">Semantic Analysis</h3>
          </div>
          <p className="text-[#43302b]/60 font-medium leading-relaxed">
            The AST is "grammatically correct," but is it "logical"? Semantic analysis checks if variables are declared before use and if types match (e.g., adding a string to an integer).
          </p>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-[#d4c3b3]/20 shadow-sm">
              <span className="text-[10px] font-black uppercase text-[#d97706] block mb-2 tracking-widest">The Symbol Table</span>
              <p className="text-xs text-[#43302b]/40 leading-relaxed font-mono">
                {"{ 'x': {type: INT, scope: LOCAL, offset: -8}, 'y': {type: BOOL, scope: GLOBAL} }"}
              </p>
            </div>
            <p className="text-xs text-[#43302b]/50 italic">
              Exam Note: <strong>Scopes</strong> are often implemented as a linked list of hash maps. The compiler looks up names from the current local scope up to the global scope.
            </p>
          </div>
        </div>

        <div className="space-y-8 self-center">
           <div className="bg-white rounded-[2rem] p-8 border border-[#d4c3b3]/20 shadow-sm flex items-start gap-6">
              <Boxes className="w-12 h-12 text-[#d97706]/30 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-[#43302b] mb-2">Static vs. Dynamic Typing</h4>
                <p className="text-sm text-[#43302b]/60 leading-relaxed">
                  Jive is <strong>Statically Typed</strong>. Types are checked at compile time, which catches errors early and allows the compiler to generate faster code because it knows exactly how many bytes each variable uses.
                </p>
              </div>
           </div>
           <div className="bg-white rounded-[2rem] p-8 border border-[#d4c3b3]/20 shadow-sm flex items-start gap-6">
              <List className="w-12 h-12 text-[#65a30d]/30 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-[#43302b] mb-2">Intermediate Representation (IR)</h4>
                <p className="text-sm text-[#43302b]/60 leading-relaxed">
                  We translate AST nodes into <strong>Intermediate Bytecode</strong>. This allows us to separate the "front-end" (parsing) from the "back-end" (CPU-specific optimization).
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Stack Machine Visualizer */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold text-[#43302b]">The Virtual Machine</h2>
          <p className="text-[#43302b]/60 font-medium italic">
            Before hitting raw x86, Jive targets a virtual <strong>Stack Machine</strong>. It's the simplest way to evaluate trees!
          </p>
        </div>
        <StackMachine />
      </section>

      {/* 6. Code Generation: Bytecode to x86-64 */}
      <section className="boho-card rounded-[3.5rem] p-12 shadow-xl bg-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="inline-flex p-4 bg-[#43302b]/10 rounded-3xl">
              <Cpu className="w-10 h-10 text-[#43302b]" />
            </div>
            <h2 className="text-4xl font-bold text-[#43302b]">Target Code Generation</h2>
            <p className="text-lg text-[#43302b]/60 leading-relaxed font-medium">
              The final stage! We map each Stack Instruction to a sequence of x86-64 instructions.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-[#43302b]">Stack Management</h4>
                  <p className="text-xs text-[#43302b]/50">x86's <code>push</code> and <code>pop</code> use the hardware <code>rsp</code> register directly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-[#43302b]">ALU Operations</h4>
                  <p className="text-xs text-[#43302b]/50">To add, we pop two values into temporary registers, add them, and push the result back.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-[#43302b]">Memory Access</h4>
                  <p className="text-xs text-[#43302b]/50">Local variables are addressed relative to the base pointer: <code>[rbp - 8]</code>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#faf7f2] rounded-[2.5rem] p-10 border border-[#d4c3b3]/20 shadow-inner">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#d97706] mb-8">Translation Mapping</h4>
             <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-white rounded-xl border border-[#d4c3b3]/10">
                   <div className="text-[#43302b]/30 mb-2 uppercase text-[9px] tracking-widest">Stack IR</div>
                   <div className="text-[#43302b] font-bold">ADD</div>
                   <div className="h-px bg-[#d4c3b3]/20 my-3" />
                   <div className="text-[#43302b]/30 mb-2 uppercase text-[9px] tracking-widest">x86-64 Assembly</div>
                   <div className="text-[#d97706]">pop r10</div>
                   <div className="text-[#d97706]">pop r11</div>
                   <div className="text-[#d97706]">add r10, r11</div>
                   <div className="text-[#d97706]">push r10</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#d4c3b3]/10">
                   <div className="text-[#43302b]/30 mb-2 uppercase text-[9px] tracking-widest">Stack IR</div>
                   <div className="text-[#43302b] font-bold">LOAD 0</div>
                   <div className="h-px bg-[#d4c3b3]/20 my-3" />
                   <div className="text-[#43302b]/30 mb-2 uppercase text-[9px] tracking-widest">x86-64 Assembly</div>
                   <div className="text-[#d97706]">mov rax, [rbp - 8]</div>
                   <div className="text-[#d97706]">push rax</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* AST Section (Corrected Diagram) */}
      <section className="boho-card rounded-[3rem] p-12 shadow-xl bg-[#faf7f2]/50 border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Boxes className="w-64 h-64 text-[#d97706]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex p-4 bg-[#65a30d]/10 rounded-3xl">
              <Boxes className="w-10 h-10 text-[#65a30d]" />
            </div>
            <h2 className="text-4xl font-bold text-[#43302b]">The Abstract Syntax Tree</h2>
            <p className="text-lg text-[#43302b]/60 leading-relaxed font-medium">
              This tree is the "truth" of the program. For <code>2 + 3 * 4 - 5</code>, the tree must reflect <strong>Left-Associativity</strong> and <strong>Operator Precedence</strong>.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-[#d4c3b3]/30 shadow-sm">
               <div className="flex gap-3 items-center mb-4">
                  <Info className="w-5 h-5 text-[#d97706]" />
                  <span className="font-bold text-[#43302b]">Exam Prep Insight</span>
               </div>
               <p className="text-xs text-[#43302b]/60 italic leading-relaxed">
                 "In a left-associative expression like A - B - C, the tree grows deeper on the left. In a right-associative one like A = B = C, it grows deeper on the right."
               </p>
            </div>
          </div>

          <div className="relative py-12 flex flex-col items-center">
            {/* CORRECTED AST representation for (2 + (3 * 4)) - 5 */}
            <div className="flex flex-col items-center gap-10 font-mono">
              <div className="group relative">
                <div className="w-14 h-14 bg-[#43302b] text-white rounded-xl shadow-lg flex items-center justify-center font-bold text-xl relative z-10 transition-transform group-hover:scale-110">-</div>
                <div className="absolute top-14 left-1/2 -translate-x-[4.5rem] w-20 h-px bg-[#d4c3b3] -rotate-[35deg]" />
                <div className="absolute top-14 left-1/2 translate-x-[0.5rem] w-20 h-px bg-[#d4c3b3] rotate-[35deg]" />
              </div>
              
              <div className="flex gap-24 items-start">
                <div className="flex flex-col items-center gap-10">
                  <div className="group relative">
                    <div className="w-14 h-14 bg-white border-2 border-[#d4c3b3] text-[#43302b] rounded-xl shadow-md flex items-center justify-center font-bold text-xl relative z-10 transition-transform group-hover:scale-110">+</div>
                    <div className="absolute top-14 left-1/2 -translate-x-[3rem] w-12 h-px bg-[#d4c3b3] -rotate-[45deg]" />
                    <div className="absolute top-14 left-1/2 translate-x-[0.5rem] w-12 h-px bg-[#d4c3b3] rotate-[45deg]" />
                  </div>
                  
                  <div className="flex gap-14 items-start">
                    <div className="w-12 h-12 bg-[#faf7f2] border border-[#d4c3b3] text-[#43302b] rounded-xl flex items-center justify-center font-bold relative z-10 shadow-sm">2</div>
                    <div className="flex flex-col items-center gap-10">
                      <div className="group relative">
                        <div className="w-12 h-12 bg-white border-2 border-[#d4c3b3] text-[#43302b] rounded-xl shadow-md flex items-center justify-center font-bold text-xl relative z-10 transition-transform group-hover:scale-110">*</div>
                        <div className="absolute top-12 left-1/2 -translate-x-[2.2rem] w-10 h-px bg-[#d4c3b3] -rotate-[50deg]" />
                        <div className="absolute top-12 left-1/2 translate-x-[0.4rem] w-10 h-px bg-[#d4c3b3] rotate-[50deg]" />
                      </div>
                      <div className="flex gap-10">
                        <div className="w-10 h-10 bg-[#faf7f2] border border-[#d4c3b3] text-[#43302b] rounded-lg flex items-center justify-center font-bold relative z-10 text-xs shadow-sm">3</div>
                        <div className="w-10 h-10 bg-[#faf7f2] border border-[#d4c3b3] text-[#43302b] rounded-lg flex items-center justify-center font-bold relative z-10 text-xs shadow-sm">4</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-14 h-14 bg-[#faf7f2] border border-[#d4c3b3] text-[#43302b] rounded-xl flex items-center justify-center font-bold text-xl relative z-10 shadow-sm">5</div>
              </div>
            </div>
            <p className="mt-16 text-[9px] font-black uppercase tracking-[0.5em] text-[#d97706]/40 text-center">Execution Hierarchy for 2 + 3 * 4 - 5</p>
          </div>
        </div>
      </section>

      {/* Completion Section */}
      <section className="bg-[#43302b] rounded-[3.5rem] p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <PenTool className="w-64 h-64 text-white" />
         </div>
         <h2 className="text-4xl font-serif italic text-white">Mastered the Workshop?</h2>
         <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">You've successfully traced the path from raw text to the pulsing heart of the processor. You are now ready to build, optimize, and weave your own languages.</p>
         <button className="inline-flex items-center gap-3 px-12 py-5 bg-white text-[#43302b] font-black rounded-full transition-all hover:scale-105 shadow-xl uppercase tracking-widest text-sm">
           Finalize Jive Compiler <ChevronRight className="w-5 h-5" />
         </button>
      </section>
    </div>
  );
};
