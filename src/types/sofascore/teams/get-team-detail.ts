/**
 * Types for SofaScore `GET /teams/detail` payload.
 *
 * Brief: returns the full team profile plus pregame form values for the
 * specified teamId.
 */

import type {
  Team,
  Sport,
  Category,
  Country,
  Tournament,
  UniqueTournament,
  Manager,
  Venue,
  TeamColors,
  FieldTranslations,
} from "../../common";

/**
 * Query parameters for `GET /teams/detail`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints like `/teams/search`, links in `/matches/detail`, or tournament/team listing endpoints (e.g., `/tournaments/get-scheduled-events`, `/tournaments/get-top-teams`).
 */
export interface GetTeamDetailParams {
  teamId: number;
}

export interface TeamDetailResponse {
  team: TeamDetailTeam;
  pregameForm: PregameForm;
}

export interface PregameForm {
  avgRating: string;
  position: number;
  value: string;
  form: string[];
}

/**
 * Extended Team type specific to team detail endpoint
 */
export interface TeamDetailTeam extends Team {
  fullName: string;
  shortName: string;
  nameCode: string;
  gender: "M" | "F" | string;
  category: Category;
  tournament: Tournament;
  primaryUniqueTournament: UniqueTournament;
  userCount: number;
  manager?: Manager;
  venue?: Venue;
  teamColors?: TeamColors;
  foundationDateTimestamp?: number;
  timeActive?: unknown[];
  class?: number;
  disabled?: boolean;
  national?: boolean;
  type?: number;
  country?: Country;
  isLive?: boolean;
  priority?: number;
  displayInverseHomeAwayTeams?: boolean;
  fieldTranslations?: FieldTranslations;
}
