export const API_FIXTURES_BY_SEASON_TEAM_RESPONSE = {
  get: "fixtures",
  parameters: {
    season: "2023",
    team: "489",
  },
  errors: [],
  results: 59,
  paging: {
    current: 1,
    total: 1,
  },
  response: [
    {
      fixture: {
        id: 1030303,
        referee: "T. Ford",
        timezone: "UTC",
        date: "2023-07-24T02:00:00+00:00",
        timestamp: 1690164000,
        periods: {
          first: 1690164000,
          second: 1690167600,
        },
        venue: {
          id: null,
          name: "Rose Bowl",
          city: "Pasadena, California",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 541,
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 2,
        },
        fulltime: {
          home: 3,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1030310,
        referee: "T. Ford",
        timezone: "UTC",
        date: "2023-07-28T02:30:00+00:00",
        timestamp: 1690511400,
        periods: {
          first: 1690511400,
          second: 1690515000,
        },
        venue: {
          id: 1616,
          name: "Dignity Health Sports Park",
          city: "Carson, California",
        },
        status: {
          long: "Match Finished",
          short: "PEN",
          elapsed: 120,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 496,
          name: "Juventus",
          logo: "https://media.api-sports.io/football/teams/496.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 2,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 2,
        },
        fulltime: {
          home: 2,
          away: 2,
        },
        extratime: {
          home: 0,
          away: 0,
        },
        penalty: {
          home: 4,
          away: 3,
        },
      },
    },
    {
      fixture: {
        id: 1030321,
        referee: "A. Chilowicz",
        timezone: "UTC",
        date: "2023-08-02T03:00:00+00:00",
        timestamp: 1690945200,
        periods: {
          first: 1690945200,
          second: 1690948800,
        },
        venue: {
          id: null,
          name: "Allegiant Stadium",
          city: "Las Vegas, Nevada",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 529,
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052253,
        referee: "L. Pairetto",
        timezone: "UTC",
        date: "2023-08-21T18:45:00+00:00",
        timestamp: 1692643500,
        periods: {
          first: 1692643500,
          second: 1692647100,
        },
        venue: {
          id: 881,
          name: "Stadio Renato Dall'Ara",
          city: "Bologna",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 1",
        standings: true,
      },
      teams: {
        home: {
          id: 500,
          name: "Bologna",
          logo: "https://media.api-sports.io/football/teams/500.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 2,
        },
        fulltime: {
          home: 0,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052269,
        referee: "M. Mariani",
        timezone: "UTC",
        date: "2023-08-26T18:45:00+00:00",
        timestamp: 1693075500,
        periods: {
          first: 1693075500,
          second: 1693079100,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 2",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 503,
          name: "Torino",
          logo: "https://media.api-sports.io/football/teams/503.png",
          winner: false,
        },
      },
      goals: {
        home: 4,
        away: 1,
      },
      score: {
        halftime: {
          home: 3,
          away: 1,
        },
        fulltime: {
          home: 4,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052279,
        referee: "A. Rapuano",
        timezone: "UTC",
        date: "2023-09-01T18:45:00+00:00",
        timestamp: 1693593900,
        periods: {
          first: 1693593900,
          second: 1693597500,
        },
        venue: {
          id: 910,
          name: "Stadio Olimpico",
          city: "Roma",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 3",
        standings: true,
      },
      teams: {
        home: {
          id: 497,
          name: "AS Roma",
          logo: "https://media.api-sports.io/football/teams/497.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052288,
        referee: "S. Sozza",
        timezone: "UTC",
        date: "2023-09-16T16:00:00+00:00",
        timestamp: 1694880000,
        periods: {
          first: 1694880000,
          second: 1694883600,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 4",
        standings: true,
      },
      teams: {
        home: {
          id: 505,
          name: "Inter",
          logo: "https://media.api-sports.io/football/teams/505.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 5,
        away: 1,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 5,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052298,
        referee: "F. Maresca",
        timezone: "UTC",
        date: "2023-09-23T13:00:00+00:00",
        timestamp: 1695474000,
        periods: {
          first: 1695474000,
          second: 1695477600,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 5",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 504,
          name: "Verona",
          logo: "https://media.api-sports.io/football/teams/504.png",
          winner: false,
        },
      },
      goals: {
        home: 1,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052303,
        referee: "F. La Penna",
        timezone: "UTC",
        date: "2023-09-27T16:30:00+00:00",
        timestamp: 1695832200,
        periods: {
          first: 1695832200,
          second: 1695835800,
        },
        venue: {
          id: 12275,
          name: "Unipol Domus",
          city: "Cagliari",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 6",
        standings: true,
      },
      teams: {
        home: {
          id: 490,
          name: "Cagliari",
          logo: "https://media.api-sports.io/football/teams/490.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 3,
      },
      score: {
        halftime: {
          home: 1,
          away: 2,
        },
        fulltime: {
          home: 1,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052317,
        referee: "D. Massa",
        timezone: "UTC",
        date: "2023-09-30T16:00:00+00:00",
        timestamp: 1696089600,
        periods: {
          first: 1696089600,
          second: 1696093200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 7",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 487,
          name: "Lazio",
          logo: "https://media.api-sports.io/football/teams/487.png",
          winner: false,
        },
      },
      goals: {
        home: 2,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 2,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052326,
        referee: "M. Piccinini",
        timezone: "UTC",
        date: "2023-10-07T18:45:00+00:00",
        timestamp: 1696704300,
        periods: {
          first: 1696704300,
          second: 1696707900,
        },
        venue: {
          id: 905,
          name: "Stadio Comunale Luigi Ferraris",
          city: "Genova",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 8",
        standings: true,
      },
      teams: {
        home: {
          id: 495,
          name: "Genoa",
          logo: "https://media.api-sports.io/football/teams/495.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052337,
        referee: "M. Mariani",
        timezone: "UTC",
        date: "2023-10-22T18:45:00+00:00",
        timestamp: 1698000300,
        periods: {
          first: 1698000300,
          second: 1698003900,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 9",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 496,
          name: "Juventus",
          logo: "https://media.api-sports.io/football/teams/496.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052351,
        referee: "D. Orsato",
        timezone: "UTC",
        date: "2023-10-29T19:45:00+00:00",
        timestamp: 1698608700,
        periods: {
          first: 1698608700,
          second: 1698612300,
        },
        venue: {
          id: 11904,
          name: "Stadio Diego Armando Maradona",
          city: "Napoli",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 10",
        standings: true,
      },
      teams: {
        home: {
          id: 492,
          name: "Napoli",
          logo: "https://media.api-sports.io/football/teams/492.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 2,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 2,
        },
        fulltime: {
          home: 2,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052359,
        referee: "J. Sacchi",
        timezone: "UTC",
        date: "2023-11-04T19:45:00+00:00",
        timestamp: 1699127100,
        periods: {
          first: 1699127100,
          second: 1699130700,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 11",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 494,
          name: "Udinese",
          logo: "https://media.api-sports.io/football/teams/494.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052368,
        referee: "R. Abisso",
        timezone: "UTC",
        date: "2023-11-11T14:00:00+00:00",
        timestamp: 1699711200,
        periods: {
          first: 1699711200,
          second: 1699714800,
        },
        venue: {
          id: 911,
          name: "Stadio Ettore Giardiniero - Via del Mare",
          city: "Lecce",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 12",
        standings: true,
      },
      teams: {
        home: {
          id: 867,
          name: "Lecce",
          logo: "https://media.api-sports.io/football/teams/867.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 2,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 2,
        },
        fulltime: {
          home: 2,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052380,
        referee: "M. Di Bello",
        timezone: "UTC",
        date: "2023-11-25T19:45:00+00:00",
        timestamp: 1700941500,
        periods: {
          first: 1700941500,
          second: 1700945100,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 13",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 502,
          name: "Fiorentina",
          logo: "https://media.api-sports.io/football/teams/502.png",
          winner: false,
        },
      },
      goals: {
        home: 1,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052387,
        referee: "M. Marchetti",
        timezone: "UTC",
        date: "2023-12-02T19:45:00+00:00",
        timestamp: 1701546300,
        periods: {
          first: 1701546300,
          second: 1701549900,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 14",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 512,
          name: "Frosinone",
          logo: "https://media.api-sports.io/football/teams/512.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 1,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052393,
        referee: "F. La Penna",
        timezone: "UTC",
        date: "2023-12-09T17:00:00+00:00",
        timestamp: 1702141200,
        periods: {
          first: 1702141200,
          second: 1702144800,
        },
        venue: {
          id: 879,
          name: "Gewiss Stadium",
          city: "Bergamo",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 15",
        standings: true,
      },
      teams: {
        home: {
          id: 499,
          name: "Atalanta",
          logo: "https://media.api-sports.io/football/teams/499.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 3,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052409,
        referee: "G. Aureliano",
        timezone: "UTC",
        date: "2023-12-17T11:30:00+00:00",
        timestamp: 1702812600,
        periods: {
          first: 1702812600,
          second: 1702816200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 16",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 1579,
          name: "Monza",
          logo: "https://media.api-sports.io/football/teams/1579.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 0,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052420,
        referee: "D. Doveri",
        timezone: "UTC",
        date: "2023-12-22T19:45:00+00:00",
        timestamp: 1703274300,
        periods: {
          first: 1703274300,
          second: 1703277900,
        },
        venue: {
          id: 933,
          name: "Stadio Arechi",
          city: "Salerno",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 17",
        standings: true,
      },
      teams: {
        home: {
          id: 514,
          name: "Salernitana",
          logo: "https://media.api-sports.io/football/teams/514.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 2,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 2,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052430,
        referee: "L. Marinelli",
        timezone: "UTC",
        date: "2023-12-30T17:00:00+00:00",
        timestamp: 1703955600,
        periods: {
          first: 1703955600,
          second: 1703959200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 18",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 488,
          name: "Sassuolo",
          logo: "https://media.api-sports.io/football/teams/488.png",
          winner: false,
        },
      },
      goals: {
        home: 1,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052434,
        referee: "F. La Penna",
        timezone: "UTC",
        date: "2024-01-07T11:30:00+00:00",
        timestamp: 1704627000,
        periods: {
          first: 1704627000,
          second: 1704630600,
        },
        venue: {
          id: 20109,
          name: "Stadio Carlo Castellani – Computer Gross Arena",
          city: "Empoli",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 19",
        standings: true,
      },
      teams: {
        home: {
          id: 511,
          name: "Empoli",
          logo: "https://media.api-sports.io/football/teams/511.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 3,
      },
      score: {
        halftime: {
          home: 0,
          away: 2,
        },
        fulltime: {
          home: 0,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052450,
        referee: "M. Guida",
        timezone: "UTC",
        date: "2024-01-14T19:45:00+00:00",
        timestamp: 1705261500,
        periods: {
          first: 1705261500,
          second: 1705265100,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 20",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 497,
          name: "AS Roma",
          logo: "https://media.api-sports.io/football/teams/497.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 1,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052462,
        referee: "F. Maresca",
        timezone: "UTC",
        date: "2024-01-20T19:45:00+00:00",
        timestamp: 1705779900,
        periods: {
          first: 1705779900,
          second: 1705783500,
        },
        venue: {
          id: 20416,
          name: "Bluenergy Stadium",
          city: "Udine",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 21",
        standings: true,
      },
      teams: {
        home: {
          id: 494,
          name: "Udinese",
          logo: "https://media.api-sports.io/football/teams/494.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 2,
        away: 3,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 2,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052470,
        referee: "D. Massa",
        timezone: "UTC",
        date: "2024-01-27T19:45:00+00:00",
        timestamp: 1706384700,
        periods: {
          first: 1706384700,
          second: 1706388300,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 22",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 500,
          name: "Bologna",
          logo: "https://media.api-sports.io/football/teams/500.png",
          winner: null,
        },
      },
      goals: {
        home: 2,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 2,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052476,
        referee: "L. Pairetto",
        timezone: "UTC",
        date: "2024-02-03T17:00:00+00:00",
        timestamp: 1706979600,
        periods: {
          first: 1706979600,
          second: 1706983200,
        },
        venue: {
          id: 904,
          name: "Stadio Benito Stirpe",
          city: "Frosinone",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 23",
        standings: true,
      },
      teams: {
        home: {
          id: 512,
          name: "Frosinone",
          logo: "https://media.api-sports.io/football/teams/512.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 2,
        away: 3,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 2,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052488,
        referee: "D. Doveri",
        timezone: "UTC",
        date: "2024-02-11T19:45:00+00:00",
        timestamp: 1707680700,
        periods: {
          first: 1707680700,
          second: 1707684300,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 24",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 492,
          name: "Napoli",
          logo: "https://media.api-sports.io/football/teams/492.png",
          winner: false,
        },
      },
      goals: {
        home: 1,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052499,
        referee: "A. Colombo",
        timezone: "UTC",
        date: "2024-02-18T19:45:00+00:00",
        timestamp: 1708285500,
        periods: {
          first: 1708285500,
          second: 1708289100,
        },
        venue: {
          id: 12086,
          name: "U-Power Stadium",
          city: "Monza",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 25",
        standings: true,
      },
      teams: {
        home: {
          id: 1579,
          name: "Monza",
          logo: "https://media.api-sports.io/football/teams/1579.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 4,
        away: 2,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 4,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052509,
        referee: "D. Orsato",
        timezone: "UTC",
        date: "2024-02-25T19:45:00+00:00",
        timestamp: 1708890300,
        periods: {
          first: 1708890300,
          second: 1708893900,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 26",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 499,
          name: "Atalanta",
          logo: "https://media.api-sports.io/football/teams/499.png",
          winner: null,
        },
      },
      goals: {
        home: 1,
        away: 1,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052518,
        referee: "M. Di Bello",
        timezone: "UTC",
        date: "2024-03-01T19:45:00+00:00",
        timestamp: 1709322300,
        periods: {
          first: 1709322300,
          second: 1709325900,
        },
        venue: {
          id: 910,
          name: "Stadio Olimpico",
          city: "Roma",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 27",
        standings: true,
      },
      teams: {
        home: {
          id: 487,
          name: "Lazio",
          logo: "https://media.api-sports.io/football/teams/487.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052530,
        referee: "J. Sacchi",
        timezone: "UTC",
        date: "2024-03-10T14:00:00+00:00",
        timestamp: 1710079200,
        periods: {
          first: 1710079200,
          second: 1710082800,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 28",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 511,
          name: "Empoli",
          logo: "https://media.api-sports.io/football/teams/511.png",
          winner: false,
        },
      },
      goals: {
        home: 1,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052536,
        referee: "M. Mariani",
        timezone: "UTC",
        date: "2024-03-17T14:00:00+00:00",
        timestamp: 1710684000,
        periods: {
          first: 1710684000,
          second: 1710687600,
        },
        venue: {
          id: 890,
          name: "Stadio Marcantonio Bentegodi",
          city: "Verona",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 29",
        standings: true,
      },
      teams: {
        home: {
          id: 504,
          name: "Verona",
          logo: "https://media.api-sports.io/football/teams/504.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 3,
      },
      score: {
        halftime: {
          home: 0,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052545,
        referee: "F. Maresca",
        timezone: "UTC",
        date: "2024-03-30T19:45:00+00:00",
        timestamp: 1711827900,
        periods: {
          first: 1711827900,
          second: 1711831500,
        },
        venue: {
          id: 902,
          name: "Stadio Artemio Franchi",
          city: "Firenze",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 30",
        standings: true,
      },
      teams: {
        home: {
          id: 502,
          name: "Fiorentina",
          logo: "https://media.api-sports.io/football/teams/502.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052558,
        referee: "L. Massimi",
        timezone: "UTC",
        date: "2024-04-06T13:00:00+00:00",
        timestamp: 1712408400,
        periods: {
          first: 1712408400,
          second: 1712412000,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 31",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 867,
          name: "Lecce",
          logo: "https://media.api-sports.io/football/teams/867.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 0,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052570,
        referee: "D. Massa",
        timezone: "UTC",
        date: "2024-04-14T13:00:00+00:00",
        timestamp: 1713099600,
        periods: {
          first: 1713099600,
          second: 1713103200,
        },
        venue: {
          id: 935,
          name: "MAPEI Stadium - Città del Tricolore",
          city: "Reggio Emilia",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 32",
        standings: true,
      },
      teams: {
        home: {
          id: 488,
          name: "Sassuolo",
          logo: "https://media.api-sports.io/football/teams/488.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 3,
        away: 3,
      },
      score: {
        halftime: {
          home: 2,
          away: 1,
        },
        fulltime: {
          home: 3,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052577,
        referee: "A. Colombo",
        timezone: "UTC",
        date: "2024-04-22T18:45:00+00:00",
        timestamp: 1713811500,
        periods: {
          first: 1713811500,
          second: 1713815100,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 33",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 505,
          name: "Inter",
          logo: "https://media.api-sports.io/football/teams/505.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 0,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052589,
        referee: "M. Mariani",
        timezone: "UTC",
        date: "2024-04-27T16:00:00+00:00",
        timestamp: 1714233600,
        periods: {
          first: 1714233600,
          second: 1714237200,
        },
        venue: {
          id: 909,
          name: "Allianz Stadium",
          city: "Torino",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 34",
        standings: true,
      },
      teams: {
        home: {
          id: 496,
          name: "Juventus",
          logo: "https://media.api-sports.io/football/teams/496.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 0,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052596,
        referee: "A. Prontera",
        timezone: "UTC",
        date: "2024-05-05T16:00:00+00:00",
        timestamp: 1714924800,
        periods: {
          first: 1714924800,
          second: 1714928400,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 35",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 495,
          name: "Genoa",
          logo: "https://media.api-sports.io/football/teams/495.png",
          winner: null,
        },
      },
      goals: {
        home: 3,
        away: 3,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 3,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052611,
        referee: "S. Sozza",
        timezone: "UTC",
        date: "2024-05-11T18:45:00+00:00",
        timestamp: 1715453100,
        periods: {
          first: 1715453100,
          second: 1715456700,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 36",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 490,
          name: "Cagliari",
          logo: "https://media.api-sports.io/football/teams/490.png",
          winner: false,
        },
      },
      goals: {
        home: 5,
        away: 1,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 5,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052621,
        referee: "E. Feliciani",
        timezone: "UTC",
        date: "2024-05-18T18:45:00+00:00",
        timestamp: 1716057900,
        periods: {
          first: 1716057900,
          second: 1716061500,
        },
        venue: {
          id: 943,
          name: "Stadio Olimpico Grande Torino",
          city: "Torino",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 37",
        standings: true,
      },
      teams: {
        home: {
          id: 503,
          name: "Torino",
          logo: "https://media.api-sports.io/football/teams/503.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 1,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1052631,
        referee: "D. Di Marco",
        timezone: "UTC",
        date: "2024-05-25T18:45:00+00:00",
        timestamp: 1716662700,
        periods: {
          first: 1716662700,
          second: 1716666300,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Regular Season - 38",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 514,
          name: "Salernitana",
          logo: "https://media.api-sports.io/football/teams/514.png",
          winner: null,
        },
      },
      goals: {
        home: 3,
        away: 3,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1072455,
        referee: "A. Colombo",
        timezone: "UTC",
        date: "2023-07-20T15:00:00+00:00",
        timestamp: 1689865200,
        periods: {
          first: 1689865200,
          second: 1689868800,
        },
        venue: {
          id: null,
          name: "Centro Sportivo Milanello",
          city: "Carnago",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 1689,
          name: "Lumezzane",
          logo: "https://media.api-sports.io/football/teams/1689.png",
          winner: false,
        },
      },
      goals: {
        home: 6,
        away: 0,
      },
      score: {
        halftime: {
          home: 4,
          away: 0,
        },
        fulltime: {
          home: 6,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1106511,
        referee: null,
        timezone: "UTC",
        date: "2023-08-09T16:00:00+00:00",
        timestamp: 1691596800,
        periods: {
          first: 1691596800,
          second: 1691600400,
        },
        venue: {
          id: null,
          name: "Centro Sportivo Milanello",
          city: "Carnago",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 17147,
          name: "Trento",
          logo: "https://media.api-sports.io/football/teams/17147.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1106512,
        referee: "M. Gualtieri",
        timezone: "UTC",
        date: "2023-08-13T09:00:00+00:00",
        timestamp: 1691917200,
        periods: {
          first: 1691917200,
          second: 1691920800,
        },
        venue: {
          id: null,
          name: "Centro Sportivo Milanello",
          city: "Carnago",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 1",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 513,
          name: "Novara",
          logo: "https://media.api-sports.io/football/teams/513.png",
          winner: false,
        },
      },
      goals: {
        home: 4,
        away: 2,
      },
      score: {
        halftime: {
          home: 2,
          away: 1,
        },
        fulltime: {
          home: 4,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1106533,
        referee: null,
        timezone: "UTC",
        date: "2023-08-08T19:00:00+00:00",
        timestamp: 1691521200,
        periods: {
          first: 1691521200,
          second: 1691524800,
        },
        venue: {
          id: null,
          name: null,
          city: null,
        },
        status: {
          long: "Match Finished",
          short: "PEN",
          elapsed: 120,
          extra: null,
        },
      },
      league: {
        id: 667,
        name: "Friendlies Clubs",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/667.png",
        flag: null,
        season: 2023,
        round: "Club Friendlies 5",
        standings: false,
      },
      teams: {
        home: {
          id: 1579,
          name: "Monza",
          logo: "https://media.api-sports.io/football/teams/1579.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126144,
        referee: "José Sánchez",
        timezone: "UTC",
        date: "2023-09-19T16:45:00+00:00",
        timestamp: 1695141900,
        periods: {
          first: 1695141900,
          second: 1695145500,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 1",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 34,
          name: "Newcastle",
          logo: "https://media.api-sports.io/football/teams/34.png",
          winner: null,
        },
      },
      goals: {
        home: 0,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126171,
        referee: "S. Marciniak",
        timezone: "UTC",
        date: "2023-10-04T19:00:00+00:00",
        timestamp: 1696446000,
        periods: {
          first: 1696446000,
          second: 1696449600,
        },
        venue: {
          id: 19381,
          name: "SIGNAL IDUNA PARK",
          city: "Dortmund",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 2",
        standings: true,
      },
      teams: {
        home: {
          id: 165,
          name: "Borussia Dortmund",
          logo: "https://media.api-sports.io/football/teams/165.png",
          winner: null,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
      },
      goals: {
        home: 0,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126187,
        referee: "S. Vinčić",
        timezone: "UTC",
        date: "2023-10-25T19:00:00+00:00",
        timestamp: 1698260400,
        periods: {
          first: 1698260400,
          second: 1698264000,
        },
        venue: {
          id: 671,
          name: "Parc des Princes",
          city: "Paris",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 3",
        standings: true,
      },
      teams: {
        home: {
          id: 85,
          name: "Paris Saint Germain",
          logo: "https://media.api-sports.io/football/teams/85.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126196,
        referee: "Jesús Gil",
        timezone: "UTC",
        date: "2023-11-07T20:00:00+00:00",
        timestamp: 1699387200,
        periods: {
          first: 1699387200,
          second: 1699390800,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 4",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 85,
          name: "Paris Saint Germain",
          logo: "https://media.api-sports.io/football/teams/85.png",
          winner: false,
        },
      },
      goals: {
        home: 2,
        away: 1,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 2,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126212,
        referee: "I. Kovacs",
        timezone: "UTC",
        date: "2023-11-28T20:00:00+00:00",
        timestamp: 1701201600,
        periods: {
          first: 1701201600,
          second: 1701205200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 5",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 165,
          name: "Borussia Dortmund",
          logo: "https://media.api-sports.io/football/teams/165.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 3,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1126237,
        referee: "D. Makkelie",
        timezone: "UTC",
        date: "2023-12-13T20:00:00+00:00",
        timestamp: 1702497600,
        periods: {
          first: 1702497600,
          second: 1702501200,
        },
        venue: {
          id: 562,
          name: "St. James' Park",
          city: "Newcastle upon Tyne",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 2,
        name: "UEFA Champions League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/2.png",
        flag: null,
        season: 2023,
        round: "Group F - 6",
        standings: true,
      },
      teams: {
        home: {
          id: 34,
          name: "Newcastle",
          logo: "https://media.api-sports.io/football/teams/34.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1140937,
        referee: "A. Prontera",
        timezone: "UTC",
        date: "2024-01-02T20:00:00+00:00",
        timestamp: 1704225600,
        periods: {
          first: 1704225600,
          second: 1704229200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 137,
        name: "Coppa Italia",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/137.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Round of 16",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 490,
          name: "Cagliari",
          logo: "https://media.api-sports.io/football/teams/490.png",
          winner: false,
        },
      },
      goals: {
        home: 4,
        away: 1,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 4,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1149550,
        referee: "N. Dabanović",
        timezone: "UTC",
        date: "2024-02-15T20:00:00+00:00",
        timestamp: 1708027200,
        periods: {
          first: 1708027200,
          second: 1708030800,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Knockout Round Play-offs",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 94,
          name: "Rennes",
          logo: "https://media.api-sports.io/football/teams/94.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 0,
      },
      score: {
        halftime: {
          home: 1,
          away: 0,
        },
        fulltime: {
          home: 3,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1149551,
        referee: "João Pedro Pinheiro",
        timezone: "UTC",
        date: "2024-02-22T17:45:00+00:00",
        timestamp: 1708623900,
        periods: {
          first: 1708623900,
          second: 1708627500,
        },
        venue: {
          id: 680,
          name: "Roazhon Park",
          city: "Rennes",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Knockout Round Play-offs",
        standings: true,
      },
      teams: {
        home: {
          id: 94,
          name: "Rennes",
          logo: "https://media.api-sports.io/football/teams/94.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 3,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 3,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1155570,
        referee: "M. Di Bello",
        timezone: "UTC",
        date: "2024-01-10T20:00:00+00:00",
        timestamp: 1704916800,
        periods: {
          first: 1704916800,
          second: 1704920400,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 137,
        name: "Coppa Italia",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/137.png",
        flag: "https://media.api-sports.io/flags/it.svg",
        season: 2023,
        round: "Quarter-finals",
        standings: false,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 499,
          name: "Atalanta",
          logo: "https://media.api-sports.io/football/teams/499.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 2,
      },
      score: {
        halftime: {
          home: 1,
          away: 1,
        },
        fulltime: {
          home: 1,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1175859,
        referee: "H. Meler",
        timezone: "UTC",
        date: "2024-03-07T20:00:00+00:00",
        timestamp: 1709841600,
        periods: {
          first: 1709841600,
          second: 1709845200,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Round of 16",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
        away: {
          id: 560,
          name: "Slavia Praha",
          logo: "https://media.api-sports.io/football/teams/560.png",
          winner: false,
        },
      },
      goals: {
        home: 4,
        away: 2,
      },
      score: {
        halftime: {
          home: 3,
          away: 1,
        },
        fulltime: {
          home: 4,
          away: 2,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1175860,
        referee: "G. Nyberg",
        timezone: "UTC",
        date: "2024-03-14T17:45:00+00:00",
        timestamp: 1710438300,
        periods: {
          first: 1710438300,
          second: 1710441900,
        },
        venue: {
          id: 18856,
          name: "Fortuna Arena",
          city: "Praha",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Round of 16",
        standings: true,
      },
      teams: {
        home: {
          id: 560,
          name: "Slavia Praha",
          logo: "https://media.api-sports.io/football/teams/560.png",
          winner: false,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: true,
        },
      },
      goals: {
        home: 1,
        away: 3,
      },
      score: {
        halftime: {
          home: 0,
          away: 3,
        },
        fulltime: {
          home: 1,
          away: 3,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1184824,
        referee: "C. Turpin",
        timezone: "UTC",
        date: "2024-04-11T19:00:00+00:00",
        timestamp: 1712862000,
        periods: {
          first: 1712862000,
          second: 1712865600,
        },
        venue: {
          id: 907,
          name: "Stadio Giuseppe Meazza",
          city: "Milano",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Quarter-finals",
        standings: true,
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
        away: {
          id: 497,
          name: "AS Roma",
          logo: "https://media.api-sports.io/football/teams/497.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
      score: {
        halftime: {
          home: 0,
          away: 1,
        },
        fulltime: {
          home: 0,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 1184825,
        referee: "S. Marciniak",
        timezone: "UTC",
        date: "2024-04-18T19:00:00+00:00",
        timestamp: 1713466800,
        periods: {
          first: 1713466800,
          second: 1713470400,
        },
        venue: {
          id: 910,
          name: "Stadio Olimpico",
          city: "Roma",
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: null,
        },
      },
      league: {
        id: 3,
        name: "UEFA Europa League",
        country: "World",
        logo: "https://media.api-sports.io/football/leagues/3.png",
        flag: null,
        season: 2023,
        round: "Quarter-finals",
        standings: true,
      },
      teams: {
        home: {
          id: 497,
          name: "AS Roma",
          logo: "https://media.api-sports.io/football/teams/497.png",
          winner: true,
        },
        away: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: false,
        },
      },
      goals: {
        home: 2,
        away: 1,
      },
      score: {
        halftime: {
          home: 2,
          away: 0,
        },
        fulltime: {
          home: 2,
          away: 1,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
  ],
};
