import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Journey from "./components/sections/Journey";
import Contact from "./components/sections/Contact";
import CustomCursor from "./components/common/CustomCursor";
import Preloader from "./components/common/Preloader";
import ScrollProgress from "./components/common/ScrollProgress";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Make lenis accessible globally if needed
    window.__lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // GSAP ScrollTrigger animations for staggered section reveals
  useEffect(() => {
    if (loading) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = document.querySelectorAll("section:not(#hero)");
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#f3f4f6] selection:bg-purple-600 selection:text-white">
      {/* Cinematic Typographic Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Trailing Fluid Cursor for fine pointers */}
      <CustomCursor />

      {/* Subtle Film Grain Noise Texture */}
      <div className="film-grain" />

      {/* Ambient Edge Glows */}
      <div className="ambient-glow-edges" />

      {/* Site Header / Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
