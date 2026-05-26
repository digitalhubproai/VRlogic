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

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-center p-6"
    >
      <div className="glass w-full max-w-7xl rounded-full px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Boxes className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">
            VR<span className="text-primary">LOGIC</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Contact Button */}
        <button
          ref={contactBtnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-white text-background px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
