"use client";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../theme-toggle";

const faqs = [
  {
    question: "What is Creative Workspace?",
    answer: "Creative Workspace is an adaptive composition platform that helps you create, edit, and deploy stunning interfaces with intelligent assistance."
  },
  {
    question: "How does the composition engine work?",
    answer: "Our platform uses adaptive algorithms to help you assemble layouts dynamically. You provide directives, and the system renders optimized compositions."
  },
  {
    question: "What's included in the free tier?",
    answer: "Free tier includes unlimited saves, live previews, and deployment to our subdomains. Premium features unlock custom domains, advanced exports, and priority rendering."
  },
  {
    question: "Can I export my projects?",
    answer: "Yes! Premium users can export projects in multiple formats and deploy to custom domains."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and security measures to protect your data and projects."
  },
  {
    question: "How do I upgrade to premium?",
    answer: "Click the 'Go Live' button and choose your plan. Upgrade instantly with secure payment processing."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Creative Workspace</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about Creative Workspace
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t-2 border-gray-100 dark:border-gray-800 pt-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-lg transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
