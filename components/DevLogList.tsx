"use client";

import { useMemo, useState } from "react";

import DevLogCard from "@/components/DevLogCard";
import type { DevLog } from "@/types/devlog";

const filters = ["전체", "Next.js", "TypeScript", "MongoDB", "트러블슈팅"] as const;

type DevLogFilter = (typeof filters)[number];

type DevLogListProps = {
  devLogs: DevLog[];
};

export default function DevLogList({ devLogs }: DevLogListProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<DevLogFilter>("전체");

  const filteredDevLogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return devLogs.filter((devLog) => {
      const matchesQuery = [devLog.title, devLog.summary, ...devLog.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesTag =
        activeFilter === "전체" || devLog.tags.includes(activeFilter);

      return matchesQuery && matchesTag;
    });
  }, [activeFilter, devLogs, query]);

  return (
    <div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <label htmlFor="devlog-search" className="sr-only">
          개발 로그 검색
        </label>
        <input
          id="devlog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="개발 로그 검색..."
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-wrap gap-2" aria-label="개발 로그 태그 필터">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-7 text-sm text-zinc-500" aria-live="polite">
        {filteredDevLogs.length}개의 개발 로그
      </p>

      {filteredDevLogs.length > 0 ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {filteredDevLogs.map((devLog) => (
            <DevLogCard key={devLog.id} devLog={devLog} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-16 text-center">
          <p className="font-semibold text-zinc-800">검색 결과가 없습니다.</p>
          <p className="mt-2 text-sm text-zinc-500">
            다른 검색어나 태그를 선택해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}
