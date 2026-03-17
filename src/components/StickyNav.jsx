import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LOGO_URL = "/operator-logo.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

export default function StickyNav({ currentPage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = (isActive) =>
      `inline-flex items-center justify-center min-h-[40px] px-1.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
        isActive
          ? 'text-white bg-white/10'
          : 'text-[var(--retro-text-muted)] hover:text-white hover:bg-white/5'
      }`;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-8 lg:px-12 flex items-center h-16 gap-2 sm:gap-6">
        <Link
          to={createPageUrl('Home')}
          className="flex-shrink-0 transition-opacity hover:opacity-90"
        >
          <span className="text-lg sm:text-2xl font-extrabold tracking-tighter text-white">
            Operator<span className="retro-link-accent">.ink</span>
          </span>
        </Link>
        <div className="flex-1 min-w-0" />
        <div className="flex items-center gap-0.5 sm:gap-2 overflow-x-auto scrollbar-hide -mr-2 pr-2 sm:mr-0 sm:pr-0">
          <Link to={createPageUrl('Home')} className={navLinkClass(currentPage === 'home')}>
            Home
          </Link>
          <Link to={createPageUrl('Services')} className={navLinkClass(currentPage === 'services')}>
            Services
          </Link>

          <Link to={createPageUrl('Pilot')} className={navLinkClass(currentPage === 'pilot')}>
            Pilot
          </Link>
          <Link to={createPageUrl('Portal')} className={navLinkClass(currentPage === 'portal')}>
            Portal
          </Link>
          <Link to={createPageUrl('InventoryDashboard')} className={navLinkClass(currentPage === 'inventorydashboard')}>
            Dashboard
          </Link>
          
          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" aria-hidden />
          
          <a
            href="https://base44.pxf.io/c/6842739/2049275/25619?trafcat=base"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/20 transition-all duration-200"
          >
            Built on Base44
          </a>
          <a
            href="mailto:alex@operator.ink?subject=Base44 Setup Consultation"
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200"
          >
            Setup Call
          </a>

          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" aria-hidden />
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center w-10 h-10 min-h-[40px] rounded-lg text-[#0A66C2] hover:bg-white/5 transition-all flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <Link
            to={createPageUrl('InventoryDashboard')}
            className="retro-rgb-btn hidden sm:inline-flex items-center justify-center min-h-[40px] px-6 py-2.5 rounded-lg text-sm font-bold hover:opacity-95 transition-all duration-200"
          >
            Dashboard Demo
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}