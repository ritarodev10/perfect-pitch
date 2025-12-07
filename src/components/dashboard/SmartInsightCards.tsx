"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Target, Trophy } from "lucide-react";
import type {
  SofaScoreTeamStatisticsResponse,
  SofaScoreStandingsResponse,
  SofaScoreTeamDetailResponse,
} from "@/data/sofascore";

interface SmartInsightCardsProps {
  teamStats?: SofaScoreTeamStatisticsResponse | null;
  standings?: SofaScoreStandingsResponse | null;
  teamData: SofaScoreTeamDetailResponse;
}

export const SmartInsightCards = ({
  teamStats,
  standings,
  teamData,
}: SmartInsightCardsProps) => {
  // Generate insights from real data
  const insights: Array<{ id: string; type: string; text: string }> = [];

  // Get team position
  const teamRow = standings?.standings?.[0]?.standings?.rows?.find(
    (row) => row.team.id === teamData.team.id
  );

  if (teamRow) {
    insights.push({
      id: "position",
      type:
        teamRow.position <= 3
          ? "positive"
          : teamRow.position <= 6
          ? "neutral"
          : "highlight",
      text: `Currently ${teamRow.position}${getOrdinalSuffix(
        teamRow.position
      )} in ${teamData.team.primaryUniqueTournament.name} with ${
        teamRow.points
      } points`,
    });
  }

  // Get statistics
  const allStats =
    teamStats?.periods?.all?.statistics ||
    teamStats?.statistics?.[0]?.statistics ||
    [];
  const getStatValue = (name: string): number => {
    const stat = allStats.find(
      (s) =>
        s.name?.toLowerCase().includes(name.toLowerCase()) ||
        s.displayName?.toLowerCase().includes(name.toLowerCase())
    );
    if (stat?.value) {
      return typeof stat.value === "number"
        ? stat.value
        : parseFloat(String(stat.value)) || 0;
    }
    return 0;
  };

  const goalsFor = getStatValue("goals for") || getStatValue("scored");
  const goalsAgainst =
    getStatValue("goals against") || getStatValue("conceded");
  const possession = getStatValue("possession");

  if (goalsFor > 0) {
    const goalDiff = goalsFor - goalsAgainst;
    if (goalDiff > 0) {
      insights.push({
        id: "goals",
        type: "positive",
        text: `Strong attacking form with ${Math.round(
          goalsFor
        )} goals scored and +${Math.round(goalDiff)} goal difference`,
      });
    }
  }

  if (possession > 50) {
    insights.push({
      id: "possession",
      type: "neutral",
      text: `Dominant possession play with ${Math.round(
        possession
      )}% average ball control`,
    });
  }

  if (teamRow?.form) {
    const recentWins = (teamRow.form.match(/W/g) || []).length;
    if (recentWins >= 3) {
      insights.push({
        id: "form",
        type: "positive",
        text: `Excellent recent form with ${recentWins} wins in last ${teamRow.form.length} matches`,
      });
    }
  }

  if (insights.length === 0) {
    insights.push({
      id: "default",
      type: "neutral",
      text: `Tracking ${teamData.team.name} performance in ${teamData.team.primaryUniqueTournament.name}`,
    });
  }

  function getOrdinalSuffix(n: number): string {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "neutral":
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
      case "highlight":
        return <Zap className="w-5 h-5 text-yellow-500" />;
      default:
        return <Target className="w-5 h-5 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 pl-2">
        AI Insights
      </h3>
      {insights.map((insight, index) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="relative p-5 rounded-2xl glass-panel overflow-hidden group cursor-default hover:bg-white/5 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors shadow-inner">
              {getIcon(insight.type)}
            </div>
            <p className="text-sm font-medium text-neutral-300 leading-relaxed pt-1">
              {insight.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
