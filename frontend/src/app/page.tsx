"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoBackground from "@/components/VideoBackground";
import StickyAbout from "@/components/StickyAbout";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import ContactFooter from "@/components/ContactFooter";

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 38, 211, 0.05), transparent 40%)`,
      }}
    />
  );
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <MouseGlow />
      {/* Hero – video background scoped to this section only */}
      <div className="relative min-h-screen overflow-hidden">
        <VideoBackground />
        <Navbar />
        <Hero />
      </div>


      {/* About – sticky scroll, images swap as you scroll */}
      <StickyAbout />

      {/* Stats – animated count-up numbers */}
      <Stats />

      {/* Services – 6 hover cards */}
      <Services />

      {/* Blog – 3 article cards */}
      <Blog />

      {/* Contact form + Footer */}
      <ContactFooter />
    </main>
  );
}
