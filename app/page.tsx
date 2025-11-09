import Hero from "./(frontend)/components/HeroSection/HeroSection";
import StatBar from "./(frontend)/components/StatBar/StatBar";
import { GamesToday } from "./(frontend)/components/GamesToday/GamesToday";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center 
    bg-[url(../public/background.png)] bg-no-repeat bg-cover bg-center"
    >
      <GamesToday />
      <Hero />
      <StatBar />
    </main>
  );
}
