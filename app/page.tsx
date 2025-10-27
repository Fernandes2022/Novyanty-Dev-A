"use client";
import Link from "next/link";
import { motion, useScroll, useInView } from "framer-motion";
import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play, Coffee, Palette, Lock, Clock, Heart, Star, Shuffle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import { CursorTrail } from "./components/CursorTrail";
import { GlowLayer } from "./components/GlowLayer";
import { GradientDivider } from "./components/GradientDivider";
import { Tooltip } from "./components/Tooltip";
import { AudioExperience } from "./components/AudioExperience";
import { LivePreviewGenerator } from "./components/LivePreviewGenerator";

export default function Home() {
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
    console.info("🔥 Welcome to Secret Dev Mode vibes");
    console.log("👀 Looking under the hood? Same.");
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CursorTrail />
      <GlowLayer />

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
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 to-transparent">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3 md:space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">How It Works</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-lg">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-start gap-2 md:gap-3">
                      <span className="text-purple-400 font-bold">1.</span>
                      <span>Say what you want (we actually listen, unlike your ex)</span>
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-start gap-2 md:gap-3">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Sit back. Pretend you're productive</span>
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="flex items-start gap-2 md:gap-3">
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

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </motion.div>
              <span className="text-lg md:text-2xl font-bold hidden sm:block">Creative Workspace</span>
            </Link>

            {/* Adaptive Engine Badge - Center of Nav */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }} 
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-2 border-purple-500/70 bg-black/20 backdrop-blur-xl text-xs shadow-lg shadow-purple-500/20"
              >
                <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ rotate: { duration: 3, ease: "linear", repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}>
                  <Sparkles className="h-3 w-3 text-purple-400" />
                </motion.div>
                <span className="font-bold text-white text-xs">Adaptive Engine</span>
              </motion.div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link href="/workspace">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                  Get Started
                </motion.button>
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-3">
              
              <Link href="/workspace">
                <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-sm">
                  Start
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 🎬 HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover md:opacity-60 opacity-80">
            <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
            <source src="/videos/user-ai-generation-YKAem45Y8p-1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 md:from-black/40 md:via-black/30 md:to-black/50"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-purple-500 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <motion.div className="absolute inset-0 grid-bg opacity-5" animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}></motion.div>

        <motion.div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center z-10 pt-[35vh] sm:pt-[45vh] md:pt-[50vh] lg:pt-[55vh]">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="space-y-4 md:space-y-8">
            
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={isHeroInView ? { scale: 1, rotate: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }} className="inline-flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2.5 glass rounded-full border-2 border-purple-500/70 bg-black/20 backdrop-blur-xl text-xs md:text-sm shadow-lg shadow-purple-500/20">
              <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ rotate: { duration: 3, ease: "linear", repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}>
                <Sparkles className="h-4 w-4 text-purple-400" />
              </motion.div>
              <span className="font-bold text-white">
                <Tooltip content="Real-time layout & color tuning">
                  <span className="border-b-2 border-dashed border-purple-400 cursor-help">Adaptive Engine</span>
                </Tooltip>
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight px-4">
              <motion.span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] mb-2" initial={{ x: -50, opacity: 0 }} animate={isHeroInView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
                Build a website
              </motion.span>
              <motion.span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] mb-2" initial={{ x: 50, opacity: 0 }} animate={isHeroInView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.7 }}>
                before your
              </motion.span>
              <motion.span className="block gradient-text-neon drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] flex items-center justify-center gap-2 md:gap-4 flex-wrap" style={{ backgroundSize: "200% 200%" }} animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 5, ease: "linear", repeat: Infinity }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                coffee cools
                <motion.span animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Coffee className="h-10 w-10 md:h-20 md:w-20" />
                </motion.span>
              </motion.span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.9 }} className="text-sm sm:text-lg md:text-2xl text-white max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] bg-black/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-8 py-2 md:py-4 border border-white/10">
              No code. No drama. Just say what you want and watch the magic happen.
            </motion.p>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isHeroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 150 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-4 md:pt-8 px-4">
              <Link href="/workspace" className="w-full sm:w-auto">
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 40px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.3)"] }} transition={{ boxShadow: { duration: 2, repeat: Infinity } }} className="w-full sm:w-auto btn-primary group text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                  <span className="relative z-10">
                    <span className="hidden sm:inline">I'm Feeling Lazy — Build It for Me</span>
                    <span className="sm:hidden">Build It for Me</span>
                  </span>
                  <motion.div className="inline-block ml-2 relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowDemoVideo(true)} className="w-full sm:w-auto btn-secondary group text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                <Play className="inline-block mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Show Me the Demo</span>
                <span className="sm:hidden">Demo</span>
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 1.3 }} className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto pt-6 md:pt-12 px-4">
              {[
                { icon: Star, value: "4.98", label: "50K+ users" },
                { icon: Zap, value: "2 min", label: "Build Time" },
                { icon: Rocket, value: "99.9%", label: "Uptime" }
              ].map((stat, i) => (
                <motion.div key={i} initial={{ scale: 0, rotate: -180 }} animate={isHeroInView ? { scale: 1, rotate: 0, y: [0, -10, 0] } : {}} transition={{ scale: { duration: 0.6, delay: 1.5 + i * 0.1, type: "spring", stiffness: 200 }, rotate: { duration: 0.6, delay: 1.5 + i * 0.1, type: "spring", stiffness: 200 }, y: { duration: 3, repeat: Infinity, delay: i * 0.3 } }} whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2 } }} className="bg-black/40 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-white/20 shadow-lg hover:border-purple-500/50 transition-colors">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-purple-400 mx-auto mb-2" />
                  </motion.div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-300 mt-1 md:mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <AudioExperience />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="pt-8 md:pt-12">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-gray-400 text-sm flex flex-col items-center gap-2">
                <span>Scroll to explore</span>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <GradientDivider />

      {/* 📜 HOW IT WORKS */}
      <section ref={storyRef} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Three steps to your dream website. Seriously, that's it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: "1️⃣", title: "Say It", desc: "Use your voice. We actually listen (unlike your ex).", icon: Coffee, color: "from-purple-500 to-pink-500" },
              { step: "2️⃣", title: "Watch It Build", desc: "Sit back. Pretend you're productive.", icon: Zap, color: "from-blue-500 to-cyan-500" },
              { step: "3️⃣", title: "Launch It", desc: "One click and boom — you're a founder.", icon: Rocket, color: "from-green-500 to-emerald-500" }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.2 }} whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }} className="card-dark group cursor-pointer relative overflow-hidden">
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${item.color.split(' ').join(' ')})` }} />
                <div className="relative z-10">
                  <motion.div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 md:mb-6`} whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.step}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* 🧩 WHY WE'RE DIFFERENT */}
      <section ref={uspRef} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={isUspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              Why We're <span className="gradient-text">Different</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Loved by designers · hated by procrastination
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Palette, title: "Adaptive Engine", desc: "AI that vibes with your aesthetic.", tooltip: "Real-time layout & color tuning" },
              { icon: Rocket, title: "Instant Deploy", desc: "Goes live faster than your 5G.", tooltip: "Auto SSL + CDN deploy" },
              { icon: Users, title: "Team Collab", desc: "Multiple brains, one vibe.", tooltip: "Real-time sync workspace" },
              { icon: Lock, title: "Privacy Lock", desc: "We gatekeep your data (for good reasons).", tooltip: "AES-256 encryption + GDPR ready" },
              { icon: Coffee, title: "No Code", desc: "Because typing is overrated.", tooltip: "Voice + prompt-based control" },
              { icon: Clock, title: "Lightning Fast", desc: "Seriously, it's stupid fast.", tooltip: "Edge-optimized CDN delivery" }
            ].map((feature, i) => (
              <Tooltip key={i} content={feature.tooltip}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isUspInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }} whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, transition: { duration: 0.3 } }} className="card-dark group cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                  <motion.div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 md:mb-6" whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                    <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* 🪩 TRY IT LIVE */}
      <section ref={demoRef} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={isDemoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              Try It <span className="gradient-text">Live</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400">
              Type what you want. Watch the magic happen.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isDemoInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="card-dark space-y-6">
            <textarea
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Try: 'Make me a portfolio site with a dark theme'"
              className="w-full h-32 px-4 md:px-6 py-3 md:py-4 glass bg-black/40 border-2 border-white/10 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none text-base md:text-lg"
            />

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.button onClick={handleGenerate} disabled={isGenerating || !demoInput.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {isGenerating ? "Generating..." : "🎨 Generate Preview"}
              </motion.button>
              
              <Tooltip content="Generates absurd previews (Easter egg)">
                <motion.button onClick={() => { setChaosMode(!chaosMode); if (demoInput.trim()) { setShowPreview(true); } }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 md:px-6 py-3 rounded-xl font-bold transition-all ${chaosMode ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' : 'glass border-2 border-white/20 text-white hover:bg-white/10'}`}>
                  {chaosMode ? "🎪 Chaos ON" : "🎭 Chaos Mode"}
                </motion.button>
              </Tooltip>
            </div>

            {showPreview && demoInput.trim() && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold">Live Preview</h3>
                  <motion.button onClick={handleRemix} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/20 hover:border-purple-500/50 transition-colors text-sm">
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

      {/* 🎥 LOVED BY CREATORS */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              Loved by <span className="gradient-text">50,000+</span> Creators
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              #BuiltWithUs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { quote: "I built my agency site in 2 minutes. Seriously.", author: "Sarah Chen", role: "Designer", rating: 5 },
              { quote: "Wait... it actually works??", author: "Mike Torres", role: "Founder", rating: 5 },
              { quote: "My clients think I'm a wizard now.", author: "Alex Kumar", role: "Developer", rating: 5 }
            ].map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} whileHover={{ y: -10 }} className="card-dark">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-sm md:text-base">{testimonial.author}</div>
                  <div className="text-xs md:text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* 💸 STILL SCROLLING? THAT'S NOT BUILDING */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 1 }}>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8">
              <span className="block">Still scrolling?</span>
              <motion.span className="block gradient-text-neon" animate={{ textShadow: ["0 0 20px rgba(34, 211, 238, 0.3)", "0 0 40px rgba(34, 211, 238, 0.6)", "0 0 20px rgba(34, 211, 238, 0.3)"] }} transition={{ duration: 2, repeat: Infinity }}>
                That's not building.
              </motion.span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
              Let's fix that ⬇️
            </p>

            <Link href="/workspace">
              <motion.button className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="relative btn-primary text-lg md:text-xl px-8 md:px-16 py-4 md:py-6 inline-flex items-center gap-3">
                  <span className="hidden md:inline">Build My Site (Before I Overthink It)</span>
                  <span className="md:hidden">Build My Site Now</span>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.div className="mt-8 md:mt-12 flex items-center justify-center gap-6 md:gap-8 flex-wrap" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.3 }}>
              {[
                { icon: Shield, text: "Secure" },
                { icon: Zap, text: "Fast" },
                { icon: Heart, text: "Loved" }
              ].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                  <span className="text-xs md:text-sm font-semibold text-gray-400">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🦶 FOOTER */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="border-t border-white/10 py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-base md:text-lg">Creative Workspace</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                The future of adaptive composition.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link href="/workspace" className="text-gray-400 hover:text-white transition-colors">Workspace</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Connect</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-base md:text-lg">𝕏</span> Twitter
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-base md:text-lg">🎵</span> TikTok
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-base md:text-lg">📸</span> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 gap-4">
            <p>© 2025 Creative Workspace. All rights reserved.</p>
            <p>Built with ❤️ by creators, for creators.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
