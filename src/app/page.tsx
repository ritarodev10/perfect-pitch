import { ClubIdentityHeader } from "@/components/dashboard/ClubIdentityHeader";
import { QuickKPICards } from "@/components/dashboard/QuickKPICards";
import { RecentFormStrip } from "@/components/dashboard/RecentFormStrip";
import { StandingsComparisonChart } from "@/components/dashboard/StandingsComparisonChart";
import { PerformanceRadarChart } from "@/components/dashboard/PerformanceRadarChart";
import { UpcomingMatchCard } from "@/components/dashboard/UpcomingMatchCard";
import { InjuryRibbon } from "@/components/dashboard/InjuryRibbon";
import { StandingsSnippet } from "@/app/dashboard/_components/StandingsSnippet";
import { PlayerLeaders } from "@/app/dashboard/_components/PlayerLeaders";
import { TransfersSnapshot } from "@/app/dashboard/_components/TransfersSnapshot";
import { MatchHeightsWrapper } from "@/app/match-heights-wrapper";
import {
  getTeamDetail,
  getNextMatches,
  getLastMatches,
  getTeamStatistics,
  getPlayerStatistics,
  getSeasons,
  getStandings,
  getTransfers,
  getTeamStatisticsSeasons,
  getPlayerStatisticsSeasons,
} from "@/app/dashboard/data";
import { getH2H } from "@/data/sofascore";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Fetch all team data from SofaScore API
  let teamData,
    nextMatches,
    lastMatches,
    teamStats,
    playerStats,
    standings,
    transfers,
    h2hData,
    historicalSeasons;
  let teamId: number | undefined;
  let tournamentId: number | undefined;

  try {
    // Fetch team detail
    teamData = await getTeamDetail({
      components: ["ClubIdentityHeader"],
    });

    if (!teamData) {
      throw new Error("Team data is required but was not loaded.");
    }

    teamId = teamData.team.id;
    tournamentId = teamData.team.primaryUniqueTournament.id;

    if (!teamId || !tournamentId) {
      throw new Error("Team ID and Tournament ID are required");
    }

    // Get tournament ID from env for seasons (fallback to team's tournament)
    const seasonsTournamentId = parseInt(
      process.env.SOFASCORE_TOURNAMENT_ID || String(tournamentId),
      10
    );

    // Fetch all seasons for the tournament
    let allSeasons: Array<{ id: number; name: string; year?: string }> = [];
    let currentSeasonId: number | undefined;
    let historicalSeasonsData: Array<{
      seasonId: number;
      seasonName: string;
      standings:
        | import("@/types/sofascore/tournaments/get-standings").GetStandingsResponse
        | null;
    }> = [];

    try {
      const seasonsResponse = await getSeasons(seasonsTournamentId, {
        components: ["StandingsComparisonChart"],
      });
      allSeasons = seasonsResponse.seasons || [];

      // Current season is first in list (most recent)
      const currentSeason = allSeasons[0];
      currentSeasonId = currentSeason?.id;

      // Get last 5 historical seasons (indices 1-5)
      const historicalSeasonsList = allSeasons.slice(1, 6).map((season) => ({
        seasonId: season.id,
        seasonName:
          season.name || season.year?.toString() || `Season ${season.id}`,
      }));

      // Fetch standings for historical seasons
      const historicalStandingsResults = await Promise.allSettled(
        historicalSeasonsList.map((season) =>
          getStandings(seasonsTournamentId, season.seasonId, {
            components: ["StandingsComparisonChart"],
          })
        )
      );

      // Map results to include season info
      historicalSeasonsData = historicalSeasonsList.map((season, index) => ({
        ...season,
        standings:
          historicalStandingsResults[index].status === "fulfilled"
            ? historicalStandingsResults[index].value
            : null,
      }));
    } catch (error) {
      console.error("[Dashboard] Failed to fetch seasons:", error);
      historicalSeasonsData = [];
    }

    // Get current season IDs for statistics
    let teamSeasonId: number | undefined;
    let playerSeasonId: number | undefined;

    try {
      const [teamStatsSeasons, playerStatsSeasons] = await Promise.allSettled([
        getTeamStatisticsSeasons(teamId),
        getPlayerStatisticsSeasons(teamId),
      ]);

      if (teamStatsSeasons.status === "fulfilled") {
        const tournamentEntry =
          teamStatsSeasons.value.uniqueTournamentSeasons.find(
            (entry) => entry.uniqueTournament.id === tournamentId
          );
        if (tournamentEntry?.seasons?.[0]) {
          teamSeasonId = tournamentEntry.seasons[0].id;
        }
      }

      if (playerStatsSeasons.status === "fulfilled") {
        const tournamentEntry =
          playerStatsSeasons.value.uniqueTournamentSeasons.find(
            (entry) => entry.uniqueTournament.id === tournamentId
          );
        if (tournamentEntry?.seasons?.[0]) {
          playerSeasonId = tournamentEntry.seasons[0].id;
        }
      }
    } catch (error) {
      console.error("[Dashboard] Failed to fetch seasons:", error);
    }

    // Fetch all data in parallel
    const [
      nextMatchesResult,
      lastMatchesResult,
      teamStatsResult,
      playerStatsResult,
      standingsResult,
      transfersResult,
    ] = await Promise.allSettled([
      getNextMatches(teamId, { components: ["UpcomingMatchCard"] }),
      getLastMatches(teamId, {
        components: ["RecentFormStrip", "StandingsComparisonChart"],
      }),
      getTeamStatistics(teamId, tournamentId, teamSeasonId, {
        components: ["QuickKPICards", "PerformanceRadarChart"],
      }),
      getPlayerStatistics(teamId, tournamentId, playerSeasonId, {
        components: ["PlayerLeaders"],
      }),
      getStandings(tournamentId, currentSeasonId || teamSeasonId, {
        components: [
          "StandingsComparisonChart",
          "StandingsSnippet",
          "QuickKPICards",
        ],
      }),
      getTransfers(teamId, { components: ["TransfersSnapshot"] }),
    ]);

    // Extract successful results
    nextMatches =
      nextMatchesResult.status === "fulfilled" ? nextMatchesResult.value : null;

    lastMatches =
      lastMatchesResult.status === "fulfilled" ? lastMatchesResult.value : null;

    teamStats =
      teamStatsResult.status === "fulfilled" ? teamStatsResult.value : null;

    playerStats =
      playerStatsResult.status === "fulfilled" ? playerStatsResult.value : null;

    standings =
      standingsResult.status === "fulfilled" ? standingsResult.value : null;

    transfers =
      transfersResult.status === "fulfilled" ? transfersResult.value : null;

    // Set historical seasons data
    historicalSeasons = historicalSeasonsData;

    // Fetch H2H if we have a next match
    if (nextMatches?.events?.[0]) {
      const nextMatch = nextMatches.events[0];
      const matchId = nextMatch.id;

      try {
        h2hData = await getH2H(matchId, {
          components: ["UpcomingMatchCard"],
        });
        // h2hData will be null if no data available (handled in logging)
      } catch {
        h2hData = null;
      }
    }
  } catch {
    throw new Error(
      "Failed to load team data. Please check your API configuration."
    );
  }

  return (
    <main className="min-h-screen text-white selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header Section */}
        <ClubIdentityHeader teamData={teamData} />

        {/* KPI Section */}
        <QuickKPICards
          teamStats={teamStats}
          teamData={teamData}
          standings={standings}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Charts & Form) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Section: Recent Form + Charts - This height will be matched */}
            <div id="left-column-top-section" className="space-y-6">
              {/* Recent Form - Full width spanning both charts */}
              <RecentFormStrip
                lastMatches={lastMatches}
                pregameForm={teamData.pregameForm}
                teamId={teamId}
              />

              {/* Charts Row - Side by Side, Same Height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Standings Comparison Chart */}
                <div className="flex">
                  <StandingsComparisonChart
                    currentSeasonStandings={standings}
                    historicalSeasons={historicalSeasons || []}
                    teamId={teamId}
                    lastMatches={lastMatches}
                    useHardcodedData={true}
                  />
                </div>
                {/* Performance Radar Chart - Same height as StandingsComparisonChart */}
                <div className="flex flex-1 min-w-0">
                  <PerformanceRadarChart teamStats={teamStats} />
                </div>
              </div>
            </div>

            {/* Bottom Section - Additional Content to Fill Space */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlayerLeaders playerStats={playerStats} />
              <TransfersSnapshot transfers={transfers} />
            </div>
          </div>

          {/* Right Column (Insights & Upcoming) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Match height of UpcomingMatchCard to left column top section (RecentFormStrip + Charts) */}
            <MatchHeightsWrapper
              targetId="upcoming-match-card"
              referenceId="left-column-top-section"
            >
              <div id="upcoming-match-card" className="h-full">
                <UpcomingMatchCard
                  nextMatches={nextMatches?.events}
                  lastMatches={lastMatches?.events}
                  teamData={teamData}
                  initialH2hData={h2hData}
                />
              </div>
            </MatchHeightsWrapper>
            <StandingsSnippet standings={standings} teamId={teamId} />
          </div>
        </div>
      </div>

      {/* Footer / Ticker */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <InjuryRibbon />
      </div>

      {/* Bottom padding for fixed footer */}
      <div className="h-12" />
    </main>
  );
}
