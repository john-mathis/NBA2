import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromToken(secret: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;
  try {
    return jwt.verify(accessToken, secret) as { username: string; id: number };
  } catch {
    return null;
  }
}
