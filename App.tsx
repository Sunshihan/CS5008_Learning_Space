
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { IntroC } from './pages/IntroC';
import { CPUArch } from './pages/CPUArch';
import { Assembly } from './pages/Assembly';
import { Compiler } from './pages/Compiler';
import { Assistant } from './components/Assistant';
import { 
  Sparkles, Cpu, Binary, PenTool, Coffee, 
  Home as HomeIcon, Leaf, Share2, Check, 
  X, ExternalLink, Rocket, Download, Info, Save, Linkedin, Heart
} from 'lucide-react';

const ShareModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const isBlob = window.location.href.startsWith('blob:');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#43302b]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="boho-card w-full max-w-xl rounded-[3rem] p-10 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-[#d4c3b3]/20 rounded-full transition-colors">
          <X className="w-5 h-5 text-[#43302b]/40" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#d97706]/10 p-3 rounded-2xl">
            <Share2 className="w-6 h-6 text-[#d97706]" />
          </div>
          <h2 className="text-3xl font-bold text-[#43302b]">Save & Share Studio</h2>
        </div>

        {isBlob ? (
          <div className="space-y-6">
            <div className="bg-[#d97706]/5 border border-[#d97706]/20 p-6 rounded-3xl flex gap-4">
              <span className="shrink-0 pt-1"><Info className="w-5 h-5 text-[#d97706]" /></span>
              <p className="text-sm text-[#43302b]/70 leading-relaxed font-medium">
                You're currently in a <span className="font-bold">temporary preview</span>. To use this in the future or share it with classmates, you must deploy it.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#43302b]">Three steps to keep it forever:</h3>
              <div className="grid gap-4">
                <div className="p-5 bg-white border border-[#d4c3b3]/30 rounded-2xl flex items-start gap-4">
                   <div className="w-6 h-6 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center text-xs font-bold shrink-0">1</div>
                   <div className="text-sm">
                      <span className="font-bold text-[#43302b] block">Download the Source</span>
                      <span className="text-[#43302b]/50">Save the project folder from your editor to your computer.</span>
                   </div>
                </div>

                <a 
                  href="https://vercel.com/new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-white border border-[#d4c3b3]/30 rounded-2xl hover:border-[#d97706] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <div>
                      <span className="block font-bold text-[#43302b]">Deploy to Vercel</span>
                      <span className="text-xs text-[#43302b]/50 italic">Upload the folder to get a public link.</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#d4c3b3] group-hover:text-[#d97706]" />
                </a>
                
                <div className="p-5 bg-[#faf7f2] border border-[#d4c3b3]/10 rounded-2xl flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#43302b]/10 text-[#43302b] flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <div className="text-sm">
                    <span className="font-bold text-[#43302b] block">Share with Class</span>
                    <span className="text-[#43302b]/50">Once deployed, your classmates can visit the link on any device!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-[#43302b]/60 font-medium">Your workspace is live! Copy the link below to share your progress with the class.</p>
            <div className="flex gap-4">
              <input 
                readOnly 
                value={window.location.href} 
                className="flex-1 bg-[#faf7f2] border border-[#d4c3b3]/30 rounded-2xl px-5 py-3 font-mono text-xs text-[#43302b]/60"
              />
              <button 
                onClick={handleCopy}
                className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-md ${
                  copied ? 'bg-[#65a30d] text-white' : 'bg-[#43302b] text-white hover:bg-[#5d423b]'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : 'Copy'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-[#d4c3b3]/20 text-center">
           <p className="text-[10px] uppercase font-black tracking-[0.3em] text-[#d4c3b3]">CS 5008 • Persistence Guide</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-[#faf7f2]/80 backdrop-blur-md border-b border-[#d4c3b3]/30 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#d97706]/10 p-2 rounded-xl group-hover:rotate-6 transition-transform">
            <Leaf className="w-5 h-5 text-[#d97706]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#43302b]">CS5008 Learning Space</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          {[
            { path: '/', label: 'Home', icon: HomeIcon },
            { path: '/intro-c', label: 'The C Atelier', icon: PenTool },
            { path: '/cpu-arch', label: 'CPU Core', icon: Cpu },
            { path: '/assembly', label: 'Assembly', icon: Binary },
            { path: '/compiler', label: 'Compiler Workshop', icon: Sparkles },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold ${
                isActive(item.path) 
                  ? 'bg-[#d97706] text-white shadow-md' 
                  : 'text-[#43302b]/60 hover:text-[#43302b] hover:bg-[#d4c3b3]/20'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-[#d4c3b3]/30 mx-2" />
          
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold border border-[#d4c3b3]/50 text-[#43302b]/60 hover:text-[#43302b] hover:bg-[#d4c3b3]/20"
            title="How to share with classmates"
          >
            <Share2 className="w-4 h-4" />
            Share Space
          </button>
        </div>
      </nav>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#faf7f2] text-[#43302b] selection:bg-[#d97706]/20">
        <Navbar />
        <main className="container mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro-c" element={<IntroC />} />
            <Route path="/cpu-arch" element={<CPUArch />} />
            <Route path="/assembly" element={<Assembly />} />
            <Route path="/compiler" element={<Compiler />} />
          </Routes>
        </main>
        <Assistant />
        
        <footer className="mt-20 py-16 text-center border-t border-[#d4c3b3]/20 bg-[#fdfbf9]/40">
          <p className="font-serif italic text-2xl mb-4 text-[#43302b]/80">"Crafting beautiful code, one thread at a time."</p>
          
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="flex justify-center gap-10 opacity-40">
               <Coffee className="w-5 h-5" />
               <Leaf className="w-5 h-5" />
               <Sparkles className="w-5 h-5" />
            </div>

            <div className="space-y-4">
              <p className="uppercase tracking-[0.3em] font-black text-[10px] text-[#d4c3b3]">Created with <Heart className="w-2.5 h-2.5 inline fill-[#d97706] text-[#d97706] mb-0.5 mx-0.5" /> for CS 5008</p>
              <a 
                href="https://www.linkedin.com/in/hannah-s-b74724238/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white border border-[#d4c3b3]/40 rounded-full hover:border-[#d97706] hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-[#43302b]/70 group-hover:text-[#43302b]">Designed by <span className="text-[#d97706]">Hannah Sun</span></span>
                <ExternalLink className="w-3 h-3 text-[#d4c3b3] group-hover:text-[#d97706]" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}
