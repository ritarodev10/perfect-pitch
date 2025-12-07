import { NextRequest, NextResponse } from "next/server";
import { getH2H } from "@/data/sofascore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });
  }

  try {
    const h2hData = await getH2H(Number(matchId), {
      components: ["UpcomingMatchCard"],
    });

    return NextResponse.json(h2hData);
  } catch (error) {
    console.error("Failed to fetch H2H data:", error);
    return NextResponse.json(
      { error: "Failed to fetch H2H data" },
      { status: 500 }
    );
  }
}

