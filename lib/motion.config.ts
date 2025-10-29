export const motionConfig = {
  shouldReduceMotion: typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false,

  easings: {
    smooth: [0.22, 1, 0.36, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    sharp: [0.4, 0, 0.2, 1],
  },

  durations: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    slower: 1.2,
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionConfig.durations.normal,
      ease: motionConfig.easings.smooth,
    }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: motionConfig.durations.normal,
      ease: motionConfig.easings.elastic,
    }
  },
};

export const magneticHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: motionConfig.durations.fast,
      ease: motionConfig.easings.smooth,
    }
  },
  tap: { scale: 0.95 },
};
