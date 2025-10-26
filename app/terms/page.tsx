"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-12 text-center font-semibold">
            Last updated: October 25, 2025
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using Creative Workspace, you accept and agree to be bound by these Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to use our composition tools for 
                creating and deploying your projects.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and for all activities 
                that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Prohibited Uses</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                You may not use our service for any illegal purposes or to violate any laws in your jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Termination</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to terminate or suspend your account at our discretion if you violate these terms.
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
