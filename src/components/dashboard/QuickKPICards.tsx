"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import type {
  SofaScoreTeamStatisticsResponse,
  SofaScoreTeamDetailResponse,
  SofaScoreStandingsResponse,
} from "@/data/sofascore";

interface QuickKPICardsProps {
  teamStats?: SofaScoreTeamStatisticsResponse | null;
  teamData: SofaScoreTeamDetailResponse;
  standings?: SofaScoreStandingsResponse | null;
}

const CountUp = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(ease * to));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [to, duration]);

  return <>{count}</>;
};

const KPICard = ({
  label,
  value,
  suffix = "",
  delay = 0,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  icon?: string;
}) => {
  const hasValue = value > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.5 }}
      className="group relative p-6 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden min-h-[140px] flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3 relative z-10">
        {label}
      </p>
      <div className="flex justify-between items-center">
        <div
          className={`text-4xl md:text-5xl font-black tracking-tighter relative z-10 flex items-baseline flex-1 ${
            hasValue ? "text-white" : "text-neutral-700"
          }`}
        >
          <CountUp to={value} />
          <span
            className={`text-xl ml-1 font-medium ${
              hasValue ? "text-neutral-600" : "text-neutral-800"
            }`}
          >
            {suffix}
          </span>
        </div>
        {icon && (
          <Icon
            icon={icon}
            width={28}
            height={28}
            className="transition-all duration-300 group-hover:scale-110 z-10"
            style={{
              color: hasValue ? "#34d399" : "#6b7280",
              filter: hasValue
                ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6)) drop-shadow(0 0 16px rgba(16, 185, 129, 0.3))"
                : undefined,
            }}
          />
        )}
      </div>
      {/* Micro-interaction: ambient glow on hover */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-(--accent)/10 rounded-full blur-3xl group-hover:bg-(--accent)/20 transition-colors duration-500" />
    </motion.div>
  );
};

export const QuickKPICards = ({
  teamStats,
  teamData,
  standings,
}: QuickKPICardsProps) => {
  let goalsFor = 0;
  let goalsAgainst = 0;
  let possession = 0;
  let cleanSheets = 0;
  let passAccuracy = 0;

  // Check if it's the new structure (GetTeamStatisticsResponse with TeamStatistics object)
  if (
    teamStats &&
    "statistics" in teamStats &&
    typeof teamStats.statistics === "object" &&
    !Array.isArray(teamStats.statistics)
  ) {
    const stats = teamStats.statistics as any;
    goalsFor = stats?.goalsScored ?? 0;
    goalsAgainst = stats?.goalsConceded ?? 0;
    possession = stats?.averageBallPossession ?? 0;
    cleanSheets = stats?.cleanSheets ?? 0;
    passAccuracy = stats?.accuratePassesPercentage ?? 0;
  }
  // Check if it's the old structure (SofaScoreTeamStatisticsResponse)
  else if (teamStats) {
    const allStats =
      teamStats?.periods?.all?.statistics ||
      teamStats?.statistics?.[0]?.statistics ||
      [];

    const getStatValue = (name: string): number => {
      const stat = allStats.find(
        (s: any) =>
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

    goalsFor = getStatValue("goals for") || getStatValue("scored");
    goalsAgainst = getStatValue("goals against") || getStatValue("conceded");
    possession = getStatValue("possession");
    cleanSheets = getStatValue("clean sheets");
    passAccuracy = getStatValue("pass accuracy") || getStatValue("passes");
  }

  // Get team position from standings
  const teamPosition =
    standings?.standings?.[0]?.standings?.rows?.find(
      (row) => row.team.id === teamData.team.id
    )?.position || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <KPICard
        label="Goals For"
        value={Math.round(goalsFor)}
        delay={0.1}
        icon="mdi:soccer"
      />
      <KPICard
        label="Goals Against"
        value={Math.round(goalsAgainst)}
        delay={0.2}
        icon="emojione-monotone:goal-net"
      />
      <KPICard
        label="Possession"
        value={Math.round(possession)}
        suffix="%"
        delay={0.3}
        icon="mdi:soccer-field"
      />
      <KPICard
        label="Clean Sheets"
        value={Math.round(cleanSheets)}
        delay={0.4}
        icon="mdi:shield-check"
      />
      {teamPosition > 0 ? (
        <KPICard
          label="League Position"
          value={teamPosition}
          delay={0.5}
          icon="mdi:trophy"
        />
      ) : (
        <KPICard
          label="Pass Accuracy"
          value={Math.round(passAccuracy)}
          suffix="%"
          delay={0.5}
          icon="mdi:shoe-cleat"
        />
      )}
    </div>
  );
};
