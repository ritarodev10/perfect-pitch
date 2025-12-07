import { NextRequest, NextResponse } from "next/server";

/**
 * Image proxy route to fetch images from external APIs
 * This avoids CORS issues and allows Next.js to properly optimize images
 */

// Configure route to be dynamic and allow external requests
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("Missing image URL", { status: 400 });
    }

    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(imageUrl);

    // Validate that the URL is from api.sofascore.app
    let url: URL;
    try {
      url = new URL(decodedUrl);
    } catch (error) {
      console.error("Invalid URL format:", decodedUrl, error);
      return new NextResponse("Invalid URL format", { status: 400 });
    }

    if (url.hostname !== "api.sofascore.app") {
      console.error("Invalid hostname:", url.hostname);
      return new NextResponse("Invalid image source", { status: 400 });
    }

    // Fetch the image from the external API
    // Use browser-like headers to avoid 403 Forbidden errors
    const response = await fetch(decodedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.sofascore.com/",
        Origin: "https://www.sofascore.com",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Image fetch failed:", response.status, decodedUrl);
      return new NextResponse("Image not found", { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/png";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse(
      `Failed to fetch image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
