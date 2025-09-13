"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { log } from "console";
import { useParams } from "next/navigation";

// app/teams/[id]/page.tsx

// type TeamDetail = {
//   id: string;
//   displayName: string;
//   venue: string;
//   logo: string;
//   // add fields you need
// };

async function getTeams(id: string) {
  const response = await axios.get(
    `https://sports-information.p.rapidapi.com/nba/team-players/${id}`,
    {
      // params: { teamId: id },
      headers: {
        "x-rapidapi-key": "2ca63158damsh7d1d8b2476028f6p18ebc1jsnc3f7cbc89314",
        "x-rapidapi-host": "sports-information.p.rapidapi.com",
      },
    }
  );
  return response.data;
}
export default function page() {
  const params = useParams<{ TeamId: string }>();
  const teamId = params.TeamId;

  const { data, isFetching, error } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeams(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    placeholderData: (p) => p, // keep previous data during id changes
  });

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading</p>;

  console.log(data);
  const mack = data.team.athletes;
  console.log();
  return (
    <>
      <p>
        <strong>{data.team.displayName}</strong>
      </p>
      {mack.map((da: any) => {
        return (
          <div key={da.id}>
            <p>{da.fullName}</p>
          </div>
        );
      })}
    </>
  );
}
