import { Workout } from "@/shared/types";

const API_ENDPOINTS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getWorkouts(): Promise<Workout[]> {
  let lastError: unknown = null;

  for (const endpoint of API_ENDPOINTS) {
    try {
      return await fetchJson<Workout[]>(endpoint);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Unable to load workouts.");
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return null;
  }

  for (const endpoint of API_ENDPOINTS) {
    try {
      return await fetchJson<Workout>(`${endpoint}/${numericId}`);
    } catch {
      try {
        const all = await fetchJson<Workout[]>(endpoint);
        return all.find((workout) => workout.id === numericId) ?? null;
      } catch {
        continue;
      }
    }
  }

  return null;
}
