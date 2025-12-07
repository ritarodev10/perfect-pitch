/**
 * Utility function to generate proxy URLs for external images
 * This avoids CORS issues when loading images from api.sofascore.app
 *
 * In development, you can set USE_DIRECT_IMAGES=true to bypass the proxy
 * and use direct URLs (useful for debugging)
 */
export function getImageProxyUrl(imageUrl: string): string {
  // Allow bypassing proxy in development for debugging
  const useDirectImages = process.env.USE_DIRECT_IMAGES === "true";

  if (useDirectImages && process.env.NODE_ENV === "development") {
    return imageUrl;
  }

  // Use absolute URL for Next.js Image component compatibility
  if (typeof window !== "undefined") {
    // Client-side: use current origin (works in both dev and production)
    return `${window.location.origin}/api/image-proxy?url=${encodeURIComponent(
      imageUrl
    )}`;
  }

  // Server-side: detect environment
  // In Vercel, use VERCEL_URL; otherwise use localhost for dev
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return `${baseUrl}/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
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
