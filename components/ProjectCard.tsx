import Link from "next/link";

import ProjectThumbnail from "@/components/ProjectThumbnail";
import { getProjectStatusLabel } from "@/data/projects";
import { projectImagePaths } from "@/data/site";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-[border-color,box-shadow] hover:border-zinc-300 hover:shadow-sm">
      <Link
        href={`/projects/${project.id}`}
        aria-label={`${project.title} 자세히 보기`}
        className="border-b border-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
      >
        <ProjectThumbnail title={project.title} category={project.category} status={getProjectStatusLabel(project)} imageSrc={project.thumbnail || projectImagePaths[project.id]} />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold text-blue-600">
          {project.category}
        </p>
        <h3 className="text-xl font-bold tracking-tight text-zinc-950">
          <Link
            href={`/projects/${project.id}`}
            className="transition-colors hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">
          {project.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="사용 기술">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
          <Link
            href={`/projects/${project.id}`}
            className="text-zinc-700 transition-colors group-hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            자세히 보기 <span aria-hidden="true">→</span>
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 transition-colors hover:text-blue-600"
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 transition-colors hover:text-blue-600"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
