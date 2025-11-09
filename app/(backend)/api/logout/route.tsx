import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest, response: NextResponse) {
  const cookieStore = await cookies();

  cookieStore.delete({ name: "refreshToken" });
  cookieStore.delete({ name: "accessToken" });

  return NextResponse.json(
    { message: "Sucessfully signed out" },
    { status: 200 }
  );
}
