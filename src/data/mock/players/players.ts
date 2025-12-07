import { API_PLAYERS_BY_TEAM_SEASON_RESPONSE } from "./players-by-team-season";
import { API_PLAYERS_TOPSCORERS_RESPONSE } from "./players-topscorers";
import { API_PLAYERS_TOPASSISTS_RESPONSE } from "./players-topassists";
import { API_PLAYERS_TOPYELLOWCARDS_RESPONSE } from "./players-topyellowcards";
import { API_PLAYERS_TOPREDCARDS_RESPONSE } from "./players-topredcards";

const mapPlayerData = (item: {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number | null;
    birth: { date: string | null; place: string | null; country: string };
    nationality: string;
    height: string | null;
    weight: string | null;
    injured: boolean;
    photo: string;
  };
  statistics: Array<{
    team: { id: number; name: string; logo: string };
    league: { id: number; name: string; season: number };
    games: {
      appearences: number | null;
      lineups: number | null;
      minutes: number | null;
      position: string;
      rating: string | null;
      captain: boolean;
    };
    goals: { total: number | null; assists: number | null };
    shots: { total: number | null; on: number | null };
    passes: {
      total: number | null;
      key: number | null;
      accuracy: number | null;
    };
    tackles: {
      total: number | null;
      blocks: number | null;
      interceptions: number | null;
    };
    duels: { total: number | null; won: number | null };
    dribbles: { attempts: number | null; success: number | null };
    fouls: { drawn: number | null; committed: number | null };
    cards: {
      yellow: number | null;
      yellowred: number | null;
      red: number | null;
    };
    penalty: { scored: number | null; missed: number | null };
  }>;
}) => ({
  playerId: item.player.id,
  playerName: item.player.name,
  firstName: item.player.firstname,
  lastName: item.player.lastname,
  age: item.player.age,
  birthDate: item.player.birth.date,
  birthPlace: item.player.birth.place,
  birthCountry: item.player.birth.country,
  nationality: item.player.nationality,
  height: item.player.height,
  weight: item.player.weight,
  injured: item.player.injured,
  photo: item.player.photo,
  statistics: item.statistics.map((stat) => ({
    teamId: stat.team.id,
    teamName: stat.team.name,
    teamLogo: stat.team.logo,
    leagueId: stat.league.id,
    leagueName: stat.league.name,
    season: stat.league.season,
    appearances: stat.games.appearences,
    lineups: stat.games.lineups,
    minutes: stat.games.minutes,
    position: stat.games.position,
    rating: stat.games.rating,
    captain: stat.games.captain,
    goals: stat.goals.total,
    assists: stat.goals.assists,
    shotsTotal: stat.shots.total,
    shotsOn: stat.shots.on,
    passesTotal: stat.passes.total,
    passesKey: stat.passes.key,
    passesAccuracy: stat.passes.accuracy,
    tacklesTotal: stat.tackles.total,
    tacklesBlocks: stat.tackles.blocks,
    tacklesInterceptions: stat.tackles.interceptions,
    duelsTotal: stat.duels.total,
    duelsWon: stat.duels.won,
    dribblesAttempts: stat.dribbles.attempts,
    dribblesSuccess: stat.dribbles.success,
    foulsDrawn: stat.fouls.drawn,
    foulsCommitted: stat.fouls.committed,
    cardsYellow: stat.cards.yellow,
    cardsYellowRed: stat.cards.yellowred,
    cardsRed: stat.cards.red,
    penaltyScored: stat.penalty.scored,
    penaltyMissed: stat.penalty.missed,
  })),
});

export const PLAYERS_BY_TEAM_SEASON =
  API_PLAYERS_BY_TEAM_SEASON_RESPONSE.response.map(mapPlayerData);
export const PLAYERS_TOPSCORERS =
  API_PLAYERS_TOPSCORERS_RESPONSE.response.map(mapPlayerData);
export const PLAYERS_TOPASSISTS =
  API_PLAYERS_TOPASSISTS_RESPONSE.response.map(mapPlayerData);
export const PLAYERS_TOPYELLOWCARDS =
  API_PLAYERS_TOPYELLOWCARDS_RESPONSE.response.map(mapPlayerData);
export const PLAYERS_TOPREDCARDS =
  API_PLAYERS_TOPREDCARDS_RESPONSE.response.map(mapPlayerData);
