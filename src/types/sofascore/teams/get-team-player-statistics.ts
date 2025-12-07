/**
 * Types for SofaScore `GET /teams/get-player-statistics` payload.
 *
 * Brief: returns per-team top players across rating, goals, assists, set-piece,
 * passing, defending, and discipline leaderboards, including player and team
 * metadata.
 */

/**
 * Query parameters for the player statistics endpoint.
 * Retrieval hints:
 * - teamId (required): Returned in /teams/search, /teams/detail, /matches/detail, etc.
 * - tournamentId (required): Returned in /tournaments/search or /tournaments/list.
 * - seasonId (required): Returned in /teams/get-player-statistics-seasons.
 * - type (optional): Supported values are in the typesMap JSON from
 *   /teams/get-player-statistics-seasons (e.g., "overall", "home", "away").
 */
export interface GetTeamPlayerStatisticsParams {
  teamId: number;
  tournamentId?: number;
  seasonId?: number;
  type?: string;
}

export interface GetTeamPlayerStatisticsResponse {
  topPlayers: TopPlayers;
  statisticsType: StatisticsTypeInfo;
}

export interface TopPlayers {
  rating: TopPlayerEntry<RatingStat>[];
  goals: TopPlayerEntry<GoalsStat>[];
  assists: TopPlayerEntry<AssistsStat>[];
  goalsAssistsSum: TopPlayerEntry<GoalsAssistsSumStat>[];
  penaltyGoals: TopPlayerEntry<PenaltyGoalsStat>[];
  freeKickGoal: TopPlayerEntry<FreeKickGoalStat>[];
  scoringFrequency: TopPlayerEntry<ScoringFrequencyStat>[];
  totalShots: TopPlayerEntry<TotalShotsStat>[];
  shotsOnTarget: TopPlayerEntry<ShotsOnTargetStat>[];
  bigChancesMissed: TopPlayerEntry<BigChancesMissedStat>[];
  bigChancesCreated: TopPlayerEntry<BigChancesCreatedStat>[];
  accuratePasses: TopPlayerEntry<AccuratePassesStat>[];
  keyPasses: TopPlayerEntry<KeyPassesStat>[];
  accurateLongBalls: TopPlayerEntry<AccurateLongBallsStat>[];
  successfulDribbles: TopPlayerEntry<SuccessfulDribblesStat>[];
  penaltyWon: TopPlayerEntry<PenaltyWonStat>[];
  tackles: TopPlayerEntry<TacklesStat>[];
  interceptions: TopPlayerEntry<InterceptionsStat>[];
  clearances: TopPlayerEntry<ClearancesStat>[];
  possessionLost: TopPlayerEntry<PossessionLostStat>[];
  yellowCards: TopPlayerEntry<YellowCardsStat>[];
}

export interface TopPlayerEntry<TStats extends BasePlayerStat> {
  statistics: TStats;
  playedEnough: boolean;
  player: PlayerInfo;
  team: TeamInfo;
}

export interface BasePlayerStat {
  id: number;
  type: string;
  appearances: number;
  statisticsType: StatisticsTypeInfo;
}

export interface RatingStat extends BasePlayerStat {
  rating: number;
}

export interface GoalsStat extends BasePlayerStat {
  goals: number;
}

export interface AssistsStat extends BasePlayerStat {
  assists: number;
}

export interface GoalsAssistsSumStat extends BasePlayerStat {
  goalsAssistsSum: number;
}

export interface PenaltyGoalsStat extends BasePlayerStat {
  penaltiesTaken: number;
  penaltyGoals: number;
}

export interface FreeKickGoalStat extends BasePlayerStat {
  shotFromSetPiece: number;
  freeKickGoal: number;
}

export interface ScoringFrequencyStat extends BasePlayerStat {
  scoringFrequency: number;
}

export interface TotalShotsStat extends BasePlayerStat {
  totalShots: number;
}

export interface ShotsOnTargetStat extends BasePlayerStat {
  shotsOnTarget: number;
}

export interface BigChancesMissedStat extends BasePlayerStat {
  bigChancesMissed: number;
}

export interface BigChancesCreatedStat extends BasePlayerStat {
  bigChancesCreated: number;
}

export interface AccuratePassesStat extends BasePlayerStat {
  accuratePasses: number;
  accuratePassesPercentage: number;
}

export interface KeyPassesStat extends BasePlayerStat {
  keyPasses: number;
}

export interface AccurateLongBallsStat extends BasePlayerStat {
  accurateLongBalls: number;
}

export interface SuccessfulDribblesStat extends BasePlayerStat {
  successfulDribbles: number;
  successfulDribblesPercentage: number;
}

export interface PenaltyWonStat extends BasePlayerStat {
  penaltyWon: number;
}

export interface TacklesStat extends BasePlayerStat {
  tackles: number;
}

export interface InterceptionsStat extends BasePlayerStat {
  interceptions: number;
}

export interface ClearancesStat extends BasePlayerStat {
  clearances: number;
}

export interface PossessionLostStat extends BasePlayerStat {
  possessionLost: number;
}

export interface YellowCardsStat extends BasePlayerStat {
  yellowCards: number;
}

export interface PlayerInfo {
  name: string;
  slug: string;
  shortName: string;
  position: string;
  userCount: number;
  gender: string;
  id: number;
  fieldTranslations: FieldTranslations;
}

export interface TeamInfo {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: SportInfo;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  teamColors: TeamColors;
  fieldTranslations: FieldTranslations;
}

export interface SportInfo {
  name: string;
  slug: string;
  id: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface FieldTranslations {
  nameTranslation: Record<string, string>;
  shortNameTranslation: Record<string, string>;
}

export interface StatisticsTypeInfo {
  sportSlug: string; // e.g., "football"
  statisticsType: string; // e.g., "player"
}
