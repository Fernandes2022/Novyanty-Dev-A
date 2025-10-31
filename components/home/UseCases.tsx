"use client";

import { motion } from "framer-motion";
import { Store, Briefcase, GraduationCap, Heart, Code, Camera } from "lucide-react";

const useCases = [
  {
    icon: Store,
    title: "E-Commerce",
    description: "Launch your online store with product galleries"
  },
  {
    icon: Briefcase,
    title: "Business",
    description: "Professional websites for agencies"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Course platforms and resources"
  },
  {
    icon: Heart,
    title: "Portfolio",
    description: "Showcase your work beautifully"
  },
  {
    icon: Code,
    title: "SaaS",
    description: "Product pages and landing pages"
  },
  {
    icon: Camera,
    title: "Creative",
    description: "Artist portfolios and showcases"
  }
];

export function UseCases() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title mb-4">
            Perfect for <span className="gradient-text">Every Project</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-purple-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                <p className="text-small opacity-70">{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
