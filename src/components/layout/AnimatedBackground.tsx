"use client";

import { useEffect } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// Import variant backgrounds
import { ParticleBackground } from "./ParticleBackground";

export type BackgroundVariant =
  | "particles"
  | "sports-cinematic"
  | "parallax-grid"
  | "none";

interface AnimatedBackgroundProps {
  variant?: BackgroundVariant;
  enabled?: boolean;
}

export const AnimatedBackground = ({
  variant = "sports-cinematic",
  enabled = true,
}: AnimatedBackgroundProps) => {
  if (!enabled) return null;

  switch (variant) {
    case "particles":
      return <ParticleBackground />;
    case "sports-cinematic":
      return <SportsCinematicBackground />;
    case "parallax-grid":
      return <ParallaxGridBackground />;
    case "none":
    default:
      return null;
  }
};

// ============================================================================
// SPORTS CINEMATIC VARIANT
// Stadium spotlight sweeps, light streaks, atmospheric fog, lens flares
// ============================================================================

const SportsCinematicBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const fogX = useTransform(smoothX, [-1, 1], ["-3%", "3%"]);
  const fogY = useTransform(smoothY, [-1, 1], ["-3%", "3%"]);

  const spotlightX = useTransform(smoothX, [-1, 1], ["-8%", "8%"]);
  const spotlightY = useTransform(smoothY, [-1, 1], ["-5%", "5%"]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#050508] to-[#0a0a0f]" />

      {/* 1. Atmospheric Fog Layer */}
      <motion.div
        className="absolute inset-[-30%]"
        style={{ x: fogX, y: fogY }}
      >
        {/* Primary fog - dark blue atmospheric */}
        <motion.div
          className="absolute top-[10%] left-[20%] w-[900px] h-[700px] bg-blue-950/30 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary fog - subtle warm accent */}
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[800px] h-[600px] bg-red-950/20 rounded-full blur-[130px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -60, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center atmosphere */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-slate-900/20 rounded-full blur-[180px]"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 2. Stadium Spotlight Sweeps */}
      <motion.div
        className="absolute inset-0"
        style={{ x: spotlightX, y: spotlightY }}
      >
        {/* Main spotlight - top left sweep */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[1200px] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          }}
          animate={{
            rotate: [-15, 25, -15],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary spotlight - top right sweep */}
        <motion.div
          className="absolute -top-[15%] -right-[5%] w-[500px] h-[1000px] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 35%, transparent 65%)",
          }}
          animate={{
            rotate: [20, -20, 20],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Subtle third spotlight - center */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[800px] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 30%, transparent 60%)",
          }}
          animate={{
            rotate: [-8, 8, -8],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </motion.div>

      {/* 3. Animated Light Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <LightStreak key={i} index={i} />
        ))}
      </div>

      {/* 4. Lens Flare Glows */}
      <div className="absolute inset-0">
        {/* Primary lens flare - top area */}
        <motion.div
          className="absolute top-[5%] left-[15%] w-32 h-32"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
          <div className="absolute inset-[20%] bg-white/30 rounded-full blur-lg" />
          <div className="absolute inset-[40%] bg-white/40 rounded-full blur-md" />
        </motion.div>

        {/* Secondary lens flare */}
        <motion.div
          className="absolute top-[8%] right-[20%] w-24 h-24"
          animate={{
            opacity: [0.05, 0.2, 0.05],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="absolute inset-0 bg-blue-200/15 rounded-full blur-xl" />
          <div className="absolute inset-[30%] bg-white/25 rounded-full blur-lg" />
        </motion.div>

        {/* Tertiary flare - subtle accent */}
        <motion.div
          className="absolute top-[12%] left-[45%] w-16 h-16"
          animate={{
            opacity: [0, 0.15, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <div className="absolute inset-0 bg-red-300/10 rounded-full blur-lg" />
        </motion.div>
      </div>

      {/* 5. Vignette & Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-10" />

      {/* 6. Subtle Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] z-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// Light streak component for animated beams
const LightStreak = ({ index }: { index: number }) => {
  const positions = [
    { left: "10%", angle: -75, delay: 0 },
    { left: "30%", angle: -80, delay: 4 },
    { left: "50%", angle: -85, delay: 2 },
    { left: "70%", angle: -80, delay: 6 },
    { left: "90%", angle: -75, delay: 3 },
  ];

  const pos = positions[index % positions.length];
  const duration = 12 + index * 2;

  return (
    <motion.div
      className="absolute top-0 w-[2px] h-[150%] origin-top"
      style={{
        left: pos.left,
        transform: `rotate(${pos.angle}deg)`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)",
      }}
      animate={{
        opacity: [0, 0.4, 0],
        scaleY: [0.5, 1, 0.5],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: pos.delay,
      }}
    />
  );
};

// ============================================================================
// PARALLAX GRID VARIANT
// Depth-layered animated grid, noise texture, glowing dot matrix, cursor parallax
// ============================================================================

const ParallaxGridBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Multi-layer parallax transforms (different speeds for depth effect)
  const gridLayer1X = useTransform(smoothX, [-1, 1], ["-15px", "15px"]);
  const gridLayer1Y = useTransform(smoothY, [-1, 1], ["-15px", "15px"]);

  const gridLayer2X = useTransform(smoothX, [-1, 1], ["-30px", "30px"]);
  const gridLayer2Y = useTransform(smoothY, [-1, 1], ["-30px", "30px"]);

  const gridLayer3X = useTransform(smoothX, [-1, 1], ["-50px", "50px"]);
  const gridLayer3Y = useTransform(smoothY, [-1, 1], ["-50px", "50px"]);

  const dotsX = useTransform(smoothX, [-1, 1], ["-25px", "25px"]);
  const dotsY = useTransform(smoothY, [-1, 1], ["-25px", "25px"]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030306] via-[#050508] to-[#08080c]" />

      {/* 1. Depth-Layered Animated Grid */}
      {/* Layer 3 - Furthest back, slowest parallax */}
      <motion.div
        className="absolute inset-[-50px]"
        style={{ x: gridLayer3X, y: gridLayer3Y }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </motion.div>

      {/* Layer 2 - Middle layer, medium parallax */}
      <motion.div
        className="absolute inset-[-30px]"
        style={{ x: gridLayer2X, y: gridLayer2Y }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Layer 1 - Closest, fastest parallax */}
      <motion.div
        className="absolute inset-[-15px]"
        style={{ x: gridLayer1X, y: gridLayer1Y }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </motion.div>

      {/* 2. Animated Grid Pulse Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229, 22, 22, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229, 22, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* 3. Soft Glowing Dot Matrix */}
      <motion.div
        className="absolute inset-[-25px]"
        style={{ x: dotsX, y: dotsY }}
      >
        {/* Dot pattern layer */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Accent dots - scattered larger glowing dots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <GlowingDot key={i} index={i} />
        ))}
      </motion.div>

      {/* 4. Animated Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-[2px] left-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)",
          }}
          animate={{
            top: ["-5%", "105%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-full h-[1px] left-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(229,22,22,0.15) 30%, rgba(229,22,22,0.25) 50%, rgba(229,22,22,0.15) 70%, transparent 100%)",
          }}
          animate={{
            top: ["105%", "-5%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />
      </div>

      {/* 5. Corner Gradient Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top left, rgba(229, 22, 22, 0.2), transparent 60%)`,
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-15">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at bottom right, rgba(100, 100, 255, 0.15), transparent 60%)`,
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* 6. Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.7)_100%)] z-10" />

      {/* 7. Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] z-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// Glowing dot component for the dot matrix
const GlowingDot = ({ index }: { index: number }) => {
  // Distribute dots across the screen
  const positions = [
    { x: 15, y: 20 },
    { x: 45, y: 10 },
    { x: 75, y: 25 },
    { x: 25, y: 55 },
    { x: 55, y: 45 },
    { x: 85, y: 60 },
    { x: 10, y: 80 },
    { x: 40, y: 75 },
    { x: 70, y: 85 },
    { x: 90, y: 40 },
    { x: 30, y: 90 },
    { x: 60, y: 65 },
  ];

  const pos = positions[index % positions.length];
  const size = 4 + (index % 3) * 2; // 4-8px
  const duration = 6 + (index % 4) * 2; // 6-12s
  const delay = index * 0.5;
  const isAccent = index % 4 === 0;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: size,
        height: size,
      }}
      animate={{
        opacity: [0.1, 0.5, 0.1],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full blur-sm ${
          isAccent ? "bg-red-400/60" : "bg-white/50"
        }`}
      />
      <div
        className={`absolute inset-[25%] rounded-full ${
          isAccent ? "bg-red-300/80" : "bg-white/70"
        }`}
      />
    </motion.div>
  );
};
