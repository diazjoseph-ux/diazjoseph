import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const nameLetters = "DIAZ JOSEPH".split("");

  useEffect(() => {
    const duration = 1600; // ms
    const intervalTime = 16;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 700);
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070707] text-white selection:bg-none"
        >
          {/* Subtle glowing ambient behind letters */}
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl pointer-events-none" />

          {/* Letter by letter animation */}
          <div className="overflow-hidden flex items-center justify-center space-x-1 sm:space-x-3 mb-6">
            {nameLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider ${
                  letter === " " ? "w-4 sm:w-6" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle & Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-[0.25em]">
              AI &amp; Web Developer
            </p>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-28 sm:w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75"
                  style={{ width: `${Math.round(count)}%` }}
                />
              </div>
              <span className="font-mono text-xs text-gray-500 w-8 tabular-nums">
                {Math.round(count)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
