'use client';
import { useEffect } from 'react';


import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, MessageSquare, Send, Phone, Clock } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useState } from 'react';

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us - Creative Workspace";
    const metaDesc = document.querySelector("meta[name=\"description\"]");
    if (metaDesc) metaDesc.setAttribute("content", "Get in touch with Creative Workspace. We reply within 24 hours.");
  }, []);
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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
      <section className="pt-32 pb-12 px-6" id="contact-form">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MessageSquare className="h-16 w-16 text-accent-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Let's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                Talk ✉️
              </span>
            </h1>
            <p className="text-xl text-text-soft">
              Slide into our inbox — we actually reply 😎
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-text-soft mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-soft mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-soft mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-soft mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                {/* Animated Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent-primary/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-200%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Pulse glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 blur-xl"
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  
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
                        <motion.div
                          whileHover={{ x: 3, y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send className="h-5 w-5" />
                        </motion.div>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-accent-secondary/10 border border-accent-secondary/20 rounded-xl text-accent-secondary text-center"
                >
                  🎉 Thank you! We'll get back to you soon.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Other Ways to Reach Us
            </h2>
            <p className="text-text-soft">
              Choose the method that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="p-4 bg-accent-primary/10 rounded-xl w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-accent-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
              <a 
                href="mailto:support@creativeworkspace.com"
                className="text-text-soft hover:text-accent-primary transition-colors text-sm break-all"
              >
                support@creativeworkspace.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="p-4 bg-accent-secondary/10 rounded-xl w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-accent-secondary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              <a 
                href="tel:+1234567890"
                className="text-text-soft hover:text-accent-secondary transition-colors text-sm"
              >
                +1 (234) 567-890
              </a>
              <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9AM-6PM EST</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="p-4 bg-accent-primary/10 rounded-xl w-fit mx-auto mb-4">
                <MapPin className="h-8 w-8 text-accent-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
              <p className="text-text-soft text-sm">
                123 Creative Street<br />
                San Francisco, CA 94103
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl text-center border border-accent-secondary/20"
            >
              <div className="p-4 bg-accent-secondary/10 rounded-xl w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent-secondary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quick Response</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-2 w-2 bg-accent-secondary rounded-full animate-pulse" />
                <span className="text-accent-secondary text-sm font-medium">Online Now</span>
              </div>
              <p className="text-text-soft text-sm">
                We typically respond within 24 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
