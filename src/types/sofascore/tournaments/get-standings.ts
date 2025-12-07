/**
 * Types for SofaScore `GET /tournaments/get-standings` payload.
 *
 * Brief: Returns tournament standings with team positions, points, matches,
 * wins, draws, losses, and goal statistics. The response includes standings
 * grouped by type (total/home/away), with each group containing rows of team
 * performance data, tie-breaking rules, tournament information, and optional
 * promotion/relegation indicators.
 */

import type {
  UniqueTournament,
  Category,
  Sport,
  Country,
  TeamColors,
  FieldTranslations,
} from "../../common";

/**
 * Query parameters for `GET /tournaments/get-standings`.
 */
export interface GetStandingsParams {
  tournamentId: number;
  seasonId?: number;
  type?: "total" | "home" | "away";
}

/**
 * Promotion or relegation information for a team in the standings.
 */
export interface Promotion {
  text: string;
  id: number;
}

/**
 * Tie-breaking rule information for standings.
 */
export interface TieBreakingRule {
  text: string;
  id: number;
}

/**
 * Extended team object as it appears in standings rows.
 * Contains full team details including colors, translations, and country info.
 */
export interface StandingTeam {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  country: Country;
  teamColors: TeamColors;
  fieldTranslations: FieldTranslations;
}

/**
 * A single row in the standings table representing a team's position and statistics.
 */
export interface StandingRow {
  id: number;
  position: number;
  team: StandingTeam;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  scoresFor: number;
  scoresAgainst: number;
  points: number;
  scoreDiffFormatted: string;
  descriptions: unknown[];
  promotion?: Promotion;
}

/**
 * Tournament information as it appears in standings.
 */
export interface StandingTournament {
  id: number;
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  isGroup: boolean;
  isLive: boolean;
  fieldTranslations: FieldTranslations;
}

/**
 * Standings data for a specific type (total/home/away).
 * Contains rows of team standings, tie-breaking rules, tournament info, and season name.
 */
export interface StandingGroup {
  id: number;
  type: "total" | "home" | "away";
  name: string;
  descriptions: unknown[];
  tieBreakingRule: TieBreakingRule;
  rows: StandingRow[];
  tournament: StandingTournament;
}

/**
 * Response: tournament standings data.
 * Contains an array of standing groups, typically one per type (total/home/away).
 */
export interface GetStandingsResponse {
  standings: StandingGroup[];
}
