/**
 * Types for SofaScore `GET /teams/get-squad` payload.
 *
 * Brief: returns the current squad breakdown (players, foreign/national
 * counts), support staff, and related team/tournament context for the teamId.
 */

import type {
  Category,
  Country,
  FieldTranslations,
  Sport,
  Team,
  TeamColors,
  Tournament,
  UniqueTournament,
} from "../../common";

/**
 * Query parameters for `GET /teams/get-squad`.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints like `/teams/search`, `/matches/detail`,
 *   or tournament/team listing endpoints such as `/tournaments/get-scheduled-events`.
 */
export interface GetTeamSquadParams {
  teamId: number;
}

export interface GetTeamSquadResponse {
  players: SquadMember[];
  foreignPlayers: SquadMember[];
  nationalPlayers: SquadMember[];
  supportStaff: SupportStaff[];
  playerPreviousTeam: PlayerPreviousTeamEntry[];
  nationalTeamPlayerStatistics: unknown[];
}

export interface SquadMember {
  player: SquadPlayer;
}

export interface SquadPlayer {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  team: SquadTeam;
  position: string;
  positionsDetailed?: string[];
  jerseyNumber?: string | number;
  shirtNumber?: number;
  height?: number;
  dateOfBirth?: string;
  dateOfBirthTimestamp?: number;
  preferredFoot?: string;
  gender?: string;
  userCount?: number;
  sofascoreId?: string;
  firstName?: string;
  lastName?: string;
  retired?: boolean;
  deceased?: boolean;
  contractUntilTimestamp?: number;
  proposedMarketValue?: number;
  proposedMarketValueRaw?: MarketValue;
  country?: Country;
  fieldTranslations?: FieldTranslations;
  activeSeasonSuspensions?: Suspension[];
  injury?: Injury;
}

/**
 * Squad team object with a richer set of details compared to the generic Team.
 */
export interface SquadTeam extends Team {
  shortName: string;
  gender: string;
  sport: Sport;
  tournament?: TournamentWithCategory;
  primaryUniqueTournament?: UniqueTournamentWithCategory;
  teamColors?: TeamColors;
  fieldTranslations?: FieldTranslations;
  country?: Country;
  userCount?: number;
  nameCode?: string;
  disabled?: boolean;
  national?: boolean;
  type?: number;
}

export interface TournamentWithCategory extends Tournament {
  category: Category;
  uniqueTournament?: UniqueTournamentWithCategory;
}

export interface UniqueTournamentWithCategory extends UniqueTournament {
  category: Category;
}

export interface MarketValue {
  value: number;
  currency: string;
}

export interface Suspension {
  id: number;
  reason: string;
  type: string;
  matches?: number;
  startDateTimestamp?: number;
  endDateTimestamp?: number;
  uniqueTournament?: {
    id: number;
    name: string;
    slug?: string;
    fieldTranslations?: FieldTranslations;
  };
}

export interface Injury {
  id: number;
  reason: string;
  status: string;
  startDateTimestamp?: number;
  updateDateTimestamp?: number;
  endDateTimestamp?: number;
}

export interface PlayerPreviousTeamEntry {
  player: SquadPlayer;
  previousTeam: SquadTeam;
  transferDate: string;
}

/**
 * Support staff objects are not documented in RapidAPI responses;
 * keep the shape open to avoid breaking on backend changes.
 */
export type SupportStaff = Record<string, unknown>;
