"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Layers, Shield, Zap, Globe, Eye } from "lucide-react";

const SERVICES = [
  { icon: Brain, title: "Neural Interface", desc: "Immersive VR experiences responding to bio-signals for peak performance." },
  { icon: Globe, title: "Spatial Computing", desc: "Mapping and monitoring your global physical locations via a unified command hub." },
  { icon: Shield, title: "Biometric Security", desc: "Zero-trust, quantum-encrypted security for your most critical operational data." },
  { icon: Zap, title: "Analytics Engine", desc: "High-speed AI-driven insights to detect and mitigate operational anomalies." },
  { icon: Layers, title: "Reality Stack", desc: "Seamless integration of AR overlays with full VR immersion for unified workflows." },
  { icon: Eye, title: "Predictive AI", desc: "Advanced foresight models to anticipate events and optimize decision-making." },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-[#0a0118]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-korvia uppercase">Core Services</h2>
          <div className="w-20 h-1 bg-primary"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
