
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { Send, User, Sparkles, X, MessageCircle, Loader2, Leaf } from 'lucide-react';

export const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm Lumi. I'm here to help you weave through your CS journey. What are we exploring today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await gemini.getResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-5 bg-[#43302b] hover:bg-[#5d423b] rounded-full shadow-2xl transition-all transform hover:scale-110 z-50 flex items-center gap-3 group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-white font-bold uppercase tracking-widest text-xs">Chat with Lumi</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[420px] max-h-[700px] bg-white border border-[#d4c3b3]/30 rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(67,48,43,0.15)] flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-6 bg-[#faf7f2] border-b border-[#d4c3b3]/20 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-[#65a30d]/10 p-3 rounded-2xl">
                <Leaf className="w-6 h-6 text-[#65a30d]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold block leading-none text-[#43302b]">Lumi</span>
                <span className="text-[10px] uppercase font-black text-[#65a30d] tracking-[0.2em] mt-1 block">Studio Guide</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-[#d4c3b3]/20 rounded-full transition-colors">
              <X className="w-5 h-5 text-[#43302b]/40" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 min-h-[400px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] shadow-sm ${
                  m.role === 'user' ? 'bg-[#43302b] text-white' : 'bg-[#fdf8f5] text-[#43302b] border border-[#d4c3b3]/20'
                }`}>
                  <p className="text-[15px] whitespace-pre-wrap leading-relaxed font-medium">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#fdf8f5] text-[#43302b]/60 p-5 rounded-[1.5rem] flex items-center gap-3 border border-[#d4c3b3]/20">
                  <Loader2 className="w-5 h-5 animate-spin text-[#d97706]" />
                  <span className="text-sm font-semibold italic">Refining thoughts...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-[#faf7f2] border-t border-[#d4c3b3]/20 flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="What's on your mind?"
              className="flex-1 bg-white border border-[#d4c3b3]/40 rounded-2xl px-5 py-3 text-[15px] focus:outline-none focus:border-[#d97706] text-[#43302b] shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-4 bg-[#43302b] hover:bg-[#5d423b] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
