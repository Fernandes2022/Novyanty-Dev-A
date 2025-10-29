export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const shouldDisableHeavyEffects = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || 
         navigator.userAgent.includes('Mobile') ||
         'ontouchstart' in window;
};
