/**
 * Types for SofaScore `GET /teams/get-logo` payload.
 *
 * Brief: response is binary image data (e.g., PNG) for the given teamId; read
 * as ArrayBuffer/Blob from fetch.
 */

/**
 * Query parameters for the logo endpoint.
 * Retrieval hints:
 * - teamId (required): Returned by endpoints such as `/teams/search`, `/matches/detail` (team references), or tournament/team listings.
 */
export interface GetTeamLogoParams {
  teamId: number;
}

/**
 * The logo response is binary image data.
 * For fetch, treat as ArrayBuffer/Blob depending on how you consume it.
 */
export type GetTeamLogoResponse = ArrayBuffer; // or Blob, depending on consumer
