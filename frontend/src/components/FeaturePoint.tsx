"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FeaturePointProps {
  title: string;
  iconName: string;
  delay?: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({ title, iconName, delay = 0 }) => {
  const Icon = (Icons as any)[iconName] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: "easeOut" 
      }}
      whileHover={{ x: -10, transition: { duration: 0.2 } }}
      className="flex items-center gap-4 group cursor-pointer py-2"
    >
      <div className="relative">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          {Icon && <Icon className="text-primary group-hover:text-white transition-colors" size={14} />}
        </div>
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm tracking-wider font-orbitron uppercase group-hover:text-primary transition-colors">
          {title}
        </span>
        <div className="w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default FeaturePoint;
