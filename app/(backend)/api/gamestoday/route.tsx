import { NextRequest, NextResponse } from "next/server";
import { externalAPI } from "../utils/axios-external";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const day = searchParams.get("day");
  try {
    const response = await externalAPI.get("/schedule", {
      params: { year: year, month: month, day: day },
    });
    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
