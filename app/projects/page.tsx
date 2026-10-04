import type { Metadata } from "next";

import ProjectList from "@/components/ProjectList";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "직접 기획하고 개발한 프로젝트와 문제 해결 경험을 소개합니다.",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">PROJECTS</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        프로젝트
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
        직접 기획하고 개발한 프로젝트와 수업 프로젝트를 정리했습니다.
        <br className="hidden sm:block" /> 각 프로젝트에서 맡은 역할과 구현 과정,
        문제 해결 경험을 확인할 수 있습니다.
      </p>

      <div className="mt-10 sm:mt-12">
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
