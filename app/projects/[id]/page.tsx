import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectThumbnail from "@/components/ProjectThumbnail";
import { getProjectById, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  return project
    ? { title: project.title, description: project.summary }
    : { title: "프로젝트를 찾을 수 없습니다" };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-20">
      <nav aria-label="현재 위치" className="mb-8 text-sm text-zinc-500">
        <Link href="/projects" className="transition-colors hover:text-blue-600">
          프로젝트
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-zinc-800" aria-current="page">
          {project.title}
        </span>
      </nav>

      <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-blue-600">{project.category}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            {project.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="사용 기술">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                {tech}
              </li>
            ))}
          </ul>
          {(project.githubUrl || project.demoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
                >
                  라이브 데모
                </a>
              )}
            </div>
          )}
        </div>

        <ProjectThumbnail
          title={project.title}
          category={project.category}
          size="hero"
        />
      </section>

      <div className="mt-16 grid gap-8 border-t border-zinc-200 pt-12 sm:mt-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <div className="space-y-6">
          <DetailSection title="개요">
            <p>{project.overview}</p>
          </DetailSection>

          <DetailSection title="문제">
            <p>{project.problem}</p>
          </DetailSection>

          <DetailSection title="핵심 기능">
            <CheckList items={project.features} columns />
          </DetailSection>

          <DetailSection title="기술 스택">
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="내 역할">
            <p>{project.role}</p>
          </DetailSection>

          <DetailSection title="트러블슈팅">
            <p>{project.troubleshooting}</p>
          </DetailSection>

          <DetailSection title="배운 점">
            <CheckList items={project.learned} />
          </DetailSection>
        </div>

        <aside className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 lg:sticky lg:top-6">
          <h2 className="font-bold text-zinc-950">프로젝트 정보</h2>
          <dl className="mt-6 space-y-5">
            {project.period && <InfoItem label="기간" value={project.period} />}
            {project.teamSize && <InfoItem label="형태" value={project.teamSize} />}
            {project.status && <InfoItem label="상태" value={project.status} />}
          </dl>
          {(project.githubUrl || project.demoUrl) && (
            <div className="mt-6 border-t border-zinc-200 pt-5 text-sm font-semibold">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block py-1 text-zinc-700 transition-colors hover:text-blue-600"
                >
                  GitHub 저장소 →
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block py-1 text-zinc-700 transition-colors hover:text-blue-600"
                >
                  라이브 데모 →
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-zinc-950">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

function CheckList({
  items,
  columns = false,
}: {
  items: string[];
  columns?: boolean;
}) {
  return (
    <ul className={`grid gap-3 ${columns ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-zinc-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-zinc-800">{value}</dd>
    </div>
  );
}
