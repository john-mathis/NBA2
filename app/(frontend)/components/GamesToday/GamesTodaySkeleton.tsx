import { motion } from "framer-motion";

export default function GamesTodaySkeleton(gamesLength: any) {
  return (
    <div className="w-full text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="pt-12 overflow-x-auto w-full scrollbar-hide">
          <div className="flex gap-4 px-4 py-3 w-max">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] shrink-0 rounded-md border border-neutral-300 bg-white shadow-sm overflow-hidden text-sm text-black animate-pulse"
              >
                <div className="px-3 pt-2">
                  <div className="h-3 w-20 bg-neutral-200 rounded"></div>
                </div>

                <div className="px-3 py-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-neutral-200 rounded-full"></div>
                      <div className="h-3 w-20 bg-neutral-200 rounded"></div>
                    </div>
                    <div className="h-3 w-6 bg-neutral-200 rounded"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-neutral-200 rounded-full"></div>
                      <div className="h-3 w-20 bg-neutral-200 rounded"></div>
                    </div>
                    <div className="h-3 w-6 bg-neutral-200 rounded"></div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-1.5">
                  <div className="h-3 w-12 bg-neutral-200 rounded mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
