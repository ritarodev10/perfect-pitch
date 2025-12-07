// SofaScore API Types

export interface SofaScoreSport {
  name: string;
  slug: string;
  id: number;
}

export interface SofaScoreCountry {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}

export interface SofaScoreFieldTranslations {
  nameTranslation?: Record<string, string>;
  shortNameTranslation?: Record<string, string>;
}

export interface SofaScoreTransferPeriod {
  activeFrom: string;
  activeTo: string;
}

export interface SofaScoreCategory {
  name: string;
  slug: string;
  sport: SofaScoreSport;
  id: number;
  country: SofaScoreCountry;
  flag: string;
  alpha2: string;
  fieldTranslations: SofaScoreFieldTranslations;
  transferPeriod: SofaScoreTransferPeriod[];
}

export interface SofaScoreUniqueTournament {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  category: SofaScoreCategory;
  userCount: number;
  hasPerformanceGraphFeature: boolean;
  id: number;
  country: Record<string, never>;
  displayInverseHomeAwayTeams: boolean;
  fieldTranslations: SofaScoreFieldTranslations;
}

export interface SofaScoreTournament {
  name: string;
  slug: string;
  category: SofaScoreCategory;
  uniqueTournament: SofaScoreUniqueTournament;
  priority: number;
  isLive: boolean;
  id: number;
  fieldTranslations: SofaScoreFieldTranslations;
}

export interface SofaScoreManager {
  name: string;
  slug: string;
  shortName: string;
  id: number;
  country: SofaScoreCountry;
  fieldTranslations: SofaScoreFieldTranslations;
}

export interface SofaScoreVenueCoordinates {
  latitude: number;
  longitude: number;
}

export interface SofaScoreVenueCity {
  name: string;
}

export interface SofaScoreStadium {
  name: string;
  capacity: number;
}

export interface SofaScoreVenue {
  city: SofaScoreVenueCity;
  venueCoordinates: SofaScoreVenueCoordinates;
  hidden: boolean;
  slug: string;
  name: string;
  capacity: number;
  id: number;
  country: SofaScoreCountry;
  fieldTranslations: SofaScoreFieldTranslations;
  stadium: SofaScoreStadium;
}

export interface SofaScoreTeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface SofaScoreTeam {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: SofaScoreSport;
  category: SofaScoreCategory;
  tournament: SofaScoreTournament;
  primaryUniqueTournament: SofaScoreUniqueTournament;
  userCount: number;
  manager: SofaScoreManager;
  venue: SofaScoreVenue;
  nameCode: string;
  class: number;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: SofaScoreCountry;
  fullName: string;
  teamColors: SofaScoreTeamColors;
  foundationDateTimestamp: number;
  fieldTranslations: SofaScoreFieldTranslations;
  timeActive: unknown[];
}

export interface SofaScorePregameForm {
  avgRating: string;
  position: number;
  value: string;
  form: string[];
}

export interface SofaScoreTeamDetailResponse {
  team: SofaScoreTeam;
  pregameForm: SofaScorePregameForm;
}

// Match Types
export interface SofaScoreEvent {
  id: number;
  startTimestamp: number;
  tournament: SofaScoreTournament;
  homeTeam: SofaScoreTeam;
  awayTeam: SofaScoreTeam;
  homeScore?: {
    current?: number;
    display?: number;
  };
  awayScore?: {
    current?: number;
    display?: number;
  };
  status: {
    type: string;
    name: string;
    shortName: string;
  };
  venue?: SofaScoreVenue;
  roundInfo?: {
    round: number;
    name?: string;
  };
}

export interface SofaScoreMatchesResponse {
  events: SofaScoreEvent[];
}

// Statistics Types
export interface SofaScoreStatistic {
  name: string;
  value: number | string;
  displayName?: string;
}

export interface SofaScorePeriodStatistics {
  statistics: SofaScoreStatistic[];
}

export interface SofaScoreTeamStatisticsResponse {
  statistics?: SofaScorePeriodStatistics[];
  periods?: {
    all?: SofaScorePeriodStatistics;
    home?: SofaScorePeriodStatistics;
    away?: SofaScorePeriodStatistics;
  };
}

// Player Statistics Types
export interface SofaScorePlayer {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  position?: string;
  jerseyNumber?: number;
  userCount: number;
  dateOfBirthTimestamp?: number;
  country: SofaScoreCountry;
  fieldTranslations: SofaScoreFieldTranslations;
}

export interface SofaScorePlayerStatistic {
  player: SofaScorePlayer;
  statistics: SofaScoreStatistic[];
}

export interface SofaScorePlayerStatisticsResponse {
  playerStatistics: SofaScorePlayerStatistic[];
}

// Standings Types
export interface SofaScoreStandingRow {
  team: SofaScoreTeam;
  position: number;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  scoresFor: number;
  scoresAgainst: number;
  points: number;
  id: number;
  promotion?: {
    text: string;
    id: number;
  };
  form?: string;
}

export interface SofaScoreStandingGroup {
  id: string;
  name: string;
  standings: {
    rows: SofaScoreStandingRow[];
  };
}

export interface SofaScoreStandingsResponse {
  standings: SofaScoreStandingGroup[];
  tournament: SofaScoreUniqueTournament;
  season?: {
    id: number;
    name: string;
    year: string;
  };
}

// H2H Types
export interface SofaScoreH2HResponse {
  firstTeamResults: {
    wins: number;
    draws: number;
    losses: number;
  };
  secondTeamResults: {
    wins: number;
    draws: number;
    losses: number;
  };
  recentH2H?: SofaScoreEvent[];
  firstTeamRecentForm?: string[];
  secondTeamRecentForm?: string[];
}
