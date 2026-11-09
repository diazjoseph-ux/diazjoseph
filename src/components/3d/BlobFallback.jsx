import React from 'react';

export default function BlobFallback() {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] flex items-center justify-center pointer-events-none select-none">
      {/* Outer deep violet glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-900/50 via-violet-800/60 to-purple-900/50 blur-3xl animate-pulse" />

      {/* Primary Organic Morphing Blob — rich dark iridescent jewel tones */}
      <div
        className="w-full h-full rounded-[45%_55%_65%_35%/55%_45%_55%_45%] opacity-90 animate-[morph_14s_ease-in-out_infinite_alternate]"
        style={{
          background: 'linear-gradient(135deg, #1a0a7c 0%, #5b0da6 30%, #8b0cad 55%, #c2156a 80%, #1a0a7c 100%)',
          boxShadow: '0 0 80px rgba(120, 20, 180, 0.7), 0 0 140px rgba(90, 10, 160, 0.4)',
          filter: 'drop-shadow(0 0 50px rgba(140, 20, 180, 0.6))',
        }}
      />

      {/* Inner cyan iridescent sheen — matches fresnel rim in the 3D shader */}
      <div
        className="absolute w-3/4 h-3/4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-md animate-[spin_20s_linear_infinite]"
        style={{
          background: 'linear-gradient(135deg, rgba(10,120,220,0.5) 0%, rgba(130,20,210,0.4) 50%, rgba(200,30,120,0.4) 100%)',
        }}
      />

      {/* Specular pearl highlight — cool white-blue */}
      <div className="absolute w-1/4 h-1/4 rounded-full blur-xl top-1/4 left-[28%]"
        style={{ background: 'rgba(180,160,255,0.35)' }} />
    </div>
  );
}
