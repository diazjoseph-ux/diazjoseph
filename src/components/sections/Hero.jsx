import React from "react";
import { motion } from "framer-motion";
import LiquidEther from "../3d/LiquidEther";
import RotatingBadge from "../common/RotatingBadge";
import { personalData, socialLinks } from "../../data/content";

export default function Hero() {
  const lineVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: (custom) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + custom * 0.15,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 120% 70% at 50% 40%, #1a0533 0%, #0d0118 30%, #070707 65%, #07070a 100%)',
      }}
    >
      {/* Layered ambient glows — purple core, blue left, pink right */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep violet core bloom */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-purple-900/40 blur-[120px]" />
        {/* Electric blue left wash */}
        <div className="absolute top-[20%] -left-20 w-[500px] h-[400px] rounded-full bg-blue-800/25 blur-[130px]" />
        {/* Neon pink right accent */}
        <div className="absolute top-[25%] -right-20 w-[450px] h-[400px] rounded-full bg-pink-800/20 blur-[130px]" />
        {/* Subtle bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#070707] to-transparent" />
      </div>

      {/* LiquidEther fluid simulation — full-cover behind headline */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={['#1a0870', '#7c12d4', '#c2156a']}
          mouseForce={22}
          cursorSize={120}
          persistence={0.78}
          autoDemo={true}
          autoSpeed={0.45}
          autoIntensity={2.4}
          intensity={1.3}
          intro={true}
          clickBurst={true}
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        />
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full py-8">
        {/* Profile Avatar Pill Tag above headline — Features photo in Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="#about"
            className="mb-4 sm:mb-6 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] hover:border-purple-500/40 transition-all duration-300 text-xs font-mono text-gray-300 group"
            title="View About Diaz Joseph"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20 group-hover:border-purple-400">
              <img
                src={personalData.photo}
                alt={personalData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Thejus Engineering College • Year 1 CSE (AI)</span>
          </a>
        </motion.div>

        {/* Oversized Editorial Serif Headline (Matches Reference Layout) */}
        <div className="w-full flex flex-col items-center leading-[0.92] tracking-tight">
          {/* Line 1: HELLO, I'M */}
          <div className="overflow-hidden py-1">
            <motion.h1
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase text-iridescent-glow"
            >
              Hello, I&apos;m
            </motion.h1>
          </div>

          {/* Line 2: DIAZ JOSEPH */}
          <div className="overflow-hidden py-1">
            <motion.h1
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight uppercase text-iridescent-glow"
            >
              Diaz Joseph
            </motion.h1>
          </div>

          {/* Line 3: AI & WEB DEVELOPER */}
          <div className="overflow-hidden py-1">
            <motion.h2
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase text-iridescent-glow"
            >
              AI &amp; Web Developer
            </motion.h2>
          </div>
        </div>

        {/* Floating Circular Badge positioned at bottom-left of center headline (as in reference) */}
        <div className="w-full relative mt-4 sm:mt-6 flex justify-start sm:pl-8 md:pl-16">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <RotatingBadge
              text="REACH OUT AND SAY HI • REACH OUT AND SAY HI • "
              href="#contact"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Quick Bio Left & Social Links Right (Matching Reference) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs font-mono text-gray-400">
        <p className="hidden sm:block max-w-xs text-gray-500 leading-relaxed">
          Crafting intelligent neural models and immersive frontends from Kerala, India.
        </p>

        {/* Social Links on Bottom Right (Like Reference Screenshot) */}
        <div className="flex items-center gap-6 sm:gap-8 ml-auto">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors uppercase tracking-wider relative group py-1"
            >
              {social.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
