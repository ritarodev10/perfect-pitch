import {
  SofaScoreTeamDetailResponse,
  SofaScoreMatchesResponse,
  SofaScoreTeamStatisticsResponse,
  SofaScorePlayerStatisticsResponse,
} from "./types";

/**
 * Request deduplication cache
 * Prevents the same request from being made multiple times within a short window
 */
const requestCache = new Map<
  string,
  {
    promise: Promise<unknown>;
    timestamp: number;
    requestId: string;
    callCount: number;
  }
>();

const CACHE_TTL = 5000; // 5 seconds - prevents rapid duplicate requests

// Request counter for unique IDs
let requestCounter = 0;

/**
 * Generates a unique request ID
 */
function generateRequestId(): string {
  requestCounter++;
  return `REQ-${Date.now()}-${requestCounter.toString().padStart(4, "0")}`;
}

/**
 * Creates a cache key from endpoint and params
 */
function createCacheKey(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  const sortedParams = params
    ? Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";
  return `${endpoint}?${sortedParams}`;
}

/**
 * Gets cached request or creates a new one
 */
function getCachedRequest<T>(
  cacheKey: string,
  requestFn: () => Promise<T>,
  endpoint: string,
  params?: Record<string, string | number>,
  metadata?: { components?: string[] }
): Promise<T> {
  const now = Date.now();
  const cached = requestCache.get(cacheKey);

  // Return cached promise if it's still valid
  if (cached && now - cached.timestamp < CACHE_TTL) {
    cached.callCount++;
    return cached.promise as Promise<T>;
  }

  // Create new request
  const requestId = generateRequestId();
  const promise = requestFn();
  requestCache.set(cacheKey, {
    promise,
    timestamp: now,
    requestId,
    callCount: 1,
  });

  // Clean up old entries
  if (requestCache.size > 100) {
    const entriesToDelete: string[] = [];
    requestCache.forEach((value, key) => {
      if (now - value.timestamp > CACHE_TTL) {
        entriesToDelete.push(key);
      }
    });
    entriesToDelete.forEach((key) => requestCache.delete(key));
  }

  return promise;
}

/**
 * Trims raw response text to a maximum length for logging
 */
function trimRawResponse(text: string, maxLength: number = 500): string {
  if (text.length <= maxLength) {
    return text;
  }
  return (
    text.substring(0, maxLength) +
    `... (truncated, total length: ${text.length} chars)`
  );
}

/**
 * Extracts relevant response data for logging based on endpoint
 */
function extractResponseData(
  endpoint: string,
  data: unknown
): Record<string, unknown> {
  if (!data || typeof data !== "object") {
    return { data: data };
  }

  const response = data as Record<string, unknown>;

  try {
    if (endpoint === "teams/detail") {
      const team = (response as { team?: { id?: number; name?: string } }).team;
      return {
        teamId: team?.id,
        teamName: team?.name,
        hasTeam: !!team,
      };
    }

    if (
      endpoint === "teams/get-next-matches" ||
      endpoint === "teams/get-last-matches"
    ) {
      const events = (response as { events?: unknown[] }).events;
      return {
        eventCount: events?.length ?? 0,
        firstMatch: events?.[0]
          ? {
              id: (events[0] as { id?: number }).id,
              homeTeam: (events[0] as { homeTeam?: { name?: string } }).homeTeam
                ?.name,
              awayTeam: (events[0] as { awayTeam?: { name?: string } }).awayTeam
                ?.name,
              startTimestamp: (events[0] as { startTimestamp?: number })
                .startTimestamp,
            }
          : null,
      };
    }

    if (endpoint === "teams/get-statistics") {
      const stats = (response as { statistics?: unknown[] }).statistics;
      return {
        statisticsCount: stats?.length ?? 0,
        hasStatistics: !!stats && stats.length > 0,
      };
    }

    if (endpoint === "teams/get-player-statistics") {
      const players = (response as { statistics?: unknown[] }).statistics;
      return {
        playerCount: players?.length ?? 0,
        hasPlayers: !!players && players.length > 0,
      };
    }

    if (endpoint === "tournaments/get-standings") {
      const standings = (response as { standings?: unknown[] }).standings;
      return {
        groupCount: standings?.length ?? 0,
        hasStandings: !!standings && standings.length > 0,
      };
    }

    if (endpoint === "teams/get-transfers") {
      const transfers = (response as { transfers?: unknown[] }).transfers;
      return {
        transferCount: transfers?.length ?? 0,
        hasTransfers: !!transfers && transfers.length > 0,
      };
    }

    if (endpoint === "matches/get-h2h") {
      const firstTeam = (
        response as {
          firstTeamResults?: { wins?: number; draws?: number; losses?: number };
        }
      ).firstTeamResults;
      const secondTeam = (
        response as {
          secondTeamResults?: {
            wins?: number;
            draws?: number;
            losses?: number;
          };
        }
      ).secondTeamResults;
      const recentH2H = (response as { recentH2H?: unknown[] }).recentH2H;
      return {
        firstTeamResults: firstTeam
          ? {
              wins: firstTeam.wins,
              draws: firstTeam.draws,
              losses: firstTeam.losses,
            }
          : null,
        secondTeamResults: secondTeam
          ? {
              wins: secondTeam.wins,
              draws: secondTeam.draws,
              losses: secondTeam.losses,
            }
          : null,
        recentMatchesCount: recentH2H?.length ?? 0,
        hasData: !!(firstTeam || secondTeam),
      };
    }

    if (endpoint === "matches/detail") {
      const event = (
        response as { event?: { id?: number; venue?: { name?: string } } }
      ).event;
      return {
        hasEvent: !!event,
        eventId: event?.id,
        venueName: event?.venue?.name,
      };
    }

    if (endpoint === "matches/get-incidents") {
      const incidents = (response as { incidents?: unknown[] }).incidents;
      const goals = incidents?.filter(
        (incident: unknown) =>
          typeof incident === "object" &&
          incident !== null &&
          "incidentType" in incident &&
          (incident as { incidentType?: string }).incidentType === "goal"
      );
      return {
        incidentCount: incidents?.length ?? 0,
        goalCount: goals?.length ?? 0,
        hasIncidents: !!incidents && incidents.length > 0,
      };
    }

    if (endpoint.includes("statistics-seasons")) {
      const tournaments = (response as { uniqueTournamentSeasons?: unknown[] })
        .uniqueTournamentSeasons;
      return {
        tournamentCount: tournaments?.length ?? 0,
        hasSeasons: !!tournaments && tournaments.length > 0,
      };
    }

    return { hasData: true };
  } catch {
    return {
      error: "Failed to extract response data",
      raw: String(data).substring(0, 100),
    };
  }
}

/**
 * Shared HTTP helper for SofaScore API requests
 * Uses request deduplication to prevent duplicate calls
 */
async function sofascoreFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  metadata?: { components?: string[] }
): Promise<T> {
  const apiUrl = process.env.SOFASCORE_API_URL;
  const apiKey = process.env.SOFASCORE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(
      "Missing required environment variables: SOFASCORE_API_URL and SOFASCORE_API_KEY"
    );
  }

  // Create cache key for deduplication
  const cacheKey = createCacheKey(endpoint, params);

  // Use cached request if available, otherwise create new one
  return getCachedRequest(
    cacheKey,
    async () => {
      // Extract host from URL (e.g., "sofascore.p.rapidapi.com")
      const host = apiUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

      // Build query string
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
      }

      const url = `${apiUrl}/${endpoint}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const options: RequestInit = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": host,
        },
        // Use Next.js fetch caching to deduplicate requests
        next: { revalidate: 60 }, // Cache for 60 seconds
      };

      try {
        const response = await fetch(url, options);

        // Handle 204 No Content explicitly (no data available)
        if (response.status === 204) {
          // Return null for H2H to indicate no data, empty object for others
          if (endpoint.includes("h2h")) {
            return null as T;
          }
          return {} as T;
        }

        if (!response.ok) {
          const status = response.status;
          const statusText = response.statusText;

          throw new Error(`SofaScore API error: ${status} ${statusText}`);
        }

        let data;
        const text = await response.text();

        // Handle empty responses gracefully
        if (!text || text.trim().length === 0) {
          // Return null for H2H to indicate no data, empty object for others
          if (endpoint.includes("h2h")) {
            return null as T;
          }
          return {} as T;
        }

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Invalid JSON response from ${endpoint}`);
        }

        return data as T;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch SofaScore data: ${error.message}`);
        }
        throw new Error("Failed to fetch SofaScore data: Unknown error");
      }
    },
    endpoint,
    params,
    metadata
  ) as Promise<T>;
}

/**
 * Gets default team ID from environment or throws error
 */
function getDefaultTeamId(teamId?: number): number {
  const defaultTeamId = process.env.SOFASCORE_TEAM_ID;
  const targetTeamId =
    teamId ?? (defaultTeamId ? parseInt(defaultTeamId, 10) : undefined);

  if (!targetTeamId) {
    throw new Error(
      "Team ID is required. Provide it as a parameter or set SOFASCORE_TEAM_ID in environment variables"
    );
  }

  return targetTeamId;
}

/**
 * Fetches team detail data from SofaScore API
 */
export async function getTeamDetail(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<SofaScoreTeamDetailResponse> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<SofaScoreTeamDetailResponse>(
    "teams/detail",
    { teamId: targetTeamId },
    metadata
  );
}

/**
 * Fetches next matches for a team
 */
export async function getNextMatches(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<SofaScoreMatchesResponse> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<SofaScoreMatchesResponse>(
    "teams/get-next-matches",
    { teamId: targetTeamId },
    metadata
  );
}

/**
 * Fetches last matches for a team
 */
export async function getLastMatches(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<SofaScoreMatchesResponse> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<SofaScoreMatchesResponse>(
    "teams/get-last-matches",
    { teamId: targetTeamId },
    metadata
  );
}

/**
 * Fetches team statistics
 */
export async function getTeamStatistics(
  teamId?: number,
  tournamentId?: number,
  seasonId?: number,
  metadata?: { components?: string[] }
): Promise<SofaScoreTeamStatisticsResponse> {
  const targetTeamId = getDefaultTeamId(teamId);
  const params: Record<string, string | number> = {
    teamId: targetTeamId,
  };
  if (tournamentId) {
    params.tournamentId = tournamentId;
  }
  if (seasonId) {
    params.seasonId = seasonId;
  }
  return sofascoreFetch<SofaScoreTeamStatisticsResponse>(
    "teams/get-statistics",
    params,
    metadata
  );
}

/**
 * Fetches player statistics for a team
 */
export async function getPlayerStatistics(
  teamId?: number,
  tournamentId?: number,
  seasonId?: number,
  metadata?: { components?: string[] }
): Promise<SofaScorePlayerStatisticsResponse> {
  const targetTeamId = getDefaultTeamId(teamId);
  const params: Record<string, string | number> = {
    teamId: targetTeamId,
  };
  if (tournamentId) {
    params.tournamentId = tournamentId;
  }
  if (seasonId) {
    params.seasonId = seasonId;
  }
  return sofascoreFetch<SofaScorePlayerStatisticsResponse>(
    "teams/get-player-statistics",
    params,
    metadata
  );
}

/**
 * Fetches seasons for a tournament
 * @param tournamentId - The tournament ID
 */
export async function getSeasons(
  tournamentId: number,
  metadata?: { components?: string[] }
): Promise<
  import("@/types/sofascore/tournaments/get-seasons").GetSeasonsResponse
> {
  return sofascoreFetch<
    import("@/types/sofascore/tournaments/get-seasons").GetSeasonsResponse
  >("tournaments/get-seasons", { tournamentId }, metadata);
}

/**
 * Fetches standings for a tournament
 * @param tournamentId - The tournament ID (matches the `tournamentId` parameter in RapidAPI)
 * @param seasonId - Optional season ID
 * @param type - Optional type: "total", "home", or "away" (defaults to "total")
 */
export async function getStandings(
  tournamentId: number,
  seasonId?: number,
  metadata?: { components?: string[] },
  type?: "total" | "home" | "away"
): Promise<
  import("@/types/sofascore/tournaments/get-standings").GetStandingsResponse
> {
  const params: Record<string, string | number> = {
    tournamentId: tournamentId, // Changed from uniqueTournamentId to match RapidAPI
  };
  if (seasonId) {
    params.seasonId = seasonId;
  }
  if (type) {
    params.type = type;
  }
  return sofascoreFetch<
    import("@/types/sofascore/tournaments/get-standings").GetStandingsResponse
  >("tournaments/get-standings", params, metadata);
}

/**
 * Fetches head-to-head data for a specific match
 * Returns null if no H2H data is available (e.g., 204 No Content response)
 * @param matchId - The ID of the match (from events returned by get-next-matches, get-last-matches, etc.)
 */
export async function getH2H(
  matchId: number,
  metadata?: { components?: string[] }
): Promise<import("@/types/sofascore/matches/get-h2h").GetH2HResponse | null> {
  return sofascoreFetch<
    import("@/types/sofascore/matches/get-h2h").GetH2HResponse | null
  >("matches/get-h2h", { matchId }, metadata);
}

/**
 * Fetches detailed match information including venue
 * @param matchId - The ID of the match
 */
export async function getMatchDetail(
  matchId: number,
  metadata?: { components?: string[] }
): Promise<
  import("@/types/sofascore/matches/get-match-detail").GetMatchDetailResponse
> {
  return sofascoreFetch<
    import("@/types/sofascore/matches/get-match-detail").GetMatchDetailResponse
  >("matches/detail", { matchId }, metadata);
}

/**
 * Fetches match incidents (goals, cards, substitutions, etc.)
 * @param matchId - The ID of the match
 */
export async function getMatchIncidents(
  matchId: number,
  metadata?: { components?: string[] }
): Promise<
  import("@/types/sofascore/matches/get-match-incidents").GetMatchIncidentsResponse
> {
  return sofascoreFetch<
    import("@/types/sofascore/matches/get-match-incidents").GetMatchIncidentsResponse
  >("matches/get-incidents", { matchId }, metadata);
}

/**
 * Fetches transfers for a team
 */
export async function getTransfers(
  teamId?: number,
  metadata?: { components?: string[] }
): Promise<
  import("@/types/sofascore/teams/get-team-transfers").GetTeamTransfersResponse
> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<
    import("@/types/sofascore/teams/get-team-transfers").GetTeamTransfersResponse
  >("teams/get-transfers", { teamId: targetTeamId }, metadata);
}

/**
 * Fetches available statistics seasons for a team
 */
export async function getTeamStatisticsSeasons(
  teamId?: number
): Promise<
  import("@/types/sofascore/teams/get-team-statistics-seasons").GetTeamStatisticsSeasonsResponse
> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<
    import("@/types/sofascore/teams/get-team-statistics-seasons").GetTeamStatisticsSeasonsResponse
  >("teams/get-statistics-seasons", {
    teamId: targetTeamId,
  });
}

/**
 * Fetches available player statistics seasons for a team
 */
export async function getPlayerStatisticsSeasons(
  teamId?: number
): Promise<
  import("@/types/sofascore/teams/get-player-statistics-seasons").GetPlayerStatisticsSeasonsResponse
> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<
    import("@/types/sofascore/teams/get-player-statistics-seasons").GetPlayerStatisticsSeasonsResponse
  >("teams/get-player-statistics-seasons", {
    teamId: targetTeamId,
  });
}

/**
 * Fetches squad for a team
 */
export async function getTeamSquad(
  teamId?: number
): Promise<
  import("@/types/sofascore/teams/get-team-squad").GetTeamSquadResponse
> {
  const targetTeamId = getDefaultTeamId(teamId);
  return sofascoreFetch<
    import("@/types/sofascore/teams/get-team-squad").GetTeamSquadResponse
  >("teams/get-squad", {
    teamId: targetTeamId,
  });
}
