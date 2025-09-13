"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Team {
  team: {
    id: string;
    displayName: string;
  };
}

async function getTeams() {
  const response = await axios.get(
    "https://sports-information.p.rapidapi.com/nba/team-list",
    {
      headers: {
        "x-rapidapi-key": "2ca63158damsh7d1d8b2476028f6p18ebc1jsnc3f7cbc89314",
        "x-rapidapi-host": "sports-information.p.rapidapi.com",
      },
    }
  );
  return response.data;
}
const RQTeamsList = () => {
  const { isPending, isFetching, data, error } = useQuery({
    queryKey: ["getTeamsData"],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occured" + error.message;

  const teams = data.sports[0].leagues[0].teams;

  return (
    <>
      {isFetching ? (
        <p>"Updating"...</p>
      ) : (
        teams.map((td: Team) => {
          return (
            <div key={td.team.id}>
              <Link href={`/Teams/${td.team.id}`}>{td.team.displayName}</Link>
            </div>
          );
        })
      )}
    </>
  );
};

export default RQTeamsList;
