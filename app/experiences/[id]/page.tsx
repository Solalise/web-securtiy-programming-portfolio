import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getExperienceCategoryLabel } from "@/data/experience";
import { getExperience } from "@/lib/experiences";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/experiences/[id]">): Promise<Metadata> {
  const { id } = await params;
  const experience = await getExperience(id);
  return experience ? { title: experience.title, description: experience.summary } : { title: "기록을 찾을 수 없습니다" };
}

export default async function ExperienceDetailPage({ params }: PageProps<"/experiences/[id]">) {
  const { id } = await params;
  const experience = await getExperience(id);
  if (!experience) notFound();

  const details = [
    { title: "Overview", subtitle: "개요", content: experience.overview },
    { title: "Role & Objectives", subtitle: "역할 및 목표", content: experience.roleAndObjectives },
    { title: "Process", subtitle: "진행 과정", content: experience.process },
    { title: "Problems & Solutions", subtitle: "문제 및 해결 과정", content: experience.problemsAndSolutions },
    { title: "Results & Learnings", subtitle: "결과 및 배운 점", content: experience.resultsAndLearnings },
  ].filter((item) => item.content);

  return (
    <article className="py-12 sm:py-20">
      <nav aria-label="현재 위치" className="mb-8 text-sm text-slate-500">
        <Link href="/experiences" className="hover:text-blue-600">Experience &amp; Labs</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-800" aria-current="page">{experience.title}</span>
      </nav>

      <header className="border-b border-slate-200 pb-10 sm:pb-14">
        <p className="text-sm font-bold text-blue-600">{getExperienceCategoryLabel(experience.category)}</p>
        <h1 className="mt-3 max-w-4xl break-words text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{experience.title}</h1>
        <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">{experience.summary}</p>
        <dl className="mt-8 grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
          {experience.organization ? <Info label="활동 기관 / 환경" value={experience.organization} /> : null}
          {(experience.startDate || experience.endDate) ? <Info label="기간" value={[experience.startDate, experience.endDate].filter(Boolean).join(" — ")} /> : null}
          {experience.technologies.length > 0 ? <Info label="기술 및 도구" value={experience.technologies.join(", ")} /> : null}
        </dl>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <div className="space-y-5">
          {details.map((detail, index) => (
            <section key={detail.title} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.18em] text-blue-600">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">{detail.title} <span className="ml-1 text-sm font-semibold text-slate-400">· {detail.subtitle}</span></h2>
              <p className="mt-4 whitespace-pre-wrap break-keep text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{detail.content}</p>
            </section>
          ))}
          {experience.images.length > 0 ? (
            <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-slate-950">Images <span className="text-sm font-semibold text-slate-400">· 관련 이미지</span></h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {experience.images.map((src, index) => (
                  <a key={src} href={src} target="_blank" rel="noreferrer" className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${experience.title} 관련 이미지 ${index + 1}`} className="aspect-video w-full object-cover" />
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {experience.references.length > 0 ? (
          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-6">
            <h2 className="font-extrabold text-slate-950">References</h2>
            <ul className="mt-4 space-y-3">
              {experience.references.map((reference) => (
                <li key={`${reference.label}-${reference.url}`}>
                  <a href={reference.url} target="_blank" rel="noreferrer" className="block break-words text-sm font-semibold text-blue-600 hover:text-blue-700">{reference.label} →</a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><dt className="text-xs font-bold text-slate-400">{label}</dt><dd className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</dd></div>;
}
