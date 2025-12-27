import { NextRequest, NextResponse } from "next/server";
import { externalAPI } from "@/app/(backend)/api/utils/axios-external";
import { requireUserId } from "@/app/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requiredUserId = await requireUserId();

  if (!requiredUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const team = await params.id;
  const response = await externalAPI.get(`team-players/${team}`);

  return NextResponse.json(response.data);
}
