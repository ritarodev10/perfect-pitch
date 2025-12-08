"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type {
  SofaScoreEvent,
  SofaScoreTeamDetailResponse,
} from "@/data/sofascore";
import type { GetH2HResponse } from "@/types/sofascore/matches/get-h2h";
import type { GetMatchDetailResponse } from "@/types/sofascore/matches/get-match-detail";
import type { GetMatchIncidentsResponse } from "@/types/sofascore/matches/get-match-incidents";
import { getTeamImageUrl } from "@/utils/imageProxy";

interface UpcomingMatchCardProps {
  nextMatches?: SofaScoreEvent[];
  lastMatches?: SofaScoreEvent[];
  teamData: SofaScoreTeamDetailResponse;
  initialH2hData?: GetH2HResponse | null;
}

export const UpcomingMatchCard = ({
  nextMatches = [],
  lastMatches = [],
  teamData,
  initialH2hData,
}: UpcomingMatchCardProps) => {
  // Combine all matches: past matches + upcoming matches
  // Note: lastMatches array already has latest match at the end
  const allMatches = useMemo(() => {
    const past = lastMatches || [];
    const upcoming = nextMatches || [];
    return [...past, ...upcoming];
  }, [lastMatches, nextMatches]);

  // Find the index of the first upcoming match (or start at the most recent past match)
  // Note: lastMatches has newest at the end, so if no upcoming match, start at last index of past matches
  const initialIndex = useMemo(() => {
    if (nextMatches.length === 0) {
      // Start at most recent past match (last item in lastMatches array)
      return Math.max(0, (lastMatches?.length || 0) - 1);
    }
    // Start at the first upcoming match
    return lastMatches?.length || 0;
  }, [lastMatches, nextMatches]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [h2hData, setH2hData] = useState<GetH2HResponse | null>(
    initialH2hData || null
  );
  const [matchDetail, setMatchDetail] = useState<GetMatchDetailResponse | null>(
    null
  );
  const [matchIncidents, setMatchIncidents] =
    useState<GetMatchIncidentsResponse | null>(null);
  // Loading states
  const [isLoadingH2H, setIsLoadingH2H] = useState(false);
  const [isLoadingMatchDetail, setIsLoadingMatchDetail] = useState(false);
  const [isLoadingMatchIncidents, setIsLoadingMatchIncidents] = useState(false);
  // Cache for prefetched H2H data (using ref to avoid re-renders)
  const h2hCacheRef = useRef<Map<number, GetH2HResponse | null>>(new Map());
  // Cache for match detail and incidents
  const matchDetailCacheRef = useRef<
    Map<number, GetMatchDetailResponse | null>
  >(new Map());
  const matchIncidentsCacheRef = useRef<
    Map<number, GetMatchIncidentsResponse | null>
  >(new Map());

  // Initialize cache with initial H2H data if available
  useEffect(() => {
    if (initialH2hData && allMatches[initialIndex]) {
      h2hCacheRef.current.set(allMatches[initialIndex].id, initialH2hData);
    }
  }, []); // Only run once on mount

  // Fetch H2H data helper
  const fetchH2HData = async (
    matchId: number,
    setLoading?: (loading: boolean) => void
  ): Promise<GetH2HResponse | null> => {
    setLoading?.(true);
    try {
      const response = await fetch(`/api/h2h?matchId=${matchId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch H2H data: ${response.statusText}`);
      }

      const data: GetH2HResponse | null = await response.json();

      // Cache the result
      h2hCacheRef.current.set(matchId, data);

      return data;
    } catch {
      // Cache null result to avoid refetching failed requests
      h2hCacheRef.current.set(matchId, null);

      return null;
    } finally {
      setLoading?.(false);
    }
  };

  // Fetch match detail helper
  const fetchMatchDetail = async (
    matchId: number,
    setLoading?: (loading: boolean) => void
  ): Promise<GetMatchDetailResponse | null> => {
    setLoading?.(true);
    try {
      const response = await fetch(`/api/match-detail?matchId=${matchId}`);

      if (!response.ok) {
        // Log error for debugging
        const errorData = await response.json().catch(() => ({}));
        console.warn(
          `Failed to fetch match detail for match ${matchId}:`,
          response.status,
          errorData
        );
        // Don't cache failed requests - allow retry
        return null;
      }

      const data: GetMatchDetailResponse = await response.json();

      // Cache successful responses (even if venue is null in the response)
      // This prevents unnecessary refetches when API doesn't have venue data
      matchDetailCacheRef.current.set(matchId, data);

      return data;
    } catch (error) {
      // Log error for debugging
      console.warn(`Error fetching match detail for match ${matchId}:`, error);
      // Don't cache failed requests - allow retry
      return null;
    } finally {
      setLoading?.(false);
    }
  };

  // Fetch match incidents helper
  const fetchMatchIncidents = async (
    matchId: number,
    setLoading?: (loading: boolean) => void
  ): Promise<GetMatchIncidentsResponse | null> => {
    setLoading?.(true);
    try {
      const response = await fetch(`/api/match-incidents?matchId=${matchId}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch match incidents: ${response.statusText}`
        );
      }

      const data: GetMatchIncidentsResponse = await response.json();

      // Cache the result
      matchIncidentsCacheRef.current.set(matchId, data);

      return data;
    } catch {
      // Cache null result to avoid refetching failed requests
      matchIncidentsCacheRef.current.set(matchId, null);

      return null;
    } finally {
      setLoading?.(false);
    }
  };

  // Fetch data when match changes + prefetch next match
  useEffect(() => {
    const currentMatch = allMatches[currentIndex];
    if (!currentMatch) {
      return;
    }

    const currentMatchId = currentMatch.id;
    let isCancelled = false;

    // Determine if our team is home (needed to optimize venue fetching)
    const isHome = currentMatch.homeTeam.id === team.id;

    // Determine if match is past
    const isPastMatch =
      currentMatch.homeScore?.current !== undefined ||
      currentMatch.awayScore?.current !== undefined ||
      currentMatch.status.type === "finished";

    if (isPastMatch) {
      // For past matches: fetch match detail and incidents
      // Check cache first (even for home matches, as data might have been prefetched)
      const cachedDetail = matchDetailCacheRef.current.get(currentMatchId);

      if (cachedDetail !== undefined && cachedDetail !== null) {
        // Use cached data if available (important for prefetched data)
        setMatchDetail(cachedDetail);
        setIsLoadingMatchDetail(false);
      } else if (!isHome) {
        // Only fetch for away matches - home matches already have venue from team data
        // But if cache exists (from prefetch), we use it above
        setIsLoadingMatchDetail(true);
        fetchMatchDetail(currentMatchId, setIsLoadingMatchDetail).then(
          (data) => {
            if (
              !isCancelled &&
              allMatches[currentIndex]?.id === currentMatchId
            ) {
              setMatchDetail(data);
            }
          }
        );
      } else {
        // For home matches without cached data, we already have venue from team data
        setMatchDetail(null);
        setIsLoadingMatchDetail(false);
      }

      // Fetch incidents for all past matches (needed for goal scorers)
      const cachedIncidents =
        matchIncidentsCacheRef.current.get(currentMatchId);

      if (cachedIncidents !== undefined) {
        setMatchIncidents(cachedIncidents);
        setIsLoadingMatchIncidents(false);
      } else {
        setIsLoadingMatchIncidents(true);
        fetchMatchIncidents(currentMatchId, setIsLoadingMatchIncidents).then(
          (data) => {
            if (
              !isCancelled &&
              allMatches[currentIndex]?.id === currentMatchId
            ) {
              setMatchIncidents(data);
            }
          }
        );
      }

      // Clear H2H data for past matches
      setH2hData(null);
      setIsLoadingH2H(false);
    } else {
      // For upcoming matches: fetch H2H data and match detail (for venue)
      const cachedData = h2hCacheRef.current.get(currentMatchId);
      if (cachedData !== undefined) {
        setH2hData(cachedData);
        setIsLoadingH2H(false);
      } else {
        setIsLoadingH2H(true);
        fetchH2HData(currentMatchId, setIsLoadingH2H).then((data) => {
          if (!isCancelled && allMatches[currentIndex]?.id === currentMatchId) {
            setH2hData(data);
          }
        });
      }

      // Fetch match detail for upcoming matches to get venue
      // Check cache first (even for home matches, as data might have been prefetched)
      const cachedDetail = matchDetailCacheRef.current.get(currentMatchId);

      if (cachedDetail !== undefined && cachedDetail !== null) {
        // Use cached data if available (important for prefetched data)
        setMatchDetail(cachedDetail);
        setIsLoadingMatchDetail(false);
      } else if (!isHome) {
        // Only fetch for away matches - home matches already have venue from team data
        // But if cache exists (from prefetch), we use it above
        setIsLoadingMatchDetail(true);
        fetchMatchDetail(currentMatchId, setIsLoadingMatchDetail).then(
          (data) => {
            if (
              !isCancelled &&
              allMatches[currentIndex]?.id === currentMatchId
            ) {
              setMatchDetail(data);
            }
          }
        );
      } else {
        // For home matches without cached data, we already have venue from team data
        setMatchDetail(null);
        setIsLoadingMatchDetail(false);
      }

      // Clear incidents for upcoming matches
      setMatchIncidents(null);
      setIsLoadingMatchIncidents(false);
    }

    // Prefetch next match data (if exists and not already cached)
    const nextIndex = currentIndex + 1;
    if (nextIndex < allMatches.length) {
      const nextMatch = allMatches[nextIndex];
      const nextMatchId = nextMatch.id;
      const nextIsPastMatch =
        nextMatch.homeScore?.current !== undefined ||
        nextMatch.awayScore?.current !== undefined ||
        nextMatch.status.type === "finished";

      if (nextIsPastMatch) {
        // For past matches, only prefetch match detail for away matches
        const nextIsHome = nextMatch.homeTeam.id === team.id;
        if (!nextIsHome && !matchDetailCacheRef.current.has(nextMatchId)) {
          fetchMatchDetail(nextMatchId);
        }
        if (!matchIncidentsCacheRef.current.has(nextMatchId)) {
          fetchMatchIncidents(nextMatchId);
        }
      } else {
        // For upcoming matches, prefetch H2H and match detail (for venue)
        if (!h2hCacheRef.current.has(nextMatchId)) {
          fetchH2HData(nextMatchId);
        }
        // Prefetch match detail for all upcoming matches (home and away)
        // This ensures we have accurate venue data when navigating, especially for tournaments like Supercoppa
        // where venue might be at event level or we need to verify the correct venue
        if (!matchDetailCacheRef.current.has(nextMatchId)) {
          fetchMatchDetail(nextMatchId);
        }
      }
    }

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (allMatches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass-panel overflow-hidden group"
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 md:mb-8 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-black bg-white rounded-full uppercase shadow-lg">
            Next Fixture
          </span>
          <p className="text-neutral-500 text-xs sm:text-sm">No matches available</p>
        </div>
      </motion.div>
    );
  }

  const currentMatch = allMatches[currentIndex];
  const team = teamData.team;
  const isHome = currentMatch.homeTeam.id === team.id;
  const opponent = isHome ? currentMatch.awayTeam : currentMatch.homeTeam;
  const matchDate = new Date(currentMatch.startTimestamp * 1000);

  // Determine if match is past (has score or status indicates finished)
  // We check scores and status rather than timestamp to avoid Date.now() in render
  const isPastMatch =
    currentMatch.homeScore?.current !== undefined ||
    currentMatch.awayScore?.current !== undefined ||
    currentMatch.status.type === "finished";

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < allMatches.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // For H2H data, teamDuel is from home team's perspective
  // If our team is home: homeWins = our wins, awayWins = opponent wins
  // If our team is away: homeWins = opponent wins, awayWins = our wins

  const ourScore = isHome
    ? currentMatch.homeScore?.current ?? currentMatch.homeScore?.display
    : currentMatch.awayScore?.current ?? currentMatch.awayScore?.display;
  const opponentScore = isHome
    ? currentMatch.awayScore?.current ?? currentMatch.awayScore?.display
    : currentMatch.homeScore?.current ?? currentMatch.homeScore?.display;

  const weWon =
    isPastMatch &&
    ourScore !== undefined &&
    opponentScore !== undefined &&
    ourScore > opponentScore;
  const weLost =
    isPastMatch &&
    ourScore !== undefined &&
    opponentScore !== undefined &&
    ourScore < opponentScore;
  const isDraw =
    isPastMatch &&
    ourScore !== undefined &&
    opponentScore !== undefined &&
    ourScore === opponentScore;

  // Get tournament name and round info
  const tournamentName =
    currentMatch.tournament?.uniqueTournament?.name ||
    currentMatch.tournament?.name ||
    "";
  const isSerieA = tournamentName.toLowerCase().includes("serie a");
  const roundDisplay =
    isSerieA && currentMatch.roundInfo?.round
      ? `#${currentMatch.roundInfo.round}`
      : currentMatch.roundInfo?.name || "";

  // Determine match label based on position
  const getMatchLabel = () => {
    const pastMatchesCount = lastMatches?.length || 0;

    if (isPastMatch) {
      // Past matches
      if (currentIndex === pastMatchesCount - 1) {
        return "Last Match";
      }
      return "Past Match";
    } else {
      // Upcoming matches
      if (currentIndex === pastMatchesCount) {
        return "Next Fixture";
      }
      return "Upcoming Match";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="relative h-full p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass-panel overflow-hidden group flex flex-col"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px] group-hover:bg-[var(--accent)]/20 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top Section: Navigation and tournament info */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
          {/* Navigation and Match Type - Integrated header */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`p-1.5 rounded-lg transition-all ${
                canGoPrevious
                  ? "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
                  : "bg-white/0 text-white/20 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                {getMatchLabel()}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-1.5 rounded-lg transition-all ${
                canGoNext
                  ? "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
                  : "bg-white/0 text-white/20 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tournament and Round - Container with design */}
          {tournamentName && (
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-[9px] sm:text-[11px] font-semibold text-white/90 tracking-wide">
                  {tournamentName}
                </span>
                {roundDisplay && (
                  <>
                    <div className="h-2.5 sm:h-3 w-px bg-white/20" />
                    <span className="text-[9px] sm:text-[11px] font-medium text-white/70 tracking-wide">
                      {roundDisplay}
                    </span>
                  </>
                )}
                <div className="h-2.5 sm:h-3 w-px bg-white/20" />
                <span className="text-[8px] sm:text-[10px] font-medium text-white/60 uppercase tracking-wider">
                  {isHome ? "Home" : "Away"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Match Content - Hero Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMatch.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full flex-1 py-3 sm:py-4 md:py-6"
          >
            {/* Left side: Team if home, Opponent if away */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg sm:blur-xl" />
                <img
                  src={getTeamImageUrl(isHome ? team.id : opponent.id)}
                  alt={isHome ? team.name : opponent.name}
                  className={`w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 object-contain drop-shadow-2xl relative z-10 ${
                    !isHome
                      ? "grayscale group-hover:grayscale-0 transition-all duration-500"
                      : ""
                  }`}
                />
              </div>
              <span className="text-sm sm:text-base md:text-xl font-black text-white tracking-tight text-center">
                {isHome
                  ? team.shortName ||
                    team.nameCode ||
                    team.name.slice(0, 3).toUpperCase()
                  : opponent.shortName ||
                    opponent.nameCode ||
                    opponent.name.slice(0, 3).toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              {isPastMatch &&
              ourScore !== undefined &&
              opponentScore !== undefined ? (
                <>
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                    {/* Left side: Home team score if we're home, Away team score if we're away */}
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl font-black leading-none ${
                        isHome
                          ? weWon
                            ? "text-green-400"
                            : weLost
                            ? "text-red-400"
                            : "text-white"
                          : weLost
                          ? "text-green-400"
                          : weWon
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {isHome ? ourScore : opponentScore}
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-light">
                      -
                    </span>
                    {/* Right side: Away team score if we're home, Home team score if we're away */}
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl font-black leading-none ${
                        isHome
                          ? weLost
                            ? "text-green-400"
                            : weWon
                            ? "text-red-400"
                            : "text-white"
                          : weWon
                          ? "text-green-400"
                          : weLost
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {isHome ? opponentScore : ourScore}
                    </span>
                  </div>
                  <div className="mt-0.5 sm:mt-1">
                    {weWon && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 h-5 sm:h-6 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="text-[8px] sm:text-[10px] font-bold text-green-400 uppercase tracking-wider">
                          Win
                        </span>
                      </div>
                    )}
                    {weLost && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 h-5 sm:h-6 rounded-full bg-red-500/10 border border-red-500/20">
                        <span className="text-[8px] sm:text-[10px] font-bold text-red-400 uppercase tracking-wider">
                          Loss
                        </span>
                      </div>
                    )}
                    {isDraw && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 h-5 sm:h-6 rounded-full bg-neutral-500/10 border border-neutral-500/20">
                        <span className="text-[8px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          Draw
                        </span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-600 italic tracking-tighter">
                  VS
                </div>
              )}
            </div>

            {/* Right side: Opponent if home, Team if away */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-lg sm:blur-xl" />
                <img
                  src={getTeamImageUrl(isHome ? opponent.id : team.id)}
                  alt={isHome ? opponent.name : team.name}
                  className={`w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 object-contain drop-shadow-2xl relative z-10 ${
                    isHome
                      ? "grayscale group-hover:grayscale-0 transition-all duration-500"
                      : ""
                  }`}
                />
              </div>
              <span className="text-sm sm:text-base md:text-xl font-black text-white tracking-tight text-center">
                {isHome
                  ? opponent.shortName ||
                    opponent.nameCode ||
                    opponent.name.slice(0, 3).toUpperCase()
                  : team.shortName ||
                    team.nameCode ||
                    team.name.slice(0, 3).toUpperCase()}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Section: Match Details */}
        <div className="w-full border-t border-white/5 pt-3 sm:pt-4 md:pt-5 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-300 tracking-wide">
              {matchDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div
            className={`flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 transition-all duration-300 ${
              isLoadingMatchDetail ? "blur-sm opacity-60" : "blur-0 opacity-100"
            }`}
          >
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400 tracking-wide text-center">
              {(() => {
                // Prioritize match detail data (most accurate, especially for tournaments like Supercoppa)
                if (matchDetail?.event) {
                  // Try event-level venue first (actual match venue - may be neutral for cup matches)
                  if (matchDetail.event.venue?.name) {
                    return matchDetail.event.venue.name;
                  }
                  // Use home team's venue (actual match venue) - not based on "our team"
                  // The match is played at the home team's venue
                  const homeTeamVenue = matchDetail.event.homeTeam?.venue?.name;
                  if (homeTeamVenue) {
                    return homeTeamVenue;
                  }
                  // Fallback to away team venue only if home team venue not available
                  const awayTeamVenue = matchDetail.event.awayTeam?.venue?.name;
                  if (awayTeamVenue) {
                    return awayTeamVenue;
                  }
                }
                // Only fallback to currentMatch or team data if matchDetail is not available
                return (
                  currentMatch.venue?.name ||
                  (isHome ? team.venue.name : opponent.venue?.name || "TBD")
                );
              })()}
            </span>
          </div>
          {isPastMatch && currentMatch.status?.name && (
            <div className="flex items-center justify-center">
              <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                {currentMatch.status.name}
              </span>
            </div>
          )}
          {isPastMatch && (
            <div
              className={`mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 md:pt-5 border-t border-white/5 transition-all duration-300 ${
                isLoadingMatchIncidents
                  ? "blur-sm opacity-60"
                  : "blur-0 opacity-100"
              }`}
            >
              {matchIncidents?.incidents ? (
                <>
                  <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider text-center mb-3">
                    Goal Scorers
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {(() => {
                      const goals = matchIncidents.incidents
                        .filter((incident) => incident.incidentType === "goal")
                        .sort((a, b) => a.time - b.time);

                      if (goals.length === 0) {
                        return (
                          <div className="text-center text-xs text-neutral-500">
                            No goals recorded
                          </div>
                        );
                      }

                      // Separate home and away goals based on incident.isHome
                      const homeTeamGoals = goals.filter(
                        (goal) => goal.isHome === true
                      );
                      const awayTeamGoals = goals.filter(
                        (goal) => goal.isHome === false
                      );

                      // Determine which goals belong to our team vs opponent
                      // If we're home: our goals = homeTeamGoals, opponent = awayTeamGoals
                      // If we're away: our goals = awayTeamGoals, opponent = homeTeamGoals
                      const ourTeamGoals = isHome
                        ? homeTeamGoals
                        : awayTeamGoals;
                      const opponentTeamGoals = isHome
                        ? awayTeamGoals
                        : homeTeamGoals;

                      // Get the maximum number of goals to create matching lines
                      const maxGoals = Math.max(
                        ourTeamGoals.length,
                        opponentTeamGoals.length
                      );

                      return Array.from({ length: maxGoals }, (_, idx) => {
                        const ourGoal = ourTeamGoals[idx];
                        const opponentGoal = opponentTeamGoals[idx];

                        // Position goals based on home/away status:
                        // - Home team goals always on LEFT (minute' name)
                        // - Away team goals always on RIGHT (name minute')
                        // But we need to swap based on which team is "ours"
                        let leftGoal: typeof ourGoal;
                        let rightGoal: typeof ourGoal;
                        let leftIsOurTeam: boolean;
                        let rightIsOurTeam: boolean;

                        if (isHome) {
                          // We're home: our goals on left, opponent on right
                          leftGoal = ourGoal;
                          rightGoal = opponentGoal;
                          leftIsOurTeam = !!ourGoal;
                          rightIsOurTeam = false;
                        } else {
                          // We're away: opponent on left, our goals on right
                          leftGoal = opponentGoal;
                          rightGoal = ourGoal;
                          leftIsOurTeam = false;
                          rightIsOurTeam = !!ourGoal;
                        }

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs"
                          >
                            {/* Left side: Our goals if home, Opponent goals if away */}
                            <div
                              className="flex items-center gap-2 flex-1"
                              data-side="left"
                              data-goal={
                                leftGoal
                                  ? `${leftGoal.time}' ${leftGoal.player?.name}`
                                  : "empty"
                              }
                              data-is-our-team={leftIsOurTeam}
                            >
                              {leftGoal ? (
                                <>
                                  <span
                                    className={`font-semibold ${
                                      leftIsOurTeam
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {leftGoal.time}
                                    {leftGoal.addedTime
                                      ? `+${leftGoal.addedTime}`
                                      : ""}
                                    &apos;
                                  </span>
                                  <span className="text-neutral-300">
                                    {leftGoal.player?.shortName ||
                                      leftGoal.player?.name ||
                                      "N/A"}
                                  </span>
                                </>
                              ) : null}
                            </div>

                            {/* Right side: Opponent goals if home, Our goals if away */}
                            <div
                              className="flex items-center gap-2 flex-1 justify-end"
                              data-side="right"
                              data-goal={
                                rightGoal
                                  ? `${rightGoal.player?.name} ${rightGoal.time}'`
                                  : "empty"
                              }
                              data-is-our-team={rightIsOurTeam}
                            >
                              {rightGoal ? (
                                <>
                                  <span className="text-neutral-300">
                                    {rightGoal.player?.shortName ||
                                      rightGoal.player?.name ||
                                      "N/A"}
                                  </span>
                                  <span
                                    className={`font-semibold ${
                                      rightIsOurTeam
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {rightGoal.time}
                                    {rightGoal.addedTime
                                      ? `+${rightGoal.addedTime}`
                                      : ""}
                                    &apos;
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </>
              ) : isLoadingMatchIncidents ? (
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    Goal Scorers
                  </div>
                  <div className="text-xs text-neutral-500">Loading...</div>
                </div>
              ) : null}
            </div>
          )}
          {!isPastMatch ? (
            <div
              className={`mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 md:pt-5 border-t border-white/5 transition-all duration-300 ${
                isLoadingH2H ? "blur-sm opacity-60" : "blur-0 opacity-100"
              }`}
            >
              {h2hData?.teamDuel ? (
                <>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-neutral-500 uppercase tracking-wider text-center mb-2 sm:mb-3">
                    Head-to-Head
                  </div>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-green-400">
                        {isHome
                          ? h2hData.teamDuel.homeWins
                          : h2hData.teamDuel.awayWins}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        W
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-400">
                        {h2hData.teamDuel.draws}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        D
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-red-400">
                        {isHome
                          ? h2hData.teamDuel.awayWins
                          : h2hData.teamDuel.homeWins}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        L
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-300">
                        {h2hData.teamDuel.homeWins +
                          h2hData.teamDuel.awayWins +
                          h2hData.teamDuel.draws}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        Total
                      </span>
                    </div>
                  </div>
                </>
              ) : isLoadingH2H ? (
                <div className="text-center">
                  <div className="text-[9px] sm:text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 sm:mb-3">
                    Head-to-Head
                  </div>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-600">
                        -
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        W
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-600">
                        -
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        D
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-600">
                        -
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        L
                      </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-base sm:text-lg font-bold text-neutral-600">
                        -
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                        Total
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
