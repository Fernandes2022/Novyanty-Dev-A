'use client';
import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Office',
    content: '123 Creative Street\nSan Francisco, CA 94102',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Mail,
    title: 'Support Email',
    content: 'support@creativeworkspace.com',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MessageCircle,
    title: 'Social',
    content: '@creativeworkspace',
    color: 'from-yellow-500 to-orange-500'
  }
];

export default function ContactInfoGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-text-soft whitespace-pre-line">{item.content}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
