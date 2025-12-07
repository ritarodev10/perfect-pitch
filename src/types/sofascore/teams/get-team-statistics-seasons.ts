/**
 * Types for SofaScore `GET /teams/get-statistics-seasons` payload.
 *
 * Brief: returns, for a given teamId, the list of seasons grouped by
 * unique tournament plus a map of available statistics types for each
 * season (e.g., "overall", "home", "away").
 */

import type { Season, UniqueTournament } from "../../common";

/**
 * Query parameters for `GET /teams/get-statistics-seasons`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints like `/teams/search`,
 *   `/matches/detail`, or tournament/team listing endpoints such as
 *   `/tournaments/get-scheduled-events`.
 */
export interface GetTeamStatisticsSeasonsParams {
  teamId: number;
}

export interface GetTeamStatisticsSeasonsResponse {
  uniqueTournamentSeasons: UniqueTournamentSeasonsEntry[];
  typesMap: StatisticsTypesMap;
}

export interface UniqueTournamentSeasonsEntry {
  uniqueTournament: UniqueTournament;
  seasons: SeasonWithCoverage[];
  allTimeSeasonId?: number;
}

/**
 * Season entry that may include backend-provided coverage details.
 */
export interface SeasonWithCoverage extends Season {
  seasonCoverageInfo?: Record<string, unknown>;
}

/**
 * Map of uniqueTournamentId -> seasonId -> list of statistics scope keys
 * (commonly "overall", but left open for future scopes).
 */
export type StatisticsTypesMap = Record<
  string,
  Record<string, StatisticsScope[]>
>;

export type StatisticsScope = string;
