/**
 * Types for SofaScore `GET /matches/detail` payload.
 *
 * Brief: returns comprehensive details for a specific football match including
 * tournament context, season information, team details with managers and venues,
 * live scores, match status, referee information, venue details, attendance,
 * and various match metadata flags (VAR status, statistics availability, etc.).
 * This endpoint provides the most complete match information available.
 */

import type {
  Category,
  Country,
  EventChanges,
  EventStatus,
  EventTime,
  FieldTranslations,
  Manager,
  RoundInfo,
  Score,
  Season,
  Sport,
  Team,
  TeamColors,
  Tournament,
  UniqueTournament,
  VarInProgress,
  Venue,
  VenueCoordinates,
  City,
  Stadium,
} from "../../common";

/**
 * Query parameters for `GET /matches/detail`.
 * Retrieval hints:
 * - matchId (required): The id field of match returned in
 *   `/tournaments/get-featured-events` or `/tournaments/get-scheduled-events` or
 *   `/tournaments/get-matches` or `/teams/get-matches` or `/players/get-matches`
 *   or `/managers/get-matches`.
 */
export interface GetMatchDetailParams {
  matchId: number;
}

/**
 * Response: comprehensive match details including all match metadata,
 * team information, scores, venue, referee, and status information.
 */
export interface GetMatchDetailResponse {
  event: MatchDetailEvent;
}

/**
 * Complete match event details with all associated information.
 */
export interface MatchDetailEvent {
  id: number;
  slug: string;
  tournament: MatchDetailTournament;
  season: MatchDetailSeason;
  roundInfo?: RoundInfo;
  customId: string;
  status: EventStatus;
  winnerCode?: number; // 1 = home, 2 = away, 3 = draw
  attendance?: number;
  venue?: MatchDetailVenue;
  referee?: Referee;
  homeTeam: MatchDetailTeam;
  awayTeam: MatchDetailTeam;
  homeScore: Score;
  awayScore: Score;
  coverage?: number;
  time?: EventTime;
  changes?: EventChanges;
  hasGlobalHighlights?: boolean;
  hasEventPlayerStatistics?: boolean;
  hasEventPlayerHeatMap?: boolean;
  detailId?: number;
  crowdsourcingDataDisplayEnabled?: boolean;
  varInProgress?: VarInProgress;
  startTimestamp: number;
  currentPeriodStartTimestamp?: number;
  finalResultOnly?: boolean;
  feedLocked?: boolean;
  seasonStatisticsType?: string;
  showTotoPromo?: boolean;
  isEditor?: boolean;
  defaultPeriodCount?: number;
  defaultPeriodLength?: number;
  defaultOvertimeLength?: number;
}

/**
 * Tournament information with category and unique tournament details.
 */
export interface MatchDetailTournament extends Tournament {
  category: Category;
  uniqueTournament?: MatchDetailUniqueTournament;
  priority?: number;
  isGroup?: boolean;
  competitionType?: number;
  isLive?: boolean;
  fieldTranslations?: FieldTranslations;
}

/**
 * Unique tournament with extended properties.
 */
export interface MatchDetailUniqueTournament extends UniqueTournament {
  hasRounds?: boolean;
  hasPerformanceGraphFeature?: boolean;
  fieldTranslations?: FieldTranslations;
}

/**
 * Season information for the match.
 */
export interface MatchDetailSeason extends Season {
  year: string;
}

/**
 * Team information with manager, venue, and extended details.
 */
export interface MatchDetailTeam extends Omit<Team, "subTeams"> {
  shortName: string;
  gender: string;
  userCount?: number;
  manager?: Manager;
  venue?: MatchDetailVenue;
  nameCode?: string;
  class?: number;
  disabled?: boolean;
  national?: boolean;
  type: number;
  country: NonNullable<Team["country"]>;
  fullName: string;
  subTeams?: unknown[];
  teamColors?: TeamColors;
  foundationDateTimestamp?: number;
  timeActive?: unknown[];
  fieldTranslations?: FieldTranslations;
}

/**
 * Venue information with city, coordinates, and stadium details.
 */
export interface MatchDetailVenue extends Venue {
  city?: City;
  venueCoordinates?: VenueCoordinates;
  stadium?: Stadium;
  fieldTranslations?: FieldTranslations;
}

/**
 * Referee information with statistics and country details.
 */
export interface Referee {
  id: number;
  name: string;
  slug: string;
  yellowCards?: number;
  redCards?: number;
  yellowRedCards?: number;
  games?: number;
  sport: Sport;
  country: Country;
  fieldTranslations?: FieldTranslations;
}
