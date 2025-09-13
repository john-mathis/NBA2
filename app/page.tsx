"use client";
import dynamic from "next/dynamic";

// import Standings from "./components/Standings/Standings";
const LazyStandings = dynamic(() => import("./components/Standings/Standings"));

export default function Home() {
  return (
    <div>
      {/* <Standings /> */}
      <LazyStandings />
    </div>
  );
}
