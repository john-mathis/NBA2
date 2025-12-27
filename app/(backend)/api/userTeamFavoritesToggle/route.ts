import { NextRequest, NextResponse } from "next/server";
import { toggleTeamFavorite } from "@/app/lib/toggleTeamFavorites";
import { requireUserId } from "@/app/lib/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { teamId } = await req.json();

  const userId = await requireUserId();
  const updatedTeams = await toggleTeamFavorite(userId, teamId);

  return NextResponse.json({ updatedTeams });
}
