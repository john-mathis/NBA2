import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const prisma = new PrismaClient();

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();

  const getRefreshToken = cookieStore.get("refreshToken");
  const checkAccessToken = cookieStore.get("accessToken");

  if (checkAccessToken) {
    return NextResponse.json({ status: 200 });
  }

  if (!getRefreshToken?.value) {
    return NextResponse.json(
      { message: "No refresh token found" },
      { status: 401 }
    );
  }
  const verifyRefresh = Jwt.verify(
    getRefreshToken.value,
    JWT_REFRESH_SECRET
  ) as {
    username: string;
  };

  const getUserInfo = await prisma.user.findUnique({
    where: { username: verifyRefresh.username },
    select: {
      createdAt: true,
      username: true,
      id: true,
      email: true,
      role: true,
    },
  });

  const accessToken = Jwt.sign(
    { username: getUserInfo?.username, id: getUserInfo?.id },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "30min",
    }
  );

  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 30,
  });
  return NextResponse.json({ getUserInfo }, { status: 200 });
}
