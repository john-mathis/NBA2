"use client";

import { useQuery } from "@tanstack/react-query";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import { useAppSelector } from "@/app/redux/hooks";
import { useMemo } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function FavoriteTeams() {
  const isAuthenticated = useAppSelector((s) => s.authUser.isAuthenticated);

  const { data: userFavorites = { teams: [] } } = useQuery({
    queryKey: ["userFavorites"],
    queryFn: async () =>
      (await internalAPI.get("/api/userTeamFavorites")).data ?? [],
    enabled: isAuthenticated,
  });

  const {
    data: teamsList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => (await internalAPI.get("/api/teamslist")).data ?? [{}],
    select: (data) => data?.sports?.[0]?.leagues?.[0]?.teams,
    staleTime: 500 * 60 * 1000,
    retry: 2,
  });

  const favoriteIds = userFavorites.teams.map(Number);
  const favoritesSet = new Set(favoriteIds);

  const favoriteTeams = teamsList.filter((t: any) =>
    favoritesSet.has(Number(t.team.id))
  );

  console.log(favoriteTeams);

  if (isLoading)
    return (
      <p className="text-neutral-400 text-center mt-10">
        Loading favotie teams...
      </p>
    );

  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to Favorite Teams.
      </p>
    );

  return (
    <section className="max-h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-6 py-10">
      <h2>Favorite Teams</h2>

      {favoriteTeams?.map((td: any) => (
        <div key={td.team.id} className="relative">
          {isAuthenticated && (
            <Star
              fill={favoritesSet.has(Number(td.team.id)) ? "yellow" : "none"}
              className="absolute z-20 right-2 top-2 h-5 hover:text-yellow-500 cursor-pointer"
            />
          )}

          <Link
            href={`/roster/${td.team.id}`}
            className="relative block bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 hover:border-red-500 hover:text-red-500 transition-colors text-center text-sm font-medium"
          >
            <img
              className="m-auto"
              src={td.team.logos[1].href}
              alt={td.team.displayName + " Logo"}
              width={100}
              height={100}
            />
            {td.team.displayName}
          </Link>
        </div>
      ))}
    </section>
  );
}
