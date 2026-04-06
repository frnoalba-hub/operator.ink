import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { createPageUrl } from '@/utils';

const LOGO_URL = "/operator-logo.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/franciscoalbavc/";

export default function StickyNav({ currentPage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      aria-label="Main navigation"
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
          aria-label="Operator.ink home"
        >
          <span className="text-lg sm:text-2xl font-extrabold tracking-tighter text-white">
            Operator<span className="retro-link-accent">.ink</span>
          </span>
        </Link>
        <div className="flex-1 min-w-0" />
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link to={createPageUrl('Home')} className={navLinkClass(currentPage === 'home')}>Home</Link>
          <Link to={createPageUrl('Services')} className={navLinkClass(currentPage === 'services')}>Services</Link>
          <Link to={createPageUrl('Pilot')} className={navLinkClass(currentPage === 'pilot')}>Pilot</Link>
          <Link to={createPageUrl('Portal')} className={navLinkClass(currentPage === 'portal')}>Portal</Link>
          <Link to={createPageUrl('InventoryDashboard')} className={navLinkClass(currentPage === 'inventorydashboard')}>Dashboard</Link>
        </div>

        <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" aria-hidden />

        {/* Always visible CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://base44.pxf.io/c/6842739/2049275/25619?trafcat=base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Base44 platform"
            className="inline-flex items-center justify-center min-h-[36px] px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/20 transition-all duration-200"
          >
            Built on Base44
          </a>
          <a
            href="https://cal.com/francisco-alba-4b06or/15min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a 15-minute setup call"
            className="inline-flex items-center justify-center min-h-[36px] px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
          >
            Setup Call
          </a>

          {/* LinkedIn and Demo (Desktop only) */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden xl:inline-flex items-center justify-center w-10 h-10 min-h-[40px] rounded-lg text-[#0A66C2] hover:bg-white/5 transition-all flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <Link
            to={createPageUrl('InventoryDashboard')}
            className="retro-rgb-btn hidden lg:inline-flex items-center justify-center min-h-[40px] px-6 py-2.5 rounded-lg text-sm font-bold hover:opacity-95 transition-all duration-200"
            aria-label="Open live operations sample dashboard"
          >
            Live sample
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-white bg-white/5 border border-white/10 flex-shrink-0 ml-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              <Link to={createPageUrl('Home')} onClick={() => setMobileMenuOpen(false)} className={navLinkClass(currentPage === 'home') + " justify-start"}>Home</Link>
              <Link to={createPageUrl('Services')} onClick={() => setMobileMenuOpen(false)} className={navLinkClass(currentPage === 'services') + " justify-start"}>Services</Link>
              <Link to={createPageUrl('Pilot')} onClick={() => setMobileMenuOpen(false)} className={navLinkClass(currentPage === 'pilot') + " justify-start"}>Pilot</Link>
              <Link to={createPageUrl('Portal')} onClick={() => setMobileMenuOpen(false)} className={navLinkClass(currentPage === 'portal') + " justify-start"}>Portal</Link>
              <Link to={createPageUrl('InventoryDashboard')} onClick={() => setMobileMenuOpen(false)} className={navLinkClass(currentPage === 'inventorydashboard') + " justify-start"}>Dashboard</Link>
              
              <div className="w-full h-px bg-white/10 my-2" />
              
              <div className="flex items-center justify-between px-2">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0A66C2] hover:opacity-80 transition-opacity">
                  LinkedIn
                </a>
                <Link to={createPageUrl('InventoryDashboard')} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#00CCFF] hover:opacity-80 transition-opacity">
                  View Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}