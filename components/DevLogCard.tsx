import Link from "next/link";

import type { DevLog } from "@/types/devlog";

type DevLogCardProps = {
  devLog: DevLog;
};

export function formatDevLogDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  return `${year}. ${month}. ${day}.`;
}

export default function DevLogCard({ devLog }: DevLogCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-zinc-300 hover:shadow-sm sm:p-7">
      <time
        dateTime={devLog.createdAt}
        className="text-xs font-semibold text-zinc-400"
      >
        {formatDevLogDate(devLog.createdAt)}
      </time>

      <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-950">
        <Link
          href={`/devlog/${devLog.id}`}
          className="break-keep transition-colors group-hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {devLog.title}
        </Link>
      </h2>

      <p className="mt-3 flex-1 break-keep text-sm leading-6 text-zinc-600">
        {devLog.summary}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="개발 로그 태그">
        {devLog.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
          >
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href={`/devlog/${devLog.id}`}
        className="mt-6 w-fit text-sm font-semibold text-zinc-700 transition-colors group-hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        자세히 보기 <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
