"use client";

import { motion } from "framer-motion";
import { AC_MILAN_DATA } from "@/data/mock/ac-milan";
import { AlertCircle } from "lucide-react";
import { useSidebarContext } from "@/components/layout/SidebarContext";

export const InjuryRibbon = () => {
  const { injuries } = AC_MILAN_DATA;
  const { paddingLeft } = useSidebarContext();

  return (
    <motion.div
      className="fixed bottom-0 right-0 z-50"
      animate={{ left: paddingLeft }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full bg-[var(--accent)]/10 border-y border-[var(--accent)]/20 overflow-hidden py-3 relative backdrop-blur-sm">
        <div className="absolute inset-0 bg-[var(--accent)]/5 animate-pulse-slow pointer-events-none" />

        <div className="flex items-center">
          <div className="px-6 flex items-center gap-3 text-[var(--accent)] font-black uppercase text-[10px] tracking-[0.2em] whitespace-nowrap z-10 bg-black/80 backdrop-blur-xl h-full absolute left-0 border-r border-[var(--accent)]/20 shadow-[10px_0_20px_rgba(0,0,0,0.5)]">
            <AlertCircle className="w-4 h-4" />
            <span>Medical Report</span>
          </div>

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-16 pl-48 whitespace-nowrap"
          >
            {[...injuries, ...injuries, ...injuries, ...injuries].map(
              (injury, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-white tracking-wide">
                    {injury.player}
                  </span>
                  <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                  <span className="text-neutral-300 font-medium">
                    {injury.reason}
                  </span>
                  <span className="text-[var(--accent)] text-xs font-bold uppercase tracking-wider bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                    Return: {injury.returnDate}
                  </span>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
