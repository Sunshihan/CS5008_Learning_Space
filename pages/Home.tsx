
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, Cpu, Binary, Sparkles, ChevronRight, 
  Coffee, Heart
} from 'lucide-react';

export const Home: React.FC = () => {
  const modules = [
    {
      id: 'intro-c',
      title: 'The C Atelier',
      desc: 'The essential medium of our craft. Learning memory, pointers, and the beauty of manual control.',
      icon: PenTool,
      color: 'bg-orange-100/50 text-orange-700',
      path: '/intro-c',
      tags: ['malloc', 'pointers', 'memory']
    },
    {
      id: 'cpu-arch',
      title: 'CPU Architecture',
      desc: 'The steady rhythm of the machine. Exploring ALU, Registers, and the cycle of logic.',
      icon: Cpu,
      color: 'bg-green-100/50 text-green-700',
      path: '/cpu-arch',
      tags: ['ALU', 'Fetch-Decode', 'Registers']
    },
    {
      id: 'assembly',
      title: 'The Assembly Loom',
      desc: 'Conversing directly with the hardware. Moving bits and weaving instructions together.',
      icon: Binary,
      color: 'bg-amber-100/50 text-amber-700',
      path: '/assembly',
      tags: ['MOV', 'Stack', 'ABI']
    },
    {
      id: 'compiler',
      title: 'Compiler Workshop',
      desc: 'Translating thought into action. Building the Jive compiler from the ground up.',
      icon: Sparkles,
      color: 'bg-rose-100/50 text-rose-700',
      path: '/compiler',
      tags: ['Parsing', 'Lexing', 'Jive']
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4">
          <Coffee className="w-8 h-8 text-[#d97706]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-[#43302b] tracking-tight">Create with Purpose.</h1>
          <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#d4c3b3]">Designed & Developed by Hannah Sun</p>
        </div>
        <p className="text-lg text-[#43302b]/60 font-medium italic">
          Welcome to your aesthetic learning space for CS 5008. Let's explore the layers of computer systems with patience and curiosity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((m) => (
          <Link
            key={m.id}
            to={m.path}
            className="group boho-card rounded-[2.5rem] p-10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full blur-3xl opacity-20 ${m.color.split(' ')[0]}`} />
            
            <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${m.color} transition-transform group-hover:scale-105`}>
                <m.icon className="w-8 h-8" />
              </div>
              <div className="p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-[#43302b]" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-[#43302b]">{m.title}</h2>
            <p className="text-[#43302b]/60 mb-8 leading-relaxed text-lg">{m.desc}</p>

            <div className="flex flex-wrap gap-2">
              {m.tags.map(tag => (
                <span key={tag} className="text-[11px] font-bold px-4 py-1.5 bg-white/50 border border-[#d4c3b3]/30 rounded-full uppercase tracking-wider text-[#43302b]/70">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-[#65a30d]/5 border border-[#65a30d]/10 rounded-[3rem] p-12 text-center space-y-8 shadow-sm">
         <h3 className="text-3xl font-bold text-[#43302b]">Ready to begin?</h3>
         <p className="text-[#43302b]/70 text-lg max-w-2xl mx-auto font-medium">Whether it's your first time or a review session, the atelier is always open for you.</p>
         <div className="flex flex-col items-center gap-6">
            <Link to="/intro-c" className="inline-flex items-center gap-3 px-10 py-4 bg-[#43302b] text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 uppercase tracking-widest text-sm">
              Enter the Atelier <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4c3b3]">Woven with Heart <Heart className="w-2 h-2 inline fill-[#d97706] text-[#d97706] mb-0.5 mx-0.5" /> by Hannah Sun</p>
         </div>
      </div>
    </div>
  );
};
