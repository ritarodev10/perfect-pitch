/**
 * Types for SofaScore `GET /teams/get-rankings` payload.
 *
 * Brief: response returns historical ranking entries for a team, including
 * season year, ranking position, and points alongside the team descriptor.
 */

import type {
  Country,
  FieldTranslations,
  Team,
  TeamColors,
} from "../../common";

/**
 * Query parameters for `GET /teams/get-rankings`.
 * Retrieval hints:
 * - teamId (required): Returned in endpoints like `/teams/search`, `/matches/detail`,
 *   `/tournaments/get-featured-events`, `/tournaments/get-scheduled-events`, or
 *   `/tournaments/get-top-teams`.
 */
export interface GetTeamRankingsParams {
  teamId: number;
}

export interface GetTeamRankingsResponse {
  rankings: TeamRankingEntry[];
}

export interface TeamRankingEntry {
  team: TeamRankingTeam;
  year: string;
  type: number;
  rowName: string;
  ranking: number;
  points: number;
  id: number;
  country: Country | Record<string, never>;
  rankingClass: string;
}

/**
 * Team information as returned by the rankings endpoint.
 */
export interface TeamRankingTeam extends Team {
  shortName: string;
  gender: string;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  country: Country;
  teamColors?: TeamColors;
  fieldTranslations?: FieldTranslations;
}
