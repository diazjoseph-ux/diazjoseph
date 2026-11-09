import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function RotatingBadge({
  text = "REACH OUT AND SAY HI • REACH OUT AND SAY HI • ",
  href = "#contact",
}) {
  return (
    <a
      href={href}
      className="group relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0a0d]/90 backdrop-blur-md border border-white/10 hover:border-purple-500/50 shadow-2xl transition-all duration-300 hover:scale-105 pointer-events-auto"
      aria-label="Reach out and say hi - Contact Diaz Joseph"
    >
      {/* Outer ambient glow on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Rotating Circular Text SVG */}
      <svg
        className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] group-hover:[animation-play-state:paused]"
        viewBox="0 0 100 100"
      >
        <path
          id="badgeCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[8.5px] font-mono uppercase tracking-[0.24em] fill-gray-300/90 font-medium">
          <textPath href="#badgeCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center 4-Point Star / Sparkle Icon */}
      <div className="relative z-10 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white group-hover:text-black transition-colors duration-300"
        >
          {/* 4-point star icon matching the reference badge */}
          <path d="M12 0L14.2 8.8L23 12L14.2 15.2L12 24L9.8 15.2L1 12L9.8 8.8L12 0Z" />
        </svg>
      </div>
    </a>
  );
}
