import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with hover capability / mouse pointer
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isPointerFine || prefersReducedMotion) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive target
      const target = e.target;
      const isInteractive = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-hover') ||
        target.getAttribute('role') === 'button'
      );
      setIsHovered(Boolean(isInteractive));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animateRing = () => {
      // Lerp for smooth springy follow
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden hidden md:block">
      {/* Outer Spring Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 h-10 w-10 rounded-full border transition-[border-color,background-color,width,height,margin] duration-200 ease-out will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'scale-150 border-purple-400/80 bg-purple-500/20 backdrop-blur-[1px]'
            : 'border-white/40 bg-transparent'
        }`}
        style={{
          boxShadow: isHovered ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
        }}
      />

      {/* Central Snappy Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white transition-opacity duration-150 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-0' : 'scale-100'}`}
      />
    </div>
  );
}

