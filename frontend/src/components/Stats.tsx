"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 99.99, suffix: "%", label: "System Uptime", desc: "Guaranteed SLA across all nodes" },
  { value: 4.2, suffix: "PF", label: "Processing Power", desc: "Petaflops per second, per cluster" },
  { value: 1, suffix: "ms", label: "Latency Target", desc: "Sub-millisecond haptic response" },
  { value: 200, suffix: "+", label: "Engineers", desc: "Neural architects worldwide" },
  { value: 12, suffix: "", label: "Global Nodes", desc: "Operational command centers" },
  { value: 850, suffix: "M+", label: "Events Processed", desc: "Daily across the grid" },
];

function useCountUp(target: number, duration = 2, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(target % 1 !== 0 ? 2 : 0)));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const StatCard = ({ stat, index }: { stat: typeof STATS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value, 2.0, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 sm:p-8 border border-white/5 rounded-2xl bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
    >
      {/* Subtle radial glow on hover inside the card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at center, rgba(192, 38, 211, 0.04) 0%, transparent 70%)" }}
      />

      {/* Sleek top-left tiny corner tick mark */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-transparent group-hover:border-primary/30 transition-all duration-300" />

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl sm:text-5xl font-black font-azonix text-white tabular-nums tracking-tight">
          {stat.value % 1 !== 0 ? count.toFixed(2) : Math.round(count)}
        </span>
        <span className="text-primary font-azonix text-xl font-black">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-white font-bold text-sm sm:text-base mb-1 tracking-wide group-hover:text-primary transition-colors duration-300">
        {stat.label}
      </h3>

      {/* Desc */}
      <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed">
        {stat.desc}
      </p>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#0a0118]">
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header split line divider */}
        <div className="flex items-center gap-6 mb-16" ref={ref}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
            BY THE NUMBERS
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Clean 6-card grid layout matching original structure */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
