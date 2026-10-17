import Link from "next/link";

import ExperienceCard from "@/components/ExperienceCard";
import { getFeaturedExperiences } from "@/lib/experiences";
import type { Experience } from "@/types/experience";

export default async function FeaturedExperiences() {
  let experiences: Experience[] = [];
  let failed = false;
  try {
    experiences = await getFeaturedExperiences();
  } catch {
    failed = true;
  }

  return (
    <section className="border-t border-slate-200 py-16 sm:py-20" aria-labelledby="featured-experiences-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-blue-600 sm:text-sm">EXPERIENCE &amp; LABS</p>
          <h2 id="featured-experiences-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Featured Experiences</h2>
        </div>
        <Link href="/experiences" className="shrink-0 text-sm font-bold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">모든 활동 및 실습 보기 →</Link>
      </div>
      {failed ? (
        <p role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center text-sm text-red-700">Experience 데이터를 불러오지 못했습니다.</p>
      ) : experiences.length > 0 ? (
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
        </div>
      ) : (
        <div className="mt-9 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
          <p className="font-bold text-slate-800">대표 활동 및 실습을 준비 중입니다.</p>
          <p className="mt-2 text-sm text-slate-500">등록된 실제 기록만 이곳에 표시됩니다.</p>
        </div>
      )}
    </section>
  );
}
