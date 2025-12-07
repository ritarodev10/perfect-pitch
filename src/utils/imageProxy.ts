/**
 * Route images through our proxy to avoid host-level blocks
 * that can occur on Vercel when the browser requests Sofascore
 * assets directly. The proxy adds browser-like headers and
 * keeps caching centralized.
 */
export function getImageProxyUrl(imageUrl: string): string {
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}

/**
 * Generate a proxy URL for a team image
 */
export function getTeamImageUrl(teamId: number): string {
  const imageUrl = `https://api.sofascore.app/api/v1/team/${teamId}/image`;
  return getImageProxyUrl(imageUrl);
}

/**
 * Generate a proxy URL for a player image
 */
export function getPlayerImageUrl(playerId: number): string {
  const imageUrl = `https://api.sofascore.app/api/v1/player/${playerId}/image`;
  return getImageProxyUrl(imageUrl);
}
