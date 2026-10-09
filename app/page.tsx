import Image from "next/image";
import Link from "next/link";

import mainPicture from "@/img/mainpicture.png";
import ProjectCard from "@/components/ProjectCard";
import TechStackCard from "@/components/TechStackCard";
import { techStack } from "@/data/techStack";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <section className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="mb-5 text-base font-semibold text-blue-600">최보원</p>
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-zinc-950 sm:text-5xl sm:leading-tight lg:text-6xl">
            웹 보안 &amp;
            <br />
            백엔드 포트폴리오
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            웹 보안, 백엔드, 취약점 분석에 관심을 두고 있는
            <br className="hidden sm:block" /> 정보보호학과 학생입니다.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/assignments"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              과제 보기
            </Link>
          </div>
        </div>

        <div className="relative min-h-80 sm:min-h-96">
          <Image
            src={mainPicture}
            alt="노트북과 책, 화분이 놓인 개발 작업 공간"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-contain"
          />
        </div>
      </section>

      <section className="border-t border-zinc-200 py-16 sm:py-24">
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">PROJECTS</p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              대표 프로젝트
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-600"
          >
            전체 프로젝트 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 py-16 sm:py-24">
        <p className="mb-2 text-sm font-semibold text-blue-600">SKILLS</p>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
          기술 스택
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <TechStackCard key={tech.name} tech={tech} />
          ))}
        </div>
      </section>
    </>
  );
}
