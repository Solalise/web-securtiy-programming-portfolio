import Link from "next/link";

import { updateHeroAction } from "@/actions/portfolio-content";
import FormSubmitButton from "@/components/FormSubmitButton";
import ProjectCarousel from "@/components/ProjectCarousel";
import {
  heroContent,
  projectImagePaths,
} from "@/data/site";
import { defaultSiteContent, getSiteContent } from "@/lib/portfolio-content";
import { getLatestProjects } from "@/lib/projects";

export default async function HeroSection({ isAdmin }: { isAdmin: boolean }) {
  let showcaseProjects: Array<{
    id: string;
    title: string;
    summary: string;
    imageSrc: string;
  }> = [];

  let content = defaultSiteContent.hero;
  try {
    const [latestProjects, siteContent] = await Promise.all([getLatestProjects(3), getSiteContent()]);
    content = siteContent.hero;

    showcaseProjects = latestProjects.map((project) => ({
      id: project.id,
      title: project.title,
      summary: project.summary,
      imageSrc: project.thumbnail || projectImagePaths[project.id] || "",
    }));
  } catch {
    // Render a safe empty state without exposing database details.
  }

  return (
    <section id="home" className="grid gap-14 py-20 sm:py-24 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:py-28">
      <div className="relative z-10 lg:pt-6">
        <p className="text-xs font-bold tracking-[0.24em] text-blue-600 sm:text-sm">
          {content.eyebrow}
        </p>
        <h1 className="mt-5 text-[2.55rem] leading-[1.14] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.55rem]">
          {content.titleBefore}
          <br />
          <span className="text-blue-600">{content.titleAccent}</span>{" "}
          {content.titleAfter}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          {content.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            style={{ color: "#ffffff" }}
          >
            {heroContent.projectsButton} <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white px-7 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
              <path d="M4 5h16v14H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {heroContent.contactButton}
          </Link>
        </div>

        {isAdmin ? <details className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4"><summary className="cursor-pointer text-sm font-bold text-blue-700">메인 소개 편집</summary><form action={updateHeroAction} className="mt-4 grid gap-3"><input name="eyebrow" required defaultValue={content.eyebrow} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><input name="titleBefore" required defaultValue={content.titleBefore} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><input name="titleAccent" required defaultValue={content.titleAccent} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><input name="titleAfter" required defaultValue={content.titleAfter} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><textarea name="description" required defaultValue={content.description} rows={4} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><div><FormSubmitButton>소개 저장</FormSubmitButton></div></form></details> : null}
      </div>

      <ProjectCarousel projects={showcaseProjects} />
    </section>
  );
}
