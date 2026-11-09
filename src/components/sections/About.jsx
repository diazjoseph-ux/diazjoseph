import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalData } from '../../data/content';
import TitleCard from '../common/TitleCard';

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16 sm:mb-20">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
          01 // About Me
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Interactive Title Card with name "Diaz Joseph" */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <TitleCard />
        </motion.div>

        {/* Right Column: Bio Narrative & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-6 leading-tight">
            Building at the intersection of{' '}
            <span className="italic text-purple-300 font-light">Machine Intelligence</span>{' '}
            and expressive design.
          </h2>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-white/70 text-base sm:text-lg leading-relaxed font-sans mb-10">
            {personalData.aboutBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0f0f15]/80 border border-white/10 hover:border-purple-500/40 transition-colors duration-300 group"
              >
                <div className="font-serif text-2xl sm:text-3xl text-white group-hover:text-purple-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-white/40 mt-0.5 truncate">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
