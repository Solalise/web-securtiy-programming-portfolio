import Link from "next/link";

import { deletePortfolioItemAction, savePortfolioItemAction } from "@/actions/portfolio-content";
import FormSubmitButton from "@/components/FormSubmitButton";
import { getPortfolioItems } from "@/lib/portfolio-content";
import type { GoalStatus, PortfolioItem } from "@/types/portfolio-content";

const statusLabels: Record<GoalStatus, string> = { planned: "예정", "in-progress": "진행 중", completed: "달성 완료" };

export default async function YearlyGoals({ isAdmin, selectedYear }: { isAdmin: boolean; selectedYear: number }) {
  const goals = await getPortfolioItems("goal");
  const years = Array.from(new Set([new Date().getFullYear(), ...goals.map((goal) => goal.year).filter((year): year is number => Boolean(year))])).sort((a, b) => b - a);
  const visibleGoals = goals.filter((goal) => goal.year === selectedYear);

  return (
    <section id="goal" className="border-t border-slate-200 py-16 sm:py-20" aria-labelledby="goals-title">
      <p className="text-xs font-bold tracking-[0.22em] text-blue-600 sm:text-sm">YEARLY GOALS</p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><h2 id="goals-title" className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{selectedYear} 올해 목표</h2><nav aria-label="목표 연도" className="flex flex-wrap gap-2">{years.map((year) => <Link key={year} href={`/?year=${year}#goal`} aria-current={year === selectedYear ? "page" : undefined} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${year === selectedYear ? "border-blue-600 bg-blue-600 text-white!" : "border-slate-300 text-slate-600"}`}>{year}</Link>)}</nav></div>

      {visibleGoals.length > 0 ? <div className="mt-10 grid gap-5 md:grid-cols-2">{visibleGoals.map((goal, index) => <GoalCard key={goal.id} goal={goal} number={index + 1} isAdmin={isAdmin} />)}</div> : <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">{selectedYear}년에 등록된 목표가 없습니다.</p>}

      {isAdmin ? <details className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5"><summary className="cursor-pointer text-sm font-bold text-blue-700">새 목표 추가</summary><GoalForm year={selectedYear} /></details> : null}
    </section>
  );
}

function GoalCard({ goal, number, isAdmin }: { goal: PortfolioItem; number: number; isAdmin: boolean }) {
  const completed = goal.status === "completed";
  return <article className={`rounded-2xl border p-6 sm:p-8 ${completed ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-white"}`}><div className="flex items-start justify-between gap-4"><span className="text-sm font-black tracking-[0.16em] text-blue-600">{String(number).padStart(2, "0")}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${completed ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{completed ? "✓ " : ""}{goal.status ? statusLabels[goal.status] : "예정"}</span></div><h3 className="mt-3 break-words text-xl font-extrabold text-slate-950">{goal.title}</h3>{goal.description ? <p className="mt-4 whitespace-pre-wrap break-keep text-sm leading-7 text-slate-600">{goal.description}</p> : null}{completed && goal.achievedAt ? <p className="mt-4 text-xs font-bold text-blue-700">달성일 {goal.achievedAt}</p> : null}{isAdmin ? <details className="mt-5 border-t border-slate-200 pt-4"><summary className="cursor-pointer text-xs font-bold text-blue-700">편집</summary><GoalForm goal={goal} year={goal.year ?? new Date().getFullYear()} /><form action={deletePortfolioItemAction} className="mt-3"><input type="hidden" name="kind" value="goal" /><input type="hidden" name="databaseId" value={goal.id} /><button className="text-xs font-bold text-red-600" type="submit">목표 삭제</button></form></details> : null}</article>;
}

function GoalForm({ goal, year }: { goal?: PortfolioItem; year: number }) {
  return <form action={savePortfolioItemAction} className="mt-4 grid gap-3 sm:grid-cols-2"><input type="hidden" name="kind" value="goal" />{goal ? <input type="hidden" name="databaseId" value={goal.id} /> : null}<input name="title" required defaultValue={goal?.title} placeholder="목표 제목" className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2" /><textarea name="description" defaultValue={goal?.description} placeholder="상세 설명" rows={3} className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2" /><input name="year" type="number" min="2000" max="2200" required defaultValue={goal?.year ?? year} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><input name="category" defaultValue={goal?.category} placeholder="카테고리 (선택)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><select name="status" defaultValue={goal?.status ?? "planned"} className="rounded-lg border border-slate-300 px-3 py-2 text-sm"><option value="planned">예정</option><option value="in-progress">진행 중</option><option value="completed">달성 완료</option></select><input name="achievedAt" type="date" defaultValue={goal?.achievedAt} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><input name="order" type="number" defaultValue={goal?.order ?? 0} placeholder="표시 순서" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><div><FormSubmitButton>{goal ? "목표 저장" : "목표 추가"}</FormSubmitButton></div></form>;
}
