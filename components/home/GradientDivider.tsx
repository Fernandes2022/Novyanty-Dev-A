'use client';

export function GradientDivider() {
  return (
    <div className="relative h-24 md:h-32 pointer-events-none">
      {/* Subtle gradient - no dark blocking */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
    </div>
  );
}

export default GradientDivider;
