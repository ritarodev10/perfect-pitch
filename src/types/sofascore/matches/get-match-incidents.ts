/**
 * Types for SofaScore `GET /matches/get-incidents` payload.
 *
 * Brief: returns all match incidents (goals, cards, substitutions, etc.) for a specific match
 * including player information, minute, and type of incident.
 */

import type { Country, FieldTranslations } from "../../common";

/**
 * Market value information
 */
export interface MarketValueRaw {
  value: number;
  currency: string;
}

/**
 * Player information in match incidents
 */
export interface Player {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  jerseyNumber?: string | number;
  height?: number;
  userCount?: number;
  gender?: string;
  sofascoreId?: string;
  marketValueCurrency?: string;
  dateOfBirthTimestamp?: number;
  proposedMarketValueRaw?: MarketValueRaw;
  country?: Country;
  fieldTranslations?: FieldTranslations;
}

/**
 * Query parameters for `GET /matches/get-incidents`.
 * Retrieval hints:
 * - matchId (required): The id field of match returned in
 *   `/tournaments/get-featured-events` or `/tournaments/get-scheduled-events` or
 *   `/tournaments/get-matches` or `/teams/get-matches` or `/players/get-matches`
 *   or `/managers/get-matches`.
 */
export interface GetMatchIncidentsParams {
  matchId: number;
}

/**
 * Response: all incidents for a specific match.
 */
export interface GetMatchIncidentsResponse {
  incidents: Incident[];
  home?: TeamColors;
  away?: TeamColors;
}

/**
 * Team colors for goalkeeper and player kits
 */
export interface TeamColors {
  goalkeeperColor?: ColorScheme;
  playerColor?: ColorScheme;
}

/**
 * Color scheme for kit
 */
export interface ColorScheme {
  primary?: string;
  number?: string;
  outline?: string;
  fancyNumber?: string;
}

/**
 * Base incident fields shared across all incident types
 */
export interface BaseIncident {
  id?: number;
  time: number;
  addedTime?: number;
  reversedPeriodTime?: number;
  reversedPeriodTimeSeconds?: number;
  timeSeconds?: number;
  periodTimeSeconds?: number;
  isHome?: boolean;
  incidentClass?: string;
  incidentType: IncidentType;
}

/**
 * A single match incident (goal, card, substitution, etc.)
 */
export interface Incident extends BaseIncident {
  // Common fields
  homeScore?: number;
  awayScore?: number;
  text?: string;
  isLive?: boolean;

  // Player-related fields
  player?: Player;
  playerName?: string; // For cards
  playerIn?: Player; // For substitutions
  playerOut?: Player; // For substitutions

  // Goal-specific fields
  assist1?: Player; // Assistant (note: API uses "assist1" not "assist")
  from?: "penalty"; // For penalty goals
  footballPassingNetworkAction?: FootballPassingNetworkAction[];

  // Card-specific fields
  reason?: string;
  rescinded?: boolean;

  // Substitution-specific fields
  injury?: boolean;

  // Injury time specific
  length?: number;

  // VAR decision specific
  confirmed?: boolean;
}

/**
 * Football passing network action (for goal build-up)
 */
export interface FootballPassingNetworkAction {
  player: Player;
  eventType: string;
  isAssist?: boolean;
  time: number;
  playerCoordinates?: Coordinates;
  passEndCoordinates?: Coordinates;
  gkCoordinates?: Coordinates;
  goalShotCoordinates?: Coordinates;
  goalMouthCoordinates?: Coordinates;
  goalkeeper?: Player;
  isHome?: boolean;
  goalType?: "regular" | "penalty" | "ownGoal";
  bodyPart?: string;
}

/**
 * Coordinates on the field
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Type of incident
 */
export type IncidentType =
  | "goal" // Goal scored
  | "card" // Yellow or red card
  | "substitution" // Player substitution
  | "varDecision" // VAR decision
  | "injuryTime" // Injury time announcement
  | "period"; // Period start/end (HT, FT)

/**
 * Goal-specific incident (extends Incident with goal-specific fields)
 */
export interface GoalIncident extends Incident {
  incidentType: "goal";
  player: Player; // Required for goals
  assist1?: Player; // Player who assisted the goal (API uses "assist1")
  from?: "penalty"; // Indicates if goal was from penalty
  footballPassingNetworkAction?: FootballPassingNetworkAction[];
  homeScore: number;
  awayScore: number;
  isHome: boolean;
}

/**
 * Card-specific incident
 */
export interface CardIncident extends Incident {
  incidentType: "card";
  player: Player;
  playerName: string;
  reason?: string;
  rescinded?: boolean;
  isHome: boolean;
}

/**
 * Substitution-specific incident
 */
export interface SubstitutionIncident extends Incident {
  incidentType: "substitution";
  playerIn: Player;
  playerOut: Player;
  injury?: boolean;
  isHome: boolean;
}

/**
 * Period-specific incident (HT, FT)
 */
export interface PeriodIncident extends Incident {
  incidentType: "period";
  text: string; // "HT" or "FT"
  homeScore: number;
  awayScore: number;
  isLive: boolean;
  timeSeconds: number;
  periodTimeSeconds: number;
}

/**
 * Injury time incident
 */
export interface InjuryTimeIncident extends Incident {
  incidentType: "injuryTime";
  length: number;
}

/**
 * VAR decision incident
 */
export interface VarDecisionIncident extends Incident {
  incidentType: "varDecision";
  player?: Player;
  confirmed: boolean;
  isHome: boolean;
}
