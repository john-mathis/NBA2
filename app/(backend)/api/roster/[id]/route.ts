import { NextRequest, NextResponse } from "next/server";
import { externalAPI } from "@/app/(backend)/api/utils/axios-external";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const team = await params.id;
  const response = await externalAPI.get(`team-players/${team}`);

  return NextResponse.json(response.data);
}
