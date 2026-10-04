"use client";

import { useMemo, useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";

const filters = ["전체", "웹", "보안", "AI", "백엔드"] as const;

type ProjectFilter = (typeof filters)[number];

type ProjectListProps = {
  projects: Project[];
};

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "전체") return true;

  const searchableText = [
    project.category,
    project.summary,
    project.problem,
    project.role,
    ...project.features,
    ...project.techStack,
  ]
    .join(" ")
    .toLowerCase();

  if (filter === "웹") {
    return /web|next\.js|react|tailwind/.test(searchableText);
  }

  if (filter === "보안") {
    return /보안|취약|안전|도난|인증/.test(searchableText);
  }

  if (filter === "AI") {
    return /\bai\b|openai/.test(searchableText);
  }

  return /백엔드|mongodb|postgresql|prisma|mongoose|auth\.js|api/.test(
    searchableText,
  );
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("전체");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesQuery = [
        project.title,
        project.summary,
        ...project.techStack,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesQuery && matchesFilter(project, activeFilter);
    });
  }, [activeFilter, projects, query]);

  return (
    <div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <label htmlFor="project-search" className="sr-only">
          프로젝트 검색
        </label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="프로젝트 검색..."
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-wrap gap-2" aria-label="프로젝트 카테고리">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-7 text-sm text-zinc-500" aria-live="polite">
        {filteredProjects.length}개의 프로젝트
      </p>

      {filteredProjects.length > 0 ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-16 text-center">
          <p className="font-semibold text-zinc-800">검색 결과가 없습니다.</p>
          <p className="mt-2 text-sm text-zinc-500">
            다른 검색어나 카테고리를 선택해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}
