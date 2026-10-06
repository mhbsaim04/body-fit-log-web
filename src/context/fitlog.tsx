"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PlannedWorkout, Workout } from "@/shared/types";

interface FitLogContextValue {
  plan: PlannedWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => "added" | "duplicate" | "limit";
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  saveForLater: (workout: Workout) => "saved" | "duplicate";
  removeSaved: (id: number) => void;
  planCount: number;
  savedCount: number;
  totalMinutes: number;
  totalCalories: number;
  hydrated: boolean;
}

const FitLogContext = createContext<FitLogContextValue | undefined>(undefined);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const planRaw = window.localStorage.getItem(PLAN_KEY);
      const savedRaw = window.localStorage.getItem(SAVED_KEY);

      if (planRaw) {
        const parsedPlan = JSON.parse(planRaw) as PlannedWorkout[];
        setPlan(Array.isArray(parsedPlan) ? parsedPlan.filter(Boolean) : []);
      }

      if (savedRaw) {
        const parsedSaved = JSON.parse(savedRaw) as Workout[];
        setSaved(Array.isArray(parsedSaved) ? parsedSaved.filter(Boolean) : []);
      }
    } catch {
      window.localStorage.removeItem(PLAN_KEY);
      window.localStorage.removeItem(SAVED_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [hydrated, plan]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [hydrated, saved]);

  const value = useMemo<FitLogContextValue>(() => {
    return {
      plan,
      saved,
      hydrated,
      planCount: plan.length,
      savedCount: saved.length,
      totalMinutes: plan.reduce((sum, item) => sum + item.duration, 0),
      totalCalories: plan.reduce((sum, item) => sum + item.caloriesBurned, 0),
      addToPlan: (workout) => {
        if (plan.some((item) => item.id === workout.id)) {
          return "duplicate";
        }

        if (plan.length >= 5) {
          return "limit";
        }

        setPlan((current) => [...current, { ...workout, done: false }]);
        return "added";
      },
      removeFromPlan: (id) => {
        setPlan((current) => current.filter((item) => item.id !== id));
      },
      markAsDone: (id) => {
        setPlan((current) =>
          current.map((item) =>
            item.id === id ? { ...item, done: true } : item,
          ),
        );
      },
      saveForLater: (workout) => {
        if (saved.some((item) => item.id === workout.id)) {
          return "duplicate";
        }

        setSaved((current) => [...current, workout]);
        return "saved";
      },
      removeSaved: (id) => {
        setSaved((current) => current.filter((item) => item.id !== id));
      },
    };
  }, [hydrated, plan, saved]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider.");
  }

  return context;
}
