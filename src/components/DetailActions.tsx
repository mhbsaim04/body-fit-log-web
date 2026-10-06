"use client";

import toast from "react-hot-toast";
import { CheckCircle2, BookmarkPlus } from "lucide-react";
import { useFitLog } from "@/context/fitlog";
import { Workout } from "@/shared/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, plan, saved } = useFitLog();
  const alreadyPlanned = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);

  const handlePlan = () => {
    const result = addToPlan(workout);
    if (result === "added") toast.success("Added to today's plan");
    if (result === "duplicate") toast("Already in today's plan");
    if (result === "limit") toast.error("Today's plan is capped at five lifts");
  };

  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "saved") toast.success("Saved for later");
    if (result === "duplicate") toast("Already saved");
  };

  return (
    <div className="flex flex-col gap-3 pt-3 sm:flex-row">
      <button
        type="button"
        onClick={handlePlan}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0b0d0c] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={alreadyPlanned}
      >
        <CheckCircle2 className="h-4 w-4" />
        {alreadyPlanned ? "In Today's Plan" : "Add to Today's Plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#394339] bg-[#151916] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#ccff00]/40 disabled:opacity-60"
        disabled={alreadySaved}
      >
        <BookmarkPlus className="h-4 w-4" />
        {alreadySaved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
