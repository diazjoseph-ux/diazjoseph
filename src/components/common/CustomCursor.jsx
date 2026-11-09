import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Lerp ring towards mouse position
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Interactive element detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".hover-target")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none">
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{ willChange: "transform" }}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-all duration-200 pointer-events-none ${
          isHovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-purple-500/20 border-pink-400 scale-110 backdrop-blur-[1px]"
            : "w-8 h-8 border-white/40 bg-transparent"
        }`}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{ willChange: "transform" }}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-100 pointer-events-none ${
          isHovered ? "bg-white scale-0" : "bg-white"
        }`}
      />
    </div>
  );
}
