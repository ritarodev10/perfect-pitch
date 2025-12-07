/**
 * Types for SofaScore `GET /tournaments/get-seasons` payload.
 *
 * Brief: Returns a list of seasons available for a specific tournament,
 * including historical seasons dating back many years. Each season entry
 * contains the season name, year, unique identifier, editor flag, and
 * optionally season coverage information.
 */

import type { Season } from "../../common";

/**
 * Query parameters for `GET /tournaments/get-seasons`.
 * Retrieval hints:
 * - tournamentId (required): The value of id field returned in
 *   `/tournaments/search` or `/tournaments/list` endpoint.
 */
export interface GetSeasonsParams {
  tournamentId: number;
}

/**
 * Season entry that may include backend-provided coverage details.
 * Extends the base Season type with optional coverage information.
 */
export interface SeasonWithCoverage extends Season {
  /**
   * Optional coverage information for the season.
   * Contains metadata about what data is available for this season.
   */
  seasonCoverageInfo?: Record<string, unknown>;
}

/**
 * Response: list of seasons for a tournament.
 * Contains an array of season entries, typically ordered from most recent
 * to oldest, spanning many years of tournament history.
 */
export interface GetSeasonsResponse {
  seasons: SeasonWithCoverage[];
}

