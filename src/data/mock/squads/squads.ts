import { API_SQUADS_2023_RESPONSE } from "./squads-2023";
import { API_SQUADS_BY_TEAM_RESPONSE } from "./squads-by-team";

export const SQUADS_BY_TEAM = API_SQUADS_BY_TEAM_RESPONSE.response.map(
  (item) => ({
    teamId: item.team.id,
    teamName: item.team.name,
    teamLogo: item.team.logo,
    players: item.players.map((player) => ({
      id: player.id,
      name: player.name,
      age: player.age,
      number: player.number,
      position: player.position,
      photo: player.photo,
    })),
  })
);

export const SQUADS_2023 = API_SQUADS_2023_RESPONSE.response.map((item) => ({
  teamId: item.player.id,
  teamName: item.player.name,
  teamLogo: item.player.photo,
  statistics: item.statistics.map((stat) => ({
    teamId: stat.team.id,
    teamName: stat.team.name,
    teamLogo: stat.team.logo,
    leagueId: stat.league.id,
    leagueName: stat.league.name,
    season: stat.league.season,
    appearances: stat.games.appearences,
  })),
}));
