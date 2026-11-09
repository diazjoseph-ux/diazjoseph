import React, { useRef, useState } from 'react';
import { Sparkles, Terminal, Cpu, MapPin, Award } from 'lucide-react';
import { personalData } from '../../data/content';

export default function TitleCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[420px] aspect-[4/5] select-none"
    >
      {/* Ambient Iridescent Aura behind card */}
      <div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-purple-600/40 to-pink-500/30 blur-2xl transition-all duration-500 -z-10 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-60 scale-100'
        }`}
      />

      {/* Tiltable Card Shell */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0a0a0f] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-colors duration-300 hover:border-purple-500/50"
      >
        {/* Dynamic Cursor Spotlight inside Card */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(168, 85, 247, 0.18), transparent 60%)`,
          }}
        />

        {/* Card Header: Terminal Controls + Status */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Engineer</span>
          </div>
        </div>

        {/* Center: Glowing DJ Emblem + Core Identity Typography */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
          {/* Concentric Iridescent Rings with DJ Monogram */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-6 flex items-center justify-center">
            {/* Outer spinning gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-[spin_8s_linear_infinite] opacity-75 blur-[2px]" />
            {/* Inner dark core */}
            <div className="absolute inset-1 rounded-full bg-[#0d0d14] flex items-center justify-center border border-white/20">
              <span className="font-editorial text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 font-bold tracking-tight">
                DJ
              </span>
            </div>
            {/* Sparkle badge on ring */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-purple-600/90 border border-white/40 flex items-center justify-center shadow-[0_0_10px_#a855f7]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Subtitle intro */}
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 mb-1">
            Hello, I&apos;m
          </p>

          {/* Giant Title: DIAZ JOSEPH */}
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal uppercase tracking-tight text-iridescent-glow leading-tight">
            {personalData.name}
          </h2>

          {/* Role line */}
          <p className="font-editorial italic text-lg sm:text-xl text-purple-300 mt-1">
            {personalData.roleLine}
          </p>
        </div>

        {/* Card Footer: University & Academic Badge */}
        <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/40 uppercase tracking-wider">Institution</span>
            <span className="text-white font-medium">{personalData.college}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/40 uppercase tracking-wider">Degree</span>
            <span className="text-purple-300 font-medium">{personalData.degree}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span>{personalData.location}</span>
            </span>
            <span className="text-emerald-400 font-medium">Class of 2029 (Year 1)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

