import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const favoriteTeams = await prisma;
  return NextResponse.json({ message: "GG" });
}
