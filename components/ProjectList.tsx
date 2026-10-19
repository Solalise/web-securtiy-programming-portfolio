"use client";

import { useMemo, useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";

const filters = ["전체", "개인 프로젝트", "팀 프로젝트"] as const;

type ProjectFilter = (typeof filters)[number];

type ProjectListProps = {
  projects: Project[];
};

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "전체") return true;
  const isTeamProject = project.teamSize?.includes("팀") ?? false;
  return filter === "팀 프로젝트" ? isTeamProject : !isTeamProject;
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

        <div className="mt-4 flex flex-wrap gap-2" aria-label="프로젝트 유형">
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
