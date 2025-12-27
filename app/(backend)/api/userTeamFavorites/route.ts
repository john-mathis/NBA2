import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireUserId } from "@/app/lib/auth";

export async function GET() {
  let userId: number;
  try {
    userId = await requireUserId();
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const favorites = await prisma.userFavorites.findUnique({
    where: { userId },
  });

  // Always return a predictable shape
  return NextResponse.json({
    teams: favorites?.teams ?? [],
    players: favorites?.players ?? [],
  });
}
