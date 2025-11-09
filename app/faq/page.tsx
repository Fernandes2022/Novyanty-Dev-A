'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const faqs = [
  {
    question: "What is Creative Workspace?",
    answer: "Creative Workspace is an AI-powered platform that helps you create stunning visual content, manage projects, and collaborate with your team - all in one place."
  },
  {
    question: "How does the pricing work?",
    answer: "We offer flexible pricing plans starting from free for individuals to enterprise plans for teams. You only pay for what you use, with no hidden fees."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period. Check our refund policy for more details."
  },
  {
    question: "What file formats do you support?",
    answer: "We support all major file formats including PNG, JPG, SVG, PDF, MP4, and more. You can export your work in any format you need."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use industry-standard encryption and security measures to protect your data. Read our privacy policy to learn more about how we handle your information."
  },
  {
    question: "Do you offer custom development?",
    answer: "While Creative Workspace is designed to be self-service, we offer custom development services for complex projects. Contact us for pricing."
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up for a free account, explore our templates, and start creating! Our intuitive interface makes it easy to get started in minutes."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer email support for all users, with priority support for premium subscribers. Our comprehensive documentation and video tutorials are also available 24/7."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1E293B]">

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="h-16 w-16 text-accent-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                Questions
              </span>
            </h1>
            <p className="text-xl text-text-soft">
              Find answers to common questions about Creative Workspace
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`h-5 w-5 ${openIndex === index ? 'text-accent-primary' : 'text-text-soft'}`} />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-text-soft">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass p-8 md:p-12 rounded-2xl text-center border-2 border-accent-primary/20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-text-soft mb-8">
              We're here to help. Reach out and we'll get back to you quickly.
            </p>
            <Link
              href="/contact#contact-form"
              className="group relative inline-flex px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold overflow-hidden transition-all shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary blur-xl opacity-0"
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Contact Support
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
