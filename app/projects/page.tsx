import type { Metadata } from "next";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import ProjectList from "@/components/ProjectList";
import {
  getProjectCommentsBySlugs,
  getProjectInteractionCounts,
  getLikedProjectSlugs,
} from "@/lib/project-interactions";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "직접 기획하고 개발한 프로젝트와 문제 해결 경험을 소개합니다.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, session, cookieStore] = await Promise.all([
    getProjects(),
    auth(),
    cookies(),
  ]);
  const projectSlugs = projects.map((project) => project.id);
  const visitorId = cookieStore.get("portfolio_like_visitor")?.value;
  const likeActorIds = session?.user?.id
    ? [`user:${session.user.id}`, session.user.id]
    : visitorId
      ? [`visitor:${visitorId}`]
      : [];
  const [interactionCounts, commentsByProject, likedProjectSlugs] = await Promise.all([
    getProjectInteractionCounts(projectSlugs),
    getProjectCommentsBySlugs(projectSlugs),
    getLikedProjectSlugs(likeActorIds),
  ]);

  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">PROJECTS</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        프로젝트
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
        제가 직접 참여하여 진행한 팀 프로젝트와 개인 프로젝트가 정리되어 있습니다.
        <br className="hidden sm:block" /> 각 프로젝트에서 맡은 역할과 프로젝트가 제공하는 기능들을 확인할 수 있습니다.
      </p>

      <div className="mt-10 sm:mt-12">
        <ProjectList
          projects={projects}
          interactionCounts={interactionCounts}
          commentsByProject={commentsByProject}
          likedProjectSlugs={likedProjectSlugs}
        />
      </div>
    </section>
  );
}
