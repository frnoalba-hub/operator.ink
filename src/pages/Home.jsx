import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Phone, Mail } from 'lucide-react';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6878725ae2384abaf6424082/28e812aca_Untitled3.png";

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientNeeds: ''
  });
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('clientName') || '';
    const savedEmail = localStorage.getItem('clientEmail') || '';
    const savedNeeds = localStorage.getItem('clientNeeds') || '';
    setFormData({ clientName: savedName, clientEmail: savedEmail, clientNeeds: savedNeeds });
  }, []);

  // Persist to localStorage on change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    localStorage.setItem(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Clear form and localStorage
    setFormData({ clientName: '', clientEmail: '', clientNeeds: '' });
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('clientNeeds');
  };

  const capabilities = [
    {
      title: "Web Design & Operations",
      description: "Sleek, end-to-end operational websites designed for speed and converting traffic."
    },
    {
      title: "GEO, AEO & SEO Search",
      description: "Dominating search visibility through Localized Geo-targeting and Answer Engine Optimization (AEO)."
    },
    {
      title: "Workflows & AI Agents",
      description: "Connecting apps and data with smart systems and custom AI bots to eliminate manual tasks."
    },
    {
      title: "Ads & Brand Identity",
      description: "Precision Google ads and cohesive brand assets to establish a commanding digital footprint."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex flex-col items-center overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white text-black px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2">
              <Check className="w-5 h-5" />
              System Updated. We will contact you.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full max-w-[480px] px-6 py-16 flex flex-col gap-14">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-8 mt-4"
        >
          <img 
            src={LOGO_URL} 
            alt="Operator.ink Logo" 
            className="w-56 h-auto object-contain invert"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter leading-tight">
              Digital Operations<br/>& Growth
            </h1>
            <p className="text-base text-zinc-400 font-medium">
              Sleek web design, automated workflows, and AEO/GEO search dominance.
            </p>
          </div>
        </motion.header>

        {/* Contact Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4"
        >
          <a 
            href="tel:+11234567890" 
            className="flex flex-col items-center justify-center min-h-[96px] p-5 bg-[#09090b] border border-zinc-800 rounded-[28px] hover:border-zinc-500 transition-colors duration-300 active:scale-95"
          >
            <Phone className="w-4 h-4 text-zinc-400 mb-2" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5">Direct Line</span>
            <span className="text-sm font-semibold tracking-wide">+1 (123) 456-7890</span>
          </a>
          <a 
            href="mailto:orders@operator.ink" 
            className="flex flex-col items-center justify-center min-h-[96px] p-5 bg-[#09090b] border border-zinc-800 rounded-[28px] hover:border-zinc-500 transition-colors duration-300 active:scale-95"
          >
            <Mail className="w-4 h-4 text-zinc-400 mb-2" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5">Email</span>
            <span className="text-sm font-semibold tracking-wide">orders@operator.ink</span>
          </a>
        </motion.section>

        {/* Capabilities */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-xl font-bold tracking-tight px-2 text-white/90">Core Capabilities</h2>
          <div className="flex flex-col gap-4">
            {capabilities.map((cap, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="p-7 bg-[#09090b] border border-zinc-800 rounded-[32px] hover:border-zinc-700 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold mb-2 tracking-tight">{cap.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Intake Form */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col gap-6"
        >
          <h2 className="text-xl font-bold tracking-tight px-2 text-white/90">Initialize Project</h2>
          <form 
            onSubmit={handleSubmit} 
            className="w-full bg-[#09090b] border border-zinc-800 p-7 rounded-[36px] flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="clientName" className="text-xs font-bold uppercase tracking-widest text-zinc-400 pl-2">
                Name
              </label>
              <input 
                type="text" 
                id="clientName" 
                required 
                value={formData.clientName}
                onChange={(e) => handleChange('clientName', e.target.value)}
                className="w-full min-h-[52px] px-5 py-3 rounded-2xl bg-black border border-zinc-800 text-white transition-all focus:ring-1 focus:ring-white focus:border-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="clientEmail" className="text-xs font-bold uppercase tracking-widest text-zinc-400 pl-2">
                Email
              </label>
              <input 
                type="email" 
                id="clientEmail" 
                required 
                value={formData.clientEmail}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
                className="w-full min-h-[52px] px-5 py-3 rounded-2xl bg-black border border-zinc-800 text-white transition-all focus:ring-1 focus:ring-white focus:border-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="clientNeeds" className="text-xs font-bold uppercase tracking-widest text-zinc-400 pl-2">
                Operational Needs
              </label>
              <textarea 
                id="clientNeeds" 
                rows={4} 
                required 
                value={formData.clientNeeds}
                onChange={(e) => handleChange('clientNeeds', e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-black border border-zinc-800 text-white transition-all resize-none focus:ring-1 focus:ring-white focus:border-white outline-none"
              />
            </div>
            <button 
              type="submit" 
              className="w-full min-h-[56px] mt-4 rounded-2xl bg-white text-black font-extrabold text-base tracking-wide hover:bg-zinc-200 transition-colors active:scale-[0.98]"
            >
              Deploy Request
            </button>
          </form>
        </motion.section>
        
        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-xs text-zinc-500 font-medium pb-4"
        >
          <p>© {new Date().getFullYear()} Operator.ink. Systems Active.</p>
        </motion.footer>
      </main>
    </div>
  );
}