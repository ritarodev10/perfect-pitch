// performanceDna.ts

// Sofascore team stats → 0–100 radar values for multiple "Performance DNA" modes

// ---- Types ----

export type TeamStats = {
  matches: number;

  // Attacking
  goalsScored?: number;
  shots?: number;
  shotsOnTarget?: number;
  bigChancesCreated?: number;
  assists?: number;
  goalsFromInsideTheBox?: number;
  fastBreakGoals?: number;

  // Possession / build-up
  averageBallPossession?: number; // already %
  accuratePassesPercentage?: number; // already %
  accurateLongBallsPercentage?: number; // already %
  accurateCrossesPercentage?: number; // already %
  totalPasses?: number;
  // if you have final-third passes for your team, add here:
  finalThirdPasses?: number;

  // Defensive
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  totalDuels?: number;
  duelsWonPercentage?: number; // %
  aerialDuelsWonPercentage?: number; // %
  shotsAgainst?: number;
  goalsConceded?: number;
  saves?: number;
  cleanSheets?: number;
  ballRecovery?: number;
  fouls?: number;
  yellowCards?: number;
  redCards?: number;

  // "Bad" events
  errorsLeadingToShot?: number;
  errorsLeadingToGoal?: number;
  shotsOnTargetAgainst?: number;
  penaltyGoalsConceded?: number;
};

type DnaMetricKey =
  | "goals"
  | "shotsOnTarget"
  | "bigChancesCreated"
  | "assists"
  | "goalsInsideBox"
  | "fastBreakGoals"
  | "possession"
  | "passAccuracy"
  | "longBallAccuracy"
  | "crossAccuracy"
  | "finalThirdPasses"
  | "totalPasses"
  | "tackles"
  | "interceptions"
  | "clearances"
  | "duelsWonPct"
  | "aerialDuelsWonPct"
  | "shotsConceded"
  | "goalsConceded"
  | "saves"
  | "cleanSheets"
  | "fouls"
  | "ballRecoveries"
  | "totalDuels"
  | "errorsToShot"
  | "errorsToGoal"
  | "shotsOnTargetAgainst"
  | "penPenaltyGoalsConceded";

export type DnaModeId =
  | "attacking"
  | "possession"
  | "defensive"
  | "goalkeeper"
  | "allAround"
  | "intensity";

export type DnaMetric = {
  key: DnaMetricKey;
  label: string;
  compute: (stats: TeamStats) => number | null; // 0–100
};

export type DnaMode = {
  id: DnaModeId;
  label: string;
  metricOrder: DnaMetricKey[];
};

// ---- Normalization helpers (Option 1: per-game benchmarks) ----

const ELITE_PER_GAME = {
  goals: 2.5,
  shotsOnTarget: 7,
  shots: 20,
  bigChancesCreated: 5,
  assists: 2,
  goalsInsideBox: 2,
  fastBreakGoals: 0.5,
  totalPasses: 700,
  finalThirdPasses: 200,
  tackles: 30,
  interceptions: 20,
  clearances: 30,
  saves: 6,
  totalDuels: 80,
  fouls: 20,
  ballRecoveries: 50,
};

const WORST_PER_GAME = {
  goalsConceded: 3.0,
  shotsConceded: 20,
  shotsOnTargetAgainst: 8,
  errorsToShot: 0.7,
  errorsToGoal: 0.3,
  penaltyGoalsConceded: 0.4,
};

const clamp = (v: number, min = 0, max = 100) =>
  Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : 0;

const safePerGame = (
  total: number | undefined,
  matches: number | undefined
) => {
  if (!total || !matches || matches <= 0) return null;
  return total / matches;
};

// higher is better
const normalizePerGamePositive = (
  total: number | undefined,
  matches: number | undefined,
  elite: number
): number | null => {
  const perGame = safePerGame(total, matches);
  if (perGame == null) return null;
  return clamp((perGame / elite) * 100);
};

// lower is better (e.g. goals conceded)
const normalizePerGameNegative = (
  total: number | undefined,
  matches: number | undefined,
  worst: number
): number | null => {
  const perGame = safePerGame(total, matches);
  if (perGame == null) return null;

  // 0 per game → 100 (perfect), worst per game → 0
  const score = ((worst - perGame) / worst) * 100;
  return clamp(score);
};

const normalizePercent = (value: number | undefined): number | null => {
  if (value == null) return null;
  return clamp(value);
};

// ---- Metric definitions ----

export const DNA_METRICS: Record<DnaMetricKey, DnaMetric> = {
  goals: {
    key: "goals",
    label: "Goals",
    compute: (s) =>
      normalizePerGamePositive(s.goalsScored, s.matches, ELITE_PER_GAME.goals),
  },

  shotsOnTarget: {
    key: "shotsOnTarget",
    label: "Shots on Target",
    compute: (s) =>
      normalizePerGamePositive(
        s.shotsOnTarget ?? s.shots,
        s.matches,
        ELITE_PER_GAME.shotsOnTarget
      ),
  },

  bigChancesCreated: {
    key: "bigChancesCreated",
    label: "Big Chances",
    compute: (s) =>
      normalizePerGamePositive(
        s.bigChancesCreated,
        s.matches,
        ELITE_PER_GAME.bigChancesCreated
      ),
  },

  assists: {
    key: "assists",
    label: "Assists",
    compute: (s) =>
      normalizePerGamePositive(s.assists, s.matches, ELITE_PER_GAME.assists),
  },

  goalsInsideBox: {
    key: "goalsInsideBox",
    label: "Goals Inside Box",
    compute: (s) =>
      normalizePerGamePositive(
        s.goalsFromInsideTheBox,
        s.matches,
        ELITE_PER_GAME.goalsInsideBox
      ),
  },

  fastBreakGoals: {
    key: "fastBreakGoals",
    label: "Fast Break Goals",
    compute: (s) =>
      normalizePerGamePositive(
        s.fastBreakGoals,
        s.matches,
        ELITE_PER_GAME.fastBreakGoals
      ),
  },

  // Possession / build-up

  possession: {
    key: "possession",
    label: "Possession",
    compute: (s) => normalizePercent(s.averageBallPossession),
  },

  passAccuracy: {
    key: "passAccuracy",
    label: "Pass Accuracy",
    compute: (s) => normalizePercent(s.accuratePassesPercentage),
  },

  longBallAccuracy: {
    key: "longBallAccuracy",
    label: "Long Ball Accuracy",
    compute: (s) => normalizePercent(s.accurateLongBallsPercentage),
  },

  crossAccuracy: {
    key: "crossAccuracy",
    label: "Cross Accuracy",
    compute: (s) => normalizePercent(s.accurateCrossesPercentage),
  },

  finalThirdPasses: {
    key: "finalThirdPasses",
    label: "Final Third Passes",
    compute: (s) =>
      normalizePerGamePositive(
        s.finalThirdPasses,
        s.matches,
        ELITE_PER_GAME.finalThirdPasses
      ),
  },

  totalPasses: {
    key: "totalPasses",
    label: "Pass Volume",
    compute: (s) =>
      normalizePerGamePositive(
        s.totalPasses,
        s.matches,
        ELITE_PER_GAME.totalPasses
      ),
  },

  // Defensive

  tackles: {
    key: "tackles",
    label: "Tackles",
    compute: (s) =>
      normalizePerGamePositive(s.tackles, s.matches, ELITE_PER_GAME.tackles),
  },

  interceptions: {
    key: "interceptions",
    label: "Interceptions",
    compute: (s) =>
      normalizePerGamePositive(
        s.interceptions,
        s.matches,
        ELITE_PER_GAME.interceptions
      ),
  },

  clearances: {
    key: "clearances",
    label: "Clearances",
    compute: (s) =>
      normalizePerGamePositive(
        s.clearances,
        s.matches,
        ELITE_PER_GAME.clearances
      ),
  },

  duelsWonPct: {
    key: "duelsWonPct",
    label: "Duels Won %",
    compute: (s) => normalizePercent(s.duelsWonPercentage),
  },

  aerialDuelsWonPct: {
    key: "aerialDuelsWonPct",
    label: "Aerial Duels %",
    compute: (s) => normalizePercent(s.aerialDuelsWonPercentage),
  },

  shotsConceded: {
    key: "shotsConceded",
    label: "Shots Conceded",
    compute: (s) =>
      normalizePerGameNegative(
        s.shotsAgainst,
        s.matches,
        WORST_PER_GAME.shotsConceded
      ),
  },

  goalsConceded: {
    key: "goalsConceded",
    label: "Goals Conceded",
    compute: (s) =>
      normalizePerGameNegative(
        s.goalsConceded,
        s.matches,
        WORST_PER_GAME.goalsConceded
      ),
  },

  saves: {
    key: "saves",
    label: "Saves",
    compute: (s) =>
      normalizePerGamePositive(s.saves, s.matches, ELITE_PER_GAME.saves),
  },

  cleanSheets: {
    key: "cleanSheets",
    label: "Clean Sheets",
    compute: (s) =>
      normalizePerGamePositive(
        s.cleanSheets,
        s.matches,
        // ~0.5 clean sheets per game = elite
        0.5
      ),
  },

  // Intensity / physicality

  fouls: {
    key: "fouls",
    label: "Fouls",
    compute: (s) =>
      normalizePerGamePositive(s.fouls, s.matches, ELITE_PER_GAME.fouls),
  },

  ballRecoveries: {
    key: "ballRecoveries",
    label: "Ball Recoveries",
    compute: (s) =>
      normalizePerGamePositive(
        s.ballRecovery,
        s.matches,
        ELITE_PER_GAME.ballRecoveries
      ),
  },

  totalDuels: {
    key: "totalDuels",
    label: "Total Duels",
    compute: (s) =>
      normalizePerGamePositive(
        s.totalDuels,
        s.matches,
        ELITE_PER_GAME.totalDuels
      ),
  },

  // "bad" events (lower is better, inverted)

  errorsToShot: {
    key: "errorsToShot",
    label: "Errors → Shot",
    compute: (s) =>
      normalizePerGameNegative(
        s.errorsLeadingToShot,
        s.matches,
        WORST_PER_GAME.errorsToShot
      ),
  },

  errorsToGoal: {
    key: "errorsToGoal",
    label: "Errors → Goal",
    compute: (s) =>
      normalizePerGameNegative(
        s.errorsLeadingToGoal,
        s.matches,
        WORST_PER_GAME.errorsToGoal
      ),
  },

  shotsOnTargetAgainst: {
    key: "shotsOnTargetAgainst",
    label: "Shots on Target Against",
    compute: (s) =>
      normalizePerGameNegative(
        s.shotsOnTargetAgainst,
        s.matches,
        WORST_PER_GAME.shotsOnTargetAgainst
      ),
  },

  penPenaltyGoalsConceded: {
    key: "penPenaltyGoalsConceded",
    label: "Penalty Goals Conceded",
    compute: (s) =>
      normalizePerGameNegative(
        s.penaltyGoalsConceded,
        s.matches,
        WORST_PER_GAME.penaltyGoalsConceded
      ),
  },
};

// ---- Modes (the 6 "Performance DNA" views) ----

export const PERFORMANCE_DNA_MODES: DnaMode[] = [
  {
    id: "attacking",
    label: "Attacking",
    metricOrder: [
      "goals",
      "shotsOnTarget",
      "bigChancesCreated",
      "assists",
      "goalsInsideBox",
      "fastBreakGoals",
    ],
  },
  {
    id: "possession",
    label: "Possession",
    metricOrder: [
      "possession",
      "passAccuracy",
      "longBallAccuracy",
      "crossAccuracy",
      "finalThirdPasses",
      "totalPasses",
    ],
  },
  {
    id: "defensive",
    label: "Defensive",
    metricOrder: [
      "tackles",
      "interceptions",
      "clearances",
      "duelsWonPct",
      "aerialDuelsWonPct",
      "shotsConceded",
    ],
  },
  {
    id: "goalkeeper",
    label: "Goalkeeper",
    metricOrder: [
      "saves",
      "shotsOnTargetAgainst",
      "goalsConceded",
      "cleanSheets",
      "errorsToShot",
      "errorsToGoal",
    ],
  },
  {
    id: "allAround",
    label: "All-Around Team",
    metricOrder: [
      "goals",
      "shotsOnTarget",
      "possession",
      "passAccuracy",
      "tackles",
      "saves",
    ],
  },
  {
    id: "intensity",
    label: "Intensity / Physicality",
    metricOrder: [
      "totalDuels",
      "duelsWonPct",
      "fouls",
      "ballRecoveries",
      "interceptions",
      "tackles",
    ],
  },
];

// ---- Helper to feed your radar chart ----

export type RadarPoint = {
  subject: string;
  value: number; // 0–100
};

export function buildDnaRadarData(
  stats: TeamStats,
  modeId: DnaModeId
): RadarPoint[] {
  const mode = PERFORMANCE_DNA_MODES.find((m) => m.id === modeId);
  if (!mode) throw new Error(`Unknown DNA mode: ${modeId}`);

  return mode.metricOrder.map((key) => {
    const metric = DNA_METRICS[key];
    const raw = metric.compute(stats);

    return {
      subject: metric.label,
      value: raw ?? 0,
    };
  });
}
