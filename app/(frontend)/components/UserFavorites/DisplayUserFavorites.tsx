"use client";

import FavoriteTeams from "./FavoriteTeams";

export default function DsiplayUserFavorites() {
  return (
    <section className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-6 py-10">
      <FavoriteTeams />
    </section>
  );
}
