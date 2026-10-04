import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDevLogDate } from "@/components/DevLogCard";
import { devLogs, getDevLogById } from "@/data/devlogs";

export function generateStaticParams() {
  return devLogs.map((devLog) => ({ id: devLog.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const devLog = getDevLogById(id);

  return devLog
    ? { title: devLog.title, description: devLog.summary }
    : { title: "개발 로그를 찾을 수 없습니다" };
}

export default async function DevLogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const devLog = getDevLogById(id);

  if (!devLog) {
    notFound();
  }

  const { problem, cause, solution, learned } = devLog.content;

  return (
    <article className="py-12 sm:py-20">
      <nav aria-label="현재 위치" className="mb-8 text-sm text-zinc-500">
        <Link href="/devlog" className="transition-colors hover:text-blue-600">
          개발 로그
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-zinc-800" aria-current="page">
          {devLog.title}
        </span>
      </nav>

      <header className="max-w-3xl">
        <time
          dateTime={devLog.createdAt}
          className="text-sm font-semibold text-blue-600"
        >
          {formatDevLogDate(devLog.createdAt)}
        </time>
        <h1 className="mt-3 break-keep text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl sm:leading-tight">
          {devLog.title}
        </h1>
        <p className="mt-5 break-keep text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          {devLog.summary}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="개발 로그 태그">
          {devLog.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-12 max-w-3xl space-y-5 border-t border-zinc-200 pt-10 sm:mt-16 sm:space-y-6 sm:pt-12">
        {problem && (
          <DetailSection title="문제">
            <p>{problem}</p>
          </DetailSection>
        )}

        {cause && (
          <DetailSection title="원인">
            <p>{cause}</p>
          </DetailSection>
        )}

        {solution && solution.length > 0 && (
          <DetailSection title="해결 과정">
            <ol className="space-y-4">
              {solution.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </DetailSection>
        )}

        {learned && (
          <DetailSection title="배운 점">
            <p>{learned}</p>
          </DetailSection>
        )}
      </div>

      <div className="mt-10 max-w-3xl border-t border-zinc-200 pt-8">
        <Link
          href="/devlog"
          className="text-sm font-semibold text-zinc-700 transition-colors hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span aria-hidden="true">←</span> 개발 로그 목록으로
        </Link>
      </div>
    </article>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-zinc-950">{title}</h2>
      <div className="mt-4 break-keep text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}
