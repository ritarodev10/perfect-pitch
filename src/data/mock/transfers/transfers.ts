import { API_TRANSFERS_BY_TEAM_RESPONSE } from "./transfers-by-team";

export const TRANSFERS_BY_TEAM = API_TRANSFERS_BY_TEAM_RESPONSE.response.map((item) => ({
  playerId: item.player.id,
  playerName: item.player.name,
  update: item.update,
  transfers: item.transfers.map((transfer) => ({
    date: transfer.date,
    type: transfer.type,
    teamInId: transfer.teams.in.id,
    teamInName: transfer.teams.in.name,
    teamInLogo: transfer.teams.in.logo,
    teamOutId: transfer.teams.out.id,
    teamOutName: transfer.teams.out.name,
    teamOutLogo: transfer.teams.out.logo,
  })),
}));



