import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { personalData, socialLinks } from "../../data/content";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050507] py-12 px-6 sm:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand info & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl font-bold text-white tracking-tight">
              {personalData.name}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Year 1 • CSE (AI)
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono">
            {personalData.college} • Thrissur, Kerala
          </p>
        </div>

        {/* Center: Social handles */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-5">
          <span className="text-xs font-mono text-gray-500">
            &copy; 2026 {personalData.name}
          </span>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 hover:border-purple-400 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-xs font-mono"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
