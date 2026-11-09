import React, { useState, useEffect } from 'react';
import { Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, personalData } from '../../data/content';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#' || href === '') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetElement, { offset: -60, duration: 1.2 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-[#070707]/80 backdrop-blur-md border-b border-white/5'
          : 'py-6 md:py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="group flex items-center gap-2.5 font-serif text-xl sm:text-2xl tracking-wide text-white hover:text-purple-300 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform shadow-[0_0_8px_#a855f7]" />
          <span>{personalData.name}</span>
        </a>

        {/* Desktop Nav Items + Contact Icon */}
        <div className="hidden md:flex items-center gap-8">
          {/* Circular Email Quick Button (from reference) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            aria-label="Direct message"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Minimal Nav Links */}
          <nav className="flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-mono text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative py-1 hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            aria-label="Direct message"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#09090d]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-5 text-sm uppercase tracking-[0.25em] font-mono text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 border-b border-white/5 flex items-center justify-between hover:text-purple-300 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </nav>
          <div className="pt-2 text-xs text-white/40 font-mono">
            {personalData.statusBadge}
          </div>
        </div>
      )}
    </header>
  );
}
