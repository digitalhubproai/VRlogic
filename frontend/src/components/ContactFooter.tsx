"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Send, Boxes } from "lucide-react";
import Link from "next/link";

const CONTACT_ITEMS = [
  { icon: Mail, label: "EMAIL", value: "hello@vrlogic.io" },
  { icon: Phone, label: "SIGNAL", value: "+1 (888) VRLOGIC" },
  { icon: MapPin, label: "NODE", value: "San Francisco · London · Tokyo" },
];

const FOOTER_LINKS = {
  Platform: ["Neural Interface", "Spatial Grid", "Security Layer", "Analytics"],
  Company: ["About Us", "Careers", "Press Kit", "Investors"],
  Resources: ["Documentation", "API Reference", "Blog", "Status Page"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const ContactFooter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setEmail("");
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <>
      {/* ── CONTACT SECTION ─────────────────────────────────────── */}
      <section id="contact" className="relative py-32 px-6 overflow-hidden">
        {/* Large bg glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/6 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 mb-6"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                  // ESTABLISH CONNECTION
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter font-korvia mb-8"
              >
                READY TO{"\n"}
                <span style={{
                  background: "linear-gradient(135deg, #c026d3 0%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }} className="font-korvia whitespace-pre-line">
                  JACK IN?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/40 text-lg leading-relaxed font-light mb-12 max-w-md"
              >
                Whether you're building from scratch or upgrading an existing
                operation — our neural architects are standing by. Response time:{" "}
                <span className="text-primary font-bold">&lt; 4 hours</span>.
              </motion.p>

              {/* Contact info */}
              <div className="flex flex-col gap-5">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                      <Icon size={18} className="text-white/40 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest font-bold mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium group-hover:text-primary transition-colors">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <h3 className="text-white font-black text-2xl mb-2">Send a Transmission</h3>
              <p className="text-white/30 text-sm mb-8">We'll route it to the right neural node.</p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/30 text-[10px] uppercase tracking-widest font-bold">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.io"
                    className="bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your mission..."
                    className="bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-primary text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 overflow-hidden hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10">
                    {sent ? "TRANSMISSION SENT ✓" : "SEND TRANSMISSION"}
                  </span>
                  {!sent && (
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(192,38,211,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,38,211,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top: Logo + Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Boxes className="text-white" size={22} />
                </div>
                <span className="font-bold text-xl tracking-tighter text-white">
                  VR<span className="text-primary">LOGIC</span>
                </span>
              </Link>
              <p className="text-white/30 text-sm leading-relaxed mb-6">
                Redefining human-machine interaction at the edge of possibility.
              </p>
              {/* Social icons placeholder */}
              <div className="flex gap-3">
                {["X", "Li", "Gh", "Dc"].map((s) => (
                  <div key={s} className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-white/30 text-xs font-bold hover:border-primary/40 hover:text-primary cursor-pointer transition-all">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] font-bold mb-5">{category}</p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-white/20 text-xs">
              © 2026 VRLogic Inc. All rights reserved. Built for the grid.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/20 text-xs uppercase tracking-widest">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;
