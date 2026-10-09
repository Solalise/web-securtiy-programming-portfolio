import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectForm, {
  getProjectFormErrorMessage,
} from "@/components/ProjectForm";
import { getAdminProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프로젝트 수정",
};

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const project = await getAdminProject(id);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN · PROJECTS</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        프로젝트 수정
      </h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">
        {project.title} 프로젝트의 정보를 수정합니다.
      </p>
      <ProjectForm
        project={project}
        errorMessage={getProjectFormErrorMessage(error)}
      />
    </section>
  );
}
