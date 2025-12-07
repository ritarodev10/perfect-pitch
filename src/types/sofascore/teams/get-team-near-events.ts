/**
 * Types for SofaScore `GET /teams/get-near-events` payload.
 *
 * Brief: returns the team's most recent finished event and next scheduled
 * event, including tournament context, scores, status, VAR flags, and
 * translations.
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
} from "./get-team-performance";

/**
 * Query parameters for `GET /teams/get-near-events`.
 * Retrieval hints:
 * - teamId (required): Returned in endpoints like `/teams/search`, `/matches/detail`,
 *   or tournament/event listings such as `/tournaments/get-scheduled-events`.
 */
export interface GetTeamNearEventsParams {
  teamId: number;
}

/**
 * Response: bundles the last finished event (`previousEvent`) and the next
 * scheduled event (`nextEvent`) for the team, with full tournament and team
 * descriptors plus minimal score/timing snapshots.
 */
export interface GetTeamNearEventsResponse {
  previousEvent: NearTeamEvent;
  nextEvent: NearTeamEvent;
}

export interface NearTeamEvent {
  id: number;
  slug: string;
  tournament: NearEventTournament;
  season: Season;
  roundInfo?: RoundInfo;
  customId: string;
  status: EventStatus;
  winnerCode?: number;
  homeTeam: NearEventTeam;
  awayTeam: NearEventTeam;
  homeScore: Score;
  awayScore: Score;
  coverage?: number;
  time?: EventTime;
  changes?: EventChanges;
  hasGlobalHighlights?: boolean;
  hasXg?: boolean;
  hasEventPlayerStatistics?: boolean;
  hasEventPlayerHeatMap?: boolean;
  detailId?: number;
  crowdsourcingDataDisplayEnabled?: boolean;
  varInProgress?: VarInProgress;
  startTimestamp: number;
  finalResultOnly?: boolean;
  feedLocked?: boolean;
  isEditor?: boolean;
  correctAiInsight?: boolean;
  correctHalftimeAiInsight?: boolean;
}

/**
 * Tournament information with guaranteed unique tournament payload for near-events.
 */
export interface NearEventTournament extends PerformanceTournament {
  category: PerformanceTournament["category"];
  uniqueTournament: PerformanceTournament["uniqueTournament"];
  fieldTranslations?: FieldTranslations;
}

/**
 * Team information as returned by the near-events endpoint.
 */
export interface NearEventTeam extends PerformanceTeam {
  subTeams?: unknown[];
  teamColors?: PerformanceTeam["teamColors"];
  fieldTranslations?: FieldTranslations;
}
