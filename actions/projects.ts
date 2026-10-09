"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createProject,
  deleteProject,
  ProjectNotFoundError,
  ProjectSlugConflictError,
  type ProjectInput,
  updateProject,
} from "@/lib/projects";
import { requireAdmin } from "@/lib/require-admin";

type RequiredProjectField =
  | "title"
  | "slug"
  | "summary"
  | "category"
  | "status";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getText(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function getList(formData: FormData, name: string): string[] {
  return getText(formData, name)
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseProjectForm(formData: FormData): {
  input: ProjectInput;
  fieldErrors: Partial<Record<RequiredProjectField, string>>;
} {
  const input: ProjectInput = {
    title: getText(formData, "title"),
    slug: getText(formData, "slug"),
    summary: getText(formData, "summary"),
    category: getText(formData, "category"),
    status: getText(formData, "status"),
    techStack: getList(formData, "techStack"),
    thumbnail: getText(formData, "thumbnail") || undefined,
    overview: getText(formData, "overview"),
    problem: getText(formData, "problem"),
    features: getList(formData, "features"),
    role: getText(formData, "role"),
    troubleshooting: getText(formData, "troubleshooting"),
    learned: getList(formData, "learned"),
    githubUrl: getText(formData, "githubUrl") || undefined,
    demoUrl: getText(formData, "demoUrl") || undefined,
    period: getText(formData, "period") || undefined,
    teamSize: getText(formData, "teamSize") || undefined,
    featured: formData.get("featured") === "on",
  };

  const fieldErrors: Partial<Record<RequiredProjectField, string>> = {};

  for (const field of [
    "title",
    "slug",
    "summary",
    "category",
    "status",
  ] as const) {
    if (!input[field]) {
      fieldErrors[field] = "필수 입력값입니다.";
    }
  }

  if (input.slug && !slugPattern.test(input.slug)) {
    fieldErrors.slug =
      "영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.";
  }

  return { input, fieldErrors };
}

function revalidateProjectPaths(...slugs: string[]): void {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");

  for (const slug of new Set(slugs)) {
    revalidatePath(`/projects/${slug}`);
  }
}

export async function createProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const { input, fieldErrors } = parseProjectForm(formData);

  if (Object.keys(fieldErrors).length > 0) {
    const errorCode = fieldErrors.slug ? "invalid-slug" : "required";
    redirect(`/admin/projects/new?error=${errorCode}`);
  }

  let errorCode: string | null = null;

  try {
    const project = await createProject(input);
    revalidateProjectPaths(project.id);
  } catch (error: unknown) {
    if (error instanceof ProjectSlugConflictError) {
      errorCode = "duplicate-slug";
    } else {
      errorCode = "save-failed";
    }
  }

  if (errorCode) {
    redirect(`/admin/projects/new?error=${errorCode}`);
  }

  redirect("/admin/projects");
}

export async function updateProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const databaseId = getText(formData, "databaseId");
  const { input, fieldErrors } = parseProjectForm(formData);
  const editPath = `/admin/projects/${databaseId}/edit`;

  if (Object.keys(fieldErrors).length > 0) {
    const errorCode = fieldErrors.slug ? "invalid-slug" : "required";
    redirect(`${editPath}?error=${errorCode}`);
  }

  let errorCode: string | null = null;

  try {
    const { project, previousSlug } = await updateProject(databaseId, input);
    revalidateProjectPaths(previousSlug, project.id);
  } catch (error: unknown) {
    if (error instanceof ProjectSlugConflictError) {
      errorCode = "duplicate-slug";
    } else if (error instanceof ProjectNotFoundError) {
      errorCode = "not-found";
    } else {
      errorCode = "save-failed";
    }
  }

  if (errorCode) {
    redirect(`${editPath}?error=${errorCode}`);
  }

  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const databaseId = getText(formData, "databaseId");
  const project = await deleteProject(databaseId);

  revalidateProjectPaths(project.id);
  redirect("/admin/projects");
}
