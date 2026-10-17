"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { GrowthChartPoint } from "@/types/growth";

export default function GrowthChart({ points }: { points: GrowthChartPoint[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const width = Math.max(900, points.length * 150);
  const height = 360;
  const left = 60;
  const right = 30;
  const top = 34;
  const bottom = 68;
  const max = Math.max(1, ...points.map((point) => point.growthValue));
  const minTime = points[0] ? new Date(points[0].date).getTime() : 0;
  const maxTime = points.at(-1) ? new Date(points.at(-1)!.date).getTime() : minTime;
  const coordinates = useMemo(() => points.map((point) => {
    const time = new Date(point.date).getTime();
    const ratio = maxTime === minTime ? 0.5 : (time - minTime) / (maxTime - minTime);
    return {
      point,
      x: left + ratio * (width - left - right),
      y: top + (1 - point.growthValue / max) * (height - top - bottom),
    };
  }), [points, width, max, minTime, maxTime]);
  const line = coordinates.reduce((path, current, index) => {
    if (index === 0) return `M ${current.x} ${current.y}`;
    const previous = coordinates[index - 1];
    const middle = (previous.x + current.x) / 2;
    return `${path} C ${middle} ${previous.y}, ${middle} ${current.y}, ${current.x} ${current.y}`;
  }, "");
  const active = points.find((point) => point.id === activeId) ?? null;
  const military = coordinates.filter(({ point }) => point.type === "military");

  if (!points.length) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"><p className="font-bold text-slate-800">등록된 성장 기준점이 없습니다.</p><p className="mt-2 text-sm text-slate-500">관리자가 입학·군복무·복학 등 실제 이력의 기준점을 등록하면 성장 곡선이 생성됩니다.</p></div>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6" aria-label="입학 이후 성장 흐름 곡선">
        <svg viewBox={`0 0 ${width} ${height}`} style={{ minWidth: width }} className="h-[22.5rem] w-full" role="img" aria-label="2023년 입학 이후 현재까지의 성장 지표">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = top + ratio * (height - top - bottom);
            const value = Math.round(max * (1 - ratio));
            return <g key={ratio}><line x1={left} y1={y} x2={width - right} y2={y} stroke="#e2e8f0" /><text x={left - 12} y={y + 4} textAnchor="end" className="fill-slate-400 text-[11px]">{value}</text></g>;
          })}
          {military.length >= 2 ? <g><rect x={military[0].x} y={top} width={military.at(-1)!.x - military[0].x} height={height - top - bottom} fill="#f1f5f9" opacity="0.8" /><text x={(military[0].x + military.at(-1)!.x) / 2} y={top + 18} textAnchor="middle" className="fill-slate-500 text-[11px] font-bold">군 복무 · 정체 구간</text></g> : null}
          <path d={line} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          {coordinates.map(({ point, x, y }) => (
            <g key={point.id} tabIndex={0} role="button" aria-label={`${point.label}, ${point.title}, 성장 지표 ${point.growthValue}`} className="cursor-pointer outline-none" onMouseEnter={() => setActiveId(point.id)} onFocus={() => setActiveId(point.id)} onClick={() => setActiveId(point.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveId(point.id); } }}>
              <circle cx={x} cy={y} r={activeId === point.id ? 9 : 7} fill="#fff" stroke="#2563eb" strokeWidth="4"><title>{point.label} · {point.title} · {point.description} · 성장 지표 {point.growthValue}</title></circle>
              <text x={x} y={height - 34} textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">{point.label}</text>
              <text x={x} y={height - 18} textAnchor="middle" className="fill-slate-400 text-[9px]">{point.title.length > 12 ? point.title.slice(0, 12) + "…" : point.title}</text>
            </g>
          ))}
          <text x="16" y="18" className="fill-slate-500 text-[11px] font-bold">성장 지표</text>
        </svg>
      </div>
      <div className="mt-4 min-h-32 rounded-xl border border-blue-100 bg-blue-50/60 p-5" aria-live="polite">
        {active ? <><div className="flex flex-wrap items-center gap-3"><p className="text-sm font-extrabold text-slate-950">{active.label} · {active.title}</p><span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">성장 지표 {active.growthValue}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{active.description}</p>{active.href ? <Link href={active.href} className="mt-3 inline-block text-sm font-bold text-blue-700">연결된 상세 기록 보기 →</Link> : null}{active.entries.length ? <ul className="mt-4 grid gap-2 sm:grid-cols-2">{active.entries.map((entry) => <li key={entry.key}>{entry.href ? <Link href={entry.href} className="block rounded-lg bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:shadow-sm">{entry.title} →</Link> : <span className="block rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700">{entry.title}</span>}</li>)}</ul> : <p className="mt-3 text-xs text-slate-500">이 기준점에 연결된 프로젝트나 실습 기록은 없습니다.</p>}</> : <p className="text-sm text-slate-500">그래프의 기준점을 선택하면 날짜, 설명, 성장 지표와 관련 기록을 확인할 수 있습니다.</p>}
      </div>
    </div>
  );
}
