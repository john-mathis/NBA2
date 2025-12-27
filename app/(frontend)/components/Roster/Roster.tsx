"use client";
import { useQuery } from "@tanstack/react-query";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Loading from "../Loading/Loading";

async function getTeams(id: string) {
  const res = await internalAPI.get(`/api/roster/${id}`);
  return res.data;
}

export default function TeamRoster() {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, error } = useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeams(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: (p) => p,
  });

  if (error) return <p className="text-red-500">Error loading team</p>;
  if (!data) return <Loading />;

  const players = data?.team?.athletes ?? [];
  console.log(players);

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-8">
      <div className=" pb-3 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{data.team.displayName}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {players
          .slice()
          .sort((a: any, b: any) => {
            const numA = parseInt(a.jersey) || 0;
            const numB = parseInt(b.jersey) || 0;
            return numA - numB;
          })
          .map((p: any) => (
            <div
              key={p.id}
              className="relative bg-white text-black rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <Star className="absolute right-2 top-2 hover:text-yellow-500 cursor-pointer" />
              {/* Player Image */}
              <div className="w-full h-48 bg-neutral-100 flex justify-center items-center overflow-hidden">
                {p.headshot?.href ? (
                  <img
                    src={p.headshot.href}
                    alt={p.fullName}
                    className="h-full object-cover"
                  />
                ) : (
                  <div className="text-neutral-400 text-sm">No Image</div>
                )}
              </div>

              {/* Player Info */}
              <div className="flex items-center gap-3 p-4">
                <span className="text-4xl font-bold text-neutral-800">
                  {p.jersey ?? "-"}
                </span>
                <div>
                  <p className="text-lg font-bold leading-tight">
                    {p.fullName}
                  </p>
                  <p className="text-sm uppercase text-neutral-500">
                    {p.position?.abbreviation ?? ""}
                  </p>
                </div>
              </div>

              {/* Stats Headers */}
              <div className="border-t border-neutral-200 text-center text-sm grid grid-cols-4 py-2 font-semibold">
                <p>GP</p>
                <p>PPG</p>
                <p>APG</p>
                <p>RPG</p>
              </div>

              {/* Stat Values (placeholder) */}
              <div className="border-t border-neutral-200 text-center text-sm grid grid-cols-4 py-2 text-neutral-600">
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>-</p>
              </div>

              {/* Player Details */}
              <div className="border-t border-neutral-200 grid grid-cols-2 gap-y-1 text-sm px-4 py-3">
                <p>
                  HEIGHT{" "}
                  <span className="font-semibold">{p.displayHeight}</span>
                </p>
                <p>
                  WEIGHT{" "}
                  <span className="font-semibold">{p.displayWeight}</span>
                </p>
                <p>
                  AGE <span className="font-semibold">{p.age ?? "-"}</span>
                </p>
                <p>
                  YEARS PRO{" "}
                  <span className="font-semibold">
                    {p.experience?.years ? p.experience?.years : "Rookie"}
                  </span>
                </p>
                <p>
                  COUNTRY{" "}
                  <span className="font-semibold">
                    {p.birthPlace.country ?? "-"}
                  </span>
                </p>
              </div>

              {/* Bottom Buttons */}
              <div className="border-t border-neutral-200 flex justify-between items-center px-4 py-2 text-sm text-neutral-700">
                <button className="flex items-center gap-1 hover:text-neutral-900 transition">
                  <span>Bio</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-1 hover:text-neutral-900 transition">
                  <span>Shop</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v1m0 14v1m8-8h1M4 12H3m15.364-7.364l.707.707M5.636 18.364l-.707.707m0-13.071l.707.707M18.364 18.364l.707.707"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
