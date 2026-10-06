import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid-noise border-b border-white/5">
      <div className="container-fitlog grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
        <div>
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#ccff00]">
            Workout Library
          </p>
          <h1 className="display-font max-w-3xl text-5xl leading-[0.9] text-white sm:text-6xl lg:text-8xl">
            TRAIN WITH INTENT.<br />
            LOG EVERY SET.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#98a09a] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0b0d0c] transition hover:translate-y-[-2px]"
          >
            Browse Workouts
            <ArrowDownRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="hero-placeholder rounded-[28px]" aria-label="Hero image placeholder" />
      </div>
    </section>
  );
}
