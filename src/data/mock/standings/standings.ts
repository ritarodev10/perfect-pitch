import { API_STANDINGS_BY_LEAGUE_SEASON_RESPONSE } from "./standings-by-league-season";

export const STANDINGS_BY_LEAGUE_SEASON =
  API_STANDINGS_BY_LEAGUE_SEASON_RESPONSE.response.flatMap((item) =>
    item.league.standings.flat().map((standing) => ({
      rank: standing.rank,
      teamId: standing.team.id,
      teamName: standing.team.name,
      teamLogo: standing.team.logo,
      points: standing.points,
      goalsDiff: standing.goalsDiff,
      form: standing.form,
      status: standing.status,
      description: standing.description,
      played: standing.all.played,
      win: standing.all.win,
      draw: standing.all.draw,
      lose: standing.all.lose,
      goalsFor: standing.all.goals.for,
      goalsAgainst: standing.all.goals.against,
      homePlayed: standing.home.played,
      homeWin: standing.home.win,
      homeDraw: standing.home.draw,
      homeLose: standing.home.lose,
      homeGoalsFor: standing.home.goals.for,
      homeGoalsAgainst: standing.home.goals.against,
      awayPlayed: standing.away.played,
      awayWin: standing.away.win,
      awayDraw: standing.away.draw,
      awayLose: standing.away.lose,
      awayGoalsFor: standing.away.goals.for,
      awayGoalsAgainst: standing.away.goals.against,
      leagueId: item.league.id,
      leagueName: item.league.name,
      season: item.league.season,
    }))
  );
