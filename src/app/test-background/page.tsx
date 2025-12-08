"use client";

import { useState } from "react";
import {
  AnimatedBackground,
  BackgroundVariant,
} from "@/components/layout/AnimatedBackground";

export default function TestBackgroundPage() {
  const [variant, setVariant] = useState<BackgroundVariant>("parallax-grid");
  const [enabled, setEnabled] = useState(true);

  const variants: BackgroundVariant[] = [
    "sports-cinematic",
    "parallax-grid",
    "particles",
    "none",
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background container - fixed to viewport for test page */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground variant={variant} enabled={enabled} />
      </div>

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
        <h2 className="text-white text-sm font-semibold mb-2">
          Background Controls
        </h2>

        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-3 py-2 text-sm rounded-lg transition-all ${
                variant === v
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Enable/Disable Toggle */}
        <button
          onClick={() => setEnabled(!enabled)}
          className={`mt-2 px-3 py-2 text-sm rounded-lg transition-all ${
            enabled
              ? "bg-emerald-600 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Center Label */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white opacity-50 mb-2">
            Background Test
          </h1>
          <p className="text-lg text-white/30">
            Current: <span className="text-white/50">{variant}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
