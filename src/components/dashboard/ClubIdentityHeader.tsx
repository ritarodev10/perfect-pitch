"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SofaScoreTeamDetailResponse } from "@/data/sofascore";
import { getTeamImageUrl } from "@/utils/imageProxy";

interface ClubIdentityHeaderProps {
  teamData: SofaScoreTeamDetailResponse;
}

export const ClubIdentityHeader = ({ teamData }: ClubIdentityHeaderProps) => {
  const { team } = teamData;

  // Calculate foundation year from timestamp
  const foundationYear = team.foundationDateTimestamp
    ? new Date(team.foundationDateTimestamp * 1000).getFullYear()
    : null;

  // Get country flag emoji from alpha2 code
  const getCountryFlag = (alpha2: string) => {
    const codePoints = alpha2
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const countryFlag = getCountryFlag(team.country.alpha2);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] glass-panel gap-4 sm:gap-6"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem]">
        <div className="absolute top-[-50%] left-[-20%] w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-[var(--accent)] rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-blue-900/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Quality Beam Animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem]">
        <div className="absolute inset-0 w-[200%] h-full animate-beam beam-gradient" />
      </div>

      <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full sm:w-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative group w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 shrink-0"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl sm:blur-2xl group-hover:bg-[var(--accent)]/20 transition-colors duration-500" />
          <Image
            src={getTeamImageUrl(team.id)}
            alt={team.fullName || team.name}
            fill
            className="object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 56px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
            unoptimized
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-lg truncate"
          >
            {team.fullName || team.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2 flex-wrap"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-400 tracking-wider sm:tracking-widest uppercase flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base md:text-lg">
                {countryFlag}
              </span>
              {team.country.name}
            </span>
            {foundationYear && (
              <span className="hidden sm:inline text-[10px] sm:text-xs font-medium text-neutral-500 tracking-wider sm:tracking-widest uppercase border-l border-white/10 pl-2 sm:pl-3 md:pl-4">
                Founded {foundationYear}
              </span>
            )}
          </motion.div>
          {team.manager && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2"
            >
              <span className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Manager:
              </span>
              <span className="text-[11px] sm:text-sm font-semibold text-neutral-300">
                {team.manager.name}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Venue info - visible on lg screens on right, or as a row on sm-md */}
      <div className="relative z-10 w-full sm:w-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex sm:flex-col lg:flex-col items-start sm:items-end gap-2 sm:gap-1 sm:text-right"
        >
          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
            <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-[0.1em] sm:tracking-[0.2em] sm:mb-1">
              Home Ground
            </p>
            <p className="text-xs sm:text-base md:text-lg lg:text-2xl font-black text-white tracking-tight">
              {team.venue.name}
            </p>
            {team.venue.city && (
              <p className="hidden md:block text-xs sm:text-sm font-medium text-neutral-400 mt-0.5 sm:mt-1">
                {team.venue.city.name}
              </p>
            )}
          </div>
          {team.venue.capacity && (
            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 sm:mt-2 md:mt-3 sm:pt-2 md:pt-3 sm:border-t border-white/10">
              <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-[0.1em] sm:tracking-[0.2em] sm:mb-1">
                Capacity
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white">
                {team.venue.capacity.toLocaleString()}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};
