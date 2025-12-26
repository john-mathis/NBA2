import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function toggleTeamFavorite(userId: number, teamId: number) {
  let favorites = await prisma.userFavorites.findUnique({
    where: { id: userId },
  });

  if (!favorites) {
    favorites = await prisma.userFavorites.create({
      data: { userId, teams: [teamId] },
    });
  }

  console.log(favorites);

  const exists = favorites.teams.includes(teamId);

  const updatedTeams = exists
    ? favorites.teams.filter((id) => id !== teamId)
    : [...favorites.teams, teamId];

  const updated = await prisma.userFavorites.update({
    where: { userId },
    data: { teams: updatedTeams },
  });

  return updated.teams;
}
