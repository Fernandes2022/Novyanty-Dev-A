'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, RefreshCw, XCircle, HelpCircle } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass border-b border-white/10 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-text-soft hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Refunds & Good Vibes 💸
          </h1>
          <p className="text-xl text-text-soft">
            We want you to be happy. Here&apos;s our straightforward refund policy.
          </p>
        </motion.div>
      </section>

      {/* 3 Columns: Eligibility, Process, Exceptions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Eligibility Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Eligibility</h2>
            </div>

            <div className="space-y-4 text-text-soft">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">30-Day Money Back</h3>
                <p className="leading-relaxed">
                  Request a refund within 30 days of purchase, no questions asked.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Pro & Premium Plans</h3>
                <p className="leading-relaxed">
                  All paid plans are eligible for refunds during the first 30 days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Service Issues</h3>
                <p className="leading-relaxed">
                  If you experience technical issues we can&apos;t resolve, we&apos;ll issue a full refund.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Subscription Cancellation</h3>
                <p className="leading-relaxed">
                  Cancel anytime. You&apos;ll have access until the end of your billing period.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Process Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Process</h2>
            </div>

            <div className="space-y-4 text-text-soft">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 1: Contact Us</h3>
                <p className="leading-relaxed">
                  Email us at support@creativeworkspace.com with your refund request.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 2: Verification</h3>
                <p className="leading-relaxed">
                  We&apos;ll verify your account and purchase details (usually within 24 hours).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 3: Approval</h3>
                <p className="leading-relaxed">
                  Once approved, we&apos;ll process your refund immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 4: Payment</h3>
                <p className="leading-relaxed">
                  Refunds typically appear in your account within 5-10 business days.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Exceptions Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Exceptions</h2>
            </div>

            <div className="space-y-4 text-text-soft">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">After 30 Days</h3>
                <p className="leading-relaxed">
                  Refunds are not available after the 30-day window has passed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Terms Violations</h3>
                <p className="leading-relaxed">
                  Accounts terminated for terms violations are not eligible for refunds.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Promotional Periods</h3>
                <p className="leading-relaxed">
                  Special discount purchases may have different refund terms (specified at checkout).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Chargeback Fraud</h3>
                <p className="leading-relaxed">
                  Filing a chargeback instead of requesting a refund may result in account suspension.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass p-8 md:p-12 rounded-2xl text-center">
            <div className="p-4 bg-accent-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-accent-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-text-soft mb-8">
              Have questions about our refund policy? Our support team is here to help you out.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
