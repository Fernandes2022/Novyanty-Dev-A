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
  // Duplicate for seamless loop
  const duplicatedTemplates = [...templates, ...templates, ...templates];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-sm font-bold text-white">Quick Start Templates</h3>
      </div>
      
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-3"
          animate={{
            x: [0, -150 * templates.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedTemplates.map((template, i) => (
            <motion.button
              key={i}
              onClick={() => onSelect(template.prompt)}
              className={`group relative p-4 rounded-xl bg-gradient-to-br ${template.color} bg-opacity-10 border border-white/10 hover:border-white/30 transition-all overflow-hidden flex-shrink-0 w-36`}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <template.icon className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-sm font-medium text-white text-center">{template.name}</div>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

export default QuickStartTemplates;
