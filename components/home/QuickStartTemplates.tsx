'use client';

import { motion } from 'framer-motion';
import { Sparkles, Briefcase, ShoppingBag, Camera, Code, Heart, Rocket } from 'lucide-react';

const templates = [
  { icon: Briefcase, name: 'Portfolio', prompt: 'Create a modern portfolio website with dark theme, project showcase, and contact form', color: 'from-purple-500 to-blue-500' },
  { icon: ShoppingBag, name: 'E-commerce', prompt: 'Build an online store with product catalog, shopping cart, and checkout page', color: 'from-pink-500 to-red-500' },
  { icon: Camera, name: 'Photography', prompt: 'Design a photography portfolio with image gallery, about page, and booking form', color: 'from-cyan-500 to-blue-500' },
  { icon: Code, name: 'Startup', prompt: 'Create a SaaS landing page with hero section, features, pricing, and sign up form', color: 'from-green-500 to-emerald-500' },
  { icon: Heart, name: 'Blog', prompt: 'Build a personal blog with article listings, reading page, and newsletter signup', color: 'from-orange-500 to-yellow-500' },
  { icon: Rocket, name: 'Agency', prompt: 'Design a creative agency website with services, case studies, team, and contact', color: 'from-indigo-500 to-purple-500' },
];

interface QuickStartTemplatesProps {
  onSelect: (prompt: string) => void;
}

export function QuickStartTemplates({ onSelect }: QuickStartTemplatesProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-sm font-bold text-white">Quick Start Templates</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {templates.map((template, i) => (
          <motion.button
            key={i}
            onClick={() => onSelect(template.prompt)}
            className={`group relative p-3 rounded-xl bg-gradient-to-br ${template.color} bg-opacity-10 border border-white/10 hover:border-white/30 transition-all overflow-hidden`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <template.icon className="w-6 h-6 text-white mx-auto mb-1" />
            <div className="text-xs font-medium text-white text-center">{template.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default QuickStartTemplates;
