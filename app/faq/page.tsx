'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How quickly can I build a website?",
        a: "Most websites are ready in about 50 seconds. You describe what you want, we handle the rest. You can then customize and deploy immediately."
      },
      {
        q: "Do I need coding experience?",
        a: "Not at all. Creative Workspace is built for everyone. If you can describe your vision, you can build it. No HTML, CSS, or JavaScript knowledge required."
      },
      {
        q: "What kind of websites can I create?",
        a: "Portfolios, landing pages, business sites, blogs, product showcases—pretty much anything. If you need custom functionality, you can add it or request it."
      }
    ]
  },
  {
    category: "Features & Capabilities",
    questions: [
      {
        q: "Can I customize the generated design?",
        a: "Absolutely. Every element is customizable. Colors, fonts, layouts, content—change whatever you want. Or start fresh with a new generation."
      },
      {
        q: "Is it mobile-friendly?",
        a: "Yes. Every website automatically works perfectly on phones, tablets, and desktops. No extra work needed."
      },
      {
        q: "Can I use my own domain?",
        a: "Yes. Connect any domain you own, or use our free subdomain to start. Domain connection takes just a few clicks."
      }
    ]
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        q: "Is there a free plan?",
        a: "Yes. Start building immediately with our free plan. Create and publish your first site without entering a card. Upgrade when you're ready for more features."
      },
      {
        q: "What happens if I cancel?",
        a: "Your sites stay live. You can keep using them, but you won't be able to create new ones or access premium features. No tricks, no data hostage situations."
      },
      {
        q: "Can I export my website?",
        a: "Yes. On paid plans, you can export all your code and assets. Take your site anywhere—you own it completely."
      }
    ]
  },
  {
    category: "Technical Questions",
    questions: [
      {
        q: "How fast will my site load?",
        a: "Fast. We optimize everything automatically—images, code, hosting. Most sites load in under 2 seconds globally."
      },
      {
        q: "Is it SEO-friendly?",
        a: "Yes. Clean code, proper meta tags, fast loading, mobile-responsive—all the SEO fundamentals are handled automatically."
      },
      {
        q: "What about security and uptime?",
        a: "We use enterprise-grade hosting with 99.9% uptime. SSL certificates included. Automatic backups. DDoS protection. Your site is safe."
      }
    ]
  },
  {
    category: "Support",
    questions: [
      {
        q: "What if I get stuck?",
        a: "We're here to help. Email support, documentation, video tutorials, and community forums. Most questions get answered within a few hours."
      },
      {
        q: "Can you build it for me?",
        a: "While Creative Workspace is designed to be self-service, we offer custom development services for complex projects. Contact us for pricing."
      },
      {
        q: "Do you offer refunds?",
        a: "Yes. 30-day money-back guarantee on all paid plans. If you're not happy, we'll refund you—no questions asked."
      }
    ]
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-dark rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-semibold text-white pr-4">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-purple-400 flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-purple-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-4"
        >
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Everything you need to know about Creative Workspace
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark p-12 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're here to help. Reach out and we'll get back to you quickly.
            </p>
            <Link
              href="/"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
