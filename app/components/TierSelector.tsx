"use client";
import { Zap, Crown, Rocket, Star } from "lucide-react";

export type Tier = "basic" | "enhanced" | "premium" | "ultra";

interface TierSelectorProps {
  selected: Tier;
  onChange: (tier: Tier) => void;
}

const tiers = [
  {
    id: "basic" as Tier,
    name: "Basic",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    description: "Simple compositions"
  },
  {
    id: "enhanced" as Tier,
    name: "Enhanced",
    icon: Crown,
    color: "from-indigo-500 to-purple-500",
    description: "Rich animations"
  },
  {
    id: "premium" as Tier,
    name: "Premium",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    description: "Advanced features"
  },
  {
    id: "ultra" as Tier,
    name: "Ultra",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    description: "Maximum quality"
  }
];

export function TierSelector({ selected, onChange }: TierSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-900">
        Quality Tier
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selected === tier.id;
          
          return (
            <button
              key={tier.id}
              onClick={() => onChange(tier.id)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-indigo-400 shadow-xl scale-105"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${tier.color} mb-2`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                {tier.name}
              </h4>
              <p className="text-xs text-gray-600">
                {tier.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
