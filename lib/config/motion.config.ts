export const motionConfig = {
  // Transition presets
  smooth: { type: "spring", stiffness: 100, damping: 20 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  slow: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  
  // Variants
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  
  slideIn: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  
  stagger: {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }
};

export const spacing = {
  section: "120px",
  card: "24px",
  element: "16px"
};
