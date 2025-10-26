"use client";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { ParticleBackground } from "./components/ParticleBackground";
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  scaleIn
} from "./utils/animations";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Demo Video Modal */}
      {showDemoVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setShowDemoVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border-2 border-purple-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold">How It Works</h3>
                  <div className="space-y-3 text-lg">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-purple-400 font-bold">1.</span>
                      <span>Describe what you want to create in simple words</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Our AI generates your composition instantly</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-cyan-400 font-bold">3.</span>
                      <span>Customize, edit, and deploy with one click</span>
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold">Creative Workspace</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <ThemeToggle />
              <Link href="/workspace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - ADJUSTED SPACING */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* VIDEO BACKGROUND - VISIBLE */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-60"
          >
            <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
            <source src="/videos/user-ai-generation-YKAem45Y8p-1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        <motion.div 
          className="absolute inset-0 grid-bg opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1
          }}
        ></motion.div>

        {/* MAIN CONTENT - ADDED TOP SPACING */}
        <motion.div 
          style={{ y, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10 mt-12"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge - ADDED SPACING FROM TOP */}
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full border border-purple-500/50 bg-black/40 backdrop-blur-xl mt-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-purple-400" />
              </motion.div>
              <span className="text-sm font-semibold">Adaptive Composition Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={staggerItem}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
            >
              <motion.span 
                className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Create Without
              </motion.span>
              <motion.span 
                className="block gradient-text-neon drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]"
                style={{
                  backgroundSize: "200% 200%"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity
                }}
              >
                Limits
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={staggerItem}
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-sm rounded-2xl px-8 py-4"
            >
              Transform your ideas into stunning digital experiences with our adaptive composition engine.
              No code required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link href="/workspace">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group"
                >
                  <span>Start Creating</span>
                  <motion.div
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemoVideo(true)}
                className="btn-secondary group"
              >
                <Play className="inline-block mr-2 h-5 w-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* USP HIGHLIGHTS */}
            <motion.div
              variants={staggerItem}
              className="pt-8"
            >
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {[
                  { icon: "⚡", text: "Deploy in Seconds" },
                  { icon: "🎨", text: "No Coding Needed" },
                  { icon: "🔒", text: "Bank-Level Security" },
                  { icon: "♾️", text: "Unlimited Revisions" }
                ].map((usp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex items-center gap-2 px-6 py-3 glass bg-black/50 backdrop-blur-xl rounded-full border border-white/20"
                  >
                    <span className="text-2xl">{usp.icon}</span>
                    <span className="text-sm font-bold text-white">{usp.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats - CLEAN LAYOUT (NO FLOATING BUTTONS) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12"
            >
              {[
                { value: "10K+", label: "Projects Created" },
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={staggerItem}
                  className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold gradient-text drop-shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1 + i * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs md:text-sm text-gray-300 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* REMOVED SCROLL INDICATOR - This was the floating button! */}
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Built for <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to bring your vision to life, all in one powerful platform.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Compose and deploy in seconds with our adaptive rendering engine.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Rocket,
                title: "Deploy Instantly",
                description: "Go live with one click. Custom domains and SSL included.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance built in from day one.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together in real-time with your entire creative team.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                description: "Intelligent suggestions and auto-optimization for perfect results.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "No Code Required",
                description: "Describe what you want, we'll build it. Simple as that.",
                color: "from-pink-500 to-rose-500"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="card-dark group cursor-pointer"
              >
                <motion.div 
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <ParticleBackground />
        
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isCtaInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/20"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={isCtaInView ? {
                width: [0, 600, 1200],
                height: [0, 600, 1200],
                opacity: [0.5, 0.3, 0]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="relative mb-12">
              <motion.div
                className="absolute -top-12 -left-12 md:-left-24"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center opacity-80">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-12 -right-12 md:-right-24"
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center opacity-80">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <motion.h2 
                className="text-5xl md:text-7xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">Ready to</span>
                <motion.span 
                  className="block gradient-text-neon"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.3)",
                      "0 0 40px rgba(34, 211, 238, 0.6)",
                      "0 0 20px rgba(34, 211, 238, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Create?
                </motion.span>
              </motion.h2>
            </div>

            <motion.p 
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of creators building the future of digital experiences.
            </motion.p>

            <Link href="/workspace">
              <motion.button
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <span className="relative btn-primary text-lg px-12 py-5 inline-flex items-center gap-3">
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  >
                    Start Building Now
                  </motion.span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.div
              className="mt-12 flex items-center justify-center gap-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: Shield, text: "Secure" },
                { icon: Zap, text: "Fast" },
                { icon: Users, text: "Trusted" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-semibold text-gray-400">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-white/10 py-12 px-6 lg:px-8 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">Creative Workspace</span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of adaptive composition.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/workspace" className="text-gray-400 hover:text-white transition-colors">Workspace</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-lg">𝕏</span> Twitter
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-lg">🎵</span> TikTok
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-lg">📸</span> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Creative Workspace. All rights reserved.</p>
            <p>Built with ❤️ by creators, for creators.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
