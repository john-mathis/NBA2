// lib/auth.ts
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

interface AccessTokenPayload extends JwtPayload {
  id: number;
  username: string;
}

export async function requireUserId(): Promise<number> {
  const cookieStore = await cookies();

  // This is the cookie you set in login
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("UNAUTHENTICATED");
  }

  let payload: AccessTokenPayload;

  try {
    payload = jwt.verify(token, JWT_ACCESS_SECRET) as AccessTokenPayload;
  } catch {
    // token missing, expired, or invalid signature
    throw new Error("UNAUTHENTICATED");
  }

  if (typeof payload.id !== "number") {
    throw new Error("INVALID_USER_ID");
  }

  return payload.id;
}
