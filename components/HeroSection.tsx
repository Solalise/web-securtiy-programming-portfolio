import Link from "next/link";

import ProjectCarousel from "@/components/ProjectCarousel";
import { projects } from "@/data/projects";
import {
  heroContent,
  interestBadges,
  projectImagePaths,
} from "@/data/site";

const showcaseProjects = projects.slice(0, 3).map((project) => ({
  id: project.id,
  title: project.title,
  summary: project.summary,
  imageSrc: projectImagePaths[project.id] ?? "",
}));

export default function HeroSection() {
  return (
    <section className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:py-24">
      <div className="relative z-10">
        <p className="text-xs font-bold tracking-[0.24em] text-blue-600 sm:text-sm">
          {heroContent.eyebrow}
        </p>
        <h1 className="mt-5 text-[2.55rem] leading-[1.14] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.55rem]">
          {heroContent.titleBefore}
          <br />
          <span className="text-blue-600">{heroContent.titleAccent}</span>{" "}
          {heroContent.titleAfter}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          {heroContent.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            프로젝트 보기 <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white px-7 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
              <path d="M4 5h16v14H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            문의하기
          </Link>
        </div>

        <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200 pt-6" aria-label="주요 기술 및 관심 분야">
          {interestBadges.map((badge, index) => (
            <li key={badge} className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
              <span className={`flex size-5 items-center justify-center rounded-md text-[9px] font-black ${index === 0 ? "bg-slate-950 text-white" : "bg-blue-50 text-blue-700"}`}>
                {badge.slice(0, 1)}
              </span>
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <ProjectCarousel projects={showcaseProjects} />
    </section>
  );
}
