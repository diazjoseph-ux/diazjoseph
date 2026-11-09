import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { personalData } from '../../data/content';

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#070707] py-12 px-6 sm:px-8 lg:px-12 text-xs font-mono text-white/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Copyright & College credit */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-white/80">© 2026 {personalData.name}</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>{personalData.college}, Kerala</span>
        </div>

        {/* Center: Quote / aesthetic mark */}
        <div className="flex items-center gap-2 text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Designed with curiosity &amp; engineered with React</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top of page"
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:border-purple-400 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span className="uppercase tracking-widest text-[11px]">Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}

