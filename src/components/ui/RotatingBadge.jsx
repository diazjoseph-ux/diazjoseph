import React from 'react';

export default function RotatingBadge({ href = "#contact", text = "REACH OUT AND SAY HI • REACH OUT AND SAY HI •" }) {
  const handleClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo(contactSection, { offset: -40, duration: 1.4 });
      } else {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label="Reach out and say hi - scroll to contact section"
      className="group relative inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-4 focus:ring-offset-black"
    >
      {/* Outer dark glossy disc */}
      <div className="absolute inset-0 rounded-full bg-[#0d0d12]/90 border border-white/15 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:border-purple-400/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]" />

      {/* Rotating SVG Circular Text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-[spin_12s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite] select-none pointer-events-none"
      >
        <path
          id="badge-circle-path"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[8.5px] uppercase tracking-[0.22em] fill-white/80 font-mono font-medium">
          <textPath
            href="#badge-circle-path"
            startOffset="0%"
            className="transition-colors duration-300 group-hover:fill-purple-300"
          >
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center 8-pointed star / sparkle icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-125">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          fill="currentColor"
        >
          {/* Elegant 8-pointed star */}
          <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
          <path d="M12 4.5L13.2 9.5L18.2 10.7L13.2 11.9L12 16.9L10.8 11.9L5.8 10.7L10.8 9.5L12 4.5Z" opacity="0.6" />
        </svg>
      </div>
    </a>
  );
}

