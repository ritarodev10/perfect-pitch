/**
 * Route images through the Cloudflare Worker proxy (RapidAPI source).
 * The worker expects query params:
 *   - type: "team" | "player"
 *   - id:   numeric team/player id
 */
const CLOUDFLARE_IMAGE_PROXY_BASE =
  process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_PROXY_BASE ??
  "https://orange-cherry-dca8.ritarodev.workers.dev";

/**
 * Generate a proxy URL for a team image
 */
export function getTeamImageUrl(teamId: number): string {
  const url = new URL(CLOUDFLARE_IMAGE_PROXY_BASE);
  url.searchParams.set("type", "team");
  url.searchParams.set("id", String(teamId));
  return url.toString();
}

/**
 * Generate a proxy URL for a player image
 */
export function getPlayerImageUrl(playerId: number): string {
  const url = new URL(CLOUDFLARE_IMAGE_PROXY_BASE);
  url.searchParams.set("type", "player");
  url.searchParams.set("id", String(playerId));
  return url.toString();
}
