"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PreviewStyle {
  bgGradient: string;
  textColor: string;
  accentColor: string;
  layout: 'modern' | 'minimal' | 'bold' | 'chaos';
}

export function LivePreviewGenerator({ input, chaos = false }: { input: string; chaos?: boolean }) {
  const [style, setStyle] = useState<PreviewStyle>(generateStyle(input, chaos));

  useEffect(() => {
    setStyle(generateStyle(input, chaos));
  }, [input, chaos]);

  function generateStyle(text: string, chaosMode: boolean): PreviewStyle {
    if (chaosMode) {
      const chaosStyles = [
        {
          bgGradient: 'from-pink-500 via-yellow-500 to-cyan-500',
          textColor: 'text-white',
          accentColor: 'bg-orange-500',
          layout: 'chaos' as const
        },
        {
          bgGradient: 'from-green-400 via-purple-500 to-red-500',
          textColor: 'text-yellow-300',
          accentColor: 'bg-pink-600',
          layout: 'chaos' as const
        },
        {
          bgGradient: 'from-blue-600 via-green-500 to-yellow-400',
          textColor: 'text-pink-200',
          accentColor: 'bg-cyan-500',
          layout: 'chaos' as const
        }
      ];
      return chaosStyles[Math.floor(Math.random() * chaosStyles.length)];
    }

    const keywords = text.toLowerCase();
    
    if (keywords.includes('dark') || keywords.includes('minimal')) {
      return {
        bgGradient: 'from-gray-900 via-gray-800 to-black',
        textColor: 'text-white',
        accentColor: 'bg-purple-600',
        layout: 'minimal'
      };
    } else if (keywords.includes('colorful') || keywords.includes('vibrant')) {
      return {
        bgGradient: 'from-purple-600 via-pink-500 to-orange-500',
        textColor: 'text-white',
        accentColor: 'bg-yellow-400',
        layout: 'bold'
      };
    } else if (keywords.includes('professional') || keywords.includes('corporate')) {
      return {
        bgGradient: 'from-blue-900 via-blue-800 to-gray-900',
        textColor: 'text-blue-100',
        accentColor: 'bg-blue-500',
        layout: 'modern'
      };
    } else {
      return {
        bgGradient: 'from-purple-900 via-blue-900 to-gray-900',
        textColor: 'text-white',
        accentColor: 'bg-cyan-500',
        layout: 'modern'
      };
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={style.bgGradient}
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden border-2 ${
          chaos ? 'border-pink-500' : 'border-purple-500/50'
        }`}
        style={{ minHeight: '300px' }}
      >
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bgGradient}`}>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={chaos ? { rotate: 360 } : { rotate: [0, 5, -5, 0] }}
                transition={chaos ? { duration: 2, repeat: Infinity } : { duration: 2, repeat: Infinity }}
                className={`w-12 h-12 ${style.accentColor} rounded-xl flex items-center justify-center`}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className={`text-xl font-bold ${style.textColor}`}>
                  {chaos ? '🎪 Chaos Mode Active!' : 'Your Website'}
                </h3>
                <p className="text-sm opacity-80">
                  {chaos ? 'Expect the unexpected' : 'Generated preview'}
                </p>
              </div>
            </div>

            {/* Hero Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className={`h-8 ${style.accentColor} rounded-lg w-3/4`} />
              <div className="h-4 bg-white/20 rounded w-full" />
              <div className="h-4 bg-white/20 rounded w-5/6" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className={`inline-block px-6 py-3 ${style.accentColor} rounded-xl ${style.textColor} font-bold`}
            >
              {chaos ? '🎨 Embrace Chaos' : 'Get Started'}
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="h-3 bg-white/30 rounded w-2/3 mb-2" />
                  <div className="h-2 bg-white/20 rounded w-full" />
                  <div className="h-2 bg-white/20 rounded w-4/5 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Chaos Mode Effects */}
        {chaos && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-pink-400 rounded-full blur-3xl opacity-50" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
