/**
 * Types for SofaScore `GET /teams/get-last-matches` payload.
 *
 * Brief: returns a paginated list of the team's most recent finished
 * matches, including scores by period, status, timing, and tournament/team
 * context for each event.
 */

import type { TeamPerformanceEvent } from "./get-team-performance";

/**
 * Query parameters for `GET /teams/get-last-matches`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints like `/teams/search`,
 *   `/matches/detail`, or tournament/event listings.
 * - pageIndex (optional): Zero-based page index for pagination.
 */
export interface GetTeamLastMatchesParams {
  teamId: number;
  pageIndex?: number;
}

/**
 * Response: paginated set of the team's most recent matches. `events` holds
 * the match list while `hasNextPage` indicates more data is available.
 */
export interface GetTeamLastMatchesResponse {
  events: TeamLastMatch[];
  hasNextPage: boolean;
}

export type TeamLastMatch = TeamPerformanceEvent;
