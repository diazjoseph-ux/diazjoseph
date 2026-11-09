import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Milestone, Calendar, ArrowRight } from 'lucide-react';
import { journeyTimeline } from '../../data/content';

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center mb-16 sm:mb-20 ${
      isEven ? 'md:flex-row-reverse' : ''
    }`}>
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 px-0 md:px-10"
      >
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0b10] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
          {/* Year and Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {item.year}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
              {item.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl text-white group-hover:text-purple-300 transition-colors mb-2">
            {item.title}
          </h3>

          {/* Institution */}
          <p className="text-xs font-mono uppercase tracking-wider text-purple-400/80 mb-4">
            {item.institution}
          </p>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed font-sans">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Center glowing node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-5 h-5 rounded-full bg-[#070707] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.8)] z-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </motion.div>
      </div>

      {/* Empty space for opposite side on desktop */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}

export default function Journey() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
          04 // Evolution &amp; Journey
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent" />
      </div>

      <div className="mb-20">
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
          The path from curiosity to{' '}
          <span className="italic text-purple-300 font-light">engineering</span>.
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Static background track (hidden on mobile) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/10" />

        {/* Dynamic Glowing Drawn Path that fills on scroll */}
        <motion.div
          style={{ scaleY }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.8)] z-0"
        />

        {/* Timeline Items */}
        <div className="relative z-10">
          {journeyTimeline.map((item, idx) => (
            <TimelineItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
