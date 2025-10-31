"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Zap, Award } from "lucide-react";

const badges = [
  { icon: Shield, text: "Enterprise Security" },
  { icon: Lock, text: "GDPR Compliant" },
  { icon: Zap, text: "99.9% Uptime" },
  { icon: Award, text: "Award Winning" }
];

export function TrustBadges() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-small opacity-70"
              >
                <Icon className="h-5 w-5 text-green-400" />
                <span>{badge.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
