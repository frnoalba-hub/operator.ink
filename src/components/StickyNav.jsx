import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPageUrl } from '@/utils';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a891df439583825e4f7f0e/cc3b199f0_Untitled5.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

export default function StickyNav({ currentPage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--retro-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16">
        <a href={createPageUrl('Home')}>
          <img
            src={LOGO_URL}
            alt="Operator.ink"
            className="h-auto object-contain"
            style={{ width: '240px', maxWidth: '40vw' }}
          />
        </a>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <a
            href={createPageUrl('Home')}
            className={`retro-link text-sm font-semibold ${currentPage === 'home' ? 'border-b-[var(--retro-border-bright)]' : ''}`}
          >
            Home
          </a>
          <a
            href={createPageUrl('Services')}
            className={`retro-link text-sm font-semibold ${currentPage === 'services' ? 'border-b-[#00ccff]' : ''}`}
          >
            Services
          </a>
          <a
            href={createPageUrl('Demos')}
            className={`retro-link text-sm font-semibold ${currentPage === 'demos' ? 'border-b-[#00ccff]' : ''}`}
          >
            Demos
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="retro-link flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-full border transition-colors"
            style={{ borderColor: 'var(--retro-border)' }}
          >
            <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={`${createPageUrl('Home')}#intake`}
            className="retro-rgb-btn hidden sm:inline-flex items-center justify-center px-5 h-9 rounded-full text-sm font-bold hover:opacity-95 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}