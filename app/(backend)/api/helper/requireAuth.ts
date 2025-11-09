import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function requireAuth(): Promise<object | NextResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return NextResponse.json({ message: "No access token" }, { status: 401 });
  }
  return accessToken;
}

export { requireAuth };
