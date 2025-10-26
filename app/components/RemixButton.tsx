"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

interface RemixButtonProps {
  onRemix: () => void;
  disabled?: boolean;
}

export function RemixButton({ onRemix, disabled }: RemixButtonProps) {
  const [isRemixing, setIsRemixing] = useState(false);

  const handleRemix = async () => {
    setIsRemixing(true);
    onRemix();
    setTimeout(() => setIsRemixing(false), 1500);
  };

  return (
    <button
      onClick={handleRemix}
      disabled={disabled || isRemixing}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`h-4 w-4 ${isRemixing ? "animate-spin" : ""}`} />
      {isRemixing ? "Remixing..." : "🔁 Remix"}
    </button>
  );
}
