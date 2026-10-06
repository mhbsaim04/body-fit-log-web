import Image from "next/image";
import Link from "next/link";
import { Flame, Star, Timer } from "lucide-react";
import { Workout } from "@/shared/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="card-hover group overflow-hidden rounded-[22px] border border-[#27302a] bg-[#111512]"
    >
      <div className="relative aspect-[1.15/0.85] overflow-hidden bg-[#161b18]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              {group}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="display-font line-clamp-2 text-2xl uppercase leading-[0.95] tracking-tight text-white">{workout.name}</h3>
        <p className="mt-3 truncate text-xs font-medium text-[#89928c]">{workout.equipment}</p>
        <div className="mt-5 flex items-center gap-4 text-xs font-bold text-[#9ea69f]">
          <span className="inline-flex items-center gap-1.5"><Timer className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration} min</span>
          <span className="inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.caloriesBurned} kcal</span>
          <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
