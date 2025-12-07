/**
 * Types for SofaScore `GET /teams/get-matches` (deprecated) payload.
 *
 * Brief: paginated list of a team's past and upcoming matches with tournament
 * context, season details, team descriptors, score snapshots, timing/VAR flags,
 * and a `hasNextPage` indicator for pagination.
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
 * Query parameters for `GET /teams/get-matches`.
 * Retrieval hints:
 * - teamId (required): Returned in `/teams/search`, `/matches/detail`, or
 *   tournament/team detail endpoints.
 * - pageIndex (optional): Zero-based pagination index. Defaults to 0 when
 *   omitted.
 */
export interface GetTeamMatchesParams {
  teamId: number;
  pageIndex?: number;
}

/**
 * Response: paginated events for the team plus a pagination cursor flag.
 */
export interface GetTeamMatchesResponse {
  events: TeamMatchEvent[];
  hasNextPage: boolean;
}

export interface TeamMatchEvent {
  id: number;
  slug: string;
  tournament: TeamMatchTournament;
  season: TeamMatchSeason;
  roundInfo?: RoundInfo;
  customId: string;
  status: EventStatus;
  winnerCode?: number; // 1 = home, 2 = away, 3 = draw
  homeTeam: TeamMatchTeam;
  awayTeam: TeamMatchTeam;
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

export interface TeamMatchTournament extends Tournament {
  category: Category;
  uniqueTournament?: UniqueTournament;
  priority?: number;
  isGroup?: boolean;
  isLive?: boolean;
  groupName?: string;
  groupSign?: string;
  fieldTranslations?: FieldTranslations;
}

export interface TeamMatchSeason extends Season {
  seasonCoverageInfo?: Record<string, unknown>;
}

export interface TeamMatchTeam extends Omit<Team, "subTeams"> {
  shortName: string;
  gender: string;
  userCount?: number;
  nameCode?: string;
  disabled?: boolean;
  national?: boolean;
  type: number;
  country: NonNullable<Team["country"]>;
  subTeams?: unknown[];
  teamColors?: TeamColors;
  fieldTranslations?: FieldTranslations;
}
