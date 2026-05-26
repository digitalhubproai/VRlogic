"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle scale animation for cinematic feel
    gsap.to(videoRef.current, {
      scale: 1.1,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Initial fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-background"
    >
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,1,24,0.4)_100%)]" />

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-90"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Animated Blur Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
    </div>
  );
};

export default VideoBackground;
