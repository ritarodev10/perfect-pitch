/**
 * Types for SofaScore `GET /matches/get-h2h` payload.
 *
 * Brief: returns head-to-head statistics comparing two teams and their managers
 * across historical matches. The response includes win/draw counts for both team
 * duels (team vs team) and manager duels (manager vs manager), with results
 * categorized by home/away perspective.
 */

/**
 * Query parameters for `GET /matches/get-h2h`.
 * Retrieval hints:
 * - matchId (required): The ID field of a match returned from endpoints like
 *   `/tournaments/get-featured-events`, `/teams/get-matches`,
 *   `/players/get-matches`, or `/managers/get-matches`.
 */
export interface GetH2HParams {
  matchId: number;
}

/**
 * Head-to-head statistics for a specific comparison (team or manager).
 * All counts are from the perspective of the home team/manager.
 */
export interface DuelStatistics {
  /** Number of wins by the home team/manager in historical matchups */
  homeWins: number;
  /** Number of wins by the away team/manager in historical matchups */
  awayWins: number;
  /** Number of draws in historical matchups */
  draws: number;
}

/**
 * Response: head-to-head comparison statistics for both teams and managers.
 * Provides historical win/draw counts to analyze matchup history before a match.
 */
export interface GetH2HResponse {
  /** Head-to-head statistics comparing the two teams across historical matches */
  teamDuel: DuelStatistics;
  /** Head-to-head statistics comparing the two managers across historical matches */
  managerDuel: DuelStatistics;
}

