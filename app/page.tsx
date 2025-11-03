"use client";
import "./performance.css";
import Link from "next/link";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play, Mic, Keyboard, Palette, Lock, Clock, Heart, Star, Shuffle, Eye, Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { GlowLayer } from "./components/GlowLayer";
import { Tooltip } from "./components/Tooltip";
import { AudioExperience } from "./components/AudioExperience";
import { LivePreviewGenerator } from "./components/LivePreviewGenerator";

// CINEMATIC COMPONENTS
import { HeroParallax } from "@/components/home/HeroParallax";
import { MagneticButton } from "@/components/home/MagneticButton";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { CursorTrail } from "@/components/home/CursorTrail";
import { GradientDivider } from "@/components/home/GradientDivider";
import { VoiceGreeting } from "@/components/home/VoiceGreeting";
import { ScrollEasterEgg } from "@/components/home/ScrollEasterEgg";
import { FloatingFeedback } from "@/components/home/FloatingFeedback";

import { QuickStartTemplates } from "@/components/home/QuickStartTemplates";
import { VideoBackground } from "@/components/home/VideoBackground";
import { shouldDisableHeavyEffects } from "@/lib/utils";
import { ScrollingFeatures } from "@/components/home/ScrollingFeatures";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { VoiceIntro } from "@/components/home/VoiceIntro";
// Testimonials Data

  // Payment handler for pricing plans
  const handlePayment = (plan: 'basic' | 'pro' | 'premium') => {
    const prices = {
      basic: 'price_basic_999',  // Replace with your actual Stripe price IDs
      pro: 'price_pro_2499',
      premium: 'price_premium_4999'
    };
    
    // Redirect to Stripe Checkout
    window.location.href = `/api/checkout?plan=${plan}&priceId=${prices[plan]}`;
  };

  // Contact sales handler
  const handleContactSales = () => {
    window.location.href = '/contact-sales';
  };

const testimonials = [
  {
    id: "1",
    author: "Amara Johnson",
    role: "E-commerce Founder",
    location: "Nigeria",
    thumbnail: "/images/testimonials/amara-johnson.png",
    rating: 5,
    quote: "Built my entire online store in 3 days. The voice input made it so natural!"
  },
  {
    id: "2",
    author: "Lars Bergström",
    role: "Tech Startup CEO",
    location: "Germany",
    thumbnail: "/images/testimonials/lars-bergstrom.png",
    rating: 5,
    quote: "Revolutionary! No coding skills needed. Just speak and watch your vision come alive."
  },
  {
    id: "3",
    author: "Maya Johnson",
    role: "Freelance Designer",
    location: "USA",
    thumbnail: "/images/testimonials/maya-johnson.png",
    rating: 5,
    quote: "This tool saved me weeks of work. My clients are absolutely blown away!"
  },
  {
    id: "4",
    author: "Raj Patel",
    role: "Digital Marketer",
    location: "India",
    thumbnail: "/images/testimonials/raj-patel.png",
    rating: 5,
    quote: "Game-changer for my agency. We can prototype landing pages in minutes now."
  },
  {
    id: "5",
    author: "Sofia Lopez",
    role: "Marketing Strategist",
    location: "Mexico",
    thumbnail: "/images/testimonials/sofia-lopez.png",
    rating: 5,
    quote: "Amazing AI technology. It understands exactly what I want to create!"
  }
];


export default function Home() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [demoInput, setDemoInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const uspRef = useRef(null);
  const demoRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFpsRef = useRef<HTMLVideoElement>(null);
  
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 });
  const isUspInView = useInView(uspRef, { once: true, amount: 0.2 });
  const isDemoInView = useInView(demoRef, { once: true, amount: 0.2 });

  const handleGenerate = () => {
    if (!demoInput.trim()) return;
    setIsGenerating(true);
    setShowPreview(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
  };

  const handleRemix = () => {
    setShowPreview(false);
    setTimeout(() => setShowPreview(true), 500);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
        document.addEventListener('touchstart', () => {
          videoRef.current?.play();
        }, { once: true });
      });
    }
  }, []);

  const disableHeavy = typeof window !== "undefined" && shouldDisableHeavyEffects();
  return (
    <>
      <VoiceIntro />
    <main className="min-h-screen transition-colors duration-300">
      <CursorTrail enabled={!disableHeavy} color="#7B5CFF" particleCount={1} />
      <VoiceGreeting autoPlay={!disableHeavy} position="bottom-left" onPlayingChange={setIsVoicePlaying} />
      {!disableHeavy && <ScrollEasterEgg />}
      {!disableHeavy && <FloatingFeedback />}
      <GlowLayer />

      <AnimatePresence>
      {showDemoVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1d29]/95 p-4"
          onClick={() => setShowDemoVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl bg-[#1a1d29] rounded-3xl overflow-hidden border-2 border-purple-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl transition-colors"
            >
              <span className="text-2xl text-white">×</span>
            </button>
            <div className="relative aspect-video bg-black">
              <video ref={videoFpsRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover hero-video-background">
                <source src="/videos/How much FPS.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 to-transparent">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
                  <h3 className="text-2xl md:text-4xl font-bold text-white">How It Works</h3>
                  <div className="space-y-2 text-sm md:text-base text-white">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">1.</span>
                      <span>Say what you want (we actually listen, unlike your ex)</span>
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Sit back. Pretend you're productive</span>
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">3.</span>
                      <span>One click and boom — you're a founder</span>
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 glass-dark"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex h-16 md:h-20 items-center justify-between w-full">
              {/* Logo - Far Left */}

              <div className="flex-none">
                <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </motion.div>
                  <span className="text-lg md:text-xl font-bold hidden sm:block">Creative Workspace</span>
                </Link>
              </div>
              
              {/* Center Nav - All items inline */}
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200, damping: 15 }} 
                className="hidden md:flex flex-1 items-center justify-end gap-10 mr-8"
              >
                

                <Link href="/faq" className="text-sm lg:text-base font-bold hover:text-purple-400 transition-colors">
                  FAQ
                </Link>

                <Link href="/about" className="text-sm lg:text-base font-bold hover:text-purple-400 transition-colors">
                  About
                </Link>
              </motion.div>
              
              {/* Get Started - Far Right */}
              <div className="hidden md:flex items-center gap-4 flex-none">
                <Link href="/workspace">
                  <MagneticButton variant="primary" size="md">
                    Get Started
                  </MagneticButton>
                </Link>
              </div>
              
              {/* Mobile - Simplified */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-white hover:text-purple-400 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
              >
                <div className="px-4 py-6 space-y-4">
                  <Link
                    href="/about"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <a
                    href="#pricing"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <Link
                    href="/faq"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <div className="pt-4 border-t border-white/10">
                    <Link href="/workspace">
                      <motion.button 
                        whileTap={{ scale: 0.95 }} 
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-white shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

      {/* HERO - TEXT POSITIONED IN LOWER HALF WITH MARGIN-TOP */}
      <HeroParallax>
        <VideoBackground />
      <section ref={heroRef} className="hero-section relative min-h-screen overflow-hidden pt-16 md:pt-20">
        {/* Hero Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: 0.7,
              filter: 'brightness(0.95) contrast(1.1) saturate(1.15)'
            }}
          >
            <source src="/videos/How much FPS.mp4" type="video/mp4" />
          </video>
        </div>

        
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: "15%", top: "20%" },
            { left: "85%", top: "15%" },
            { left: "25%", top: "70%" },
            { left: "75%", top: "60%" }
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-purple-400 rounded-full"
              style={{ 
                left: pos.left, 
                top: pos.top,
                opacity: 0.2
              }}
              animate={{ 
                y: [0, -30, 0], 
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          <div className="mt-[50vh]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6 md:space-y-8"
            >
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={isHeroInView ? { opacity: isVoicePlaying ? 0 : 1, y: 0 } : { opacity: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="text-hero px-4 max-w-7xl mx-auto"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  lineHeight: '1.2',
                  textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)'
                }}
              >
                <span className="block text-white leading-tight">
                  Build a website before your coffee cools
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={isHeroInView ? { opacity: 1 } : {}} 
                transition={{ duration: 0.6, delay: 0.4 }} 
                className="text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed rounded-xl px-4 md:px-8 py-4 md:py-5 border border-white/30 text-white"
                style={{
                  background: 'rgba(26, 29, 41, 0.6)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontWeight: '500'
                }}
              >
                No code. No drama. Just say what you want and watch the magic happen.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={isHeroInView ? { opacity: 1 } : {}} 
                transition={{ duration: 0.6, delay: 0.6 }} 
                className="hero-cta-buttons hero-cta-container flex flex-col sm:flex-row gap-3 justify-center items-center px-4"
              >
                <Link href="/workspace" className="w-full sm:w-auto">
                  <MagneticButton variant="primary" size="lg" onClick={() => window.location.href="/workspace"}>
                    <span className="hidden sm:inline">I'm Feeling Lazy — Build It for Me</span>
                    <span className="sm:hidden">Build It for Me</span>
                    <ArrowRight className="inline-block ml-2 h-5 w-5" />
                  </MagneticButton>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => setShowDemoVideo(true)} 
                  className="w-full sm:w-auto btn-secondary"
                >
                  <Play className="inline-block mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Show Me the Demo</span>
                  <span className="sm:hidden">Demo</span>
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={isHeroInView ? { opacity: 1 } : {}} 
                transition={{ duration: 0.6, delay: 0.8 }} 
                className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto px-4"
              >
                {[
                  { icon: Star, value: 4.98, suffix: "", label: "50K+ users", decimals: 2 },
                  { icon: Eye, value: 50, suffix: " sec", label: "Build Time", decimals: 0 },
                  { icon: Rocket, value: 99.9, suffix: "%", label: "Uptime", decimals: 1 }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05, y: -5 }} 
                    className="rounded-xl p-3 md:p-4 border-2 border-white/20 shadow-lg hover:border-purple-500/50 transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <stat.icon className="h-6 w-6 md:h-7 md:w-7 text-purple-400 mx-auto mb-2" />
                    <AnimatedCounter
                      duration={1.5} 
                      to={stat.value} 
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      className="text-2xl md:text-3xl font-bold text-white"
                      sparkles={!disableHeavy}
                    />
                    <div className="text-sm text-white font-medium mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <AudioExperience />

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1.2 }} 
                className="pt-4 pb-8"
              >
                <div className="text-small text-white opacity-70 flex flex-col items-center gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  <span>Scroll to explore</span>
                  <span>↓</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      </HeroParallax>

      <GradientDivider />

      <section ref={storyRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-3 md:mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
              Three steps to your dream website. Seriously, that's it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1️⃣", title: "Say It", desc: "Use your voice. We actually listen (unlike your ex).", icon: Mic, color: "from-purple-500 to-pink-500" },
              { step: "2️⃣", title: "Watch It Build", desc: "Sit back. Pretend you're productive.", icon: Eye, color: "from-blue-500 to-cyan-500" },
              { step: "3️⃣", title: "Launch It", desc: "One click and boom — you're a founder.", icon: Rocket, color: "from-green-500 to-emerald-500" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                whileHover={{ scale: 1.03, y: -5 }} 
                className="card-dark group cursor-pointer"
              >
                <div className="text-2xl md:text-3xl mb-3">{item.step}</div>
                <h3 className="text-card-title mb-2 md:mb-3 flex items-center gap-2">
                  {item.title} <item.icon className="h-6 w-6 inline-block text-purple-400" />
                </h3>
                <p className="text-xl md:text-2xl opacity-80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      <section ref={uspRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isUspInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-3 md:mb-4">
              Why We're <span className="gradient-text">Different</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
              Loved by designers · hated by procrastination
            </p>
          </motion.div>
          <ScrollingFeatures 
            features={[
              { icon: Palette, title: "Adaptive Engine", desc: "AI that vibes with your aesthetic." },
              { icon: Rocket, title: "Instant Deploy", desc: "Goes live faster than your 5G." },
              { icon: Users, title: "Team Collab", desc: "Multiple brains, one vibe." },
              { icon: Lock, title: "Privacy Lock", desc: "We gatekeep your data (for good reasons)." },
              { icon: Keyboard, title: "No Code", desc: "Because typing is overrated." },
              { icon: Clock, title: "Lightning Fast", desc: "Seriously, it's stupid fast." }
            ]}
          />
        </div>
      </section>

      <GradientDivider />

      <section ref={demoRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isDemoInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-5xl md:text-6xl mb-3 md:mb-4">
              Try It <span className="gradient-text">Live</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-80">
              Type what you want. Watch the magic happen.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={isDemoInView ? { opacity: 1, scale: 1 } : {}} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="card-dark space-y-6"
          >
            <div className="sm:hidden mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-2xl">✨</span> Compose Your Website
              </h3>
              <p className="text-sm text-white/70 mt-1">Describe what you want below, then tap Compose</p>
            </div>

            <QuickStartTemplates onSelect={(prompt) => setDemoInput(prompt)} />
            <textarea

              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Try: 'Make me a portfolio site with a dark theme'"
              className="w-full h-32 px-4 md:px-6 py-3 md:py-4 glass bg-[#14161f]/60 border-2 border-white/10 rounded-xl placeholder-opacity-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none text-xl md:text-2xl"
            />

            <div className="flex flex-col sm:flex-row gap-8">
              <motion.button 
                onClick={handleGenerate} 
                disabled={isGenerating || !demoInput.trim()} 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.97 }} 
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (<><span className="animate-pulse">⚡</span> Generating...</>) : (<><span className="hidden sm:inline">🎨 Generate Preview</span><span className="sm:hidden">✨ Compose</span></>)}
              </motion.button>
              
              <motion.button 
                onClick={() => { setChaosMode(!chaosMode); if (demoInput.trim()) { setShowPreview(true); } }} 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.97 }} 
                className={`px-4 md:px-6 py-3 rounded-xl font-bold transition-all ${chaosMode ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' : 'glass border-2 border-white/20 hover:bg-white/10'}`}
              >
                {chaosMode ? "🎪 Chaos ON" : "🎭 Chaos Mode"}
              </motion.button>
            </div>

            {showPreview && demoInput.trim() && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-card-title">Live Preview</h3>
                  <motion.button 
                    onClick={handleRemix} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/20 hover:border-purple-500/50 transition-colors text-small"
                  >
                    <Shuffle className="h-4 w-4" />
                    Remix
                  </motion.button>
                </div>
                <LivePreviewGenerator input={demoInput} chaos={chaosMode} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <GradientDivider />
      <VideoTestimonials testimonials={testimonials} />

      <GradientDivider />

      {/* Stats/Numbers Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-4">Trusted by Creators Worldwide</h2>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Join thousands of satisfied creators who have transformed their ideas into reality
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "10,000+", label: "Websites Created" },
              { number: "50s", label: "Average Build Time" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "50+", label: "Industries Served" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-4">Who It's For</h2>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Perfect for anyone who wants to bring their vision to life without the complexity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💼",
                title: "Freelancers & Solopreneurs",
                description: "Build your portfolio and client websites in minutes, not weeks"
              },
              {
                icon: "🏪",
                title: "Small Business Owners",
                description: "Get your business online quickly without breaking the bank"
              },
              {
                icon: "🎨",
                title: "Content Creators",
                description: "Showcase your work with a stunning website that matches your brand"
              },
              {
                icon: "🚀",
                title: "Startups & Founders",
                description: "Launch your MVP and validate ideas without hiring a dev team"
              },
              {
                icon: "🎯",
                title: "Agencies",
                description: "Deliver client projects faster and increase your profit margins"
              },
              {
                icon: "✍️",
                title: "Bloggers & Writers",
                description: "Create your personal blog or publication without technical headaches"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-white/60 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

            {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-4">Why Choose Creative Workspace?</h2>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              See how we compare to traditional development approaches
            </p>
          </motion.div>

          <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-3 divide-x divide-white/10">
              <div className="p-1.5 md:p-8 text-center bg-white/5">
                <h3 className="text-sm md:text-xl font-bold">Metric</h3>
              </div>
              <div className="p-1.5 md:p-8 text-center">
                <h3 className="text-sm md:text-xl font-bold text-red-400">Traditional</h3>
              </div>
              <div className="p-1.5 md:p-8 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <h3 className="text-sm md:text-xl font-bold gradient-text">Creative Workspace</h3>
              </div>
            </div>

            {/* Data Rows */}
            {[
              { metric: "Time to Launch", traditional: "4-8 weeks", workspace: "50 seconds" },
              { metric: "Cost", traditional: "$5,000 - $50,000", workspace: "$9.99/month" },
              { metric: "Technical Skills", traditional: "HTML, CSS, JS required", workspace: "Just speak your vision" },
              { metric: "Revisions", traditional: "Slow & costly", workspace: "Instant & unlimited" },
              { metric: "Maintenance", traditional: "Ongoing dev costs", workspace: "Handled automatically" }
            ].map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10"
              >
                <div className="p-1.5 md:p-6 font-semibold text-xs md:text-base leading-tight">{row.metric}</div>
                <div className="p-1.5 md:p-6 text-white/60 text-xs md:text-base leading-tight">{row.traditional}</div>
                <div className="p-1.5 md:p-6 text-green-400 font-semibold text-xs md:text-base leading-tight">{row.workspace}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile scroll hint */}
          
        </div>
      </section>

<GradientDivider />

      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">🚀 Go Live & Unlock Premium</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Choose your plan and start creating without limits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-blue-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 rounded-full text-sm font-bold">
                STARTER
              </div>
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Custom domain deployment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Advanced export options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">5 projects per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <button onClick={() => handlePayment("basic")} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer">
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-purple-500"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">$24.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Unlimited projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Priority rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Team collaboration (5 members)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <button onClick={() => handlePayment("pro")} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer">
                Get Started
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-yellow-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                ENTERPRISE
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Unlimited team members</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <button onClick={() => handlePayment("premium")} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer">Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.6 }} 
>
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl">Ready to Get Started?</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Join thousands of creators transforming their ideas into reality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <GradientDivider />
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Still scrolling?
            </h2>
            <p className="text-xl md:text-2xl text-white/70">
              That's not building.
            </p>
            <p className="text-lg text-white/60">
              Let's fix that ⬇️
            </p>
            <Link href="/workspace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Build My Site (Before I Overthink It)
              </motion.button>
            </Link>
            <div className="flex items-center justify-center gap-8 pt-4 flex-wrap">
              {/* ALL THREE BADGES - BIGGER & ANIMATED */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-green-400 animate-pulse">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-blue-400 animate-pulse">Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-pink-400 animate-pulse">Loved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Creative Workspace</h3>
              <p className="text-sm text-white/60">The future of adaptive composition.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/workspace" className="hover:text-purple-400 transition-colors">Workspace</Link></li>
                <li><Link href="/faq" className="hover:text-purple-400 transition-colors">FAQ</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/60">
            <p>© 2025 Creative Workspace. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ by creators, for creators.</p>
          </div>
        </div>
      </footer>

    </main>
    </>
);
}
