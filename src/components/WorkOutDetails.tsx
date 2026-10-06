import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flame, Gauge, Layers3, Star, Timer } from "lucide-react";
import { Workout } from "@/lib/types";
import DetailActions from "@/components/DetailActions";

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  return (
    <main className="container-fitlog py-8 lg:py-12">
      <Link href="/#library" className="mb-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#8f9891] hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Link>

      <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#27302a] bg-[#111512] lg:min-h-[690px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#0b0d0c]">
                {group}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#27302a] bg-[#111512] p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ccff00]">Workout Details</p>
          <h1 className="display-font mt-3 text-5xl uppercase leading-[0.9] text-white sm:text-6xl">{workout.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#97a098]">{workout.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full border border-[#354035] bg-[#0e120f] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                {group}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {([
              ["Equipment", workout.equipment, Gauge],
              ["Difficulty", workout.difficulty, Layers3],
              ["Sets", String(workout.sets), Layers3],
              ["Reps", workout.reps, Layers3],
              ["Duration", `${workout.duration} min`, Timer],
              ["Calories", `${workout.caloriesBurned} kcal`, Flame],
              ["Rating", workout.rating.toString(), Star],
            ] as const).map(([label, value, SpecIcon]) => (
              <div key={label} className="rounded-2xl border border-[#283129] bg-[#0e120f] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.17em] text-[#707b73]">{label}</span>
                  <SpecIcon className="h-3.5 w-3.5 text-[#ccff00]" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <h2 className="display-font text-2xl uppercase tracking-tight text-white">Instructions</h2>
            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={`${workout.id}-${index}`} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#394239] text-xs font-black text-[#ccff00]">{index + 1}</span>
                  <p className="pt-1 text-sm leading-6 text-[#98a09a]">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <DetailActions workout={workout} />
        </div>
      </section>
    </main>
  );
}
