"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ShowcaseProject = {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
};

type ProjectCarouselProps = {
  projects: ShowcaseProject[];
};

const positionStyles = {
  center:
    "left-1/2 top-2 z-30 w-[76%] -translate-x-1/2 scale-100 opacity-100 sm:w-[68%]",
  left: "left-0 top-14 z-10 w-[58%] -rotate-2 scale-90 opacity-70 sm:w-[51%]",
  right: "right-0 top-14 z-20 w-[58%] rotate-2 scale-90 opacity-70 sm:w-[51%]",
} as const;

function ProjectImage({ project }: { project: ShowcaseProject }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 px-5 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl border border-blue-200 bg-white text-sm font-black text-blue-600">
          {project.title.slice(0, 2).toUpperCase()}
        </span>
        <span className="mt-3 text-[11px] font-semibold text-slate-400">
          프로젝트 이미지 준비 중
        </span>
      </div>
      {project.imageSrc && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element -- Admins can provide arbitrary remote thumbnail URLs.
        <img
          src={project.imageSrc}
          alt={`${project.title} 프로젝트 화면`}
          className="absolute inset-0 size-full bg-white object-contain"
          onError={() => setHasError(true)}
        />
      ) : null}
    </div>
  );
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || projects.length < 2) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % projects.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, projects.length]);

  const move = (direction: number) => {
    setCurrent((index) => (index + direction + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <div className="flex min-h-[390px] min-w-0 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center sm:min-h-[455px]">
        <div>
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-blue-200 bg-white text-xl font-black text-blue-600">
            BW
          </span>
          <p className="mt-4 font-extrabold text-slate-900">등록된 프로젝트가 없습니다.</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            프로젝트가 등록되면 이곳에 최신 항목부터 표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-w-0"
      aria-roledescription="carousel"
      aria-label="대표 프로젝트 미리보기"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative h-[390px] sm:h-[455px]" aria-live="polite">
        {projects.map((project, index) => {
          const offset = (index - current + projects.length) % projects.length;
          const position = offset === 0 ? "center" : offset === 1 ? "right" : "left";
          const isCurrent = position === "center";

          return (
            <article
              key={project.id}
              aria-hidden={!isCurrent}
              className={`absolute overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)] transition-[transform,opacity,left,right,top] duration-500 ease-out ${positionStyles[position]} ${isCurrent ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <ProjectImage project={project} />
              <div className="p-4 sm:p-5">
                <p className="text-base font-extrabold tracking-tight text-slate-950 sm:text-lg">
                  {project.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  {project.summary}
                </p>
                {isCurrent ? (
                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-3 inline-flex text-xs font-bold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    자세히 보기 →
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {projects.length > 1 ? (
        <div className="mt-1 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => move(-1)}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            aria-label="이전 프로젝트"
          >
            ←
          </button>
          <div
            className="flex items-center gap-2"
            aria-label={`${current + 1} / ${projects.length}`}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`size-2.5 rounded-full transition-colors ${index === current ? "bg-blue-600" : "bg-slate-200 hover:bg-slate-300"}`}
                aria-label={`${project.title} 슬라이드 보기`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            aria-label="다음 프로젝트"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
