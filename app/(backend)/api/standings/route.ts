import axios from "axios";
import { NextResponse } from "next/server";
import { externalAPI } from "../utils/axios-external";
import { requireAuth } from "../helper/requireAuth";

export async function GET(): Promise<undefined | NextResponse> {
  try {
    // const accessToken = await requireAuth();
    // if (accessToken instanceof NextResponse) {
    //   return accessToken;
    // }
    const response = await externalAPI.get("/standings", {
      params: { year: "2026", group: "league" },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
  }
}
