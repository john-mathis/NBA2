"use client";
import axios from "axios";

const page = () => {
  const getTeams = async () => {
    const response = await axios.get(
      "https://sports-information.p.rapidapi.com/nba/team-statistics",
      {
        params: { teamId: "1" },
        headers: {
          "x-rapidapi-key":
            "2ca63158damsh7d1d8b2476028f6p18ebc1jsnc3f7cbc89314",
          "x-rapidapi-host": "sports-information.p.rapidapi.com",
        },
      }
    );
    console.log(response.data.stats.categories[1].stats[8].value);
  };
  getTeams();
  return <div onClick={getTeams}>Teams</div>;
};

export default page;
