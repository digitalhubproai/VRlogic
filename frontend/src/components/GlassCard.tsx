"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface GlassCardProps {
  title: string;
  description: string;
  iconName: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, description, iconName, delay = 0 }) => {
  const Icon = (Icons as any)[iconName] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0, 0.71, 0.2, 1.01] 
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-dark p-3 rounded-xl w-44 group cursor-pointer"
    >
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
        {Icon && <Icon className="text-primary" size={16} />}
      </div>
      <h3 className="text-white font-bold text-sm mb-1 font-orbitron">{title}</h3>
      <p className="text-white/50 text-[9px] leading-tight">
        {description}
      </p>
      
      <div className="mt-4 flex justify-end">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
          <Icons.ArrowUpRight className="text-white/30 group-hover:text-primary" size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
