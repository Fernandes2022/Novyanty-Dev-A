'use client';
import { useEffect } from 'react';


import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy - Creative Workspace";
    const metaDesc = document.querySelector("meta[name=\"description\"]");
    if (metaDesc) metaDesc.setAttribute("content", "Learn how Creative Workspace protects your data and privacy.");
  }, []);
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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="h-16 w-16 text-accent-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Data,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                Your Rules 🔐
              </span>
            </h1>
            <p className="text-xl text-text-soft">
              We keep it simple — privacy without the legal fog.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
      </div>

      {/* Privacy Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent-primary/10 rounded-xl">
                <Database className="h-6 w-6 text-accent-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Information We Collect</h2>
                <p className="text-text-soft">
                  We only collect what improves your experience (like crash logs & analytics).
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-soft">
                When you use Creative Workspace, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-text-soft">
                <li>Account information (email, name) when you sign up</li>
                <li>Usage data to improve our services</li>
                <li>Device and browser information for compatibility</li>
                <li>Cookies for authentication and preferences</li>
              </ul>
            </div>
          </motion.div>

          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-30" />

          {/* How We Use Your Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent-secondary/10 rounded-xl">
                <Eye className="h-6 w-6 text-accent-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">How We Use Your Data</h2>
                <p className="text-text-soft">
                  Your data helps us deliver a better experience.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-soft">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-text-soft">
                <li>Provide and maintain our services</li>
                <li>Send important updates and notifications</li>
                <li>Improve features based on usage patterns</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </motion.div>

          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-30" />

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent-primary/10 rounded-xl">
                <Lock className="h-6 w-6 text-accent-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Data Security</h2>
                <p className="text-text-soft">
                  We take security seriously and use industry-standard protection.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-soft">Your data is protected through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-text-soft">
                <li>Encrypted connections (HTTPS/SSL)</li>
                <li>Secure database storage</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Automatic backup systems</li>
              </ul>
            </div>
          </motion.div>

          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-30" />

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent-secondary/10 rounded-xl">
                <UserCheck className="h-6 w-6 text-accent-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Rights</h2>
                <p className="text-text-soft">
                  You have full control over your personal data.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-soft">You can:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-text-soft">
                <li>Access your personal data at any time</li>
                <li>Request data correction or deletion</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Delete your account permanently</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass p-8 rounded-2xl border-2 border-accent-primary/20 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-text-soft mb-6">
              We're here to help. Reach out if you have any concerns about your data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="group relative inline-flex px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold overflow-hidden transition-all hover:border-accent-primary/50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Back to Home</span>
              </Link>
              
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
                <span className="relative">Contact Us</span>
              </Link>
            </div>
          </motion.div>

          {/* Last Updated */}
          <div className="text-center text-sm text-text-soft">
            <p>Last Updated: November 8, 2025</p>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
