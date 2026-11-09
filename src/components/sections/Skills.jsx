import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Database,
  Eye,
  GitBranch,
  Globe,
  Palette,
  Sparkles,
} from 'lucide-react';
import { skillsData } from '../../data/content';

// Map icon strings to Lucide components
const iconMap = {
  Terminal: Terminal,
  Database: Database,
  Cpu: Cpu,
  Eye: Eye,
  Binary: Brain,
  Code2: Code2,
  FileCode: Code2,
  Palette: Palette,
  Layers: Layers,
  Globe: Globe,
  Network: Layers,
  GitBranch: GitBranch,
  TerminalSquare: Terminal,
};

function SkillCategoryCard({ category, index, isInView }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl bg-[#0d0d13] border border-white/10 p-6 sm:p-8 overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
    >
      {/* Interactive cursor spotlight inside card */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
        }}
      />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-2xl text-white group-hover:text-purple-300 transition-colors">
          {category.title}
        </h3>
        <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:border-purple-400 group-hover:text-purple-300 transition-all">
          <Sparkles className="w-4 h-4" />
        </span>
      </div>

      <p className="text-white/60 text-sm mb-6 font-sans">
        {category.description}
      </p>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, sIdx) => {
          const IconComponent = iconMap[skill.icon] || Code2;
          return (
            <div
              key={sIdx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-200 text-xs font-mono"
            >
              <IconComponent className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-white/90">{skill.name}</span>
              <span className="text-[10px] text-white/40 border-l border-white/10 pl-2">
                {skill.level}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
          02 // Tech Stack &amp; Skills
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent" />
      </div>

      <div className="mb-14">
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
          Tools, frameworks, and foundational{' '}
          <span className="italic text-purple-300 font-light">intelligence</span>.
        </h2>
      </div>

      {/* Infinite Animated Marquee Ribbon */}
      <div className="relative w-full overflow-hidden mb-16 py-4 border-y border-white/10 bg-black/30">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...skillsData.marquee, ...skillsData.marquee].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 mx-4 font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillsData.categories.map((category, idx) => (
          <SkillCategoryCard
            key={idx}
            category={category}
            index={idx}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}
