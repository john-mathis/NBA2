// app/components/StatBar.tsx
"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Live Games", value: "8" },
  { label: "Players Tracked", value: "482" },
  { label: "Average PPG", value: "113.6" },
  { label: "3PT %", value: "36.2%" },
  { label: "Pace Index", value: "101.4" },
];

export default function StatBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 0 60px rgba(255,30,30,0.2)",
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      className="relative z-10 w-[10rem] md:w-[45rem] lg:w-[50rem] my-12 overflow-hidden bg-gradient-to-r from-black/80 via-black/70 to-black/80 border-t border-white/10 backdrop-blur-xl shadow-[0_-10px_40px_rgba(255,30,30,0.15)]"
    >
      {/* Animated Inner Glow Sweep (kept inside bounds) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#ff1e1e]/10 to-transparent blur-xl"
        />
      </div>

      {/* Stats */}
      <div className="relative flex flex-wrap justify-center gap-12 py-8 text-center text-gray-300 text-sm sm:text-base">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-white font-bold text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-[#ff1e1e] to-[#b31313] bg-clip-text text-transparent">
              {stat.value}
            </span>
            <span className="uppercase tracking-widest text-[11px] sm:text-xs text-gray-400">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Red glow beneath */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#ff1e1e]/30 blur-[160px] opacity-50" />
    </motion.div>
  );
}
