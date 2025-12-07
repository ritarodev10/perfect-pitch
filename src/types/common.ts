/**
 * Common types shared across SofaScore API endpoints.
 *
 * These types are reused across multiple endpoint responses to avoid duplication
 * and ensure consistency.
 */

/**
 * Sport information
 */
export interface Sport {
  id: number;
  name: string;
  slug: string;
}

/**
 * Country information
 */
export interface Country {
  alpha2?: string;
  alpha3?: string;
  name?: string;
  slug?: string;
}

/**
 * Field translations for internationalization
 */
export interface FieldTranslations {
  nameTranslation?: Record<string, string>;
  shortNameTranslation?: Record<string, string>;
}

/**
 * Category (e.g., "Italy", "England", etc.)
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  sport: Sport;
  country?: Country;
  flag?: string;
  alpha2?: string;
  fieldTranslations?: FieldTranslations;
  transferPeriod?: TransferPeriod[];
}

/**
 * Transfer period information
 */
export interface TransferPeriod {
  activeFrom: string;
  activeTo: string;
}

/**
 * Unique tournament (e.g., "Serie A", "Premier League")
 */
export interface UniqueTournament {
  id: number;
  name: string;
  slug: string;
  primaryColorHex?: string;
  secondaryColorHex?: string;
  category: Category;
  userCount?: number;
  hasPerformanceGraphFeature?: boolean;
  hasEventPlayerStatistics?: boolean;
  displayInverseHomeAwayTeams?: boolean;
  country?: Country | Record<string, never>;
  fieldTranslations?: FieldTranslations;
}

/**
 * Tournament (specific season/edition of a unique tournament)
 */
export interface Tournament {
  id: number;
  name: string;
  slug: string;
  category: Category;
  uniqueTournament?: UniqueTournament;
  priority?: number;
  isGroup?: boolean;
  isLive?: boolean;
  fieldTranslations?: FieldTranslations;
}

/**
 * Team colors
 */
export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

/**
 * Team information
 * Note: This is a flexible type that accommodates variations across endpoints
 */
export interface Team {
  id: number;
  name: string;
  slug: string;
  shortName?: string;
  fullName?: string;
  nameCode?: string;
  gender?: string;
  sport: Sport;
  category?: Category;
  tournament?: Tournament;
  primaryUniqueTournament?: UniqueTournament;
  userCount?: number;
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
  subTeams?: Team[];
}

/**
 * Manager information
 */
export interface Manager {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  country: Country;
  fieldTranslations?: FieldTranslations;
}

/**
 * City information
 */
export interface City {
  name: string;
}

/**
 * Venue coordinates
 */
export interface VenueCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Stadium information
 */
export interface Stadium {
  name: string;
  capacity?: number;
}

/**
 * Venue information
 */
export interface Venue {
  id: number;
  name: string;
  slug: string;
  capacity?: number;
  hidden?: boolean;
  city?: City;
  venueCoordinates?: VenueCoordinates;
  country?: Country;
  fieldTranslations?: FieldTranslations;
  stadium?: Stadium;
}

/**
 * Season information
 */
export interface Season {
  id: number;
  name: string;
  year: string;
  editor: boolean;
}

/**
 * Round information
 */
export interface RoundInfo {
  round?: number;
  name?: string;
  slug?: string;
  cupRoundType?: number;
}

/**
 * Event/match status
 */
export interface EventStatus {
  code: number;
  description: string;
  type: string;
}

/**
 * Score information
 * Flexible type to accommodate different score formats
 */
export interface Score {
  current?: number;
  display?: number;
  period1?: number;
  period2?: number;
  normaltime?: number;
  aggregated?: number;
  penalties?: number;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Match time information
 */
export interface EventTime {
  injuryTime1?: number;
  injuryTime2?: number;
  currentPeriodStartTimestamp?: number;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Event changes
 */
export interface EventChanges {
  changeTimestamp: number;
  changes?: string[];
}

/**
 * VAR in progress status
 */
export interface VarInProgress {
  homeTeam: boolean;
  awayTeam: boolean;
}
