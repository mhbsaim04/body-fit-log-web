import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#070908]">
      <div className="container-fitlog flex flex-col gap-4 py-8 text-xs text-[#89928c] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 font-black tracking-[0.12em] text-white">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-lime-300/25 bg-lime-300/10">
            <Dumbbell className="h-4 w-4 text-lime-300" />
          </div>
          <span>FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
