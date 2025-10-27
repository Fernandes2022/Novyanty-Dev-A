"use client";
import Link from "next/link";
import { motion, useScroll, useInView } from "framer-motion";
import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play, Coffee, Palette, Lock, Clock, Heart, Star, Shuffle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
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

  return (
    <main className="min-h-screen transition-colors duration-300">
      <CursorTrail />
      <GlowLayer />

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
              <span className="text-2xl text-white">×</span>
            </button>

            <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 to-transparent">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white">How It Works</h3>
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

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
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

            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200, damping: 15 }} 
              className="hidden md:flex absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-purple-500/70 shadow-lg shadow-purple-500/20"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
              <span className="text-xs md:text-sm font-bold text-white">
                Adaptive Engine
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/faq" className="text-sm font-medium relative group opacity-90 hover:opacity-100 transition-opacity">
                FAQ
              </Link>
              <Link href="/about" className="text-sm font-medium relative group opacity-90 hover:opacity-100 transition-opacity">
                About
              </Link>
              <ThemeToggle />
              <Link href="/workspace">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                  Get Started
                </motion.button>
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Link href="/workspace">
                <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-sm text-white">
                  Start
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* HERO - TEXT POSITIONED IN LOWER HALF WITH MARGIN-TOP */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
        
        <div className="absolute inset-0 overflow-hidden">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            controls={false}
            className="absolute min-w-full min-h-full object-cover"
            style={{ 
              opacity: 0.9,
              pointerEvents: 'none'
            }}
          >
            <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
            <source src="/videos/user-ai-generation-YKAem45Y8p-1080p.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-purple-400 rounded-full"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
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

        {/* CONTENT WITH TOP MARGIN TO PUSH TO LOWER HALF */}
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
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="text-hero px-4"
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)'
                }}
              >
                <span className="block mb-2 text-white">Build a website</span>
                <span className="block mb-2 text-white">before your</span>
                <span 
                  className="block gradient-text-neon flex items-center justify-center gap-3 flex-wrap" 
                  style={{ 
                    backgroundSize: "200% 200%",
                    filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.9))'
                  }}
                >
                  coffee cools
                  <Coffee className="h-12 w-12 md:h-16 md:w-16" />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }} 
                animate={isHeroInView ? { opacity: 1 } : {}} 
                transition={{ duration: 0.6, delay: 0.4 }} 
                className="text-body max-w-3xl mx-auto font-medium leading-relaxed rounded-xl px-4 md:px-8 py-3 md:py-4 border border-white/20 text-white"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(15px)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}
              >
                No code. No drama. Just say what you want and watch the magic happen.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={isHeroInView ? { opacity: 1 } : {}} 
                transition={{ duration: 0.6, delay: 0.6 }} 
                className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4"
              >
                <Link href="/workspace" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="w-full sm:w-auto btn-primary"
                  >
                    <span className="hidden sm:inline">I'm Feeling Lazy — Build It for Me</span>
                    <span className="sm:hidden">Build It for Me</span>
                    <ArrowRight className="inline-block ml-2 h-5 w-5" />
                  </motion.button>
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
                  { icon: Star, value: "4.98", label: "50K+ users" },
                  { icon: Zap, value: "2 min", label: "Build Time" },
                  { icon: Rocket, value: "99.9%", label: "Uptime" }
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
                    <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-white opacity-80 mt-1">{stat.label}</div>
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

      <GradientDivider />

      <section ref={storyRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-section-title mb-3 md:mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-body opacity-80 max-w-2xl mx-auto">
              Three steps to your dream website. Seriously, that's it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1️⃣", title: "Say It", desc: "Use your voice. We actually listen (unlike your ex).", icon: Coffee, color: "from-purple-500 to-pink-500" },
              { step: "2️⃣", title: "Watch It Build", desc: "Sit back. Pretend you're productive.", icon: Zap, color: "from-blue-500 to-cyan-500" },
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
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl mb-3">{item.step}</div>
                <h3 className="text-card-title mb-2 md:mb-3">{item.title}</h3>
                <p className="text-body opacity-80 leading-relaxed">{item.desc}</p>
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
            <h2 className="text-section-title mb-3 md:mb-4">
              Why We're <span className="gradient-text">Different</span>
            </h2>
            <p className="text-body opacity-80 max-w-2xl mx-auto">
              Loved by designers · hated by procrastination
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Palette, title: "Adaptive Engine", desc: "AI that vibes with your aesthetic." },
              { icon: Rocket, title: "Instant Deploy", desc: "Goes live faster than your 5G." },
              { icon: Users, title: "Team Collab", desc: "Multiple brains, one vibe." },
              { icon: Lock, title: "Privacy Lock", desc: "We gatekeep your data (for good reasons)." },
              { icon: Coffee, title: "No Code", desc: "Because typing is overrated." },
              { icon: Clock, title: "Lightning Fast", desc: "Seriously, it's stupid fast." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={isUspInView ? { opacity: 1, scale: 1 } : {}} 
                transition={{ duration: 0.4, delay: i * 0.08 }} 
                whileHover={{ scale: 1.03 }} 
                className="card-dark group cursor-pointer"
              >
                <div className="w-12 h-12 md:w-13 md:h-13 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-card-title mb-2">{feature.title}</h3>
                <p className="text-body opacity-80 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-section-title mb-3 md:mb-4">
              Try It <span className="gradient-text">Live</span>
            </h2>
            <p className="text-body opacity-80">
              Type what you want. Watch the magic happen.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={isDemoInView ? { opacity: 1, scale: 1 } : {}} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="card-dark space-y-6"
          >
            <textarea
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Try: 'Make me a portfolio site with a dark theme'"
              className="w-full h-32 px-4 md:px-6 py-3 md:py-4 glass bg-black/40 border-2 border-white/10 rounded-xl placeholder-opacity-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none text-body"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button 
                onClick={handleGenerate} 
                disabled={isGenerating || !demoInput.trim()} 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }} 
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "Generating..." : "🎨 Generate Preview"}
              </motion.button>
              
              <motion.button 
                onClick={() => { setChaosMode(!chaosMode); if (demoInput.trim()) { setShowPreview(true); } }} 
                whileHover={{ scale: 1.03 }} 
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

      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-section-title mb-3 md:mb-4">
              Loved by <span className="gradient-text">50,000+</span> Creators
            </h2>
            <p className="text-body opacity-80 max-w-2xl mx-auto">
              #BuiltWithUs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "I built my agency site in 2 minutes. Seriously.", author: "Sarah Chen", role: "Designer", rating: 5 },
              { quote: "Wait... it actually works??", author: "Mike Torres", role: "Founder", rating: 5 },
              { quote: "My clients think I'm a wizard now.", author: "Alex Kumar", role: "Developer", rating: 5 }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                whileHover={{ y: -5 }} 
                className="card-dark"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-body mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="text-small font-bold">{testimonial.author}</div>
                  <div className="text-small opacity-70">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, amount: 0.3 }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section-title mb-6">
              <span className="block">Still scrolling?</span>
              <span className="block gradient-text-neon">That's not building.</span>
            </h2>

            <p className="text-body opacity-80 mb-8">
              Let's fix that ⬇️
            </p>

            <Link href="/workspace">
              <motion.button 
                className="relative group" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative btn-primary px-8 md:px-12 py-4 md:py-5 inline-flex items-center gap-3">
                  <span className="hidden md:inline">Build My Site (Before I Overthink It)</span>
                  <span className="md:hidden">Build My Site Now</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>
            </Link>

            <motion.div 
              className="mt-8 flex items-center justify-center gap-6 flex-wrap" 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: false }} 
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { icon: Shield, text: "Secure" },
                { icon: Zap, text: "Fast" },
                { icon: Heart, text: "Loved" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-purple-400" />
                  <span className="text-small font-semibold opacity-70">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.footer 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="border-t border-white/10 py-8 md:py-12 px-4 md:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-sm md:text-base">Creative Workspace</span>
              </div>
              <p className="text-small opacity-70">
                The future of adaptive composition.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-small">Product</h4>
              <ul className="space-y-2 text-small">
                <li><Link href="/workspace" className="opacity-70 hover:opacity-100 transition-opacity">Workspace</Link></li>
                <li><Link href="/faq" className="opacity-70 hover:opacity-100 transition-opacity">FAQ</Link></li>
                <li><Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-small">Legal</h4>
              <ul className="space-y-2 text-small">
                <li><Link href="/privacy" className="opacity-70 hover:opacity-100 transition-opacity">Privacy</Link></li>
                <li><Link href="/terms" className="opacity-70 hover:opacity-100 transition-opacity">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-small">Connect</h4>
              <ul className="space-y-2 text-small">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2">
                  <span>𝕏</span> Twitter
                </a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2">
                  <span>🎵</span> TikTok
                </a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2">
                  <span>📸</span> Instagram
                </a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-small opacity-70 gap-4">
            <p>© 2025 Creative Workspace. All rights reserved.</p>
            <p>Built with ❤️ by creators, for creators.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
