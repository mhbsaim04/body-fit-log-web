import { ReactNode } from "react";
interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function SectionIntro({ eyebrow, title, description, action }: SectionIntroProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#ccff00]">{eyebrow}</p>
        ) : null}
        <h2 className="display-font text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">{title}</h2>
        <p className="mt-3 text-sm text-[#8c958f]">{description}</p>
      </div>
      {action}
    </div>
  );
}
