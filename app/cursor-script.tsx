'use client';

import { useEffect } from 'react';

export function CursorTrail() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];

    let lastX = 0;
    let lastY = 0;

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 800);
    };

    let throttle = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (throttle) return;
      
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 30) {
        createSparkle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
        
        throttle = true;
        setTimeout(() => throttle = false, 50);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}
