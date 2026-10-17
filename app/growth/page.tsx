import type { Metadata } from "next";
import Link from "next/link";

import { createGrowthEventAction, deleteGrowthEventAction, updateGrowthEventAction } from "@/actions/growth";
import { auth } from "@/auth";
import FormSubmitButton from "@/components/FormSubmitButton";
import GrowthChart from "@/components/GrowthChart";
import { getExperienceCategoryShortLabel } from "@/data/experience";
import { getExperiences } from "@/lib/experiences";
import { buildGrowthJourney, getGrowthEvents } from "@/lib/growth";
import { getProjects } from "@/lib/projects";
import type { Experience } from "@/types/experience";
import type { GrowthEvent, GrowthPointType, GrowthTimelineItem } from "@/types/growth";
import type { Project } from "@/types/project";

export const metadata: Metadata = { title: "Growth Journey", description: "배움과 경험을 쌓아온 과정을 기록합니다." };
export const dynamic = "force-dynamic";

const typeLabels: Record<GrowthPointType, string> = {
  enrollment: "입학",
  military: "군복무",
  return: "복학",
  project: "프로젝트",
  activity: "대외활동",
  lab: "실습",
  other: "기타",
};

export default async function GrowthPage({ searchParams }: PageProps<"/growth">) {
  const [session, projects, experiences, events, params] = await Promise.all([auth(), getProjects(), getExperiences(), getGrowthEvents(), searchParams]);
  const isAdmin = session?.user.role === "admin";
  const { points, timeline } = buildGrowthJourney(projects, experiences, events);
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <div className="py-16 sm:py-24">
      <header>
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">GROWTH JOURNEY</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Growth Journey</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">배움과 경험을 쌓아온 과정을 기록합니다.</p>
        {saved ? <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">성장 기준점 변경 내용이 저장되었습니다.</p> : null}
        {error ? <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">날짜, 성장 지표, 필수 항목과 연결 기록을 확인해주세요.</p> : null}
      </header>

      <section className="mt-14" aria-labelledby="growth-chart-title">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-[0.18em] text-blue-600">LIFELONG GROWTH FLOW</p><h2 id="growth-chart-title" className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">입학 이후의 성장 흐름</h2></div><p className="max-w-md text-right text-xs leading-5 text-slate-500">성장 지표는 숙련도 점수가 아닌 관리자 기준점의 상대값입니다. 연결되지 않은 실제 기록은 마지막 기준점 이후 건당 1씩 반영됩니다.</p></div>
        <GrowthChart points={points} />
      </section>

      <section className="mt-20 border-t border-slate-200 pt-16" aria-labelledby="growth-events-title">
        <p className="text-xs font-bold tracking-[0.18em] text-blue-600">MILESTONES</p>
        <h2 id="growth-events-title" className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">주요 성장 이벤트</h2>
        {timeline.length ? <GrowthTimeline items={timeline} /> : <p className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-sm text-slate-500">표시할 성장 기준점이 없습니다.</p>}
      </section>

      {isAdmin ? <section id="growth-admin" className="mt-20 border-t border-slate-200 pt-16"><p className="text-xs font-bold tracking-[0.18em] text-blue-600">ADMIN</p><h2 className="mt-2 text-2xl font-extrabold text-slate-950">성장 기준점 관리</h2><p className="mt-3 text-sm leading-6 text-slate-500">입학·군복무·복학처럼 곡선의 방향을 결정하는 기준점을 관리합니다. 프로젝트 또는 실습을 연결하면 해당 상세 페이지로 이동할 수 있고 자동 기록과 중복 집계되지 않습니다.</p><details className="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-5"><summary className="cursor-pointer font-bold text-blue-700">기준점 추가</summary><GrowthEventForm projects={projects} experiences={experiences} /></details>{events.length ? <div className="mt-6 space-y-4">{events.map((event) => <details key={event.id} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-bold text-slate-900">{event.date.slice(0, 7).replace("-", ".")} · {event.title} · {event.growthValue}</summary><GrowthEventForm event={event} projects={projects} experiences={experiences} /><form action={deleteGrowthEventAction} className="mt-4 border-t border-slate-200 pt-4"><input type="hidden" name="databaseId" value={event.id} /><button type="submit" className="text-sm font-bold text-red-600">기준점 삭제</button></form></details>)}</div> : null}</section> : null}
    </div>
  );
}

function GrowthTimeline({ items }: { items: GrowthTimelineItem[] }) {
  return <ol className="relative mt-9 ml-3 border-l border-slate-200 pl-8">{items.map((item) => <li key={item.key} className="relative pb-10 last:pb-0"><span aria-hidden="true" className="absolute -left-[2.55rem] top-1.5 size-4 rounded-full border-4 border-white bg-blue-600 ring-1 ring-blue-200" /><article className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex flex-wrap items-center gap-3"><time className="text-xs font-black text-blue-600">{item.date}</time><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{typeLabels[item.type]}</span></div><h3 className="mt-3 text-lg font-extrabold text-slate-950">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>{item.technologies.length ? <ul className="mt-4 flex flex-wrap gap-2">{item.technologies.map((technology) => <li key={technology} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{technology}</li>)}</ul> : null}{item.href ? <Link href={item.href} className="mt-4 inline-block text-sm font-bold text-blue-600">관련 기록 보기 →</Link> : null}</article></li>)}</ol>;
}

function GrowthEventForm({ event, projects, experiences }: { event?: GrowthEvent; projects: Project[]; experiences: Experience[] }) {
  const action = event ? updateGrowthEventAction : createGrowthEventAction;
  const input = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900";
  const linkedValue = event?.linkedProjectId ? `project:${event.linkedProjectId}` : event?.linkedExperienceId ? `experience:${event.linkedExperienceId}` : "none";
  return <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">{event ? <input type="hidden" name="databaseId" value={event.id} /> : null}<label className="grid gap-2 text-sm font-bold text-slate-700">날짜<input type="date" name="date" required max={new Date().toISOString().slice(0, 10)} defaultValue={event?.date} className={input} /></label><label className="grid gap-2 text-sm font-bold text-slate-700">유형<select name="type" required defaultValue={event?.type ?? "other"} className={input}>{(Object.entries(typeLabels) as Array<[GrowthPointType, string]>).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-bold text-slate-700">성장 지표<input name="growthValue" type="number" min="0" max="1000" step="1" required defaultValue={event?.growthValue ?? 0} className={input} /></label><label className="flex items-end gap-3 pb-2 text-sm font-bold text-slate-700"><input type="checkbox" name="visible" defaultChecked={event?.visible ?? true} className="size-4 accent-blue-600" />그래프와 타임라인에 표시</label><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">제목<input name="title" required maxLength={160} defaultValue={event?.title} className={input} /></label><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">설명<textarea name="description" required maxLength={1000} rows={3} defaultValue={event?.description} className={input} /></label><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">사용 기술<textarea name="technologies" rows={2} defaultValue={event?.technologies.join(", ")} className={input} placeholder="선택 사항 · 쉼표 또는 줄바꿈으로 구분" /></label><label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">Project 또는 Experience &amp; Labs 연결<select name="linkedRecord" defaultValue={linkedValue} className={input}><option value="none">연결하지 않음</option><optgroup label="프로젝트">{projects.map((project) => <option key={project.id} value={`project:${project.id}`}>{project.title}</option>)}</optgroup><optgroup label="Experience & Labs">{experiences.map((experience) => <option key={experience.id} value={`experience:${experience.id}`}>{getExperienceCategoryShortLabel(experience.category)} · {experience.title}</option>)}</optgroup></select></label><p className="text-xs leading-5 text-slate-500 sm:col-span-2">성장 지표는 상대적인 곡선 높이입니다. 군 복무 시작과 종료 기준점에 같은 값을 지정하면 정체 구간이 수평으로 표시됩니다.</p><div className="sm:col-span-2"><FormSubmitButton>{event ? "기준점 저장" : "기준점 추가"}</FormSubmitButton></div></form>;
}
