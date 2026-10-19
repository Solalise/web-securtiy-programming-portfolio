"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { GrowthTimelineItem } from "@/types/growth";

const typeLabels = { enrollment: "입학", military: "군복무", return: "복학", project: "프로젝트", activity: "대외활동", lab: "실습", other: "기타" } as const;

export default function GrowthJourneyTimeline({ items }: { items: GrowthTimelineItem[] }) {
  const years = useMemo(() => {
    const groups = new Map<string, GrowthTimelineItem[]>();
    for (const item of [...items].sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))) {
      const year = item.date.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), item]);
    }
    return [...groups.entries()].map(([year, records]) => ({ year, records }));
  }, [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  if (!years.length) return <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-sm text-slate-500">관리자 페이지에서 성장 기록을 추가하면 이곳에 표시됩니다.</p>;
  const active = years[Math.min(activeIndex, years.length - 1)];
  const select = (index: number) => setActiveIndex((index + years.length) % years.length);

  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-9">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Timeline</h3><p className="mt-2 text-sm text-slate-500 sm:text-base">지금까지의 기록과 현재 배우고 있는 내용을 정리했습니다.</p></div><div className="flex gap-2"><button type="button" onClick={() => select(activeIndex - 1)} aria-label="이전 연도" className="grid size-11 place-items-center rounded-full border border-slate-200 text-xl text-slate-500 hover:border-blue-300 hover:text-blue-700">←</button><button type="button" onClick={() => select(activeIndex + 1)} aria-label="다음 연도" className="grid size-11 place-items-center rounded-full border border-slate-300 text-xl text-slate-800 hover:border-blue-600 hover:text-blue-700">→</button></div></div>
    <div className="overflow-x-auto pb-4"><ol className="relative mt-10 flex min-w-max justify-between gap-10 border-t-2 border-blue-300 pt-0 sm:gap-16">{years.map((group, index) => <li key={group.year} className="relative w-36 -translate-y-5 text-center sm:w-44"><button type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? "step" : undefined} className="w-full"><span className={"inline-flex rounded-full px-5 py-2 text-base font-extrabold transition " + (index === activeIndex ? "bg-blue-600 text-white shadow-sm" : "bg-blue-50 text-blue-700 hover:bg-blue-100")}>{group.year}</span><span className={"mx-auto mt-4 block size-4 rounded-full border-4 border-white ring-2 " + (index === activeIndex ? "bg-blue-600 ring-blue-300" : "bg-white ring-blue-600")}/><strong className="mt-5 block text-sm text-slate-900">{group.records.length}개 기록</strong></button></li>)}</ol></div>
    <section className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-6 sm:p-9" aria-live="polite"><p className="text-lg font-extrabold text-blue-600">{active.year}</p><h4 className="mt-2 text-2xl font-extrabold text-slate-900">{active.year}년 성장 기록</h4><ol className="mt-7 grid gap-4 lg:grid-cols-2">{active.records.map((item) => <li key={item.key} className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center gap-2"><time className="text-sm font-extrabold text-blue-600">{item.date.slice(0, 7).replace("-", ".")}</time><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{typeLabels[item.type]}</span></div><h5 className="mt-3 text-lg font-extrabold text-slate-900">{item.title}</h5><p className="mt-2 whitespace-pre-wrap break-keep text-sm leading-6 text-slate-600">{item.description}</p>{item.technologies.length ? <ul className="mt-4 flex flex-wrap gap-2">{item.technologies.map((technology) => <li key={technology} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{technology}</li>)}</ul> : null}{item.href ? <Link href={item.href} className="mt-4 inline-block text-sm font-bold text-blue-700 hover:text-blue-800">관련 기록 보기 →</Link> : null}</li>)}</ol></section>
  </div>;
}
