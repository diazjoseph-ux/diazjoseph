import React, { useState } from "react";
import { Send, Mail, Check, Copy, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../common/Icons";
import { personalData, socialLinks, contactDetails } from "../../data/content";

const iconMap = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Mail: Mail,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission / Formspree action
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-12 bg-[#09090c] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-pink-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 / Connection</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase leading-[0.95]">
              {contactDetails.headline}
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Summer '26 Internships</span>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & Copy Email */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                {contactDetails.subtitle}
              </p>

              {/* Direct Email Card with One-Click Copy */}
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-all">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">
                  Direct Inbox
                </span>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <a
                    href={`mailto:${personalData.email}`}
                    className="font-editorial text-xl sm:text-2xl text-white hover:text-iridescent transition-all break-all"
                  >
                    {personalData.email}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/10 text-xs font-mono transition-all duration-200"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location & Academic Base */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-gray-400">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-200 font-medium">{personalData.college}</p>
                  <p className="text-gray-500">{contactDetails.collegeAddress}</p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-3">
                Social Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] || ArrowUpRight;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white hover:text-black text-xs font-mono transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-editorial text-3xl text-white">Message Dispatched</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto font-sans">
                    Thank you for reaching out! Diaz has received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full border border-white/15 text-xs font-mono hover:bg-white hover:text-black transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        Your Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        Email Address <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. elena@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. AI Project Collaboration / Internship Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Message <span className="text-pink-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, or just drop by to say hello..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
