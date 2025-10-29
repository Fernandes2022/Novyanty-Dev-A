'use client';

export function GradientDivider() {
  return (
    <div className="relative h-32 md:h-40 pointer-events-none overflow-hidden">
      {/* Subtle gradient blend - Violet to Cyan transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/8 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-cyan-600/5 to-transparent" />
      
      {/* Soft wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
}

export default GradientDivider;
