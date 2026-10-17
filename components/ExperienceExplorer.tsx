"use client";

import { useMemo, useState } from "react";

import ExperienceCard from "@/components/ExperienceCard";
import { experienceCategories } from "@/data/experience";
import type { Experience, ExperienceCategory } from "@/types/experience";

type Filter = "all" | ExperienceCategory;

export default function ExperienceExplorer({ experiences }: { experiences: Experience[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => filter === "all" ? experiences : experiences.filter((item) => item.category === filter),
    [experiences, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Experience 카테고리 필터">
        {([{ value: "all", label: "전체" }, ...experienceCategories] as const).map((item) => {
          const active = filter === item.value;
          return (
            <button key={item.value} type="button" aria-pressed={active} onClick={() => setFilter(item.value)} className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}>
              {item.label}
            </button>
          );
        })}
      </div>
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <p className="font-bold text-slate-800">등록된 활동 및 실습이 없습니다.</p>
          <p className="mt-2 text-sm text-slate-500">관리자 화면에서 첫 기록을 등록할 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}
