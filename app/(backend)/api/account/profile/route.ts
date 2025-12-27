import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { getUserFromToken } from "../../utils/authenticateUser";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export async function PATCH(request: NextRequest) {
  const req = await request.json();
  const userEmail = req.email;
  const username = req.username;

  const user = await getUserFromToken(JWT_ACCESS_SECRET);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (userEmail !== "") {
    try {
      const checkEmail = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (checkEmail) {
        return NextResponse.json({ message: "Email taken" }, { status: 404 });
      }

      const updateUserInfo = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: userEmail,
        },
      });
    } catch {
      return NextResponse.json(
        { message: "Email can not be blank." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Email successfully changed" },
      { status: 200 }
    );
  }

  if (username !== "") {
    try {
      const checkUsername = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (checkUsername) {
        return NextResponse.json(
          { message: "username taken" },
          { status: 404 }
        );
      }

      const updateUserInfo = await prisma.user.update({
        where: { id: user.id },
        data: {
          username: username,
        },
      });
    } catch {
      return NextResponse.json(
        { message: "Username can not be blank." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Username successfully changed." },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "You're goated" });
}
