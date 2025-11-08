'use client';
import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <div className="glass rounded-2xl overflow-hidden h-96">
          {/* Placeholder for map - can be replaced with Google Maps iframe */}
          <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
            <p className="text-text-soft text-lg">🗺️ Map Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
