'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Users, Database, Globe } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide when creating an account (name, email), usage data (pages visited, features used), and technical information (IP address, browser type, device). We only collect what's necessary to provide our services."
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: "Your data powers the service: account management, website generation, customer support, service improvements, and important updates. We never sell your personal information to third parties."
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We use industry-standard encryption (TLS/SSL) for data transmission, secure servers with regular security audits, encrypted database storage, and strict access controls. Your data is protected at every level."
    },
    {
      icon: Lock,
      title: "Your Rights",
      content: "You own your data. You can access, download, or delete your information anytime. Export your websites and content whenever you want. Request data deletion and we'll comply within 30 days."
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: "We don't sell your data. We only share information when legally required, with service providers under strict contracts, or with your explicit consent. Your trust matters to us."
    },
    {
      icon: Globe,
      title: "Cookies & Tracking",
      content: "We use essential cookies for functionality, analytics cookies to improve our service (you can opt out), and no advertising or tracking cookies. You control your cookie preferences."
    }
  ];

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
            <Shield className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Privacy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              We take your privacy seriously. Here's exactly how we handle your data.
            </p>
            <p className="text-sm text-gray-400">
              Last updated: November 3, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-dark p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl flex-shrink-0">
                  <section.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-dark p-8 rounded-2xl text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-gray-300 mb-6">
              We're here to help. Reach out if you have any questions about how we handle your data.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
