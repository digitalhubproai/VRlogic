"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

const POSTS = [
  {
    number: "01",
    category: "Research",
    readTime: "8 min",
    title: "The NeuroSync™ Protocol: How We Achieved Sub-1ms Haptic Latency",
    excerpt:
      "A deep-dive into the proprietary signal processing pipeline that makes real-time bio-feedback possible at scale across distributed VR nodes.",
    gradient: "from-primary/20 to-transparent",
    date: "MAY 2026",
  },
  {
    number: "02",
    category: "Engineering",
    readTime: "12 min",
    title: "Quantum Encryption in Spatial Computing: Architecting Zero-Trust VR",
    excerpt:
      "How we combined post-quantum cryptography with biometric authentication to build the most secure enterprise VR platform ever deployed.",
    gradient: "from-purple-600/20 to-transparent",
    date: "APR 2026",
  },
  {
    number: "03",
    category: "Vision",
    readTime: "6 min",
    title: "2030 Forecast: When Every Enterprise Decision Lives Inside the Grid",
    excerpt:
      "Our predictive models show 74% of Fortune 500 enterprises will conduct core operations in immersive spatial environments within 4 years.",
    gradient: "from-accent/20 to-transparent",
    date: "MAR 2026",
  },
];

const BlogCard = ({ post, index }: { post: typeof POSTS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-500 bg-white/[0.02]"
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${post.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
              <Tag size={10} />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/30 uppercase tracking-wider">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>
          <span className="text-white/20 font-azonix text-sm">{post.number}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-black text-xl leading-tight mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/40 text-sm leading-relaxed flex-1 font-light mb-8">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <span className="text-white/20 text-xs uppercase tracking-widest">{post.date}</span>
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            READ MORE
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(192,38,211,0.05) 0%, transparent 60%)" }}
      />
    </motion.article>
  );
};

const Blog = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 mb-6"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                // TRANSMISSIONS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter font-korvia"
            >
              FROM THE{" "}
              <span style={{
                background: "linear-gradient(135deg, #c026d3 0%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }} className="font-korvia">
                GRID
              </span>
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="group flex items-center gap-2 text-white/40 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            ALL POSTS
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
