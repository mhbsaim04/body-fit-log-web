"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/fitlog-context";

function BrandMark() {
  return (
    <div
      aria-label="FitLog logo placeholder"
      className="grid h-9 w-9 place-items-center rounded-full border border-lime-300/30 bg-lime-300/10"
    >
      <Dumbbell className="h-4 w-4 text-lime-300" strokeWidth={2.3} />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0d0c]/95 backdrop-blur">
      <div className="container-fitlog flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-black tracking-[0.12em]">
          <BrandMark />
          <span className="text-sm">FITLOG</span>
        </Link>

        <nav className="hidden items-center rounded-full border border-[#29312b] bg-[#111512] p-1 md:flex">
          <Link
            href="/#library"
            className={`rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition ${
              pathname === "/"
                ? "bg-[#20281f] text-[#ccff00]"
                : "text-[#8c958f] hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition ${
              pathname.startsWith("/my-plan")
                ? "bg-[#20281f] text-[#ccff00]"
                : "text-[#8c958f] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="status-pill border-lime-300/20 bg-[#1c2618] text-white">
            Plan <strong>{planCount}</strong>
          </Link>
          <Link href="/my-plan" className="status-pill saved text-white">
            Saved <strong>{savedCount}</strong>
          </Link>
        </div>
      </div>

      <div className="container-fitlog pb-3 md:hidden">
        <nav className="grid grid-cols-2 rounded-xl border border-[#29312b] bg-[#111512] p-1">
          <Link
            href="/#library"
            className={`rounded-lg px-4 py-2 text-center text-xs font-extrabold uppercase tracking-[0.14em] ${pathname === "/" ? "bg-[#20281f] text-[#ccff00]" : "text-[#8c958f]"}`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-lg px-4 py-2 text-center text-xs font-extrabold uppercase tracking-[0.14em] ${pathname.startsWith("/my-plan") ? "bg-[#20281f] text-[#ccff00]" : "text-[#8c958f]"}`}
          >
            My Plan
          </Link>
        </nav>
      </div>
    </header>
  );
}
