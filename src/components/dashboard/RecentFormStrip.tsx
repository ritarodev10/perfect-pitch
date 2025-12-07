"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  SofaScoreMatchesResponse,
  SofaScorePregameForm,
} from "@/data/sofascore";

interface RecentFormStripProps {
  lastMatches?: SofaScoreMatchesResponse | null;
  pregameForm?: SofaScorePregameForm;
  teamId: number;
}

export const RecentFormStrip = ({
  lastMatches,
  pregameForm,
  teamId,
}: RecentFormStripProps) => {
  // Always derive form from actual match data when available to ensure consistency
  // Only use pregameForm as fallback when we don't have match data
  let form: string[] = [];
  let matchData: Array<{
    result: string;
    opponent: string;
    opponentId: number;
    opponentLogo: string;
    score: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    isHome: boolean;
    competition: string;
  }> = [];

  // Helper function to calculate result from match
  const calculateResult = (
    match: SofaScoreMatchesResponse["events"][0]
  ): string => {
    if (
      match.homeScore?.current === undefined ||
      match.awayScore?.current === undefined
    ) {
      return "?"; // Match not finished
    }
    const homeScore = match.homeScore.current;
    const awayScore = match.awayScore.current;
    const isHome = match.homeTeam.id === teamId;

    if (isHome) {
      if (homeScore > awayScore) return "W";
      if (homeScore < awayScore) return "L";
      return "D";
    } else {
      if (awayScore > homeScore) return "W";
      if (awayScore < homeScore) return "L";
      return "D";
    }
  };

  // Helper function to create match data object
  const createMatchData = (
    match: SofaScoreMatchesResponse["events"][0]
  ): {
    result: string;
    opponent: string;
    opponentId: number;
    opponentLogo: string;
    score: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    isHome: boolean;
    competition: string;
  } => {
    const homeScore = match.homeScore?.current ?? 0;
    const awayScore = match.awayScore?.current ?? 0;
    const isHome = match.homeTeam.id === teamId;
    const opponent = isHome ? match.awayTeam : match.homeTeam;
    const result = calculateResult(match);
    const competition =
      match.tournament?.uniqueTournament?.name || match.tournament?.name || "";

    return {
      result,
      opponent: opponent.shortName || opponent.name,
      opponentId: opponent.id,
      opponentLogo: `https://api.sofascore.app/api/v1/team/${opponent.id}/image`,
      score: `${homeScore} - ${awayScore}`,
      homeScore,
      awayScore,
      date: new Date(match.startTimestamp * 1000),
      isHome,
      competition,
    };
  };

  if (lastMatches?.events && lastMatches.events.length > 0) {
    // Always derive form from actual match data when available
    // This ensures form indicators match the actual match results
    // Sort by timestamp descending to show most recent matches first
    const recentMatches = [...lastMatches.events]
      .sort((a, b) => (b.startTimestamp || 0) - (a.startTimestamp || 0))
      .slice(0, 5);
    form = recentMatches.map(calculateResult);
    matchData = recentMatches.map(createMatchData);
  } else if (pregameForm?.form && pregameForm.form.length > 0) {
    // Fallback to pregameForm when we don't have match data
    // Note: pregameForm.form is typically already in correct order (most recent first)
    form = pregameForm.form.slice(0, 5);
  }

  const getColor = (result: string) => {
    switch (result) {
      case "W":
        return "bg-green-500";
      case "D":
        return "bg-neutral-500";
      case "L":
        return "bg-red-500";
      default:
        return "bg-neutral-800";
    }
  };

  const getScoreColor = (result: string) => {
    switch (result) {
      case "W":
        return "text-green-500";
      case "D":
        return "text-white";
      case "L":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  // State for cycling through matches
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMatchData = matchData.length > 0;
  const totalItems = hasMatchData ? matchData.length : form.length;

  // Auto-cycle through matches every 5 seconds
  useEffect(() => {
    if (totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems]);

  const currentMatch = hasMatchData ? matchData[currentIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="flex items-center gap-6 p-6 rounded-2xl glass-panel w-full"
    >
      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] whitespace-nowrap">
        Recent Form
      </span>
      <div className="flex gap-3 flex-1">
        {matchData.length === 0 && form.length === 0 ? (
          <span className="text-xs text-neutral-500">No recent form data</span>
        ) : hasMatchData ? (
          // Use matchData when available - ensures form matches actual results
          matchData.map((match, index) => {
            const result = match.result;
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="relative"
              >
                <div
                  className={clsx(
                    "w-12 h-12 flex items-center justify-center rounded-full text-sm font-black text-black shadow-lg transition-all duration-300",
                    getColor(result),
                    isActive && "ring-2 ring-white scale-110"
                  )}
                >
                  {result}
                </div>
                {/* Tooltip-ish glow */}
                <div
                  className={clsx(
                    "absolute inset-0 rounded-full blur-md transition-all duration-300",
                    isActive
                      ? "bg-white opacity-0"
                      : clsx(getColor(result), "opacity-0")
                  )}
                />
              </motion.div>
            );
          })
        ) : (
          // Fallback to form array when we don't have match data
          form.map((result, index) => {
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="relative"
              >
                <div
                  className={clsx(
                    "w-12 h-12 flex items-center justify-center rounded-full text-sm font-black text-black shadow-lg transition-all duration-300",
                    getColor(result),
                    isActive && "ring-2 ring-white/50 scale-110"
                  )}
                >
                  {result}
                </div>
                {/* Tooltip-ish glow */}
                <div
                  className={clsx(
                    "absolute inset-0 rounded-full blur-md transition-all duration-300",
                    isActive
                      ? "bg-white opacity-80"
                      : clsx(getColor(result), "opacity-40")
                  )}
                />
              </motion.div>
            );
          })
        )}
      </div>

      {/* Match details on the right side */}
      {currentMatch && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 min-w-[220px]"
          >
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-sm" />
              <Image
                src={currentMatch.opponentLogo}
                alt={currentMatch.opponent}
                fill
                className="object-contain relative z-10"
                sizes="48px"
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs font-bold text-white truncate">
                  {currentMatch.opponent}
                </div>
                <div
                  className={clsx(
                    "text-sm font-black shrink-0",
                    getScoreColor(currentMatch.result)
                  )}
                >
                  {currentMatch.score}
                </div>
              </div>
              <div className="text-[10px] text-neutral-400">
                {currentMatch.isHome ? "(H)" : "(A)"} •{" "}
                {currentMatch.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {currentMatch.competition && (
                  <>
                    {" • "}
                    <span className="text-neutral-300">
                      {currentMatch.competition}
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
