import { lazy } from "react";

const LazyStandings = lazy(
  () => import("../../components/Standings/Standings")
);

export default function Standings() {
  return <LazyStandings />;
}
