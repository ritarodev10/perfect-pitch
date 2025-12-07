import { NextRequest, NextResponse } from "next/server";
import { getMatchIncidents } from "@/data/sofascore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });
  }

  try {
    const incidents = await getMatchIncidents(Number(matchId), {
      components: ["UpcomingMatchCard"],
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Failed to fetch match incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch match incidents" },
      { status: 500 }
    );
  }
}


