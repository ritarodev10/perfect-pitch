// Common API Response Structure
export interface ApiPaging {
  current: number;
  total: number;
}

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, string | number>;
  errors: unknown[];
  results: number;
  paging: ApiPaging;
  response: T;
}

// Team Types
export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface Venue {
  id: number | null;
  name: string;
  address?: string;
  city: string;
  capacity?: number;
  surface?: string;
  image?: string;
}

export interface TeamWithVenue {
  team: Team;
  venue: Venue;
}

// Teams API Response Types
export type TeamsResponse = ApiResponse<TeamWithVenue[]>;
export type TeamByIdResponse = ApiResponse<TeamWithVenue[]>;
export type TeamsByLeagueSeasonResponse = ApiResponse<TeamWithVenue[]>;

// Fixture Types
export interface FixturePeriods {
  first: number | null;
  second: number | null;
}

export interface FixtureVenue {
  id: number | null;
  name: string;
  city: string;
}

export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: FixturePeriods;
  venue: FixtureVenue;
  status: FixtureStatus;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings?: boolean;
}

export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureTeams {
  home: TeamInfo;
  away: TeamInfo;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface ScoreDetail {
  home: number | null;
  away: number | null;
}

export interface Score {
  halftime: ScoreDetail;
  fulltime: ScoreDetail;
  extratime: ScoreDetail | null;
  penalty: ScoreDetail | null;
}

export interface FixtureData {
  fixture: Fixture;
  league: League;
  teams: FixtureTeams;
  goals: Goals;
  score: Score;
}

// Fixtures API Response Types
export type FixturesResponse = ApiResponse<FixtureData[]>;
export type FixturesBySeasonTeamResponse = ApiResponse<FixtureData[]>;
export type FixturesByLeagueSeasonResponse = ApiResponse<FixtureData[]>;
export type FixturesBySeasonTeamLeagueResponse = ApiResponse<FixtureData[]>;
export type FixtureByIdResponse = ApiResponse<FixtureData[]>;

// Team Statistics Types
export interface StatisticsLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface StatisticsTeam {
  id: number;
  name: string;
  logo: string;
}

export interface FixturesStats {
  played: {
    home: number;
    away: number;
    total: number;
  };
  wins: {
    home: number;
    away: number;
    total: number;
  };
  draws: {
    home: number;
    away: number;
    total: number;
  };
  loses: {
    home: number;
    away: number;
    total: number;
  };
}

export interface GoalsStats {
  for: {
    total: {
      home: number;
      away: number;
      total: number;
    };
    average: {
      home: string;
      away: string;
      total: string;
    };
    minute: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
    under_over?: {
      [key: string]: {
        over: number | null;
        under: number | null;
      };
    };
  };
  against: {
    total: {
      home: number;
      away: number;
      total: number;
    };
    average: {
      home: string;
      away: string;
      total: string;
    };
    minute: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
    under_over?: {
      [key: string]: {
        over: number | null;
        under: number | null;
      };
    };
  };
}

export interface TeamStatisticsData {
  league: StatisticsLeague;
  team: StatisticsTeam;
  form: string;
  fixtures: FixturesStats;
  goals: GoalsStats;
  biggest?: {
    streak: {
      wins: number;
      draws: number;
      loses: number;
    };
    wins: {
      home: string | null;
      away: string | null;
    };
    loses: {
      home: string | null;
      away: string | null;
    };
    goals: {
      for: {
        home: number | null;
        away: number | null;
      };
      against: {
        home: number | null;
        away: number | null;
      };
    };
  };
  clean_sheet?: {
    home: number;
    away: number;
    total: number;
  };
  failed_to_score?: {
    home: number;
    away: number;
    total: number;
  };
  penalty?: {
    scored: {
      total: number | null;
      percentage: string | null;
    };
    missed: {
      total: number | null;
      percentage: string | null;
    };
    total: number | null;
  };
  lineups?: Array<{
    formation: string;
    played: number;
  }>;
  cards?: {
    yellow: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
    red: {
      [key: string]: {
        total: number | null;
        percentage: string | null;
      };
    };
  };
}

// Team Statistics API Response Type
export type TeamStatisticsResponse = ApiResponse<TeamStatisticsData>;

// League Types
export interface LeagueInfo {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Coverage {
  fixtures: {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
  };
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface LeagueData {
  league: LeagueInfo;
  country: Country;
  seasons: Season[];
}

// Leagues API Response Types
export type LeagueByIdResponse = ApiResponse<LeagueData[]>;

// Standings Types
export interface StandingTeam {
  id: number;
  name: string;
  logo: string;
}

export interface StandingGoals {
  for: number;
  against: number;
}

export interface StandingStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: StandingGoals;
}

export interface Standing {
  rank: number;
  team: StandingTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: StandingStats;
  home: StandingStats;
  away: StandingStats;
  update: string;
}

export interface StandingsLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Standing[][];
}

export interface StandingsData {
  league: StandingsLeague;
}

// Standings API Response Types
export type StandingsByLeagueSeasonResponse = ApiResponse<StandingsData[]>;

// Player Types
export interface PlayerBirth {
  date: string;
  place: string | null;
  country: string;
}

export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: PlayerBirth;
  nationality: string;
  height: string | null;
  weight: string | null;
  injured: boolean;
  photo: string;
}

export interface PlayerTeam {
  id: number;
  name: string;
  logo: string;
}

export interface PlayerLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface PlayerGames {
  appearences: number | null;
  lineups: number | null;
  minutes: number | null;
  number: number | null;
  position: string;
  rating: string | null;
  captain: boolean;
}

export interface PlayerSubstitutes {
  in: number | null;
  out: number | null;
  bench: number | null;
}

export interface PlayerShots {
  total: number | null;
  on: number | null;
}

export interface PlayerGoals {
  total: number | null;
  conceded: number | null;
  assists: number | null;
  saves: number | null;
}

export interface PlayerPasses {
  total: number | null;
  key: number | null;
  accuracy: number | null;
}

export interface PlayerTackles {
  total: number | null;
  blocks: number | null;
  interceptions: number | null;
}

export interface PlayerDuels {
  total: number | null;
  won: number | null;
}

export interface PlayerDribbles {
  attempts: number | null;
  success: number | null;
  past: number | null;
}

export interface PlayerFouls {
  drawn: number | null;
  committed: number | null;
}

export interface PlayerCards {
  yellow: number | null;
  yellowred: number | null;
  red: number | null;
}

export interface PlayerPenalty {
  won: number | null;
  commited: number | null;
  scored: number | null;
  missed: number | null;
  saved: number | null;
}

export interface PlayerStatistics {
  team: PlayerTeam;
  league: PlayerLeague;
  games: PlayerGames;
  substitutes: PlayerSubstitutes;
  shots: PlayerShots;
  goals: PlayerGoals;
  passes: PlayerPasses;
  tackles: PlayerTackles;
  duels: PlayerDuels;
  dribbles: PlayerDribbles;
  fouls: PlayerFouls;
  cards: PlayerCards;
  penalty: PlayerPenalty;
}

export interface PlayerData {
  player: Player;
  statistics: PlayerStatistics[];
}

// Players API Response Types
export type PlayersByTeamSeasonResponse = ApiResponse<PlayerData[]>;
export type PlayersTopScorersResponse = ApiResponse<PlayerData[]>;
export type PlayersTopAssistsResponse = ApiResponse<PlayerData[]>;
export type PlayersTopYellowCardsResponse = ApiResponse<PlayerData[]>;
export type PlayersTopRedCardsResponse = ApiResponse<PlayerData[]>;

// Coach Types
export interface CoachBirth {
  date: string;
  place: string | null;
  country: string;
}

export interface CoachTeam {
  id: number;
  name: string;
  logo: string;
}

export interface CoachCareer {
  team: CoachTeam;
  start: string;
  end: string | null;
}

export interface Coach {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: CoachBirth;
  nationality: string;
  height: string | null;
  weight: string | null;
  photo: string;
  team: CoachTeam;
  career: CoachCareer[];
}

// Coachs API Response Types
export type CoachsByTeamResponse = ApiResponse<Coach[]>;

// Venue Types
export interface VenueData {
  id: number;
  name: string;
  address: string | null;
  city: string;
  country: string;
  capacity: number | null;
  surface: string | null;
  image: string | null;
}

// Venues API Response Types
export type VenuesByTeamResponse = ApiResponse<VenueData[]>;
export type VenueByIdResponse = ApiResponse<VenueData[]>;

// Squad Types
export interface SquadPlayer {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

export interface SquadTeam {
  id: number;
  name: string;
  logo: string;
}

export interface SquadData {
  team: SquadTeam;
  players: SquadPlayer[];
}

// Squads API Response Types
export type SquadsByTeamResponse = ApiResponse<SquadData[]>;

// Transfer Types
export interface TransferPlayer {
  id: number;
  name: string;
}

export interface TransferTeam {
  id: number;
  name: string;
  logo: string;
}

export interface TransferTeams {
  in: TransferTeam;
  out: TransferTeam;
}

export interface Transfer {
  date: string;
  type: string | null;
  teams: TransferTeams;
}

export interface TransferData {
  player: TransferPlayer;
  update: string;
  transfers: Transfer[];
}

// Transfers API Response Types
export type TransfersByTeamResponse = ApiResponse<TransferData[]>;
