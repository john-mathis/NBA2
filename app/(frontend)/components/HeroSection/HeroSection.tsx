// app/components/Hero.tsx
"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const userAuthenticated = useAppSelector(
    (user) => user.authUser.isAuthenticated
  );
  const user = useAppSelector((user) => user?.authUser?.user?.username);

  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Cinematic Background */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <p className="uppercase tracking-[0.25em] text-gray-400 mb-6 text-sm sm:text-base">
          Think. Feel. The Game.
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          Experience
          <span
            className="bg-gradient-to-r from-[#ff1e1e] via-[#ff3b3b] to-[#d41414] bg-clip-text text-transparent text-shadow-2xs
"
          >
            {` Basketball`}
          </span>
          <br className="hidden sm:block" />
          <span className="text-gray-100"> Through Data.</span>
        </h1>

        <p className="text-gray-400 text-md sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Real-time stats, shot charts, and analytics visualized like never
          before. Built for those who see more than the score — who see the
          story in every play.
        </p>

        <div className="flex justify-center gap-4">
          {userAuthenticated ? (
            <>
              <p className="text-neutral-400 text-lg sm:text-xl mt-4">
                Let’s see what the numbers say tonight.
              </p>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#ff1e1e] to-[#b31313] hover:opacity-90 font-semibold px-8 py-3 rounded-xl transition-all shadow-[0_0_30px_rgba(255,30,30,0.35)]"
              >
                Sign up →
              </Link>
              <Link
                href="/about"
                className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3 rounded-xl transition-all backdrop-blur-sm"
              >
                Learn More
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Subtle Glow */}
      <div className="absolute bottom-0 w-[600px] h-[600px] bg-[#ff1e1e]/30 blur-[180px] rounded-full opacity-40" />
    </section>
  );
}
