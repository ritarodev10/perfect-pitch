"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import type { SofaScoreMatchesResponse } from "@/data/sofascore";

interface TeamMomentumChartProps {
  lastMatches?: SofaScoreMatchesResponse | null;
  teamId: number;
}

export const TeamMomentumChart = ({
  lastMatches,
  teamId,
}: TeamMomentumChartProps) => {
  /**
   * MOMENTUM CALCULATION LOGIC:
   *
   * 1. Takes the last 10 matches from the team's recent games
   * 2. Reverses them so oldest match is first (chronological order)
   * 3. For each match, calculates points earned:
   *    - Win = 3 points
   *    - Draw = 1 point
   *    - Loss = 0 points
   * 4. Accumulates points cumulatively (running total)
   *
   * Example: If a team's last 5 matches were [Win, Draw, Loss, Win, Win]
   * Match 1: Win → 3 points (total: 3)
   * Match 2: Draw → 1 point (total: 4)
   * Match 3: Loss → 0 points (total: 4)
   * Match 4: Win → 3 points (total: 7)
   * Match 5: Win → 3 points (total: 10)
   *
   * The line chart shows this cumulative progression over time.
   * - Upward trend = gaining momentum (winning/drawing)
   * - Flat segments = losing matches (no points added)
   * - Steep rise = winning streak
   */
  let cumulativePoints = 0;
  const momentum =
    lastMatches?.events
      ?.slice(0, 10)
      .reverse()
      .map((match, index) => {
        // Calculate points: 3 for win, 1 for draw, 0 for loss
        let points = 0;
        if (
          match.homeScore?.current !== undefined &&
          match.awayScore?.current !== undefined
        ) {
          const homeScore = match.homeScore.current;
          const awayScore = match.awayScore.current;
          const isHome = match.homeTeam.id === teamId;

          if (isHome) {
            if (homeScore > awayScore) points = 3;
            else if (homeScore === awayScore) points = 1;
          } else {
            if (awayScore > homeScore) points = 3;
            else if (awayScore === homeScore) points = 1;
          }
        }
        cumulativePoints += points;
        return {
          match: index + 1,
          points: cumulativePoints,
        };
      }) || [];

  // Calculate dynamic Y-axis domain based on actual data
  // Add padding (10% on top, start from 0 or min value)
  const maxPoints =
    momentum.length > 0 ? Math.max(...momentum.map((m) => m.points)) : 30; // Default to 30 (10 wins max)
  const minPoints =
    momentum.length > 0 ? Math.min(...momentum.map((m) => m.points)) : 0;

  // Set domain with padding: start at 0 or slightly below min, go to max + 10% padding
  const yAxisDomain: [number, number] = [
    Math.max(0, Math.floor(minPoints * 0.9)),
    Math.ceil(maxPoints * 1.1) || 30,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="h-[280px] w-full p-8 rounded-2xl glass-panel relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
          Momentum
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
            Live Trend
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 min-w-0 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <LineChart
            data={momentum}
            margin={{ top: 60, right: 0, bottom: 0, left: -20 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e51616" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#e51616" stopOpacity={1} />
              </linearGradient>
            </defs>
            <YAxis hide domain={yAxisDomain} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
              }}
              itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}
              cursor={{
                stroke: "rgba(255,255,255,0.1)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Line
              type="monotone"
              dataKey="points"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{ r: 4, fill: "#000", stroke: "#e51616", strokeWidth: 2 }}
              activeDot={{
                r: 8,
                fill: "#e51616",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
