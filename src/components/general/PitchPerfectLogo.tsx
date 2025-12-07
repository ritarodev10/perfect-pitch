"use client";

import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface PitchPerfectLogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PitchPerfectLogo = ({
  showText = true,
  size = "md",
  className,
}: PitchPerfectLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {/* Logo Icon with Green Accent */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/10 rounded-lg blur-sm" />
        <div
          className={clsx(
            "relative flex items-center justify-center",
            sizeClasses[size]
          )}
        >
          {/* Base logo with green glow */}
          <Image
            src="/assets/perfect-pitch-logo.svg"
            alt="Pitch Perfect"
            width={size === "sm" ? 24 : size === "md" ? 32 : 40}
            height={size === "sm" ? 24 : size === "md" ? 32 : 40}
            className={clsx(
              "object-contain relative z-10",
              "[filter:drop-shadow(0_0_8px_rgba(16,185,129,0.3))]"
            )}
            priority
          />
          {/* Green accent overlay on left part of the logo */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 40%, transparent 0%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 40%, transparent 0%)",
            }}
          >
            <Image
              src="/assets/perfect-pitch-logo.svg"
              alt=""
              width={size === "sm" ? 24 : size === "md" ? 32 : 40}
              height={size === "sm" ? 24 : size === "md" ? 32 : 40}
              className="object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(1500%) hue-rotate(112deg) brightness(108%) contrast(92%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Text with "Pitch" in green */}
      <AnimatePresence mode="wait">
        {showText && (
          <motion.span
            key="logo-text"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
              "font-semibold tracking-tight leading-none font-heading whitespace-nowrap",
              textSizeClasses[size]
            )}
          >
            <span className="text-emerald-400">Pitch</span>{" "}
            <span className="text-white">Perfect</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
