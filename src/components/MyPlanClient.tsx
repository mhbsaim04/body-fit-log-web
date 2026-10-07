"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, Clock3, Eye, Flame, Trash2, Star } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/fitlog";

const MyPlanClient = () => {
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const { plan, saved, totalMinutes, totalCalories, removeFromPlan, markAsDone, removeSaved, hydrated } = useFitLog();

  if (!hydrated) {
    return (
      <main className="container-fitlog py-16">
        <div className="mx-auto max-w-xl">
          <div className="h-3 w-28 animate-pulse rounded bg-[#242c26]" />
          <div className="mt-4 h-12 w-72 animate-pulse rounded bg-[#242c26]" />
          <div className="mt-8 h-32 animate-pulse rounded-[22px] bg-[#111512]" />
        </div>
      </main>
    );
  }

  const activeList = tab === "plan" ? plan : saved;

  return (
    <main className="container-fitlog py-10 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ccff00]">Daily Log</p>
          <h1 className="display-font mt-2 text-5xl uppercase leading-none sm:text-6xl">My Plan</h1>
          <p className="mt-3 text-sm text-[#8f9891]">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <Link href="/#library" className="inline-flex items-center justify-center rounded-full border border-[#344034] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:border-[#ccff00]/40">Browse Workouts</Link>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        <MetricCard label="Exercises" value={plan.length} />
        <MetricCard label="Minutes" value={totalMinutes} />
        <MetricCard label="Calories" value={totalCalories} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-[#242c26]">
        {([
          ["plan", "Today's Plan"],
          ["saved", "Saved"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`border-b-2 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] ${tab === value ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-[#788178]"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-7 space-y-4">
        {activeList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#303a31] bg-[#111512] px-6 py-16 text-center">
            <p className="display-font text-3xl uppercase text-white">Nothing Here Yet</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8f9891]">Browse the library and add a lift to get today moving.</p>
            <Link href="/#library" className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0b0d0c]">Go to workouts</Link>
          </div>
        ) : (
          activeList.map((workout) => (
            <div key={workout.id} className="rounded-[22px] border border-[#27302a] bg-[#111512] p-4 sm:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative h-24 w-full overflow-hidden rounded-xl border border-[#242d27] bg-[#0f130f] md:h-20 md:w-28">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="display-font text-2xl uppercase leading-none text-white">{workout.name}</h2>
                    {tab === "plan" && "done" in workout && workout.done ? (
                      <span className="rounded-full bg-lime-300/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#ccff00]">Done</span>
                    ) : null}
                  </div>
                  <p className="mt-2 truncate text-xs text-[#8b948d]">{workout.equipment}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] font-bold text-[#9aa39c]">
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration} min</span>
                    <span className="inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.caloriesBurned} kcal</span>
                    <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" /> {workout.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link href={`/workouts/${workout.id}`} className="inline-flex items-center gap-2 rounded-full border border-[#334035] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white hover:border-[#ccff00]/40">
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </Link>

                  {tab === "plan" ? (
                    <button
                      onClick={() => {
                        if ("done" in workout && !workout.done) {
                          markAsDone(workout.id);
                          toast.success("Workout marked as done");
                        }
                      }}
                      disabled={"done" in workout && workout.done}
                      className="inline-flex items-center gap-2 rounded-full border border-[#334035] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Check className="h-3.5 w-3.5" /> {"done" in workout && workout.done ? "Completed" : "Mark as Done"}
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      if (tab === "plan") {
                        removeFromPlan(workout.id);
                        toast.success("Removed from today's plan");
                      } else {
                        removeSaved(workout.id);
                        toast.success("Removed from saved");
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-red-300 hover:border-red-300/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[20px] border border-[#27302a] bg-[#111512] p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#737e76]">{label}</p>
      <p className="display-font mt-2 text-4xl text-white">{value}</p>
    </div>
  );
}

export default MyPlanClient;