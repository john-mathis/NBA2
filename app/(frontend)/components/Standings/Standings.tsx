"use client";
import { useQuery } from "@tanstack/react-query";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";

async function getStandings() {
  const res = await internalAPI.get("/api/standings");
  return res.data;
}

export default function Standings() {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["standings"],
    queryFn: getStandings,
    staleTime: 5 * 60 * 1000,
  });

  console.log(data);

  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load standings.
      </p>
    );
  if (isPending)
    return (
      <p className="text-center text-neutral-400 mt-10">Loading standings...</p>
    );

  const sorted = [...(data?.standings?.entries ?? [])].sort(
    (a, b) => b.stats[14].value - a.stats[14].value
  );

  return (
    <section className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 border-b border-neutral-300 dark:border-neutral-700 pb-2">
        NBA Standings
      </h1>

      {isFetching && (
        <p className="text-neutral-400 text-sm mb-4">Updating...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sorted.map((t: any, idx: number) => (
          <div
            key={t.team.id}
            className="flex flex-col items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:border-red-500 transition-colors"
          >
            <p className="text-sm text-neutral-400">#{idx + 1}</p>
            <p className="font-semibold text-lg mb-1">{t.team.displayName}</p>
            <p className="text-sm">
              Win %: {(t.stats[14].value * 100).toFixed(2)}%
            </p>
            <p className="text-sm text-neutral-400">
              Record: {t.stats[16].displayValue}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
