"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { GetTeamPlayerStatisticsResponse } from "@/types/sofascore/teams/get-team-player-statistics";
import type { TopPlayerEntry } from "@/types/sofascore/teams/get-team-player-statistics";
import { getPlayerImageUrl } from "@/utils/imageProxy";

interface PlayerLeadersProps {
  playerStats?: GetTeamPlayerStatisticsResponse | null;
}

// Map position abbreviations
const formatPosition = (position: string | undefined): string => {
  if (!position) return "";
  const positionMap: Record<string, string> = {
    M: "MF",
    D: "DF",
    G: "GK",
    F: "FW",
  };
  return positionMap[position] || position;
};

// Get color class for position
const getPositionColor = (position: string | undefined): string => {
  if (!position) return "text-neutral-500";
  const formatted = formatPosition(position);
  const colorMap: Record<string, string> = {
    GK: "text-yellow-500",
    DF: "text-blue-500",
    MF: "text-emerald-400",
    FW: "text-red-500",
  };
  return colorMap[formatted] || "text-neutral-500";
};

interface PlayerCardProps {
  player: TopPlayerEntry<any>;
  label: string;
  value: number;
  suffix: string;
  color: string;
  index: number;
}

const PlayerCard = ({
  player,
  label,
  value,
  suffix,
  color,
  index,
}: PlayerCardProps) => {
  const [imageError, setImageError] = useState(false);
  const playerInitial =
    player?.player.shortName?.[0] || player?.player.name?.[0] || "?";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
        {player?.player.id && !imageError ? (
          <img
            src={getPlayerImageUrl(player.player.id)}
            alt={player.player.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-lg font-black text-white">{playerInitial}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-white truncate">
          {player?.player.shortName || player?.player.name}
        </p>
        {player?.player.position && (
          <p
            className={`text-xs font-bold mt-1 ${getPositionColor(
              player.player.position
            )}`}
          >
            {formatPosition(player.player.position)}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className={`text-2xl font-black ${color}`}>
          {typeof value === "number"
            ? value.toFixed(suffix === "rating" ? 1 : 0)
            : value}
        </p>
        <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mt-1">
          {suffix}
        </p>
      </div>
    </motion.div>
  );
};

interface RatingPlayerCardProps {
  player: TopPlayerEntry<any>;
  index: number;
  baseDelay: number;
}

const RatingPlayerCard = ({
  player,
  index,
  baseDelay,
}: RatingPlayerCardProps) => {
  const [imageError, setImageError] = useState(false);
  const playerInitial =
    player?.player.shortName?.[0] || player?.player.name?.[0] || "?";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: baseDelay + index * 0.1,
        duration: 0.4,
      }}
      className="flex items-center gap-3"
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
        {player?.player.id && !imageError ? (
          <img
            src={getPlayerImageUrl(player.player.id)}
            alt={player.player.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-sm font-black text-white">{playerInitial}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">
          {player?.player.shortName || player?.player.name}
        </p>
        {player?.player.position && (
          <p
            className={`text-xs font-bold mt-0.5 ${getPositionColor(
              player.player.position
            )}`}
          >
            {formatPosition(player.player.position)}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className="text-xl font-black text-yellow-500">
          {player?.statistics.rating?.toFixed(1) ?? "0.0"}
        </p>
        <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mt-0.5">
          rating
        </p>
      </div>
    </motion.div>
  );
};

export const PlayerLeaders = ({ playerStats }: PlayerLeadersProps) => {
  if (!playerStats?.topPlayers) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="p-8 rounded-2xl glass-panel text-center"
      >
        <p className="text-sm text-neutral-500">
          No player statistics available
        </p>
      </motion.div>
    );
  }

  const { topPlayers } = playerStats;

  const topGoals = topPlayers.goals?.[0];
  const topAssists = topPlayers.assists?.[0];
  const topGoalContribution = topPlayers.goalsAssistsSum?.[0];
  const topRatings = topPlayers.rating?.slice(0, 3) || [];

  const leaders = [
    {
      label: "Top Scorer",
      player: topGoals,
      value: topGoals?.statistics.goals ?? 0,
      suffix: "goals",
      color: "text-emerald-400",
    },
    {
      label: "Top Assists",
      player: topAssists,
      value: topAssists?.statistics.assists ?? 0,
      suffix: "assists",
      color: "text-blue-500",
    },
    {
      label: "Top Goal Contribution",
      player: topGoalContribution,
      value: topGoalContribution?.statistics.goalsAssistsSum ?? 0,
      suffix: "Goal/Asist",
      color: "text-purple-500",
    },
  ].filter((leader) => leader.player);

  if (leaders.length === 0 && topRatings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="p-8 rounded-2xl glass-panel text-center"
      >
        <p className="text-sm text-neutral-500">No player leaders available</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="p-6 rounded-2xl glass-panel"
    >
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6">
        Player Leaders
      </h3>

      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <PlayerCard
            key={leader.label}
            player={leader.player!}
            label={leader.label}
            value={leader.value}
            suffix={leader.suffix}
            color={leader.color}
            index={index}
          />
        ))}

        {topRatings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + leaders.length * 0.1, duration: 0.4 }}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
              Top Rating
            </p>
            <div className="space-y-3">
              {topRatings.map((ratingEntry, index) => (
                <RatingPlayerCard
                  key={ratingEntry.player.id}
                  player={ratingEntry}
                  index={index}
                  baseDelay={1.0 + leaders.length * 0.1}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Show Full Squad Link */}
        <Link
          href="/squad"
          className="mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
        >
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-white transition-colors">
            Show Full Squad
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </motion.div>
  );
};
