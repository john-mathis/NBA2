import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, email, password, confirmPassword } = await req.json();

  if (!username || !email || !password || !confirmPassword) {
    return NextResponse.json({ message: "Missing fields" }, { status: 401 });
  }

  const checkUsername = await prisma.user.findUnique({
    where: { username: username },
  });

  if (checkUsername) {
    return NextResponse.json(
      {
        message: "Username already exists. Please try another",
      },
      { status: 401 }
    );
  }

  const checkEmail = await prisma.user.findUnique({ where: { email: email } });

  if (checkEmail) {
    return NextResponse.json(
      {
        message:
          "Email already exists. Select forgot password if you need help logging in",
      },
      { status: 401 }
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await prisma.user.create({
    data: { username: username, email: email, password: hashPassword },
  });

  const accessToken = jwt.sign({ username: username }, JWT_ACCESS_SECRET, {
    expiresIn: "30min",
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  // const storeRefreshToken = await prisma.user.create({data:{refreshToken:}})

  return NextResponse.json({ message: "Sign up successful" }, { status: 200 });
}
