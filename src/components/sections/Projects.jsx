import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Sparkles, Layers, ExternalLink } from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { projectsData } from "../../data/content";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [floatingPos, setFloatingPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Mouse move handler for cursor image reveal
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // Smooth lerp for floating preview reveal
  useEffect(() => {
    let rafId;
    const lerp = () => {
      setFloatingPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(lerp);
    };
    rafId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(rafId);
  }, [cursorPos]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 px-6 sm:px-12 bg-[#09090c] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cursor Follow Image Reveal Element (Desktop only) */}
      {hoveredProject && (
        <div
          className="fixed pointer-events-none z-50 hidden lg:block -ml-36 -mt-24 transition-opacity duration-300"
          style={{
            transform: `translate3d(${floatingPos.x}px, ${floatingPos.y}px, 0) rotate(3deg)`,
            opacity: hoveredProject ? 1 : 0,
          }}
        >
          <div className="w-72 h-44 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900/90 backdrop-blur-md p-1.5">
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-pink-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 / Selected Works</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight uppercase">
              Featured Projects
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span>Hover to preview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span>AI &amp; Interactive Web</span>
          </div>
        </div>

        {/* Projects Cards Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative rounded-3xl p-8 bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 hover:-translate-y-2.5 transition-all duration-500 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

              <div>
                {/* Image Preview Container */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Project Category Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-300">
                    {project.category}
                  </div>
                </div>

                {/* Title & Index */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white group-hover:text-iridescent transition-all">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlight line */}
                <div className="mb-6 flex items-center gap-2 text-xs font-mono text-purple-300/90 bg-purple-500/10 px-3 py-2 rounded-xl border border-purple-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>{project.highlight}</span>
                </div>
              </div>

              {/* Tags & Action Links */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-gray-300"
                    title="View GitHub Repository"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-xs font-mono font-medium"
                    aria-label={`View live demo for ${project.title}`}
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
