import bannerImg from "@/app/assets/banner.png";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="grid-noise border-b border-white/5">
      <div className="container-fitlog grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">

        
        <div>
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.28em] text-yellow-500">
            Workout Library
          </p>

          <h1 className="display-font max-w-3xl text-5xl leading-[0.9] text-white sm:text-6xl lg:text-8xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#98a09a] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full
             bg-yellow-500 px-6 py-3 text-xs 
             font-black uppercase tracking-[0.14em]
             transition hover:-translate-y-1"
          >
            Browse Workouts
          </Link>
        </div>

       
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111411]">
          <Image
            src={bannerImg}
            alt="FitLog workout training banner"
            priority
            className="h-auto w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;