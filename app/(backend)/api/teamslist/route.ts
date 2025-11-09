import axios from "axios";
import { NextResponse } from "next/server";
import { externalAPI } from "@/app/(backend)/api/utils/axios-external";
import { requireAuth } from "../helper/requireAuth";
export async function GET() {
  try {
    // const accessToken = await requireAuth();
    // if (accessToken instanceof NextResponse) {
    //   return accessToken;
    // }
    const response = await externalAPI.get(`/team-list`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        error: error.message,
        status: error.status,
      });
    }
  }
}
