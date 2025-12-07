/**
 * Types for SofaScore `GET /teams/get-next-matches` payload.
 *
 * Brief: returns the upcoming fixtures for the given team, including
 * tournament context (with unique tournament details), season and round
 * metadata, home/away team descriptors, match status, kickoff timestamp,
 * and a pagination flag.
 */

import type {
  EventChanges,
  EventStatus,
  EventTime,
  FieldTranslations,
  RoundInfo,
  Score,
  Season,
  VarInProgress,
} from "../../common";
import type {
  PerformanceTeam,
  PerformanceTournament,
  TeamPerformanceEvent,
} from "./get-team-performance";

/**
 * Query parameters for `GET /teams/get-next-matches`.
 * Retrieval hints:
 * - teamId (required): Returned by `/teams/search`, `/matches/detail`, or
 *   tournament/event listings such as `/tournaments/get-scheduled-events`.
 * - pageIndex (optional): Zero-based pagination index for additional pages.
 */
export interface GetTeamNextMatchesParams {
  teamId: number;
  pageIndex?: number;
}

/**
 * Response: list of upcoming events for the team plus a flag indicating if
 * more pages are available.
 */
export interface GetTeamNextMatchesResponse {
  events: TeamNextMatchEvent[];
  hasNextPage: boolean;
}

export interface TeamNextMatchEvent
  extends Omit<
    TeamPerformanceEvent,
    | "tournament"
    | "homeTeam"
    | "awayTeam"
    | "coverage"
    | "time"
    | "changes"
    | "varInProgress"
  > {
  tournament: NextMatchTournament;
  season: Season;
  roundInfo?: RoundInfo;
  customId: string;
  status: EventStatus;
  homeTeam: NextMatchTeam;
  awayTeam: NextMatchTeam;
  homeScore: Score;
  awayScore: Score;
  coverage?: number;
  time?: EventTime;
  changes?: EventChanges;
  hasGlobalHighlights?: boolean;
  detailId?: number;
  crowdsourcingDataDisplayEnabled?: boolean;
  id: number;
  varInProgress?: VarInProgress;
  slug: string;
  startTimestamp: number;
  finalResultOnly?: boolean;
  feedLocked?: boolean;
  isEditor?: boolean;
}

/**
 * Tournament information with guaranteed unique tournament payload for next matches.
 */
export interface NextMatchTournament extends PerformanceTournament {
  category: PerformanceTournament["category"];
  uniqueTournament: PerformanceTournament["uniqueTournament"];
  fieldTranslations?: FieldTranslations;
}

/**
 * Team information as returned by the next-matches endpoint.
 */
export interface NextMatchTeam extends PerformanceTeam {
  subTeams?: unknown[];
  teamColors?: PerformanceTeam["teamColors"];
  fieldTranslations?: FieldTranslations;
}
