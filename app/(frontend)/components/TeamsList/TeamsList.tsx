"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import { Star } from "lucide-react";
import { useAppSelector } from "@/app/redux/hooks";

export default function TeamsList() {
  const isAuthenticated = useAppSelector((s) => s.authUser.isAuthenticated);
  const queryClient = useQueryClient();

  // 1) Load favorites from server
  const { data: userFavorites } = useQuery({
    queryKey: ["userFavorites"],
    queryFn: async () => {
      const res = await internalAPI.get("/api/userTeamFavorites");
      return res.data; // { teams: number[] }
    },
    enabled: isAuthenticated,
  });

  const favorites: number[] = userFavorites?.teams?.map(Number) ?? [];

  // 2) Toggle mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (teamId: number) => {
      const res = await internalAPI.post("/api/userTeamFavoritesToggle", {
        teamId,
      });

      return res.data; // { updatedTeams: number[] }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userFavorites"], (old: any) => ({
        ...(old ?? {}),
        teams: data.updatedTeams.map(Number),
      }));
    },
  });

  function addToFavorites(teamId: number) {
    toggleFavoriteMutation.mutate(teamId);
  }

  // 3) Load teams
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await internalAPI.get("/api/teamslist");
      return res.data;
    },
    staleTime: 500 * 60 * 1000,
    retry: 2,
  });

  const teams = data?.sports?.[0]?.leagues?.[0]?.teams;
  console.log(data);

  if (isLoading)
    return (
      <p className="text-neutral-400 text-center mt-10">Loading teams...</p>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load teams.</p>
    );

  return (
    <section className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 border-b border-neutral-300 dark:border-neutral-700 pb-2">
        NBA Teams
      </h1>

      {isFetching && (
        <p className="text-neutral-400 text-sm mb-4">Updating...</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-auto max-w-[120rem]">
        {teams?.map((td: any) => (
          <div key={td.team.id} className="relative">
            {isAuthenticated && (
              <Star
                fill={
                  favorites.includes(Number(td.team.id)) ? "yellow" : "none"
                }
                className="absolute z-20 right-2 top-2 h-5 hover:text-yellow-500 cursor-pointer"
                onClick={() => addToFavorites(Number(td.team.id))}
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
      </div>
    </section>
  );
}
