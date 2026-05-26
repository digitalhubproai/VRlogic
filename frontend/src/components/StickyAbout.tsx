"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { Users, Cpu, Globe, Zap } from "lucide-react";

const STEPS = [
  {
    tag: "// PHASE_01: WHO WE ARE",
    num: "01",
    title: "BORN FROM THE FUTURE",
    desc: "VRLogic was forged at the intersection of quantum computing and human imagination. We architect immersive realities. 200+ neural engineers, 12 global nodes.",
    stats: [
      { icon: Users, val: "200+", label: "Engineers" },
      { icon: Globe, val: "12", label: "Global Nodes" },
    ],
    image: "/about-04.png",
    chip: "Est. 2019 · San Francisco",
  },
  {
    tag: "// PHASE_02: OUR MISSION",
    num: "02",
    title: "TRANSCEND PHYSICAL LIMITS",
    desc: "We exist to eliminate the boundary between the digital and physical worlds. Every experience we design is a step toward a future where human potential has no ceiling.",
    stats: [
      { icon: Zap, val: "99.9%", label: "SLA Uptime" },
      { icon: Cpu, val: "4.2PF", label: "Processing" },
    ],
    image: "/about-01.png",
    chip: "Mission Zero · Sub-1ms",
  },
  {
    tag: "// PHASE_03: OUR TECHNOLOGY",
    num: "03",
    title: "QUANTUM NEURAL ARCHITECTURE",
    desc: "Powered by proprietary NeuroSync™ algorithms, our platform processes petaflops of spatial data per second. Real-time haptic feedback, bio-authentication.",
    stats: [
      { icon: Zap, val: "<1ms", label: "Latency" },
      { icon: Cpu, val: "850M", label: "Events/Day" },
    ],
    image: "/about-02.png",
    chip: "NeuroSync™ v4 · Core",
  },
  {
    tag: "// PHASE_04: OUR VISION",
    num: "04",
    title: "INFINITE POSSIBILITY",
    desc: "By 2030, every enterprise decision will live inside an immersive data environment. VRLogic's Infinite Grid connects 1 billion nodes in real-time.",
    stats: [
      { icon: Globe, val: "1B+", label: "Data Nodes" },
      { icon: Users, val: "2030", label: "Target Year" },
    ],
    image: "/about-03.png",
    chip: "Grid Expansion · 2030",
  },
];

const AnimatedHeading = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tighter mb-6 font-korvia flex flex-wrap select-none perspective-[1200px]">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="inline-block flex"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ 
                  opacity: 0, 
                  rotateY: 90, 
                  z: -100,
                  scale: 0.5,
                  filter: "blur(10px)"
                }}
                animate={{ 
                  opacity: 1, 
                  rotateY: 0, 
                  z: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }}
                transition={{
                  duration: 0.8,
                  delay: (wordIndex * 0.1) + (charIndex * 0.02),
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="inline-block origin-center hover:text-primary transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

function useActiveIndex(scrollYProgress: any) {
  const raw = useTransform(scrollYProgress, (v: number) =>
    Math.min(Math.floor(v * STEPS.length), STEPS.length - 1)
  );
  const [index, setIndex] = useState(0);
  useEffect(() => raw.on("change", (v: number) => setIndex(Math.round(v))), [raw]);
  return index;
}

export default function StickyAbout() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ height: `${STEPS.length * 100}vh` }}
      className="relative w-full bg-[#0a0118]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <Inner scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

function Inner({ scrollYProgress }: { scrollYProgress: any }) {
  const index = useActiveIndex(scrollYProgress);
  const step = STEPS[index];

  return (
    <div className="relative w-full h-full flex items-center">
      
      {/* ══════════════════════════════════
          LEFT SIDE — Spacious copy matching Hero
      ══════════════════════════════════ */}
      <div className="relative z-20 flex flex-col justify-center w-full lg:w-[48%] px-6 sm:px-12 md:px-16 xl:px-24 py-20">
        
        {/* Slashed tech status tag */}
        <div className="overflow-hidden mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
            {step.tag}
          </div>
        </div>

        {/* Dynamic content wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Title with bouncy character entry */}
            <AnimatedHeading key={index} text={step.title} />

            {/* Description with left border line (Hero style) */}
            <div className="mb-8 relative pl-8">
              <p className="text-white/50 text-base md:text-lg leading-relaxed font-light italic">
                "{step.desc}"
              </p>
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-white/20 to-transparent" />
            </div>

            {/* Clean, minimalist stats readouts */}
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-2">
              {step.stats.map((s, si) => {
                const Icon = s.icon;
                return (
                  <div key={si} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl font-azonix leading-none mb-1.5">
                        {s.val}
                      </p>
                      <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-black">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls / Timeline indicators */}
            <div className="flex items-center gap-12 mt-12">
              <div className="flex items-end gap-5">
                {STEPS.map((_, i) => (
                  <div key={i} className="group relative flex flex-col items-center">
                    <motion.div
                      animate={{ height: index === i ? 35 : 10 }}
                      className={`w-[2px] rounded-full transition-all duration-500 ${
                        index === i 
                          ? "bg-primary shadow-[0_0_15px_rgba(192,38,211,1)]" 
                          : "bg-white/20"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                PHASE 0{index + 1} / 0{STEPS.length}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════
          RIGHT SIDE — Borderless image blending into the background (Hero background style)
      ══════════════════════════════════ */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover brightness-[0.6] contrast-[1.05]"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Seamless blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118] via-[#0a0118]/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118]/30 via-transparent to-transparent z-10" />

        {/* Subtle Phase Indicator Chip - Top Right */}
        <div className="absolute top-12 right-12 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-4 py-1.5 bg-black/60 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/70"
            >
              {step.chip}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
