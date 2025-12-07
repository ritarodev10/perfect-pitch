import { NextRequest, NextResponse } from "next/server";
import { getMatchDetail } from "@/data/sofascore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });
  }

  try {
    const matchDetail = await getMatchDetail(Number(matchId), {
      components: ["UpcomingMatchCard"],
    });

    return NextResponse.json(matchDetail);
  } catch (error) {
    console.error("Match detail API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch match detail",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
