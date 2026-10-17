import type { Metadata } from "next";
import Link from "next/link";

import DeleteExperienceButton from "@/components/DeleteExperienceButton";
import { getExperienceCategoryShortLabel } from "@/data/experience";
import { getAdminExperiences } from "@/lib/experiences";

export const metadata: Metadata = { title: "Experience 관리" };
export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const experiences = await getAdminExperiences();
  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-blue-600">ADMIN · EXPERIENCE &amp; LABS</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Experience 관리</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">활동과 실습 기록을 등록하고 공개 화면 노출을 관리합니다.</p>
        </div>
        <Link href="/admin/experiences/new" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700">새 기록 추가</Link>
      </div>
      {experiences.length > 0 ? (
        <ul className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {experiences.map((experience) => (
            <li key={experience.databaseId} className="grid min-w-0 gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_8rem_5rem_auto] md:items-center md:px-6">
              <div className="min-w-0"><p className="break-words font-bold text-slate-950">{experience.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{experience.summary}</p></div>
              <span className="text-sm text-slate-600">{getExperienceCategoryShortLabel(experience.category)}</span>
              <span className="text-sm font-semibold text-slate-600">{experience.featured ? "대표" : "일반"}</span>
              <div className="flex gap-2 md:justify-end">
                <Link href={`/experiences/${experience.id}`} className="inline-flex min-h-9 items-center rounded-lg border border-slate-300 px-3 text-xs font-bold text-slate-600 hover:text-blue-600">보기</Link>
                <Link href={`/admin/experiences/${experience.databaseId}/edit`} className="inline-flex min-h-9 items-center rounded-lg border border-slate-300 px-3 text-xs font-bold text-slate-600 hover:text-blue-600">수정</Link>
                <DeleteExperienceButton databaseId={experience.databaseId} title={experience.title} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-sm text-slate-500">등록된 활동 및 실습 기록이 없습니다.</p>
      )}
    </section>
  );
}
