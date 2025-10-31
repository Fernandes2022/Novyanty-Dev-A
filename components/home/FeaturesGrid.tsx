"use client";

import { motion } from "framer-motion";
import { Zap, Palette, Smartphone, Globe, Shield, Layout } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create and publish websites quickly with our streamlined workflow"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Professional templates that adapt to your brand"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Perfectly responsive on all devices automatically"
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built-in SEO best practices for better rankings"
  },
  {
    icon: Shield,
    title: "Secure & Fast",
    description: "Enterprise-grade security and performance"
  },
  {
    icon: Layout,
    title: "Intuitive Builder",
    description: "Visual editor for easy website creation"
  }
];

export function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title mb-4">
            Everything You Need, <span className="gradient-text">Built In</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300">
                  <Icon className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-body opacity-80">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
