"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/lib/types";

type SortMode = "duration" | "calories" | "rating";

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortMode>("duration");

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [sortBy, workouts]);

  return (
    <section id="library" className="container-fitlog py-16 lg:py-20">
      <SectionIntro
        title="The Library"
        description="Twelve lifts covering every major muscle group."
        action={
          <label className="relative inline-flex items-center">
            <span className="sr-only">Sort By</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortMode)}
              className="appearance-none rounded-full border border-[#2b332d] bg-[#111512] py-3 pl-4 pr-10 text-xs font-black uppercase tracking-[0.12em] text-white outline-none ring-0"
            >
              <option value="duration">Sort By · Duration</option>
              <option value="calories">Sort By · Calories</option>
              <option value="rating">Sort By · Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-[#ccff00]" />
          </label>
        }
      />

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
