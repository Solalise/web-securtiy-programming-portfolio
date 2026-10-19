"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/lib/experiences";
import { requireAdmin } from "@/lib/require-admin";
import type {
  ExperienceCategory,
  ExperienceInput,
  ExperienceReference,
  ExperienceStatus,
} from "@/types/experience";

const categories = new Set<ExperienceCategory>([
  "activity",
  "security",
  "general",
]);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const statuses = new Set<ExperienceStatus>(["completed", "in-progress"]);

function getText(formData: FormData, name: string, maxLength: number): string {
  return String(formData.get(name) ?? "").trim().slice(0, maxLength);
}

function getList(formData: FormData, name: string, maxItems = 20): string[] {
  return getText(formData, name, 6000)
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function getReferences(formData: FormData): ExperienceReference[] {
  return getText(formData, "references", 8000)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 20)
    .map((line) => {
      const separator = line.indexOf("|");
      if (separator === -1) return { label: "관련 자료", url: line };
      return {
        label: line.slice(0, separator).trim().slice(0, 100) || "관련 자료",
        url: line.slice(separator + 1).trim(),
      };
    });
}

function parseExperienceForm(formData: FormData): {
  input?: ExperienceInput;
  error?: "required" | "invalid-category" | "invalid-status" | "invalid-date" | "invalid-url";
} {
  const categoryValue = getText(formData, "category", 30) as ExperienceCategory;
  if (!categories.has(categoryValue)) return { error: "invalid-category" };
  const status = getText(formData, "status", 20) as ExperienceStatus;
  if (!statuses.has(status)) return { error: "invalid-status" };

  const title = getText(formData, "title", 120);
  const summary = getText(formData, "summary", 300);
  const overview = getText(formData, "overview", 5000);
  if (!title || !summary || !overview) return { error: "required" };

  const startDate = getText(formData, "startDate", 10);
  const endDate = getText(formData, "endDate", 10);
  if (
    (startDate && !datePattern.test(startDate)) ||
    (endDate && !datePattern.test(endDate)) ||
    (startDate && endDate && startDate > endDate)
  ) {
    return { error: "invalid-date" };
  }

  const images = getList(formData, "images", 12);
  const references = getReferences(formData);
  if (images.some((url) => !isHttpUrl(url)) || references.some(({ url }) => !isHttpUrl(url))) {
    return { error: "invalid-url" };
  }

  return {
    input: {
      title,
      category: categoryValue,
      summary,
      organization: getText(formData, "organization", 120) || undefined,
      environment: getText(formData, "environment", 500) || undefined,
      status,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      technologies: getList(formData, "technologies"),
      overview,
      roleAndObjectives: getText(formData, "roleAndObjectives", 5000) || undefined,
      process: getText(formData, "process", 10000) || undefined,
      problemsAndSolutions: getText(formData, "problemsAndSolutions", 10000) || undefined,
      resultsAndLearnings: getText(formData, "resultsAndLearnings", 10000) || undefined,
      results: getText(formData, "results", 10000) || undefined,
      learnings: getText(formData, "learnings", 10000) || undefined,
      images,
      references,
      featured: formData.get("featured") === "on",
    },
  };
}

function refreshExperiencePaths(id?: string): void {
  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath("/admin/experiences");
  if (id) revalidatePath(`/experiences/${id}`);
}

export async function createExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = parseExperienceForm(formData);
  if (!parsed.input) redirect(`/admin/experiences/new?error=${parsed.error}`);

  try {
    const experience = await createExperience(parsed.input);
    refreshExperiencePaths(experience.id);
  } catch {
    redirect("/admin/experiences/new?error=save-failed");
  }
  redirect("/admin/experiences");
}

export async function updateExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const databaseId = getText(formData, "databaseId", 100);
  const editPath = `/admin/experiences/${databaseId}/edit`;
  const parsed = parseExperienceForm(formData);
  if (!parsed.input) redirect(`${editPath}?error=${parsed.error}`);

  try {
    await updateExperience(databaseId, parsed.input);
    refreshExperiencePaths(databaseId);
  } catch {
    redirect(`${editPath}?error=save-failed`);
  }
  redirect("/admin/experiences");
}

export async function deleteExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const databaseId = getText(formData, "databaseId", 100);
  await deleteExperience(databaseId);
  refreshExperiencePaths(databaseId);
  redirect("/admin/experiences");
}
