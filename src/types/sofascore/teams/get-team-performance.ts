/**
 * Types for SofaScore `GET /teams/get-performance` payload.
 *
 * Brief: returns recent performance events for the teamId, including scores,
 * statuses, timing, and tournament context for each match.
 */

import type {
  Category,
  EventChanges,
  EventStatus,
  EventTime,
  FieldTranslations,
  RoundInfo,
  Score,
  Season,
  Team,
  TeamColors,
  Tournament,
  UniqueTournament,
  VarInProgress,
} from "../../common";

/**
 * Query parameters for `GET /teams/get-performance`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints like `/teams/search`, `/teams/detail`,
 *   or tournament/event listings such as `/matches/detail`, `/tournaments/get-scheduled-events`.
 */
export interface GetTeamPerformanceParams {
  teamId: number;
}

export interface GetTeamPerformanceResponse {
  events: TeamPerformanceEvent[];
  points: Record<string, number>;
}

export interface TeamPerformanceEvent {
  id: number;
  slug: string;
  tournament: PerformanceTournament;
  season: Season;
  roundInfo?: RoundInfo;
  customId: string;
  status: EventStatus;
  winnerCode?: number;
  homeTeam: PerformanceTeam;
  awayTeam: PerformanceTeam;
  homeScore: Score;
  awayScore: Score;
  coverage?: number;
  time?: EventTime;
  changes?: EventChanges;
  hasGlobalHighlights?: boolean;
  hasXg?: boolean;
  hasEventPlayerStatistics?: boolean;
  hasEventPlayerHeatMap?: boolean;
  detailId?: number;
  crowdsourcingDataDisplayEnabled?: boolean;
  varInProgress?: VarInProgress;
  startTimestamp: number;
  finalResultOnly?: boolean;
  feedLocked?: boolean;
  isEditor?: boolean;
  correctAiInsight?: boolean;
  correctHalftimeAiInsight?: boolean;
  homeRedCards?: number;
  awayRedCards?: number;
}

/**
 * Tournament information with guaranteed unique tournament payload for performance endpoint.
 */
export interface PerformanceTournament extends Tournament {
  category: Category;
  uniqueTournament: UniqueTournament;
}

/**
 * Extended Team type specific to the team performance endpoint.
 */
export interface PerformanceTeam extends Omit<Team, "subTeams"> {
  shortName: string;
  gender: string;
  userCount?: number;
  nameCode?: string;
  disabled?: boolean;
  national?: boolean;
  type: number;
  country?: NonNullable<Team["country"]>;
  subTeams?: unknown[];
  teamColors?: TeamColors;
  fieldTranslations?: FieldTranslations;
}
