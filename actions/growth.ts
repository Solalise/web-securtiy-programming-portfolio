"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getExperience } from "@/lib/experiences";
import { createGrowthEvent, deleteGrowthEvent, updateGrowthEvent } from "@/lib/growth";
import { getProject } from "@/lib/projects";
import { requireAdmin } from "@/lib/require-admin";
import type { GrowthEventInput, GrowthPointType } from "@/types/growth";

const types = new Set<GrowthPointType>(["enrollment", "military", "return", "project", "activity", "lab", "other"]);
const text = (data: FormData, name: string, max = 1000) => String(data.get(name) ?? "").trim().slice(0, max);
const list = (data: FormData, name: string) => [...new Set(text(data, name, 4000).split(/[\n,]/).map((item) => item.trim()).filter(Boolean))].slice(0, 30);

async function parseGrowthEvent(formData: FormData): Promise<GrowthEventInput | null> {
  const date = text(formData, "date", 10);
  const title = text(formData, "title", 160);
  const description = text(formData, "description", 1000);
  const type = text(formData, "type", 30) as GrowthPointType;
  const growthValue = Number(text(formData, "growthValue", 20));
  const linkedRecord = text(formData, "linkedRecord", 140);
  const separator = linkedRecord.indexOf(":");
  const linkType = separator > 0 ? linkedRecord.slice(0, separator) : "none";
  const linkedId = separator > 0 ? linkedRecord.slice(separator + 1) : undefined;

  if (!date || !title || !description || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date > new Date().toISOString().slice(0, 10) || !types.has(type) || !Number.isFinite(growthValue) || growthValue < 0 || growthValue > 1000) return null;
  if (linkType === "project" && (!linkedId || !await getProject(linkedId))) return null;
  if (linkType === "experience" && (!linkedId || !await getExperience(linkedId))) return null;
  if (!["none", "project", "experience"].includes(linkType)) return null;

  return {
    date,
    title,
    description,
    growthValue,
    type,
    technologies: list(formData, "technologies"),
    linkedProjectId: linkType === "project" ? linkedId : undefined,
    linkedExperienceId: linkType === "experience" ? linkedId : undefined,
    visible: formData.get("visible") === "on",
  };
}

function refreshGrowth(): void {
  revalidatePath("/about");
}

export async function createGrowthEventAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const input = await parseGrowthEvent(formData);
  if (!input) redirect("/about?error=invalid#growth-admin");
  await createGrowthEvent(input);
  refreshGrowth();
  redirect("/about?saved=created#growth-admin");
}

export async function updateGrowthEventAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "databaseId", 100);
  const input = await parseGrowthEvent(formData);
  if (!input) redirect("/about?error=invalid#growth-admin");
  await updateGrowthEvent(id, input);
  refreshGrowth();
  redirect("/about?saved=updated#growth-admin");
}

export async function deleteGrowthEventAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await deleteGrowthEvent(text(formData, "databaseId", 100));
  refreshGrowth();
  redirect("/about?saved=deleted#growth-admin");
}
