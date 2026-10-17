"use client";

import Link from "next/link";
import { useState } from "react";

import type { TechnologyUsage as Usage } from "@/lib/technology-usage";

const categoryOrder = ["Database", "Frontend", "Backend", "Programming Languages", "Security", "Tools"] as const;
const colors = ["#2563eb", "#0ea5e9", "#14b8a6", "#8b5cf6", "#f59e0b", "#ef4444", "#64748b"];

export default function TechnologyUsage({ technologies }: { technologies: Usage[] }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const groups = new Map<string, Usage[]>();
  for (const category of categoryOrder) groups.set(category, []);
  for (const technology of technologies) groups.set(technology.category, [...(groups.get(technology.category) ?? []), technology]);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {[...groups.entries()].map(([category, items]) => {
        const usedItems = items.filter((item) => item.usedCount > 0);
        const colorByName = new Map(usedItems.map((item, index) => [item.name, colors[index % colors.length]]));
        let offset = 0;
        const active = items.find((item) => activeKey === category + ":" + item.name);
        return (
          <section key={category} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="font-extrabold text-slate-950">{category}</h3>
            <p className="mt-1 text-xs text-slate-500">카테고리 내 프로젝트 기술 사용 빈도</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
              <div className="relative mx-auto size-48">
                <svg viewBox="0 0 120 120" className="size-full" role="img" aria-label={category + " 기술 사용 비중 도넛 차트"}>
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#e2e8f0" strokeWidth="16" />
                  {usedItems.map((technology, index) => {
                    const key = category + ":" + technology.name;
                    const currentOffset = offset;
                    offset += technology.percentage;
                    return (
                      <circle
                        key={key}
                        cx="60"
                        cy="60"
                        r="44"
                        pathLength="100"
                        fill="none"
                        stroke={colors[index % colors.length]}
                        strokeWidth="16"
                        strokeDasharray={technology.percentage + " " + (100 - technology.percentage)}
                        strokeDashoffset={-currentOffset}
                        transform="rotate(-90 60 60)"
                        tabIndex={0}
                        role="button"
                        aria-label={technology.name + ", " + technology.percentage + "%, " + technology.usedCount + "개 프로젝트. 관련 프로젝트 보기"}
                        className="cursor-pointer outline-none transition-opacity hover:opacity-80 focus:opacity-80"
                        onMouseEnter={() => setActiveKey(key)}
                        onMouseLeave={() => setActiveKey(null)}
                        onFocus={() => setActiveKey(key)}
                        onBlur={() => setActiveKey(null)}
                        onClick={() => setExpandedKey(expandedKey === key ? null : key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setExpandedKey(expandedKey === key ? null : key);
                          }
                        }}
                      >
                        <title>{technology.name + " " + technology.percentage + "% · " + technology.usedCount + "개 프로젝트"}</title>
                      </circle>
                    );
                  })}
                  <text x="60" y="57" textAnchor="middle" className="fill-slate-950 text-[7px] font-extrabold">
                    <tspan x="60">{category === "Programming Languages" ? "Programming" : category}</tspan>
                    {category === "Programming Languages" ? <tspan x="60" dy="9">Languages</tspan> : null}
                  </text>
                  <text x="60" y={category === "Programming Languages" ? "78" : "69"} textAnchor="middle" className="fill-slate-400 text-[5px] font-bold">
                    {usedItems.length ? "TOTAL 100%" : "NO DATA"}
                  </text>
                </svg>
                {active ? <div role="status" className="pointer-events-none absolute inset-x-2 bottom-1 rounded-md bg-slate-950 px-2 py-1.5 text-center text-[10px] font-bold text-white shadow-lg">{active.name} · {active.percentage}% · {active.usedCount}개</div> : null}
              </div>

              {items.length ? (
                <div className="space-y-2">
                  {items.map((technology) => {
                    const key = category + ":" + technology.name;
                    const expanded = expandedKey === key;
                    return (
                      <div key={key}>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => setExpandedKey(expanded ? null : key)}
                          onFocus={() => setActiveKey(key)}
                          onBlur={() => setActiveKey(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-600"
                        >
                          <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: colorByName.get(technology.name) ?? "#cbd5e1" }} />
                          <span className="min-w-0 flex-1 break-words text-xs font-bold text-slate-800">{technology.name}</span>
                          <span className="shrink-0 text-xs font-black text-blue-700">{technology.percentage}%</span>
                          <span className="shrink-0 text-[10px] text-slate-400">{technology.usedCount}회</span>
                        </button>
                        {expanded ? <ProjectLinks technology={technology} /> : null}
                      </div>
                    );
                  })}
                </div>
              ) : <p className="text-center text-sm text-slate-500 sm:text-left">실제 프로젝트 사용 데이터가 없습니다.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ProjectLinks({ technology }: { technology: Usage }) {
  if (!technology.projects.length) return <p className="ml-5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">연결된 프로젝트가 없습니다.</p>;
  return (
    <ul className="ml-5 space-y-2 rounded-lg bg-slate-50 p-2">
      {technology.projects.map((project) => (
        <li key={project.id}>
          <Link href={"/projects/" + project.id} className="block rounded-md p-2 hover:bg-blue-50">
            <span className="text-xs font-bold text-slate-900">{project.title}</span>
            <span className="mt-1 line-clamp-1 block text-[11px] text-slate-500">{project.summary}</span>
            <span className="mt-1 block text-[11px] font-bold text-blue-600">프로젝트 상세 보기 →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
