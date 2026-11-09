import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const name = "DIAZ JOSEPH";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    initial: { y: 60, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 + i * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-[#070707] text-white overflow-hidden pointer-events-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-600/20 via-blue-600/15 to-transparent blur-3xl pointer-events-none" />

          {/* Letter by letter name reveal */}
          <div className="relative flex overflow-hidden py-2">
            {name.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className={`font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.2em] text-white ${
                  char === " " ? "w-4 sm:w-6" : ""
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle / status badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Engineer &amp; Web Developer</span>
          </motion.div>

          {/* Progress Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

