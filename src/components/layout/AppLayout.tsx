"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { GridBeam } from "./GridBeam";
import { motion } from "framer-motion";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <motion.main
        animate={{ paddingLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative z-0 min-h-screen"
      >
        <GridBeam />
        <div className="relative z-10 p-8 md:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};
