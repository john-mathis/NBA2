// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

// const prisma = new PrismaClient();
export async function toggleTeamFavorite(
  userId: number,
  teamId: number | string
) {
  const id = Number(teamId); // normalize value ONCE

  let favorites = await prisma.userFavorites.findUnique({
    where: { userId },
  });

  if (!favorites) {
    favorites = await prisma.userFavorites.create({
      data: { userId, teams: [id] },
    });
  }

  const exists = favorites.teams.includes(id);

  const updatedTeams = exists
    ? favorites.teams.filter((t) => t !== id) // NOW correct
    : [...favorites.teams, id];

  const updated = await prisma.userFavorites.update({
    where: { userId },
    data: { teams: updatedTeams },
  });

  return updated.teams;
}
