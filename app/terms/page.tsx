'use client';
import { useEffect } from 'react';


import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service - Creative Workspace";
    const metaDesc = document.querySelector("meta[name=\"description\"]");
    if (metaDesc) metaDesc.setAttribute("content", "Terms and conditions for using Creative Workspace.");
  }, []);
  const terms = [
    {
      title: "Agreement to Terms",
      content: "By using Creative Workspace, you agree to these terms. If you don't agree, please don't use our service. We may update these terms occasionally—we'll notify you of major changes."
    },
    {
      title: "Account Usage",
      content: "You're responsible for your account security. Don't share your login credentials. You must be at least 13 years old to use our service. One account per person, unless you're on a team plan."
    },
    {
      title: "Content Ownership",
      content: "You own everything you create. We never claim ownership of your websites, designs, or content. You grant us permission to host and display your content as part of the service. You can export or delete your content anytime."
    },
    {
      title: "Acceptable Use",
      content: "Don't use our service for anything illegal, harmful, or that violates others' rights. No spam, malware, or malicious content. No impersonation or fraudulent activities. We reserve the right to suspend accounts that violate these terms."
    },
    {
      title: "Service Availability",
      content: "We strive for 99.9% uptime but can't guarantee uninterrupted service. We may perform maintenance (we'll notify you). We're not liable for service interruptions beyond our control. Your data is automatically backed up."
    },
    {
      title: "Payments & Refunds",
      content: "Paid plans are billed monthly or annually. You can cancel anytime—no questions asked. 30-day money-back guarantee on all paid plans. No refunds for partial months after the guarantee period. Prices may change with 30 days' notice."
    },
    {
      title: "Intellectual Property",
      content: "Creative Workspace and our branding are our property. You can't copy, modify, or resell our service. You can use our service to create client work. Templates and tools remain our property but you can use generated content commercially."
    },
    {
      title: "Termination",
      content: "You can close your account anytime. We may suspend accounts that violate terms. After termination, you have 30 days to export your data. We'll delete your data after 90 days (unless legally required to retain it)."
    },
    {
      title: "Liability Limitations",
      content: "We provide the service 'as is' without warranties. We're not liable for indirect damages or lost profits. Our liability is limited to what you paid us in the last 12 months. Some jurisdictions don't allow these limitations."
    },
    {
      title: "Changes to Service",
      content: "We continuously improve our service. We may add or remove features. Major changes will be communicated in advance. Pricing changes require 30 days' notice. You can cancel if you disagree with changes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/contact#contact-form"
            className="inline-flex items-center gap-2 text-white hover:text-accent-primary transition-colors"
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
            <FileText className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Terms of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Clear, straightforward terms. No legal jargon.
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
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-dark p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                {index + 1}. {term.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{term.content}</p>
            </motion.div>
          ))}

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-dark p-8 rounded-2xl mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Takeaways</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">You Own Your Work</h3>
                <p className="text-sm text-gray-400">Full ownership of everything you create</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">30-Day Guarantee</h3>
                <p className="text-sm text-gray-400">Full refund, no questions asked</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Cancel Anytime</h3>
                <p className="text-sm text-gray-400">No long-term commitments</p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-dark p-8 rounded-2xl text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Terms?</h2>
            <p className="text-gray-300 mb-6">
              We're happy to clarify anything. Reach out anytime.
            </p>
            <Link
              href="/contact#contact-form"
              className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
