"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { GetStandingsResponse } from "@/types/sofascore/tournaments/get-standings";
import type { SofaScoreMatchesResponse } from "@/data/sofascore";
import {
  getHistoricalSeasonsForComparison,
  getCurrentSeasonProgression,
  type SeasonProgressionData,
} from "@/data/hardcoded/standings-comparison";

interface StandingsComparisonChartProps {
  currentSeasonStandings?: GetStandingsResponse | null;
  historicalSeasons?: Array<{
    seasonId: number;
    seasonName: string;
    standings: GetStandingsResponse | null;
  }>;
  teamId?: number;
  lastMatches?: SofaScoreMatchesResponse | null;
  useHardcodedData?: boolean; // Flag to use hardcoded data instead of API data
}

export const StandingsComparisonChart = ({
  currentSeasonStandings,
  historicalSeasons = [],
  teamId,
  lastMatches,
  useHardcodedData = true, // Default to using hardcoded data
}: StandingsComparisonChartProps) => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Use hardcoded data if flag is set
  const hardcodedHistoricalSeasons = getHistoricalSeasonsForComparison();
  const hardcodedCurrentSeason = getCurrentSeasonProgression();

  // Type for prepared season data
  type PreparedSeason = {
    seasonId: number;
    seasonName: string;
    standings: GetStandingsResponse | null;
    progressionData?: SeasonProgressionData[];
  };

  // Prepare historical seasons data
  const preparedHistoricalSeasons: PreparedSeason[] = useHardcodedData
    ? hardcodedHistoricalSeasons.map((season) => ({
        seasonId: season.seasonId,
        seasonName: season.seasonName,
        standings: null, // Not needed for hardcoded data
        progressionData: season.data,
      }))
    : historicalSeasons.map((season) => ({
        seasonId: season.seasonId,
        seasonName: season.seasonName,
        standings: season.standings,
        progressionData: undefined,
      }));

  // Filter out seasons without data
  const validHistoricalSeasons = useHardcodedData
    ? preparedHistoricalSeasons // All hardcoded seasons have data
    : preparedHistoricalSeasons.filter((season) => season.standings !== null);

  // Auto-rotate through seasons every 3 seconds
  useEffect(() => {
    if (!isAutoRotating || validHistoricalSeasons.length === 0) return;

    const interval = setInterval(() => {
      setSelectedSeasonIndex((prev) => {
        return (prev + 1) % validHistoricalSeasons.length;
      });
    }, 3000); // Changed from 5000 to 3000 (3 seconds)

    return () => clearInterval(interval);
  }, [isAutoRotating, validHistoricalSeasons.length]);

  // Calculate current season position progression from match history
  const calculateCurrentSeasonProgression = () => {
    // Use hardcoded data if available
    if (useHardcodedData) {
      return hardcodedCurrentSeason;
    }

    if (!currentSeasonStandings?.standings?.[0]?.rows) {
      return [];
    }

    const standingsRows = currentSeasonStandings.standings[0].rows;
    const teamRow = standingsRows.find((row) => row.team.id === teamId);
    const currentPosition = teamRow?.position || standingsRows.length;
    const matchesPlayed = teamRow?.matches || 0;

    // Use the actual matches played from standings (not lastMatches which includes all seasons)
    if (matchesPlayed === 0) return [];

    // Create data points showing progression
    // Start from a reasonable position (middle of table) and move to current
    const totalTeams = standingsRows.length;
    const startPosition = Math.floor(totalTeams / 2);
    const currentPoints = teamRow?.points || 0;
    const startPoints = 0; // Start from 0 points at match 1
    const progression: Array<{
      match: number;
      position: number;
      points: number;
    }> = [];

    // Add initial position
    progression.push({
      match: 1,
      position: startPosition,
      points: startPoints,
    });

    // Interpolate to current position and points
    if (matchesPlayed > 1) {
      const positionDiff = currentPosition - startPosition;
      const positionStep = positionDiff / (matchesPlayed - 1);
      const pointsStep = currentPoints / (matchesPlayed - 1);

      for (let i = 2; i <= matchesPlayed; i++) {
        const position = Math.round(startPosition + positionStep * (i - 1));
        const points = Math.round(startPoints + pointsStep * (i - 1));
        progression.push({
          match: i,
          position: Math.max(1, Math.min(totalTeams, position)),
          points: Math.max(0, points),
        });
      }
    } else if (matchesPlayed === 1) {
      progression.push({
        match: 1,
        position: currentPosition,
        points: currentPoints,
      });
    }

    return progression;
  };

  const currentSeasonData = calculateCurrentSeasonProgression();
  const selectedSeason =
    validHistoricalSeasons[selectedSeasonIndex] || validHistoricalSeasons[0];

  // Get historical season data - need to pass currentSeasonData length
  const getHistoricalSeasonDataWithContext = (
    season: PreparedSeason,
    currentMatchesCount: number
  ) => {
    // Use hardcoded progression data if available
    if (useHardcodedData && season.progressionData) {
      // Return only the matches up to current season's match count
      return season.progressionData.slice(0, currentMatchesCount);
    }

    // Fallback to API data (if not using hardcoded)
    if (!season.standings?.standings?.[0]?.rows) {
      return [];
    }

    const standingsRows = season.standings.standings[0].rows;
    const teamRow = standingsRows.find((row) => row.team.id === teamId);

    if (!teamRow) {
      return [];
    }

    const finalPosition = teamRow.position;
    const finalPoints = teamRow.points;
    const matchesPlayed = teamRow.matches;

    // Use the current season's match count for alignment
    // This ensures both lines have the same X-axis range
    const maxMatches = Math.max(matchesPlayed, currentMatchesCount || 1);
    const data: Array<{ match: number; position: number; points: number }> = [];

    // Create data points matching the current season's match numbers
    for (let i = 1; i <= maxMatches; i++) {
      data.push({ match: i, position: finalPosition, points: finalPoints });
    }

    return data;
  };

  const historicalSeasonData = selectedSeason
    ? getHistoricalSeasonDataWithContext(
        selectedSeason,
        currentSeasonData.length
      )
    : [];

  // Combine data for chart
  const chartData: Array<{
    match: number;
    current: number | null;
    historical: number | null;
    currentPoints: number | null;
    historicalPoints: number | null;
  }> = [];

  // Get all unique match numbers
  const allMatches = new Set<number>();
  currentSeasonData.forEach((d) => allMatches.add(d.match));
  historicalSeasonData.forEach((d) => allMatches.add(d.match));
  const sortedMatches = Array.from(allMatches).sort((a, b) => a - b);

  // Create combined data points
  sortedMatches.forEach((match) => {
    const current = currentSeasonData.find((d) => d.match === match);
    const historical = historicalSeasonData.find((d) => d.match === match);

    chartData.push({
      match,
      current: current?.position ?? null,
      historical: historical?.position ?? null,
      currentPoints: current?.points ?? null,
      historicalPoints: historical?.points ?? null,
    });
  });

  // Calculate Y-axis domain (inverted: 1 at top, max at bottom)
  const allPositions = [
    ...currentSeasonData.map((d) => d.position),
    ...historicalSeasonData.map((d) => d.position),
  ];
  const maxPosition = allPositions.length > 0 ? Math.max(...allPositions) : 20;
  const minPosition = allPositions.length > 0 ? Math.min(...allPositions) : 1;

  // Inverted domain: higher numbers (worse position) at bottom
  const yAxisDomain: [number, number] = [
    Math.max(1, minPosition - 1),
    Math.min(20, maxPosition + 1),
  ];

  const handlePrevious = () => {
    setIsAutoRotating(false);
    setSelectedSeasonIndex((prev) =>
      prev === 0 ? validHistoricalSeasons.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setSelectedSeasonIndex((prev) =>
      prev === validHistoricalSeasons.length - 1 ? 0 : prev + 1
    );
  };

  if (validHistoricalSeasons.length === 0 && currentSeasonData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-[280px] w-full p-6 md:p-8 rounded-2xl glass-panel relative overflow-hidden"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-neutral-500">
            No standings data available
          </p>
        </div>
      </motion.div>
    );
  }

  // Show warning if no historical seasons available
  if (validHistoricalSeasons.length === 0 && currentSeasonData.length > 0) {
    // No historical seasons available for comparison
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full h-full p-6 md:p-8 rounded-2xl glass-panel relative overflow-hidden flex flex-col"
    >
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 sm:mb-8 relative z-10 flex-shrink-0">
        <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
          Position Comparison
        </h3>
        <div className="flex items-center gap-2 sm:gap-3">
          {selectedSeason ? (
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              vs {selectedSeason.seasonName}
            </span>
          ) : validHistoricalSeasons.length === 0 ? (
            <span className="text-[10px] font-bold text-yellow-500/70 uppercase tracking-wider">
              No historical data
            </span>
          ) : null}
          {validHistoricalSeasons.length > 1 && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrevious}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Previous season"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="text-neutral-400"
                >
                  <path
                    d="M6 2L4 5L6 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Next season"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="text-neutral-400"
                >
                  <path
                    d="M4 2L6 5L4 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative z-0 min-w-0 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 30, left: 30 }}
          >
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e51616" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#e51616" stopOpacity={1} />
              </linearGradient>
              <linearGradient
                id="historicalGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#6b7280" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6b7280" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="match"
              hide={true}
              domain={["dataMin", "dataMax"]}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis
              hide={true}
              domain={yAxisDomain}
              reversed
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tickLine={{ stroke: "#374151" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
              }}
              itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}
              labelStyle={{ color: "#9ca3af", fontSize: "11px" }}
              cursor={{
                stroke: "rgba(255,255,255,0.1)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;

                const currentPayload = payload.find(
                  (p) => p.dataKey === "current"
                );
                const historicalPayload = payload.find(
                  (p) => p.dataKey === "historical"
                );
                const currentData = currentPayload?.payload as
                  | {
                      current: number | null;
                      currentPoints: number | null;
                    }
                  | undefined;
                const historicalData = historicalPayload?.payload as
                  | {
                      historical: number | null;
                      historicalPoints: number | null;
                    }
                  | undefined;

                return (
                  <div className="p-3">
                    <div className="text-xs text-neutral-400 mb-2">
                      Match {label}
                    </div>
                    {currentData?.current !== null &&
                      currentData?.current !== undefined && (
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#e51616" }}
                          />
                          <span className="text-xs font-semibold text-white">
                            Current: Position {currentData.current}
                            {currentData.currentPoints !== null &&
                              currentData.currentPoints !== undefined && (
                                <span className="text-neutral-400 ml-2">
                                  ({currentData.currentPoints} pts)
                                </span>
                              )}
                          </span>
                        </div>
                      )}
                    {historicalData?.historical !== null &&
                      historicalData?.historical !== undefined && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#6b7280" }}
                          />
                          <span className="text-xs font-semibold text-white">
                            {selectedSeason?.seasonName || "Historical"}:
                            Position {historicalData.historical}
                            {historicalData.historicalPoints !== null &&
                              historicalData.historicalPoints !== undefined && (
                                <span className="text-neutral-400 ml-2">
                                  ({historicalData.historicalPoints} pts)
                                </span>
                              )}
                          </span>
                        </div>
                      )}
                  </div>
                );
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "10px",
              }}
              iconType="line"
              formatter={(value) => {
                if (value === "current") return "Current Season";
                return selectedSeason?.seasonName || "Historical";
              }}
            />
            {currentSeasonData.length > 0 && (
              <Line
                type="monotone"
                dataKey="current"
                stroke="url(#currentGradient)"
                strokeWidth={3}
                dot={{ r: 3, fill: "#e51616", strokeWidth: 2 }}
                activeDot={{
                  r: 6,
                  fill: "#e51616",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                animationDuration={1000}
                animationEasing="ease-in-out"
                connectNulls={false}
              />
            )}
            {historicalSeasonData.length > 0 && selectedSeason ? (
              <Line
                type="monotone"
                dataKey="historical"
                name={selectedSeason.seasonName || "Historical"}
                stroke="#9ca3af"
                strokeWidth={3}
                strokeDasharray="6 4"
                dot={{ r: 4, fill: "#9ca3af", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{
                  r: 7,
                  fill: "#9ca3af",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                animationDuration={1000}
                animationEasing="ease-in-out"
                connectNulls={true}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
