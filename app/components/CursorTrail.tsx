"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1
      });

      if (points.current.length > 20) {
        points.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current = points.current.filter(point => {
        point.life -= 0.02;
        return point.life > 0;
      });

      points.current.forEach((point, i) => {
        const nextPoint = points.current[i + 1];
        if (!nextPoint) return;

        const gradient = ctx.createLinearGradient(
          point.x, point.y,
          nextPoint.x, nextPoint.y
        );
        
        gradient.addColorStop(0, `rgba(139, 92, 246, ${point.life * 0.5})`);
        gradient.addColorStop(1, `rgba(34, 211, 238, ${point.life * 0.3})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3 * point.life;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
