'use client';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
          Let&apos;s Talk ✉️
        </h1>
        <p className="text-xl text-text-soft">
          Slide into our inbox — we actually reply 😎
        </p>
      </motion.div>
    </section>
  );
}
