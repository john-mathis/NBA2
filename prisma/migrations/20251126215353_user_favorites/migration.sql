/*
  Warnings:

  - The `teams` column on the `UserFavorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `players` column on the `UserFavorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserFavorites" DROP COLUMN "teams",
ADD COLUMN     "teams" INTEGER[],
DROP COLUMN "players",
ADD COLUMN     "players" INTEGER[];
