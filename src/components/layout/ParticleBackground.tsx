"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export const ParticleBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms for different layers
  const fogX = useTransform(smoothX, [-1, 1], ["-5%", "5%"]);
  const fogY = useTransform(smoothY, [-1, 1], ["-5%", "5%"]);

  const particlesX = useTransform(smoothX, [-1, 1], ["-2%", "2%"]);
  const particlesY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* Base ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111]" />

      {/* 1. Slow Moving Gradient Fog */}
      <motion.div
        className="absolute inset-[-20%]"
        style={{ x: fogX, y: fogY }}
      >
        {/* Red/Milan accent fog - Top Left */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dark/Cool fog - Bottom Right */}
        <motion.div
          className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-indigo-900/20 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.03] rounded-full blur-[150px]"
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 2. Soft Floating Particles */}
      <motion.div
        className="absolute inset-0"
        style={{ x: particlesX, y: particlesY }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </motion.div>

      {/* 3. Ambient Light Leaks (Overlays) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10" />

      {/* 4. Subtle Grain/Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

const Particle = ({ index }: { index: number }) => {
  const randomX = useRef(Math.random() * 100);
  const randomY = useRef(Math.random() * 100);
  const size = useRef(Math.random() * 3 + 1); // 1-4px
  const duration = useRef(Math.random() * 20 + 10); // 10-30s
  const delay = useRef(Math.random() * 5);
  const isRed = useRef(Math.random() > 0.8); // 20% chance of red particle

  return (
    <motion.div
      className={`absolute rounded-full ${
        isRed.current ? "bg-red-500/40" : "bg-white/30"
      }`}
      style={{
        left: `${randomX.current}%`,
        top: `${randomY.current}%`,
        width: size.current,
        height: size.current,
      }}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 50 - 25, 0],
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration.current,
        repeat: Infinity,
        delay: delay.current,
        ease: "linear",
      }}
    />
  );
};
