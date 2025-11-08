'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide when creating an account (name, email, password), usage data (pages visited, features used, time spent), and technical information (IP address, browser type, device information). We only collect what's necessary to provide and improve our services."
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: "Your data powers the service: account management, website generation and hosting, customer support and communication, service improvements and bug fixes, and sending important updates. We never sell your personal information to third parties."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We use industry-standard encryption (TLS/SSL) for all data transmission, secure servers with regular security audits and monitoring, encrypted database storage for sensitive information, and strict access controls with role-based permissions. Your data is protected at every level."
    },
    {
      icon: Eye,
      title: "Your Rights & Control",
      content: "You own your data completely. You can access and download all your information anytime, export your websites and content in various formats, request data deletion (we'll comply within 30 days), and opt out of non-essential data collection. You have full control."
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: "We use essential cookies for core functionality (login, preferences), analytics cookies to improve our service (you can opt out), and NO advertising or third-party tracking cookies. You control your cookie preferences through your browser settings."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50 backdrop-blur-xl">
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

      {/* Hero Header */}
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
              Your data, your rules. We keep it simple and secure. 🔐
            </p>
            <p className="text-sm text-gray-400">
              Last updated: November 8, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
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
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <section.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Data Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use trusted third-party services to help operate our platform:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Hosting & Infrastructure:</strong> Cloud providers for reliable service delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Payment Processing:</strong> Secure payment gateways (we never store full credit card details)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Analytics:</strong> Anonymous usage data to improve the service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Email Service:</strong> For account notifications and support communications</span>
              </li>
            </ul>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention & Deletion</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We retain your data for as long as your account is active. When you delete your account:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>You have <strong>30 days</strong> to export your data before deletion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>All personal data is permanently deleted within <strong>90 days</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Some data may be retained for legal compliance (tax records, transaction history)</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-dark p-8 rounded-2xl text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-gray-300 mb-6">
              We're transparent about how we handle your data. If you have any questions or concerns, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
                className="inline-flex px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                View Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
