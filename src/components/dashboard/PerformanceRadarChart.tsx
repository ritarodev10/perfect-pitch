"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { SofaScoreTeamStatisticsResponse } from "@/data/sofascore";
import type { TeamStatistics } from "@/types/sofascore/teams/get-team-statistics";
import {
  buildDnaRadarData,
  PERFORMANCE_DNA_MODES,
  type TeamStats,
  type DnaModeId,
} from "@/utils/performanceDna";

interface PerformanceRadarChartProps {
  teamStats?: SofaScoreTeamStatisticsResponse | null;
}

export const PerformanceRadarChart = ({
  teamStats,
}: PerformanceRadarChartProps) => {
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallySelected, setIsManuallySelected] = useState(false);

  // Convert SofaScore data to TeamStats format
  const convertToTeamStats = useCallback((): TeamStats | null => {
    if (!teamStats) return null;

    // Check if it's the new structure (GetTeamStatisticsResponse with TeamStatistics object)
    if (
      "statistics" in teamStats &&
      typeof teamStats.statistics === "object" &&
      !Array.isArray(teamStats.statistics)
    ) {
      const stats = teamStats.statistics as TeamStatistics;

      return {
        matches: stats.matches || 0,
        goalsScored: stats.goalsScored,
        shots: stats.shots,
        shotsOnTarget: stats.shotsOnTarget,
        bigChancesCreated: stats.bigChancesCreated,
        assists: stats.assists,
        goalsFromInsideTheBox: stats.goalsFromInsideTheBox,
        fastBreakGoals: stats.fastBreakGoals,
        averageBallPossession: stats.averageBallPossession,
        accuratePassesPercentage: stats.accuratePassesPercentage,
        accurateLongBallsPercentage: stats.accurateLongBallsPercentage,
        accurateCrossesPercentage: stats.accurateCrossesPercentage,
        totalPasses: stats.totalPasses,
        // Use totalOppositionHalfPasses as proxy for final third passes
        finalThirdPasses: stats.totalOppositionHalfPasses,
        tackles: stats.tackles,
        interceptions: stats.interceptions,
        clearances: stats.clearances,
        totalDuels: stats.totalDuels,
        duelsWonPercentage: stats.duelsWonPercentage,
        aerialDuelsWonPercentage: stats.aerialDuelsWonPercentage,
        shotsAgainst: stats.shotsAgainst,
        goalsConceded: stats.goalsConceded,
        saves: stats.saves,
        cleanSheets: stats.cleanSheets,
        ballRecovery: stats.ballRecovery,
        fouls: stats.fouls,
        yellowCards: stats.yellowCards,
        redCards: stats.redCards,
        errorsLeadingToShot: stats.errorsLeadingToShot,
        errorsLeadingToGoal: stats.errorsLeadingToGoal,
        shotsOnTargetAgainst: stats.shotsOnTargetAgainst,
        penaltyGoalsConceded: stats.penaltyGoalsConceded,
      };
    }

    return null;
  }, [teamStats]);

  const teamStatsData = convertToTeamStats();
  const currentMode = PERFORMANCE_DNA_MODES[currentModeIndex];
  const radarData = teamStatsData
    ? buildDnaRadarData(teamStatsData, currentMode.id as DnaModeId)
    : [];

  // Format for recharts (needs 'A' key)
  const radar = radarData.map((point) => ({
    subject: point.subject,
    A: point.value,
  }));

  // Auto-rotate through modes every 5 seconds
  useEffect(() => {
    if (isPaused || !teamStatsData) return;

    const interval = setInterval(() => {
      setCurrentModeIndex((prev) => (prev + 1) % PERFORMANCE_DNA_MODES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, teamStatsData]);

  const handleModeSelect = (index: number) => {
    setCurrentModeIndex(index);
    setIsPaused(true);
    setIsManuallySelected(true);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // Only resume if user hasn't manually selected a mode
    if (!isManuallySelected) {
      setIsPaused(false);
    }
  };

  // Reset manual selection after 10 seconds to allow auto-rotation to resume
  useEffect(() => {
    if (isManuallySelected) {
      const timer = setTimeout(() => {
        setIsManuallySelected(false);
        setIsPaused(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isManuallySelected]);

  if (!teamStatsData || radar.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative h-full w-full p-6 md:p-8 rounded-2xl glass-panel overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="text-neutral-500 text-sm">No data available</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative h-full w-full p-6 md:p-8 rounded-2xl glass-panel overflow-hidden flex flex-col items-center justify-center flex-1 min-w-0"
    >
      <div className="flex justify-between mb-6 sm:mb-8 relative z-10 w-full">
        <div className="flex flex-col justify-start">
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
            Performance
          </h3>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentMode.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-medium text-neutral-400"
            >
              {currentMode.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Mode selector dots */}
        <div
          className="flex justify-end gap-2 mt-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {PERFORMANCE_DNA_MODES.map((mode, index) => (
            <button
              key={mode.id}
              onClick={() => handleModeSelect(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                index === currentModeIndex
                  ? "bg-[var(--accent)] w-4 md:w-6"
                  : "bg-neutral-600 hover:bg-neutral-500"
              }`}
              aria-label={`Switch to ${mode.label}`}
              title={mode.label}
            />
          ))}
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 bg-[var(--accent)]/10 rounded-full blur-[80px] animate-pulse-slow" />
      </div>

      <div className="w-full h-full relative z-10 min-h-[200px] pt-0 pb-6 px-6">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="85%"
                data={radar}
                margin={{ top: 0, right: 40, bottom: 40, left: 40 }}
              >
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "#737373",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                  tickFormatter={(value) => {
                    // Shorten long labels to prevent cropping
                    const labelMap: Record<string, string> = {
                      "Shots on Target": "Shots on Tgt",
                      "Big Chances": "Big Chances",
                      "Goals Inside Box": "Goals in Box",
                      "Fast Break Goals": "Fast Break",
                      "Final Third Passes": "Final 3rd",
                      "Pass Volume": "Pass Vol",
                      "Duels Won %": "Duels Won",
                      "Aerial Duels %": "Aerial Duels",
                      "Shots Conceded": "Shots Concd",
                      "Goals Conceded": "Goals Concd",
                      "Shots on Target Against": "Shots on Tgt A",
                      "Errors → Shot": "Errors→Shot",
                      "Errors → Goal": "Errors→Goal",
                      "Penalty Goals Conceded": "Pen Goals",
                      "Ball Recoveries": "Recoveries",
                    };
                    return labelMap[value] || value;
                  }}
                />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#e51616"
                  strokeWidth={3}
                  fill="#e51616"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </motion.div>
          </AnimatePresence>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
