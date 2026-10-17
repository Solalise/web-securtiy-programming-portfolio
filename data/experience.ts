import type { ExperienceCategory } from "@/types/experience";

export const experienceCategories: ReadonlyArray<{
  value: ExperienceCategory;
  label: string;
  shortLabel: string;
}> = [
  { value: "activity", label: "Activities", shortLabel: "대외활동" },
  { value: "security", label: "Security Labs", shortLabel: "보안 실습" },
  { value: "general", label: "General Labs", shortLabel: "일반 실습" },
];

export function getExperienceCategoryLabel(category: ExperienceCategory): string {
  return experienceCategories.find((item) => item.value === category)?.label ?? category;
}

export function getExperienceCategoryShortLabel(category: ExperienceCategory): string {
  return experienceCategories.find((item) => item.value === category)?.shortLabel ?? category;
}
