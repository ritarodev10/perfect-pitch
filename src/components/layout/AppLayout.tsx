"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { GridBeam } from "./GridBeam";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if we're on desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Calculate padding based on screen size and collapsed state
  const paddingLeft = isDesktop ? (isCollapsed ? 80 : 280) : 0;

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Mobile Menu Button - Only show when menu is closed */}
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.button
            onClick={() => setIsMobileOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={clsx(
              "fixed top-4 left-4 z-[60]",
              "w-10 h-10 flex items-center justify-center",
              "bg-[#0F0F11] border-2 border-white/[0.08] rounded-lg",
              "text-neutral-400 hover:text-emerald-400",
              "hover:border-emerald-400/50 hover:bg-emerald-500/10",
              "shadow-lg shadow-black/20",
              "backdrop-blur-sm",
              "transition-all duration-200",
              "lg:hidden",
              "cursor-pointer"
            )}
            style={{
              boxShadow:
                "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
            }}
            aria-label="Open menu"
          >
            <Icon
              icon="solar:hamburger-menu-bold-duotone"
              width={20}
              height={20}
              className="transition-colors duration-200"
              style={{ color: "currentColor" }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.main
        animate={{ paddingLeft }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative z-0 min-h-screen w-full"
      >
        <GridBeam />
        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};
