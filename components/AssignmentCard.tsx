import type { Assignment } from "@/types/assignment";

type AssignmentCardProps = {
  assignment: Assignment;
};

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const weekNumber = String(assignment.week).padStart(2, "0");

  return (
    <article className="grid gap-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-7 lg:grid-cols-[5.5rem_minmax(0,1fr)_auto] lg:gap-8">
      <div className="lg:border-r lg:border-zinc-200">
        <p className="font-mono text-2xl font-bold tracking-tight text-blue-600">
          {weekNumber}
        </p>
        <p className="mt-1 text-sm font-semibold text-zinc-500">
          {assignment.week}주차
        </p>
      </div>

      <div className="min-w-0">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
          {assignment.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
          {assignment.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="주요 학습 내용">
          {assignment.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-start gap-2 lg:w-28 lg:flex-col lg:items-stretch">
        <span
          className={`inline-flex min-h-9 items-center justify-center rounded-full px-3 text-xs font-semibold ${
            assignment.status === "완료"
              ? "bg-blue-50 text-blue-700"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {assignment.status}
        </span>

        {assignment.githubUrl && (
          <a
            href={assignment.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-700 transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            GitHub
          </a>
        )}

        {assignment.demoUrl && (
          <a
            href={assignment.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-700 transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            데모
          </a>
        )}
      </div>
    </article>
  );
}
