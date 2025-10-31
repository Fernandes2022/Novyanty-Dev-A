"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Creative Workspace?",
    answer: "Creative Workspace is a powerful website builder platform that helps you create professional websites without any coding knowledge. Our intuitive tools make web design accessible to everyone."
  },
  {
    question: "How does the composition engine work?",
    answer: "Our composition engine provides smart templates and layout suggestions based on your content. You describe what you need, and our system helps organize it into a beautiful, professional design."
  },
  {
    question: "Do I need coding skills?",
    answer: "Absolutely not! Our platform is designed for everyone. Use our visual editor to create, customize, and publish your website - no coding required."
  },
  {
    question: "What's included in the free tier?",
    answer: "The free plan includes 3 website projects, access to basic templates, community support, subdomain hosting, and full mobile responsiveness. Perfect for getting started!"
  },
  {
    question: "Can I export my projects?",
    answer: "Yes! Premium users can export projects in multiple formats and deploy to custom domains. You own your content and can take it anywhere."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. We use enterprise-grade encryption, regular backups, and industry-standard security practices to keep your data safe and protected."
  },
  {
    question: "How do I upgrade to premium?",
    answer: "You can upgrade anytime from your account dashboard. Choose the plan that fits your needs, and you'll get instant access to all premium features."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-section-title mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-body opacity-80">
            Everything you need to know about our platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-body opacity-80 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
