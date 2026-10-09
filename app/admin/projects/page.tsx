import type { Metadata } from "next";
import Link from "next/link";

import DeleteProjectButton from "@/components/DeleteProjectButton";
import { getAdminProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프로젝트 관리",
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN</p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            프로젝트 관리
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-600">
            MongoDB에 저장된 포트폴리오 프로젝트를 관리합니다.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          새 프로젝트 추가
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_7rem_5rem_auto] gap-4 border-b border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-500 lg:grid">
            <span>제목</span>
            <span>Slug</span>
            <span>카테고리</span>
            <span>상태</span>
            <span>추천</span>
            <span className="text-right">관리</span>
          </div>
          <ul className="divide-y divide-zinc-200">
            {projects.map((project) => (
              <li
                key={project.databaseId}
                className="grid gap-4 px-5 py-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_7rem_5rem_auto] lg:items-center lg:px-6"
              >
                <div>
                  <p className="font-semibold text-zinc-950">{project.title}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-1 inline-block text-xs text-zinc-500 transition-colors hover:text-blue-600"
                  >
                    공개 페이지 보기
                  </Link>
                </div>
                <AdminValue label="Slug" value={project.id} mono />
                <AdminValue label="카테고리" value={project.category} />
                <AdminValue label="상태" value={project.status} />
                <AdminValue label="추천" value={project.featured ? "예" : "아니오"} />
                <div className="flex gap-2 lg:justify-end">
                  <Link
                    href={`/admin/projects/${project.databaseId}/edit`}
                    className="inline-flex min-h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-700 transition-colors hover:border-blue-300 hover:text-blue-600"
                  >
                    수정
                  </Link>
                  <DeleteProjectButton
                    databaseId={project.databaseId}
                    title={project.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-600">
          등록된 프로젝트가 없습니다.
        </p>
      )}
    </section>
  );
}

function AdminValue({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-zinc-400 lg:hidden">{label}</p>
      <p
        className={`mt-1 truncate text-sm text-zinc-700 lg:mt-0 ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
