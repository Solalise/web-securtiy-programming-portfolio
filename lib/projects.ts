import { cache } from "react";
import { isValidObjectId, type HydratedDocument } from "mongoose";
import { connection } from "next/server";

import { projects as seedProjects } from "@/data/projects";
import { connectDB } from "@/lib/mongodb";
import ProjectModel, { type ProjectDocument } from "@/models/Project";
import type { Project } from "@/types/project";

export type ProjectInput = Omit<Project, "id" | "status" | "createdAt"> & {
  slug: string;
  status: string;
};

export type AdminProject = Project & {
  databaseId: string;
  status: string;
};

export class ProjectSlugConflictError extends Error {}

export class ProjectNotFoundError extends Error {}

type ProjectSeedState = {
  version: string;
  promise: Promise<void> | null;
};

// 새 초기 프로젝트를 추가했을 때 개발 서버의 전역 캐시도 한 번 갱신합니다.
const projectSeedVersion = "web-server-security-v1";

const globalForProjectSeed = globalThis as typeof globalThis & {
  projectSeedState?: ProjectSeedState;
};

const seedState =
  globalForProjectSeed.projectSeedState?.version === projectSeedVersion
    ? globalForProjectSeed.projectSeedState
    : { version: projectSeedVersion, promise: null };

globalForProjectSeed.projectSeedState = seedState;

type HydratedProject = HydratedDocument<ProjectDocument>;

function toProject(document: HydratedProject): Project {
  const project = {
    id: document.slug,
    title: document.title,
    summary: document.summary,
    category: document.category,
    techStack: [...document.techStack],
    thumbnail: document.thumbnail ?? undefined,
    overview: document.overview,
    problem: document.problem,
    features: [...document.features],
    role: document.role,
    troubleshooting: document.troubleshooting,
    learned: [...document.learned],
    githubUrl: document.githubUrl ?? undefined,
    demoUrl: document.demoUrl ?? undefined,
    period: document.period ?? undefined,
    teamSize: document.teamSize ?? undefined,
    status: document.status,
    featured: document.featured,
    createdAt: document.createdAt.toISOString(),
  };

  return project.id === "security-guide"
    ? {
        ...project,
        techStack: ["HTML", "CSS", "JavaScript"],
        thumbnail: "/images/projects/security-guide.png",
        teamSize: "팀 프로젝트",
        status: "완료",
      }
    : project.id === "repotutor"
      ? {
          ...project,
          ...seedProjects.find((seedProject) => seedProject.id === "repotutor"),
          createdAt: project.createdAt,
        }
    : project;
}

function toAdminProject(document: HydratedProject): AdminProject {
  return {
    ...toProject(document),
    databaseId: document._id.toString(),
    status: document.status,
  };
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

async function seedProjectsIfEmpty(): Promise<void> {
  if (!seedState.promise) {
    seedState.promise = (async () => {
      await connectDB();
      await ProjectModel.init();

      await ProjectModel.bulkWrite(
        seedProjects.map(({ id, ...project }) => ({
          updateOne: {
            filter: { slug: id },
            update: {
              $setOnInsert: {
                slug: id,
                ...project,
              },
            },
            upsert: true,
          },
        })),
      );
    })().catch((error: unknown) => {
      seedState.promise = null;
      throw error;
    });
  }

  await seedState.promise;
}

export async function getProjects(): Promise<Project[]> {
  await seedProjectsIfEmpty();

  const projects = await ProjectModel.find().sort({ _id: 1 }).exec();

  return projects.map(toProject);
}

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  await connection();
  await seedProjectsIfEmpty();

  const projects = await ProjectModel.find()
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .exec();

  return projects.map(toProject);
}

export async function getAdminProjects(): Promise<AdminProject[]> {
  await seedProjectsIfEmpty();

  const projects = await ProjectModel.find().sort({ _id: 1 }).exec();

  return projects.map(toAdminProject);
}

export const getProject = cache(
  async (slug: string): Promise<Project | null> => {
    await seedProjectsIfEmpty();

    const project = await ProjectModel.findOne({ slug }).exec();

    return project ? toProject(project) : null;
  },
);

export async function getAdminProject(
  databaseId: string,
): Promise<AdminProject | null> {
  if (!isValidObjectId(databaseId)) {
    return null;
  }

  await seedProjectsIfEmpty();

  const project = await ProjectModel.findById(databaseId).exec();

  return project ? toAdminProject(project) : null;
}

export async function createProject(input: ProjectInput): Promise<AdminProject> {
  await connectDB();
  await ProjectModel.init();

  try {
    const project = await ProjectModel.create(input);

    return toAdminProject(project);
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      throw new ProjectSlugConflictError();
    }

    throw error;
  }
}

export async function updateProject(
  databaseId: string,
  input: ProjectInput,
): Promise<{ project: AdminProject; previousSlug: string }> {
  if (!isValidObjectId(databaseId)) {
    throw new ProjectNotFoundError();
  }

  await connectDB();

  const existingProject = await ProjectModel.findById(databaseId).exec();

  if (!existingProject) {
    throw new ProjectNotFoundError();
  }

  const previousSlug = existingProject.slug;

  try {
    const project = await ProjectModel.findByIdAndUpdate(databaseId, input, {
      returnDocument: "after",
      runValidators: true,
    }).exec();

    if (!project) {
      throw new ProjectNotFoundError();
    }

    return { project: toAdminProject(project), previousSlug };
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      throw new ProjectSlugConflictError();
    }

    throw error;
  }
}

export async function deleteProject(databaseId: string): Promise<AdminProject> {
  if (!isValidObjectId(databaseId)) {
    throw new ProjectNotFoundError();
  }

  await connectDB();

  const project = await ProjectModel.findByIdAndDelete(databaseId).exec();

  if (!project) {
    throw new ProjectNotFoundError();
  }

  return toAdminProject(project);
}
