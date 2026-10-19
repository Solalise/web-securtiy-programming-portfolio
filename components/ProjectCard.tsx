"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { likeProjectAction } from "@/actions/project-interactions";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import { getProjectStatusLabel } from "@/data/projects";
import { projectImagePaths } from "@/data/site";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  interactionCount: { likes: number; comments: number };
  likedByCurrentUser: boolean;
  onOpenComments: () => void;
};

export default function ProjectCard({
  project,
  interactionCount,
  likedByCurrentUser,
  onOpenComments,
}: ProjectCardProps) {
  const [likes, setLikes] = useState(interactionCount.likes);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    if (isPending) return;
    startTransition(async () => {
      const result = await likeProjectAction(project.id);
      setMessage(result.message);
      if (result.ok && typeof result.count === "number") {
        setLikes(result.count);
        setIsLiked(Boolean(result.liked));
      }
    });
  }

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
        <div className="mt-6 flex items-center border-t border-zinc-200 pt-4 text-sm font-medium text-zinc-500" aria-label="프로젝트 반응 수">
          <button
            type="button"
            onClick={handleLike}
            disabled={isPending}
            aria-pressed={isLiked}
            className={`transition-colors ${isLiked ? "text-blue-600" : "hover:text-blue-600"} disabled:cursor-default`}
            title={isLiked ? "좋아요 취소" : "좋아요"}
          >
            {isLiked ? "♥" : "♡"} {likes}
          </button>
          <button
            type="button"
            onClick={onOpenComments}
            className="ml-5 transition-colors hover:text-blue-600"
            aria-label={`댓글 ${interactionCount.comments}개 보기 및 작성`}
          >
            ◯ {interactionCount.comments}
          </button>
          <Link
            href={`/projects/${project.id}`}
            className="ml-auto text-zinc-700 transition-colors group-hover:text-blue-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            자세히 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
        {message ? <p className="mt-2 text-xs text-zinc-500" role="status">{message}</p> : null}
      </div>
    </article>
  );
}
