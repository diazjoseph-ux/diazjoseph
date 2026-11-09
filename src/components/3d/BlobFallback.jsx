import React from 'react';

export default function BlobFallback() {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] flex items-center justify-center pointer-events-none select-none">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 via-purple-600/40 to-pink-500/30 blur-3xl animate-pulse" />

      {/* Primary Organic Morphing Blob */}
      <div
        className="w-full h-full rounded-[45%_55%_65%_35%/55%_45%_55%_45%] bg-gradient-to-tr from-[#2563eb] via-[#8b5cf6] to-[#ec4899] opacity-80 shadow-[0_0_80px_rgba(139,92,246,0.6)] mix-blend-screen animate-[morph_14s_ease-in-out_infinite_alternate]"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.5))',
        }}
      />

      {/* Inner Iridescent Sheen Layer */}
      <div className="absolute w-3/4 h-3/4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-cyan-400/60 via-purple-300/40 to-pink-400/50 blur-md animate-[spin_20s_linear_infinite]" />

      {/* Central Highlight Specular Pearl */}
      <div className="absolute w-1/3 h-1/3 rounded-full bg-white/40 blur-xl top-1/4 left-1/4" />
    </div>
  );
}
