import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, password } = await req.json();

  const checkUsername = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!checkUsername) {
    return NextResponse.json(
      { message: "Username could not be found" },
      { status: 401 }
    );
  }

  const checkPassword = await bcrypt.compare(password, checkUsername.password);

  if (!checkPassword) {
    return NextResponse.json(
      { message: "Password is incorrect" },
      { status: 401 }
    );
  }

  const accessToken = jwt.sign(
    { username: username, id: checkUsername.id },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "30min",
    }
  );

  const refreshToken = jwt.sign(
    { username: username, id: checkUsername.id },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Create session in DB
  await prisma.session.create({
    data: {
      userId: checkUsername.id,
      refreshToken: refreshToken,
      // Expires 7d from now
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 30,
  });

  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  const sendUser = {
    username: checkUsername.username,
    email: checkUsername.email,
    id: checkUsername.id,
    role: checkUsername.role,
    createdAt: checkUsername.createdAt,
  };

  return NextResponse.json({ user: sendUser }, { status: 200 });
}
