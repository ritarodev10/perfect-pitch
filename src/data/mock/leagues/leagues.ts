import { API_LEAGUE_BY_ID_RESPONSE } from "./league-by-id";

export const LEAGUE_BY_ID = API_LEAGUE_BY_ID_RESPONSE.response.map((item) => ({
  id: item.league.id,
  name: item.league.name,
  type: item.league.type,
  logo: item.league.logo,
  country: item.country.name,
  countryCode: item.country.code,
  countryFlag: item.country.flag,
  seasons: item.seasons.map((season) => ({
    year: season.year,
    start: season.start,
    end: season.end,
    current: season.current,
    coverage: season.coverage,
  })),
}));
