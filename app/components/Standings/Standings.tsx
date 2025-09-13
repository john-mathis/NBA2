"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../utils/axios-utils";
import headers from "../../utils/axios-utils";

async function getStandings() {
  const response = await axios.get(
    "https://sports-information.p.rapidapi.com/nba/standings",
    {
      params: { year: "2024", group: "league" },
      headers: headers,
    }
  );
  return await response.data;
}

const fetchStandings = () => {
  return request({ url: "/standings" });
};

export default function Standings() {
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["team"],
    queryFn: () => getStandings(),
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return "Loading...";
  if (isFetching) return "Fetching...";

  // console.log(data.standings.entries);
  // console.log(data.standings.entries);
  const td1 = data.standings.entries;
  // .sort((a: any, b: any) => b.stats[14].value - a.stats[14].value)

  const sortedStandings = [...(data?.standings?.entries ?? [])].sort(
    (a, b) => a.stats[14].value - b.stats[14].value
  );

  return (
    <div className="flex w-full flex-wrap bg-blue-500">
      {sortedStandings.map((td) => {
        return (
          <div key={td.team.id} className="flex flex-col border">
            <p>{" " + td.team.displayName}</p>
            <p>{(td.stats[14].value * 100).toFixed(2) + "%"}</p>
            <p>{" " + td.stats[16].displayValue}</p>
          </div>
        );
      })}
    </div>
  );
}

// {td1.map((td: any, ind: any) => {
//         const nums = td.stats[14].value;
//         // const mack = nums.sort((a: number, b: number) => a - b);
//         return (
//           <div key={td.team.id}>
//             {td.stats[14].value}
//             {" " + td.team.displayName}
//             {" " + td.stats[16].displayValue}
//           </div>
//         );
//       })}
