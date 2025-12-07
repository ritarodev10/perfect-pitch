import { API_TEAM_BY_ID_RESPONSE } from "./team-by-id";
import { API_TEAM_STATISTICS_RESPONSE } from "./team-statistics";
import { API_TEAMS_BY_LEAGUE_SEASON_RESPONSE } from "./teams-by-league-season";

export const TEAMS_BY_LEAGUE_SEASON =
  API_TEAMS_BY_LEAGUE_SEASON_RESPONSE.response.map((item) => ({
    id: item.team.id,
    name: item.team.name,
    code: item.team.code,
    logo: item.team.logo,
    venue: item.venue.name,
    city: item.venue.city,
  }));

export const TEAM_BY_ID = API_TEAM_BY_ID_RESPONSE.response.map((item) => ({
  id: item.team.id,
  name: item.team.name,
  code: item.team.code,
  logo: item.team.logo,
  country: item.team.country,
  founded: item.team.founded,
  national: item.team.national,
  venue: item.venue.name,
  venueId: item.venue.id,
  venueAddress: item.venue.address,
  city: item.venue.city,
  capacity: item.venue.capacity,
  surface: item.venue.surface,
  venueImage: item.venue.image,
}));

export const TEAM_STATISTICS = API_TEAM_STATISTICS_RESPONSE.response;
