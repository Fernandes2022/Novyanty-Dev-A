"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Send, Save, Download, Settings, Zap, Menu, X, ArrowLeft, Layers, Palette, Code } from "lucide-react";

export default function Workspace() {
  const [directive, setDirective] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const handleCompose = () => {
    if (!directive.trim()) return;
    
    setIsComposing(true);
    setTimeout(() => {
      setPreviewContent(directive);
      setIsComposing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-400 transition-colors">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white hover:text-purple-400 transition-colors">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Creative
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Workspace
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Describe your vision, watch it come to life
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { icon: Layers, label: "Projects", value: "12" },
              { icon: Palette, label: "Templates", value: "50+" },
              { icon: Code, label: "Components", value: "200+" }
            ].map((stat, index) => (
              <div key={index} className="glass-dark p-4 rounded-xl text-center">
                <stat.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Editor Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-dark p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-400" />
                Describe Your Vision
              </h2>
              
              <textarea
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                placeholder="E.g., Create a modern landing page with a hero section, feature cards, and testimonials..."
                className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleCompose}
                  disabled={isComposing || !directive.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isComposing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Composing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      Compose
                    </>
                  )}
                </button>
                
                <button className="px-6 py-4 glass-dark border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Live Preview</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {previewContent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-gray-300"
                    >
                      <div className="mb-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <h3 className="font-semibold text-white mb-2">Generated Preview</h3>
                        <p className="text-sm">{previewContent}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg animate-pulse" />
                        <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-24 bg-white/5 rounded-lg animate-pulse" />
                          <div className="h-24 bg-white/5 rounded-lg animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-gray-500"
                    >
                      <Sparkles className="h-16 w-16 mb-4 opacity-30" />
                      <p>Your creation will appear here</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
