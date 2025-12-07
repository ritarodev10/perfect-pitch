/**
 * Utility function to get direct image URLs from api.sofascore.app
 * Using direct URLs since the API works when accessed directly
 */
export function getImageProxyUrl(imageUrl: string): string {
  // Return direct URL - works in both dev and production
  return imageUrl;
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
