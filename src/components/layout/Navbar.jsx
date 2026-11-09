import React, { useState, useEffect } from "react";
import { Mail, Menu, X, ArrowUpRight } from "lucide-react";
import { personalData, navLinks } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#070707]/80 backdrop-blur-md border-b border-white/[0.06]"
          : "py-6 sm:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand / Name — Reference Style Serif Logo */}
        <a
          href="#"
          className="group flex flex-col tracking-tight"
          aria-label="Diaz Joseph - Home"
        >
          <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-iridescent transition-all">
            {personalData.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
            Portfolio '26
          </span>
        </a>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-8">
          {/* Circular Mail Icon CTA (Direct Reference from top right of screenshot) */}
          <a
            href={`mailto:${personalData.email}`}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-purple-400 bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 group"
            title={`Email ${personalData.name}`}
            aria-label="Send direct email"
          >
            <Mail className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm text-gray-300 hover:text-white transition-colors duration-200 py-1 group font-medium"
              >
                {link.name}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-400 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Quick CTA */}
          <a
            href="#contact"
            className="text-xs uppercase tracking-wider font-mono px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#070707]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl text-gray-200 hover:text-white flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-5 h-5 text-gray-500" />
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">
              {personalData.roleLine}
            </span>
            <a
              href={`mailto:${personalData.email}`}
              className="text-xs font-mono text-purple-400 hover:underline"
            >
              {personalData.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
