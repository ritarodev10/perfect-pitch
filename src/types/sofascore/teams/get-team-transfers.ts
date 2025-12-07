/**
 * Types for SofaScore `GET /teams/get-transfers` payload.
 *
 * Brief: returns transfers in/out for the teamId, including player info,
 * source/target teams, fee details, and transfer timestamps.
 */

import type { FieldTranslations, Team } from "../../common";

export interface GetTeamTransfersParams {
  teamId: number;
}

export interface GetTeamTransfersResponse {
  transfersIn: TeamTransfer[];
  transfersOut: TeamTransfer[];
}

export interface TeamTransfer {
  player: TransferPlayer;
  transferFrom: Team;
  transferTo: Team;
  fromTeamName: string;
  toTeamName: string;
  type: number;
  transferFee?: number;
  transferFeeDescription?: string;
  id: number;
  transferDateTimestamp: number;
  transferFeeRaw?: TransferFeeRaw;
}

export interface TransferPlayer {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  position: string;
  jerseyNumber?: string | number;
  userCount?: number;
  gender?: string;
  sofascoreId?: string;
  firstName?: string;
  lastName?: string;
  fieldTranslations?: FieldTranslations;
}

export interface TransferFeeRaw {
  value: number;
  currency: string;
}
