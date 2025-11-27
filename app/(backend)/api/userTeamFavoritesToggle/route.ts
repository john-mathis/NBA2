import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { toggleTeamFavorite } from "@/app/lib/toggleFavorites";
import { requireUserId } from "@/app/lib/auth";

const prisma = new PrismaClient();
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { teamId } = await req.json();

  const userId = await requireUserId();
  const updatedTeams = await toggleTeamFavorite(userId, teamId);

  return NextResponse.json({ updatedTeams });
}
