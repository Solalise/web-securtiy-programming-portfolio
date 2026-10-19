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

  const implementation = [experience.roleAndObjectives, experience.process].filter(Boolean).join("\n\n");
  const defaultDetails = [
    { title: "Overview", subtitle: "개요", content: experience.overview },
    { title: "Environment & Tools", subtitle: "환경 및 기술", content: experience.environment || experience.organization },
    { title: "Implementation & Process", subtitle: "구현 및 실습 과정", content: implementation },
    { title: "Troubleshooting", subtitle: "문제 해결", content: experience.problemsAndSolutions },
    { title: "Results", subtitle: "실습 결과", content: experience.results || experience.resultsAndLearnings },
    { title: "Learnings", subtitle: "배운 점", content: experience.learnings },
  ].filter((item) => item.content);
  const details = experience.detailSections ?? defaultDetails;

  return (
    <article className="py-12 sm:py-20">
      <nav aria-label="현재 위치" className="mb-8 text-sm text-slate-500">
        <Link href="/experiences" className="hover:text-blue-600">Experience &amp; Labs</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-800" aria-current="page">{experience.title}</span>
      </nav>

      <header className="border-b border-slate-200 pb-10 sm:pb-14">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-bold tracking-[0.14em] text-blue-600">{getExperienceCategoryLabel(experience.category).toUpperCase()}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${experience.status === "in-progress" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{experience.status === "in-progress" ? "진행 중" : "Completed"}</span>
        </div>
        <h1 className="mt-3 max-w-4xl break-words text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{experience.title}</h1>
        <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">{experience.summary}</p>
        <dl className="mt-8 grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2">
          <Info label="Category" value={getExperienceCategoryLabel(experience.category)} />
          <Info label="Status" value={experience.status === "in-progress" ? "진행 중" : "완료"} />
          {experience.environment ? <Info label="Environment" value={experience.environment} /> : experience.organization ? <Info label="Environment" value={experience.organization} /> : null}
          {experience.technologies.length > 0 ? <Info label="Tech Stack" value={experience.technologies.join(", ")} /> : null}
        </dl>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <div className="space-y-5">
          {details.map((detail, index) => (
            <section key={detail.title} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.18em] text-blue-600">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">{detail.title} <span className="ml-1 text-sm font-semibold text-slate-400">· {detail.subtitle}</span></h2>
              <RichContent content={detail.content ?? ""} />
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

function RichContent({ content }: { content: string }) {
  const blocks = content.split("\n\n").filter(Boolean);
  return <div className="mt-4 space-y-4 break-keep text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
    {blocks.map((block, index) => {
      const lines = block.split("\n");
      if (block.startsWith("```") && block.endsWith("```")) return <pre key={index} className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100"><code>{lines.slice(1, -1).join("\n")}</code></pre>;
      if (lines.every((line) => line.startsWith("|"))) return <MarkdownTable key={index} lines={lines} />;
      if (lines[0]?.startsWith("### ")) return <div key={index}><h3 className="text-base font-bold text-slate-900 sm:text-lg">{lines[0].slice(4)}</h3>{lines.slice(1).join("\n") ? <p className="mt-2 whitespace-pre-wrap"><InlineText text={lines.slice(1).join("\n")} /></p> : null}</div>;
      if (lines.every((line) => /^[-*] /.test(line))) return <ul key={index} className="list-disc space-y-1 pl-5">{lines.map((line) => <li key={line}><InlineText text={line.slice(2)} /></li>)}</ul>;
      if (lines.every((line) => /^\d+\. /.test(line))) return <ol key={index} className="list-decimal space-y-1 pl-5">{lines.map((line) => <li key={line}><InlineText text={line.replace(/^\d+\. /, "")} /></li>)}</ol>;
      return <p key={index} className="whitespace-pre-wrap"><InlineText text={block} /></p>;
    })}
  </div>;
}

function MarkdownTable({ lines }: { lines: string[] }) {
  const rows = lines.filter((line) => !/^\|?\s*:?-{3,}/.test(line.trim())).map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const [header, ...body] = rows;
  if (!header) return null;
  return <div className="overflow-x-auto rounded-lg border border-slate-200"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-slate-800"><tr>{header.map((cell) => <th key={cell} className="whitespace-nowrap px-4 py-3 font-bold"><InlineText text={cell} /></th>)}</tr></thead><tbody>{body.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-slate-200">{row.map((cell, cellIndex) => <td key={cellIndex} className="whitespace-nowrap px-4 py-3"><InlineText text={cell} /></td>)}</tr>)}</tbody></table></div>;
}

function InlineText({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">{part.slice(1, -1)}</code>;
    return part;
  })}</>;
}
