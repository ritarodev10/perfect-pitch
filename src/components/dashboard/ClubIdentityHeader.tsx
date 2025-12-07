"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SofaScoreTeamDetailResponse } from "@/data/sofascore";

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
      className="relative flex items-center justify-between p-8 md:p-12 overflow-hidden rounded-[2rem] glass-panel"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
        <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[150px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Quality Beam Animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 w-[200%] h-full animate-beam beam-gradient" />
      </div>

      <div className="relative z-10 flex items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative group w-24 h-24 md:w-32 md:h-32"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-colors duration-500" />
          <Image
            src={`https://api.sofascore.app/api/v1/team/${team.id}/image`}
            alt={team.fullName || team.name}
            fill
            className="object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 96px, 128px"
            unoptimized
          />
        </motion.div>

        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-lg"
          >
            {team.fullName || team.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-4 mt-2 flex-wrap"
          >
            <span className="px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-black bg-white rounded-full uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {team.primaryUniqueTournament.name}
            </span>
            <span className="text-sm font-medium text-neutral-400 tracking-widest uppercase border-l border-white/10 pl-4 flex items-center gap-2">
              <span className="text-lg">{countryFlag}</span>
              {team.country.name}
            </span>
            {foundationYear && (
              <span className="text-xs font-medium text-neutral-500 tracking-widest uppercase border-l border-white/10 pl-4">
                Founded {foundationYear}
              </span>
            )}
          </motion.div>
          {team.manager && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Manager:
              </span>
              <span className="text-sm font-semibold text-neutral-300">
                {team.manager.name}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="hidden md:block relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-right space-y-2"
        >
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-1">
              Home Ground
            </p>
            <p className="text-2xl font-black text-white tracking-tight">
              {team.venue.name}
            </p>
            {team.venue.city && (
              <p className="text-sm font-medium text-neutral-400 mt-1">
                {team.venue.city.name}
              </p>
            )}
          </div>
          {team.venue.capacity && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-1">
                Capacity
              </p>
              <p className="text-lg font-bold text-white">
                {team.venue.capacity.toLocaleString()}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};
