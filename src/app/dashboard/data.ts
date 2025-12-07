/**
 * Dashboard data fetching utilities
 *
 * This module provides typed data fetching functions for the dashboard,
 * using the proper Sofascore team types from src/types/sofascore/teams/*
 */

import {
  getTeamDetail as fetchTeamDetail,
  getNextMatches as fetchNextMatches,
  getLastMatches as fetchLastMatches,
  getTeamStatistics as fetchTeamStatistics,
  getPlayerStatistics as fetchPlayerStatistics,
  getSeasons as fetchSeasons,
  getStandings as fetchStandings,
  getTransfers as fetchTransfers,
  getTeamStatisticsSeasons as fetchTeamStatisticsSeasons,
  getPlayerStatisticsSeasons as fetchPlayerStatisticsSeasons,
  getTeamSquad as fetchTeamSquad,
} from "@/data/sofascore";
import type { GetTeamDetailResponse } from "@/types/sofascore/teams/get-team-detail";
import type { GetTeamNextMatchesResponse } from "@/types/sofascore/teams/get-team-next-matches";
import type { GetTeamLastMatchesResponse } from "@/types/sofascore/teams/get-team-last-matches";
import type { GetTeamStatisticsResponse } from "@/types/sofascore/teams/get-team-statistics";
import type { GetTeamPlayerStatisticsResponse } from "@/types/sofascore/teams/get-team-player-statistics";
import type { GetTeamTransfersResponse } from "@/types/sofascore/teams/get-team-transfers";
import type { GetTeamSquadResponse } from "@/types/sofascore/teams/get-team-squad";

/**
 * Gets default team ID from environment
 */
function getDefaultTeamId(): number {
  const teamId = process.env.SOFASCORE_TEAM_ID;
  if (!teamId) {
    throw new Error("SOFASCORE_TEAM_ID is required in environment variables");
  }
  return parseInt(teamId, 10);
}

/**
 * Fetches team detail with proper typing
 */
export async function getTeamDetail(metadata?: {
  components?: string[];
}): Promise<GetTeamDetailResponse> {
  const teamId = getDefaultTeamId();
  const response = await fetchTeamDetail(teamId, metadata);
  // Map the response to the proper type structure
  return response as unknown as GetTeamDetailResponse;
}

/**
 * Fetches next matches with proper typing
 */
export async function getNextMatches(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<GetTeamNextMatchesResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  const response = await fetchNextMatches(targetTeamId, metadata);
  return response as unknown as GetTeamNextMatchesResponse;
}

/**
 * Fetches last matches with proper typing
 */
export async function getLastMatches(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<GetTeamLastMatchesResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  const response = await fetchLastMatches(targetTeamId, metadata);
  return response as unknown as GetTeamLastMatchesResponse;
}

/**
 * Fetches team statistics with proper typing
 */
export async function getTeamStatistics(
  teamId?: number,
  tournamentId?: number,
  seasonId?: number,
  metadata?: { components?: string[] }
): Promise<GetTeamStatisticsResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  const response = await fetchTeamStatistics(
    targetTeamId,
    tournamentId,
    seasonId,
    metadata
  );
  return response as unknown as GetTeamStatisticsResponse;
}

/**
 * Fetches player statistics with proper typing
 */
export async function getPlayerStatistics(
  teamId?: number,
  tournamentId?: number,
  seasonId?: number,
  metadata?: { components?: string[] }
): Promise<GetTeamPlayerStatisticsResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  const response = await fetchPlayerStatistics(
    targetTeamId,
    tournamentId,
    seasonId,
    metadata
  );
  return response as unknown as GetTeamPlayerStatisticsResponse;
}

/**
 * Fetches available statistics seasons for a team
 */
export async function getTeamStatisticsSeasons(
  teamId?: number
): Promise<
  import("@/types/sofascore/teams/get-team-statistics-seasons").GetTeamStatisticsSeasonsResponse
> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  return fetchTeamStatisticsSeasons(targetTeamId);
}

/**
 * Fetches available player statistics seasons for a team
 */
export async function getPlayerStatisticsSeasons(
  teamId?: number
): Promise<
  import("@/types/sofascore/teams/get-player-statistics-seasons").GetPlayerStatisticsSeasonsResponse
> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  return fetchPlayerStatisticsSeasons(targetTeamId);
}

/**
 * Fetches seasons for a tournament
 */
export async function getSeasons(
  tournamentId: number,
  metadata?: { components?: string[] }
): Promise<
  import("@/types/sofascore/tournaments/get-seasons").GetSeasonsResponse
> {
  return fetchSeasons(tournamentId, metadata);
}

/**
 * Fetches standings for a tournament
 */
export async function getStandings(
  tournamentId: number,
  seasonId?: number,
  metadata?: { components?: string[] }
): Promise<any> {
  return fetchStandings(tournamentId, seasonId, metadata);
}

/**
 * Fetches transfers with proper typing
 */
export async function getTransfers(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<GetTeamTransfersResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  return fetchTransfers(targetTeamId, metadata);
}

/**
 * Fetches squad with proper typing
 */
export async function getTeamSquad(
  teamId?: number
): Promise<GetTeamSquadResponse> {
  const targetTeamId = teamId ?? getDefaultTeamId();
  return fetchTeamSquad(targetTeamId);
}
