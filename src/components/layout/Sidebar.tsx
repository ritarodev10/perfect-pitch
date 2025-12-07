"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import { PitchPerfectLogo } from "@/components/general/PitchPerfectLogo";

const MENU_ITEMS = [
  { label: "Dashboard", icon: "solar:widget-5-bold-duotone", href: "/" },
  { label: "Fixtures", icon: "solar:calendar-bold-duotone", href: "/fixtures" },
  {
    label: "Squad",
    icon: "solar:users-group-two-rounded-bold-duotone",
    href: "/squad",
  },
  {
    label: "Standings",
    icon: "solar:cup-star-bold-duotone",
    href: "/standings",
  },
  {
    label: "Insights",
    icon: "solar:lightbulb-bolt-bold-duotone",
    href: "/insights",
  },
  { label: "Settings", icon: "solar:settings-bold-duotone", href: "/settings" },
];

// Mock user data - replace with actual user data later
const USER_DATA = {
  name: "Analyst",
  avatar: null,
  badge: "Analyst Mode",
  version: "v1.0 Demo",
};

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: 280, x: -280 }}
      animate={{ width: isCollapsed ? 80 : 280, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[#0F0F11] border-r border-white/[0.03] overflow-visible"
      style={{
        boxShadow:
          "inset -1px 0 0 rgba(255, 255, 255, 0.02), 4px 0 24px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Collapse Toggle Button - Moves with sidebar border */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "absolute top-6 z-[60]",
          "w-8 h-8 flex items-center justify-center",
          "bg-[#0F0F11] border-2 border-white/[0.08] rounded-full",
          "text-neutral-400 hover:text-emerald-400",
          "hover:border-emerald-400/50 hover:bg-emerald-500/10",
          "shadow-lg shadow-black/20",
          "backdrop-blur-sm",
          "transition-all duration-200"
        )}
        animate={{
          right: isCollapsed ? "-16px" : "-16px",
        }}
        transition={{
          right: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          boxShadow:
            "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
        }}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Icon
          icon={
            isCollapsed
              ? "solar:alt-arrow-right-bold-duotone"
              : "solar:alt-arrow-left-bold-duotone"
          }
          width={16}
          height={16}
          className="transition-colors duration-200"
          style={{ color: "currentColor" }}
        />
      </motion.button>
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-7 border-b border-white/[0.04] overflow-hidden">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 min-w-0"
        >
          <PitchPerfectLogo
            showText={!isCollapsed}
            size="md"
            className="transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {MENU_ITEMS.map((item, index) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={clsx(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-white/[0.06]",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/10 to-green-500/5 text-emerald-400"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-emerald-400 to-green-500 rounded-r-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon */}
                <div className="flex-shrink-0">
                  <Icon
                    icon={item.icon}
                    width={20}
                    height={20}
                    className={clsx(
                      "transition-all duration-200",
                      isActive && "drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                    )}
                    style={{
                      color: isActive ? "#34d399" : "#6b7280",
                      filter: isActive
                        ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))"
                        : undefined,
                      display: "inline-block",
                    }}
                  />
                </div>

                {/* Label */}
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={clsx(
                      "text-sm font-medium tracking-tight transition-colors font-ui",
                      isActive
                        ? "text-emerald-400 font-semibold"
                        : "text-neutral-400 group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Hover glow effect */}
                <div
                  className={clsx(
                    "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200",
                    "bg-gradient-to-r from-emerald-500/5 to-transparent",
                    "group-hover:opacity-100"
                  )}
                />
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-white/[0.04] p-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* User Card */}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/20 flex items-center justify-center">
                  {USER_DATA.avatar ? (
                    <Image
                      src={USER_DATA.avatar}
                      alt={USER_DATA.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                  ) : (
                    <Icon
                      icon="solar:user-bold-duotone"
                      width={16}
                      height={16}
                      style={{ color: "#34d399" }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate font-heading">
                    {USER_DATA.name}
                  </div>
                  <div className="text-xs text-neutral-500 font-normal font-ui">
                    {USER_DATA.badge}
                  </div>
                </div>
              </div>

              {/* Version Badge */}
              <div className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase font-ui">
                  {USER_DATA.version}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/20 flex items-center justify-center">
                {USER_DATA.avatar ? (
                  <Image
                    src={USER_DATA.avatar}
                    alt={USER_DATA.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                ) : (
                  <Icon
                    icon="solar:user-duotone"
                    className="w-4 h-4"
                    color="#34d399"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
