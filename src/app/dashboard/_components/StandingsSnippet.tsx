"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { GetStandingsResponse } from "@/types/sofascore/tournaments/get-standings";
import { getTeamImageUrl } from "@/utils/imageProxy";

interface StandingsSnippetProps {
  standings?: GetStandingsResponse | null;
  teamId: number;
}

export const StandingsSnippet = ({
  standings,
  teamId,
}: StandingsSnippetProps) => {
  if (!standings?.standings?.[0]?.rows) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="p-8 rounded-2xl glass-panel text-center"
      >
        <p className="text-sm text-neutral-500">No standings data available</p>
      </motion.div>
    );
  }

  const rows = standings.standings[0].rows;
  const top5 = rows.slice(0, 5);
  const teamRow = rows.find((row) => row.team.id === teamId);
  const isTeamInTop5 = top5.some((row) => row.team.id === teamId);

  const displayRows = isTeamInTop5 ? top5 : teamRow ? [...top5, teamRow] : top5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="p-6 rounded-2xl glass-panel"
    >
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">
          League Standings
        </h3>
        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
          Top 5 + Milan
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              <th className="w-8 pb-2 text-left"></th>
              <th className="pb-2 text-left"></th>
              <th className="w-8 pb-2 text-center">P</th>
              <th className="w-8 pb-2 text-center text-emerald-400">W</th>
              <th className="w-8 pb-2 text-center">D</th>
              <th className="w-8 pb-2 text-center text-red-500">L</th>
              <th className="w-12 pb-2 text-center pr-2">PTS</th>
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, index) => {
              const isMilan = row.team.id === teamId;
              const isHighlighted = isMilan && !isTeamInTop5;

              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                  className={`
                    rounded-lg transition-all duration-300
                    ${
                      isMilan
                        ? "bg-[var(--accent)]/10 border border-[var(--accent)]/20"
                        : "bg-white/5 hover:bg-white/10"
                    }
                    ${isHighlighted ? "border-t-2 border-[var(--accent)]" : ""}
                  `}
                >
                  <td className="p-3 first:rounded-l-lg">
                    <div
                      className={`
                        w-8 h-8 flex items-center justify-center text-xs font-black
                        aspect-square mx-auto
                        ${
                          row.position <= 3
                            ? "bg-[var(--accent)] text-white"
                            : isMilan
                            ? "bg-[var(--accent)] text-white"
                            : "bg-neutral-600 text-white"
                        }
                      `}
                      style={{ borderRadius: "50%" }}
                    >
                      {row.position}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 w-6 h-6">
                        <Image
                          src={getTeamImageUrl(row.team.id)}
                          alt={row.team.name}
                          width={20}
                          height={20}
                          className="w-full h-full object-contain"
                          unoptimized
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs font-medium text-neutral-400">
                      {row.matches}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs font-medium text-emerald-400">
                      {row.wins}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs font-medium text-neutral-500">
                      {row.draws}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs font-medium text-red-500">
                      {row.losses}
                    </span>
                  </td>
                  <td className="p-3 text-center pr-2 last:rounded-r-lg">
                    <span className="text-xs font-bold text-white">
                      {row.points}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Full Standings Link */}
      <Link
        href="/standings"
        className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
      >
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-white transition-colors">
          View Full Standings
        </span>
        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </Link>
    </motion.div>
  );
};
