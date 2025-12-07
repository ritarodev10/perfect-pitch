"use client";

import { motion } from "framer-motion";
import type { GetTeamPlayerStatisticsResponse } from "@/types/sofascore/teams/get-team-player-statistics";
import type { GetTeamSquadResponse } from "@/types/sofascore/teams/get-team-squad";

interface SquadSnapshotProps {
  playerStats?: GetTeamPlayerStatisticsResponse | null;
  squad?: GetTeamSquadResponse | null;
}

export const SquadSnapshot = ({ playerStats, squad }: SquadSnapshotProps) => {
  let topPlayers: Array<{
    id: number;
    name: string;
    shortName: string;
    position?: string;
    jerseyNumber?: string | number;
    goals: number;
    assists: number;
  }> = [];

  // Try to get players from squad first (more complete data)
  if (squad?.players && squad.players.length > 0) {
    // Get top players from player stats to combine with squad data
    const topGoals = playerStats?.topPlayers?.goals?.[0];
    const topAssists = playerStats?.topPlayers?.assists?.[0];
    const topRating = playerStats?.topPlayers?.rating?.[0];

    // Create a map of player stats by player ID
    const playerStatsMap = new Map<
      number,
      { goals: number; assists: number }
    >();

    if (topGoals) {
      playerStatsMap.set(topGoals.player.id, {
        goals: topGoals.statistics.goals ?? 0,
        assists: 0,
      });
    }
    if (topAssists) {
      const existing = playerStatsMap.get(topAssists.player.id);
      playerStatsMap.set(topAssists.player.id, {
        goals: existing?.goals ?? 0,
        assists: topAssists.statistics.assists ?? 0,
      });
    }
    if (topRating && !playerStatsMap.has(topRating.player.id)) {
      playerStatsMap.set(topRating.player.id, {
        goals: 0,
        assists: 0,
      });
    }

    // Get top 4 players from squad, prioritizing those with stats
    const playersWithStats = squad.players
      .map((squadMember) => {
        const player = squadMember.player;
        const stats = playerStatsMap.get(player.id) || { goals: 0, assists: 0 };
        return {
          id: player.id,
          name: player.name,
          shortName: player.shortName || player.name,
          position: player.position,
          jerseyNumber: player.jerseyNumber || player.shirtNumber,
          goals: stats.goals,
          assists: stats.assists,
        };
      })
      .sort((a, b) => {
        // Sort by goals + assists, then by jersey number
        const aTotal = a.goals + a.assists;
        const bTotal = b.goals + b.assists;
        if (aTotal !== bTotal) return bTotal - aTotal;
        const aNum =
          typeof a.jerseyNumber === "number"
            ? a.jerseyNumber
            : parseInt(String(a.jerseyNumber || "999"), 10);
        const bNum =
          typeof b.jerseyNumber === "number"
            ? b.jerseyNumber
            : parseInt(String(b.jerseyNumber || "999"), 10);
        return aNum - bNum;
      })
      .slice(0, 4);

    topPlayers = playersWithStats;
  }
  // Fallback to player stats if no squad data
  else if (playerStats?.topPlayers) {
    const { topPlayers: stats } = playerStats;

    // Combine top goals, assists, and rating players
    const playersMap = new Map<
      number,
      {
        id: number;
        name: string;
        shortName: string;
        position?: string;
        jerseyNumber?: string | number;
        goals: number;
        assists: number;
      }
    >();

    // Add top goals
    if (stats.goals?.[0]) {
      const entry = stats.goals[0];
      playersMap.set(entry.player.id, {
        id: entry.player.id,
        name: entry.player.name,
        shortName: entry.player.shortName || entry.player.name,
        position: entry.player.position,
        goals: entry.statistics.goals ?? 0,
        assists: 0,
      });
    }

    // Add top assists
    if (stats.assists?.[0]) {
      const entry = stats.assists[0];
      const existing = playersMap.get(entry.player.id);
      if (existing) {
        existing.assists = entry.statistics.assists ?? 0;
      } else {
        playersMap.set(entry.player.id, {
          id: entry.player.id,
          name: entry.player.name,
          shortName: entry.player.shortName || entry.player.name,
          position: entry.player.position,
          goals: 0,
          assists: entry.statistics.assists ?? 0,
        });
      }
    }

    // Add top rating if not already included
    if (stats.rating?.[0] && !playersMap.has(stats.rating[0].player.id)) {
      const entry = stats.rating[0];
      playersMap.set(entry.player.id, {
        id: entry.player.id,
        name: entry.player.name,
        shortName: entry.player.shortName || entry.player.name,
        position: entry.player.position,
        goals: 0,
        assists: 0,
      });
    }

    topPlayers = Array.from(playersMap.values())
      .sort((a, b) => b.goals + b.assists - (a.goals + a.assists))
      .slice(0, 4);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
          Key Squad Members
        </h3>
        <button className="text-xs font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {topPlayers.length === 0 ? (
          <div className="col-span-4 rounded-2xl glass-panel p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center border border-white/5">
                <svg
                  className="w-8 h-8 text-neutral-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-400 mb-1">
                  No player statistics available
                </p>
                <p className="text-xs text-neutral-600">
                  Player data will appear here when available
                </p>
              </div>
            </div>
          </div>
        ) : (
          topPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="group relative h-[360px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5"
            >
              {/* Image */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                <img
                  src={`https://api.sofascore.app/api/v1/player/${player.id}/image`}
                  alt={player.name}
                  className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-4xl font-black text-white/10 absolute -top-8 right-4 group-hover:text-[var(--accent)]/20 transition-colors duration-500">
                  {player.jerseyNumber || "?"}
                </p>
                <p className="text-[10px] font-bold text-[var(--accent)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 tracking-[0.2em] uppercase">
                  #{player.jerseyNumber || "?"}
                </p>
                <h4 className="text-xl font-black text-white leading-none mb-2 tracking-tight">
                  {player.shortName || player.name}
                </h4>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest border-t border-white/10 pt-2 inline-block">
                  {player.position || "N/A"}
                </p>
                {(player.goals > 0 || player.assists > 0) && (
                  <p className="text-xs font-bold text-neutral-500 mt-1">
                    {player.goals}G{" "}
                    {player.assists > 0 ? `• ${player.assists}A` : ""}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
