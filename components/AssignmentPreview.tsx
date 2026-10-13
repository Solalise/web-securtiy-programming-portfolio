import Link from "next/link";

import { assignments } from "@/data/assignments";

const previewAssignments = assignments.slice(-3);

function AssignmentIcon({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7 fill-none stroke-current stroke-[1.8]">
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7 fill-none stroke-current stroke-[1.8]">
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7 fill-none stroke-current stroke-[1.8]">
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export default function AssignmentPreview() {
  return (
    <section className="border-t border-slate-200 py-16 sm:py-20" aria-labelledby="assignments-title">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-blue-600 sm:text-sm">ASSIGNMENTS</p>
          <h2 id="assignments-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            주차별 과제
          </h2>
        </div>
        <Link href="/assignments" className="shrink-0 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          전체 과제 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {previewAssignments.map((assignment, index) => (
          <article key={assignment.week} className="rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue-200">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-extrabold text-slate-950">{assignment.week}주차</p>
                <p className="mt-1 text-xs text-slate-400">WEB PROGRAMMING</p>
              </div>
              <span className="text-blue-600"><AssignmentIcon index={index} /></span>
            </div>
            <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950">{assignment.title}</h3>
            <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">{assignment.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${assignment.week}주차 주요 내용`}>
              {assignment.topics.slice(0, 3).map((topic) => (
                <li key={topic} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{topic}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
