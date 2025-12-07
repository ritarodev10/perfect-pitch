/**
 * Types for SofaScore `GET /teams/get-tournaments` payload.
 *
 * Brief: response returns the unique tournaments a team participates in, along
 * with color palette, region/category metadata, translation maps, popularity
 * counts, and display hints for home/away ordering.
 */

import type { UniqueTournament } from "../../common";

/**
 * Query parameters for `GET /teams/get-tournaments`.
 * Retrieval hints:
 * - teamId (required): Returned in endpoints such as `/teams/search`,
 *   `/matches/detail`, `/tournaments/get-featured-events`, or
 *   `/tournaments/get-top-teams`.
 */
export interface GetTeamTournamentsParams {
  teamId: number;
}

/**
 * Unique tournaments associated with the requested team.
 */
export interface GetTeamTournamentsResponse {
  uniqueTournaments: UniqueTournament[];
}
