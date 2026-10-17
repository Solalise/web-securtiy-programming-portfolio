import Link from "next/link";

import { getExperienceCategoryShortLabel } from "@/data/experience";
import type { Experience } from "@/types/experience";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          {getExperienceCategoryShortLabel(experience.category)}
        </span>
        <span className="text-xs font-medium text-slate-400">{formatPeriod(experience)}</span>
      </div>
      <h2 className="mt-5 break-words text-xl font-extrabold tracking-tight text-slate-950">
        {experience.title}
      </h2>
      <p className="mt-3 line-clamp-2 min-h-12 break-keep text-sm leading-6 text-slate-600">
        {experience.summary}
      </p>
      {experience.technologies.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="관련 기술">
          {experience.technologies.slice(0, 5).map((technology) => (
            <li key={technology} className="max-w-full break-all rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {technology}
            </li>
          ))}
        </ul>
      ) : null}
      <Link href={`/experiences/${experience.id}`} className="mt-6 inline-flex min-h-10 items-center text-sm font-bold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        상세 보기 <span className="ml-1" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function formatPeriod(experience: Experience): string {
  if (!experience.startDate && !experience.endDate) return "날짜 미등록";
  const start = experience.startDate ? experience.startDate.replaceAll("-", ".") : "";
  const end = experience.endDate ? experience.endDate.replaceAll("-", ".") : "진행 중";
  return start ? `${start} — ${end}` : end;
}
