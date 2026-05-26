"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Boxes } from "lucide-react";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial reveal animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  // Magnetic effect for Contact button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!contactBtnRef.current) return;
    const btn = contactBtnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!contactBtnRef.current) return;
    gsap.to(contactBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 sm:p-6"
    >
      <div className="glass w-full max-w-7xl rounded-full px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shrink-0">
            <Boxes className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tighter text-white">
            VR<span className="text-primary">LOGIC</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Home", "About", "Services", "Blog"].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side: Button + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            ref={contactBtnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden sm:flex bg-white text-background px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
          >
            Contact Us
          </button>
          
          {/* Hamburger */}
          <button 
            className="md:hidden p-2 text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-black/90 border border-white/10 rounded-2xl p-6 md:hidden flex flex-col gap-4"
          >
            {["Home", "About", "Services", "Blog"].map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-lg font-bold text-white p-2 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
            <button className="bg-primary text-white py-3 rounded-xl font-bold mt-2">
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
