/**
 * Types for SofaScore `GET /teams/search` payload (deprecated).
 *
 * Brief: returns a list of teams that match a text query, including
 * per-team metadata such as sport, colors, gender, country, and translations.
 */

import type {
  Country,
  FieldTranslations,
  Sport,
  Team,
  TeamColors,
} from "../../common";

/**
 * Query parameters for `GET /teams/search`.
 * - name (required): Partial or full team name to search for.
 */
export interface GetTeamSearchParams {
  name: string;
}

export interface GetTeamSearchResponse {
  teams: SearchTeam[];
}

/**
 * Team entry as returned by the search endpoint.
 */
export interface SearchTeam extends Team {
  nameCode?: string;
  national?: boolean;
  sport: Sport;
  userCount?: number;
  teamColors?: TeamColors;
  type?: number;
  gender?: "M" | "F" | string;
  country?: Country;
  fieldTranslations?: FieldTranslations;
}
