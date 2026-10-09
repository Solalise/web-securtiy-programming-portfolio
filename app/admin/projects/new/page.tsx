import type { Metadata } from "next";

import ProjectForm, {
  getProjectFormErrorMessage,
} from "@/components/ProjectForm";

export const metadata: Metadata = {
  title: "새 프로젝트 추가",
};

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { error } = await searchParams;

  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN · PROJECTS</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        새 프로젝트 추가
      </h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">
        필수 정보를 입력하고 포트폴리오 프로젝트를 등록합니다.
      </p>
      <ProjectForm errorMessage={getProjectFormErrorMessage(error)} />
    </section>
  );
}
