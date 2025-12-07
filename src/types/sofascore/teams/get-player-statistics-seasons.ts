/**
 * Types for SofaScore `GET /teams/get-player-statistics-seasons` payload.
 *
 * Brief: returns, for a given teamId, the set of tournaments/seasons where
 * player-level stats are available, plus a map describing which statistic
 * scopes (e.g., "overall", "home", "away") are allowed per season.
 */

import type { Season, UniqueTournament } from "../../common";

/**
 * Query parameters for `GET /teams/get-player-statistics-seasons`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints such as `/teams/search`,
 *   `/matches/detail`, or tournament/team listing endpoints like
 *   `/tournaments/get-scheduled-events`.
 */
export interface GetPlayerStatisticsSeasonsParams {
  teamId: number;
}

/**
 * Tournaments and seasons with player statistics coverage plus scope map.
 */
export interface GetPlayerStatisticsSeasonsResponse {
  uniqueTournamentSeasons: UniqueTournamentSeasonsEntry[];
  typesMap: PlayerStatisticsTypesMap;
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
 * Map of uniqueTournamentId -> seasonId -> list of statistic scope keys.
 */
export type PlayerStatisticsTypesMap = Record<
  string,
  Record<string, StatisticsScope[]>
>;

export type StatisticsScope = string;
