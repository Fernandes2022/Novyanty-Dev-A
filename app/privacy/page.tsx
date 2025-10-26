"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export default function PrivacyPolicy() {
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
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-800">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-12 text-center font-semibold">
            Last updated: October 25, 2025
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We collect information you provide directly to us when you create an account, use our composition tools, 
                or communicate with us. This includes your name, email address, and project data.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process your 
                compositions, and communicate with you about updates and features.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate security measures to protect your personal information from unauthorized 
                access, alteration, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Your Rights</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. Contact us 
                to exercise these rights.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at privacy@creativeworkspace.com
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-800 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-lg transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
