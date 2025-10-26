"use client";
import Link from "next/link";
import { Sparkles, Zap, Brain, Palette } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export default function About() {
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

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
            About Creative Workspace
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-semibold">
            The future of adaptive content creation and intelligent composition
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-800">
            <Sparkles className="h-14 w-14 text-indigo-600 dark:text-indigo-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We're building the next generation of creative tools that empower everyone to compose stunning 
              interfaces without technical barriers. Our adaptive engine makes professional design accessible to all.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-800">
            <Zap className="h-14 w-14 text-purple-600 dark:text-purple-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A world where anyone can bring their creative ideas to life instantly, with intelligent assistance 
              that understands context and adapts to your needs.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-16 shadow-2xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Adaptive Engine</h3>
              <p className="text-indigo-100 text-lg leading-relaxed">Context-aware composition that learns from your preferences</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-indigo-100 text-lg leading-relaxed">Real-time rendering and instant deployment</p>
            </div>
            <div className="text-center">
              <Palette className="h-12 w-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Professional Quality</h3>
              <p className="text-indigo-100 text-lg leading-relaxed">Studio-grade output every time</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-xl transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
