import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const decoded: any = jwt.verify(accessToken, JWT_ACCESS_SECRET);

    const user = await prisma.user.findUnique({
      where: { username: decoded.username },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) return NextResponse.json({ user: null }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
