"use client";

import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import { getDateParams } from "@/app/lib/getDateParams";
import { useQuery } from "@tanstack/react-query";
import GamesTodaySkeleton from "./GamesTodaySkeleton";

async function getGamesToday() {
  const params = getDateParams();
  const response = await internalAPI.get("/api/gamestoday", { params });
  return response.data;
}

export function GamesToday() {
  const { data, isFetching, isPending, error } = useQuery({
    queryKey: ["gamestoday"],
    queryFn: getGamesToday,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const getTimeWithZone = (str: any) => {
    const match = str?.match(/\d{1,2}:\d{2}\s?[AP]M\s?[A-Z]{2,4}/);
    return match ? match[0] : "";
  };

  // Handle loading, error, and missing data
  if (error)
    return <div className="text-center text-red-500">Error loading games</div>;

  if (isPending || isFetching || !data) {
    return <GamesTodaySkeleton />;
  }

  const first: any = Object.values(data)?.[0];
  if (!first || !first.games)
    return <div className="text-center">No games available</div>;

  const games = first.games;

  return (
    <div className="w-full text-white ">
      <div className="pt-12 overflow-x-auto w-full scrollbar-hide">
        <div className="flex gap-4 px-4 py-3 w-max">
          {games.map((stats: any) => {
            const isLive = stats.status?.type?.state === "in";
            const final = stats.status.type.state === "post";
            const competitors = stats.competitions?.[0]?.competitors || [];
            const clock =
              stats.status?.type?.shortDetail?.match(/\d{1,2}:\d{2}/)?.[0];
            const period = stats.status?.period
              ? `Q${stats.status.period}`
              : "";

            return (
              <div
                key={stats.id}
                className="min-w-[220px] shrink-0 rounded-md border border-neutral-300 bg-white shadow-sm overflow-hidden text-sm text-black flex flex-col justify-between"
              >
                {/* Header */}
                <div className="px-3 pt-2 pb-1 text-center font-semibold text-neutral-900">
                  {isLive ? (
                    <>
                      <p className="text-red-500 uppercase text-xs font-bold">
                        Live
                      </p>
                      <p className="text-xs text-neutral-800">
                        {clock ? `${clock} ${period}` : period || "In Progress"}
                      </p>
                    </>
                  ) : (
                    <p className="text-neutral-900">
                      {getTimeWithZone(stats.status?.type?.shortDetail)}
                    </p>
                  )}

                  {final ? (
                    <>
                      <p className="text-red-500 uppercase text-xs font-bold">
                        Final
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {/* Teams */}
                <div className="px-3 flex flex-col gap-2 pb-2">
                  {competitors.map((team: any, i: number) => (
                    <div
                      key={team?.team?.id || i}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={team?.team?.logo}
                          alt={team?.team?.name || `Team ${i + 1}`}
                          className="h-5 w-5 object-contain"
                        />
                        <span className="text-neutral-900 truncate max-w-[100px]">
                          {team?.team?.name || "TBD"}
                        </span>
                      </div>

                      <div className="flex flex-col items-end leading-tight">
                        {isLive ? (
                          <span className="font-semibold text-neutral-900 text-sm">
                            {team?.score}
                          </span>
                        ) : (
                          ""
                        )}

                        {final ? (
                          <span className="font-semibold text-neutral-900 text-sm">
                            {team?.score}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-neutral-600 text-[10px]">
                          {team?.records?.[0]?.summary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-1.5 text-center text-[11px] font-medium text-neutral-800">
                  {stats.competitions?.[0]?.broadcasts?.[0]?.names?.[0] ||
                    "TBD"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
