'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, MessageSquare, Send, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6" id="contact-form">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MessageSquare className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Let's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Talk ✉️
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Have a question or want to work together? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-dark p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                {/* Submit Button - Professional & Animated */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl font-bold text-lg overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated Background Shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: 'linear',
                      repeatDelay: 1
                    }}
                  />
                  
                  {/* Button Content */}
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                          ✓
                        </motion.span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 blur-xl" />
                  </div>
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center"
                >
                  🎉 Thank you! We'll get back to you soon.
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <div className="glass-dark p-6 rounded-2xl group hover:scale-105 transition-transform">
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-4">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
              <a 
                href="mailto:support@creativeworkspace.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                support@creativeworkspace.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="glass-dark p-6 rounded-2xl group hover:scale-105 transition-transform">
              <div className="p-3 bg-pink-500/10 rounded-xl w-fit mb-4">
                <Phone className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              <a 
                href="tel:+1234567890"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>

            {/* Location Card */}
            <div className="glass-dark p-6 rounded-2xl group hover:scale-105 transition-transform">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
              <p className="text-gray-400">
                123 Creative Street<br />
                San Francisco, CA 94103
              </p>
            </div>

            {/* Response Time */}
            <div className="glass-dark p-6 rounded-2xl border border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-lg font-bold text-white">Quick Response</h3>
              </div>
              <p className="text-gray-400 text-sm">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
