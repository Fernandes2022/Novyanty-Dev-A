"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Send, Save, Download, Settings, Zap, Lock, Plus, ChevronDown } from "lucide-react";
import { SignInModal } from "../components/SignInModal";
import SettingsModal from "../components/SettingsModal";
import { PaymentModal } from "../components/PaymentModal";
import { AudioInput } from "../components/AudioInput";
import { ToastContainer } from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMirrorSync } from "../hooks/useMirrorSync";
import { TierSelector, Tier } from "../components/TierSelector";
import { MirrorInput } from "../components/MirrorInput";
import { RemixButton } from "../components/RemixButton";
import ScrollToTop from '../components/ScrollToTop';
import { EditableBlock } from "../components/EditableBlock";
import { MetaPreview } from "../components/MetaPreview";
import { MirrorSyncIndicator } from "../components/MirrorSyncIndicator";
import { PreviewCarousel } from "../components/PreviewCarousel";

interface Block {
  id: string;
  type: "text" | "image" | "media";
  content: string;
}

export default function Workspace() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const mirrorSync = useMirrorSync();

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("workspace-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  const [directive, setDirective] = useLocalStorage("workspace_directive", "");
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier>("enhanced");
  const [references, setReferences] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isDirectivesOpen, setIsDirectivesOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const [savedDrafts, setSavedDrafts] = useLocalStorage("workspace_drafts", [
    "Landing page with gradient hero",
    "Portfolio with project gallery",
    "Dashboard with analytics",
    "E-commerce product showcase",
    "Blog layout with sidebar"
  ]);

  const { toasts, removeToast, success, error, warning } = useToast();
  
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const isLeftInView = useInView(leftPanelRef, { once: true, amount: 0.2 });
  const isRightInView = useInView(rightPanelRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const savedTheme = localStorage.getItem('workspace-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("workspace-theme", newTheme);
    
    // Toggle dark class on HTML element
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Broadcast theme change via MirrorSync
    mirrorSync.addChange({ 
      type: 'theme', 
      payload: { 
        mode: newTheme,
        accent: '#7B5CFF',
        timestamp: new Date().toISOString()
      } 
    });
  };

  const handleAudioTranscript = (transcript: string) => {
    setDirective((prev: string) => {
      const separator = prev.trim() ? " " : "";
      return prev + separator + transcript;
    });
    success("Audio transcribed successfully!");
  };

  const handleCompose = () => {
    if (!directive.trim()) {
      error("Please enter a directive first!");
      return;
    }
    
    setIsComposing(true);
    
    setTimeout(() => {
      setPreviewContent(directive);
      setMetaTitle(`${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Composition`);
      setMetaDescription(directive.slice(0, 150));
      
      setBlocks([
        { id: "1", type: "text", content: "Hero Section: " + directive.slice(0, 50) },
        { id: "2", type: "text", content: "Main Content with adaptive styling" },
        { id: "3", type: "text", content: "Call-to-action section" }
      ]);
      
      setIsComposing(false);
      success("Composition complete!");
    }, 2000);
  };

  const handleRemix = () => {
    if (!previewContent) {
      warning("Please compose something first!");
      return;
    }
    success("New variant generated!");
  };

  const handleSaveDraft = () => {
    if (!directive.trim()) {
      error("Nothing to save!");
      return;
    }
    
    const shortTitle = directive.slice(0, 40) + (directive.length > 40 ? "..." : "");
    setSavedDrafts([shortTitle, ...savedDrafts.slice(0, 9)]);
    success("Draft saved successfully!");
  };

  const handleExport = () => {
    if (!isPremium) {
      warning("Export is a premium feature!");
      setShowPayment(true);
      return;
    }
    
    if (!previewContent) {
      error("Please compose something first!");
      return;
    }
    
    success("Export complete!");
  };

  const handleGoLive = () => {
    if (!isPremium) {
      setShowPayment(true);
      return;
    }
    
    if (!previewContent) {
      error("Please compose something first!");
      return;
    }
    
    success("Deployed successfully!");
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    success("Welcome to Premium!");
  };

  const handleBlockUpdate = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    success("Block updated!");
  };

  const handleBlockDelete = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    warning("Block deleted");
  };

  const handleAddBlock = () => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: "text",
      content: "New block content"
    };
    setBlocks([...blocks, newBlock]);
    success("Block added!");
  };

  const samplePreviews = previewContent ? [
    { id: "1", title: "Default Layout", content: previewContent },
    { id: "2", title: "Alternative Style", content: previewContent + " (Variant A)" },
    { id: "3", title: "Premium Version", content: previewContent + " (Enhanced)" }
  ] : [];

  return (
    <main className={`min-h-screen transition-colors duration-300 relative overflow-hidden z-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#FAF9F6] text-gray-900'}`}>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* WORKSPACE VIDEO BACKGROUND */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${theme === 'light' ? 'hidden' : ''}`}>
        <div className="absolute inset-0 overflow-hidden">
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded && theme === 'dark' ? 0.25 : 0 }}
            transition={{ duration: 1 }}
            className="absolute min-w-full min-h-full object-cover"
          >
            <source src="/videos/user-ai-generation-YKAem45Y8p-1080p.mp4?v=1762159836" type="video/mp4" />
            <source src="/videos/user-ai-generation-js8F6dEiSZiA-1080p.mp4?v=1762159836" type="video/mp4" />
          </motion.video>
          
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black/80 via-black/70 to-black/85' : 'bg-gradient-to-b from-white/98 via-white/98 to-white/99'}`}></div>
        </div>

        <motion.div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/20'}`}
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-72 h-72 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-400/20'}`}
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className={`absolute inset-0 grid-bg ${theme === 'dark' ? 'opacity-5' : 'opacity-0'}`}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 border-b ${theme === 'dark' ? 'glass-dark border-white/10' : 'bg-[#FAF9F6]/95 backdrop-blur-xl border-gray-200'}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <span className={`text-xl font-bold hidden sm:block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Creative Workspace</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              {isPremium && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full hidden sm:inline-block"
                >
                  ⭐ PREMIUM
                </motion.span>
              )}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                className={`p-2.5 rounded-xl transition-colors relative ${theme === 'dark' ? 'glass hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Settings className="h-5 w-5" />
                
                {settingsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 overflow-hidden ${theme === 'dark' ? 'glass-dark border-white/10' : 'bg-[#FAF9F6] border-gray-200'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setSettingsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowSignIn(true);
                        setSettingsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 border-t ${theme === 'dark' ? 'text-white hover:bg-white/10 border-white/10' : 'text-gray-900 hover:bg-gray-100 border-gray-200'}`}
                    >
                      <Lock className="h-4 w-4" />
                      Sign In
                    </button>
                  </motion.div>
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoLive}
                className="btn-primary text-sm px-4 md:px-6 py-2.5 flex items-center gap-2"
              >
                {!isPremium && <Lock className="h-4 w-4" />}
                Go Live
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="pt-32 pb-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 relative"
        >
          <motion.div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-3xl ${theme === 'dark' ? 'bg-gradient-to-b from-purple-600/20 to-transparent' : 'bg-gradient-to-b from-purple-400/30 to-transparent'}`}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Start</span>
            <motion.span 
              className="block gradient-text-neon"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Creating
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className={`text-lg md:text-xl max-w-2xl mx-auto relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Describe your composition and watch it come to life
          </motion.p>

          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            ref={leftPanelRef}
            initial={{ opacity: 0, x: -100 }}
            animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.div 
              className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <motion.span 
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  📝
                </motion.span>
                Composition Directive
              </h2>
              
              <div className="space-y-6">
                <textarea
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className={`w-full h-48 md:h-56 px-6 py-4 rounded-2xl outline-none resize-none text-base md:text-lg leading-relaxed transition-all ${theme === 'dark' ? 'glass bg-black/40 border-2 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20' : 'bg-[#FAF9F6] border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`}
                />

                <TierSelector selected={selectedTier} onChange={setSelectedTier} />
                
                <MirrorInput onReferenceAdd={(url) => setReferences([...references, url])} />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="flex-1">
                    <AudioInput onTranscript={handleAudioTranscript} />
                  </div>

                  <motion.button 
                    onClick={handleCompose}
                    disabled={isComposing}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden"
                  >
                    {isComposing && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    {isComposing ? (
                      <>
                        <Zap className="h-5 w-5 animate-spin" />
                        <span className="hidden sm:inline">Composing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span className="hidden sm:inline">Compose</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Save, label: "Save", action: handleSaveDraft },
                    { icon: Download, label: "Export", action: handleExport, premium: !isPremium }
                  ].map((btn, i) => (
                    <motion.button 
                      key={i}
                      onClick={btn.action}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${theme === 'dark' ? 'glass border-2 border-white/10 hover:border-purple-500/50 hover:bg-white/5' : 'bg-[#FAF9F6] border-2 border-gray-200 hover:border-purple-500 hover:bg-gray-50'}`}
                    >
                      {btn.premium && <Lock className="h-3 w-3" />}
                      <btn.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{btn.label}</span>
                    </motion.button>
                  ))}
                  <RemixButton onRemix={handleRemix} disabled={!previewContent} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
              initial={{ opacity: 0, y: 20 }}
              animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsDirectivesOpen(!isDirectivesOpen)}
                className="w-full flex items-center justify-between"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <span>📜</span>
                  Recent Directives ({savedDrafts.length})
                </h3>
                <motion.div
                  animate={{ rotate: isDirectivesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isDirectivesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`space-y-3 mt-4 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                      {savedDrafts.map((item: string, i: number) => (
                        <motion.button
                          key={i}
                          onClick={() => {
                            setDirective(item);
                            setIsDirectivesOpen(false);
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5, backgroundColor: theme === 'dark' ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)" }}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all border text-sm md:text-base ${theme === 'dark' ? 'glass hover:bg-white/10 border-white/10 hover:border-purple-500/50' : 'bg-[#FAF9F6] hover:bg-purple-50 border-gray-200 hover:border-purple-500'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{i + 1}.</span>
                            <span className="flex-1">{item}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isRightInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="space-y-4">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💡
                  </motion.span>
                  Pro Tips
                </h3>
                <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    "Use quality tiers to control output detail",
                    "Add reference URLs for inspiration",
                    "Use Remix to generate variations",
                    "Edit blocks directly in preview"
                  ].map((tip, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isRightInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    >
                      <motion.span 
                        className={theme === 'dark' ? 'text-purple-400 font-bold' : 'text-purple-600 font-bold'}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        •
                      </motion.span>
                      <span className="text-sm md:text-base leading-relaxed">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {blocks.length > 0 && (
              <motion.div 
                className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLeftInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <span>🧩</span>
                    Content Blocks
                  </h3>
                  <motion.button
                    onClick={handleAddBlock}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {blocks.map((block, i) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <EditableBlock
                        {...block}
                        onUpdate={handleBlockUpdate}
                        onDelete={handleBlockDelete}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            ref={rightPanelRef}
            initial={{ opacity: 0, x: 100 }}
            animate={isRightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {samplePreviews.length > 0 && (
              <motion.div 
                className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🎨
                  </motion.span>
                  Preview Variants
                </h3>
                <PreviewCarousel previews={samplePreviews} />
              </motion.div>
            )}

            {samplePreviews.length === 0 && (
              <motion.div 
                className={theme === 'dark' ? 'card-dark' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xl'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🎨
                  </motion.span>
                  Live Preview Variants
                </h3>
                <div className="space-y-4">
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your design variations will appear here once you tap <strong className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Compose</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className={`aspect-video rounded-lg border-2 flex items-center justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/5' : 'bg-gradient-to-br from-purple-100 to-pink-100 border-gray-200'}`}
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500/5 to-transparent' : 'bg-gradient-to-br from-purple-200/30 to-transparent'}`} />
                        <Sparkles className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-400/30' : 'text-purple-500/40'}`} />
                      </motion.div>
                    ))}
                  </div>
                  <div className={`pt-2 text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    Multiple variants • Real-time preview • One-click selection
                  </div>
                </div>
              </motion.div>
            )}

            {previewContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <MetaPreview
                  title={metaTitle}
                  description={metaDescription}
                  url={`https://creative-workspace.app/project-${Date.now()}`}
                />
              </motion.div>
            )}

            <motion.div 
              className={`relative overflow-hidden ${theme === 'dark' ? 'card-dark border-2 border-purple-500/30' : 'bg-[#FAF9F6]/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border-2 border-purple-300 shadow-xl'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isRightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "linear-gradient(0deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                    "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                    "linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                    "linear-gradient(270deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                    "linear-gradient(0deg, transparent, rgba(139, 92, 246, 0.3), transparent)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        onSuccess={handlePaymentSuccess}
      />
      <ScrollToTop />

      {/* MirrorSync Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <MirrorSyncIndicator
          isSyncing={mirrorSync.isSyncing}
          lastSynced={mirrorSync.lastSync}
          error={mirrorSync.error}
          hasPendingChanges={mirrorSync.pendingChanges > 0}
        />
      </div>
    </main>
  );
}
