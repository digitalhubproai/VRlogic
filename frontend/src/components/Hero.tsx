"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import FeaturePoint from "./FeaturePoint";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const SLIDES = [
  {
    tag: "// NEURAL_LINK_ACTIVE",
    title: "ASCEND INTO THE GRID",
    desc: "Deploy a high-fidelity VR command interface rendering your global operation in real-time.",
  },
  {
    tag: "// SYNAPTIC_FLOW",
    title: "DOMINATE THE UNKNOWN",
    desc: "Neural networks engineer peak efficiency at the speed of thought. Zero latency. Pure dominance.",
  },
  {
    tag: "// GHOST_PROTOCOL",
    title: "ZERO BOUNDARY CONTROL",
    desc: "Step inside the data. Total command over every node in your supply chain.",
  },
];

const AnimatedHeading = ({ text }: { text: string }) => {
  const words = text.split(" ");
  
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tighter mb-8 font-korvia flex flex-wrap select-none perspective-[1200px]">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.5,
              delay: wordIndex * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
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
                  filter: "blur(20px)"
                }}
                animate={{ 
                  opacity: 1, 
                  rotateY: 0, 
                  z: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }}
                transition={{
                  duration: 1.2,
                  delay: (wordIndex * 0.15) + (charIndex * 0.03),
                  ease: [0.34, 1.56, 0.64, 1] // Custom bouncy easing
                }}
                className="inline-block origin-center hover:text-primary transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    fetch("http://localhost:8000/api/features")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch(() => {
        setFeatures([
          { id: 1, title: "Neural Link", description: "", icon: "Zap" },
          { id: 2, title: "Quantum Routing", description: "", icon: "Activity" },
          { id: 3, title: "Bio-Authentication", description: "", icon: "Shield" },
        ]);
      });

    const timer = setInterval(() => {
      handleNext();
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setIsGlitching(false);
    }, 400);
  };

  const handlePrev = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      setIsGlitching(false);
    }, 400);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-32 px-6 overflow-hidden"
    >
      {/* Glitch Overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none bg-primary/20 backdrop-blur-[2px]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content Slider */}
        <div className="z-20 h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isGlitching && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30, skewX: -5 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: 30, skewX: 5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: y2 }}
                className="max-w-3xl"
              >
                <div className="overflow-hidden mb-6">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                    {SLIDES[currentSlide].tag}
                  </motion.div>
                </div>
                
                <AnimatedHeading text={SLIDES[currentSlide].title} />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mb-10 relative"
                >
                  <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed font-light italic">
                    "{SLIDES[currentSlide].desc}"
                  </p>
                  <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-white/20 to-transparent" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-3"
                >
                  <button className="group relative bg-primary text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:scale-105 active:scale-95">
                    <span className="relative z-10">GET STARTED</span>
                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} />
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  
                  <button className="group flex items-center gap-2 px-6 py-3 text-white text-sm font-bold hover:text-primary transition-all duration-300">
                    <PlayCircle size={24} className="group-hover:scale-110 transition-transform" />
                    WATCH DEMO
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex items-center gap-12 mt-20">
            <div className="flex items-end gap-5">
              {SLIDES.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setIsGlitching(true);
                    setTimeout(() => {
                      setCurrentSlide(i);
                      setIsGlitching(false);
                    }, 400);
                  }}
                  className="group relative flex flex-col items-center"
                >
                  <motion.div 
                    animate={{ height: currentSlide === i ? 35 : 10 }}
                    className={`w-[2px] rounded-full transition-all duration-500 ${currentSlide === i ? 'bg-primary shadow-[0_0_15px_rgba(192,38,211,1)]' : 'bg-white/20 group-hover:bg-white/50'}`} 
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group"
              >
                <ChevronLeft size={20} className="text-white group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleNext} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group"
              >
                <ChevronRight size={20} className="text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Feature Points */}
        <div className="relative h-[500px] hidden lg:flex items-center justify-end pr-20">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-10 items-end relative">
            <AnimatePresence mode="wait">
              {!isGlitching && (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="flex flex-col gap-10 items-end"
                >
                  {features.map((feature, index) => (
                    <div key={`${currentSlide}-${feature.id}`} className="relative">
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-primary/30" />
                      <FeaturePoint 
                        title={feature.title}
                        iconName={feature.icon}
                        delay={0.5 + index * 0.1}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
