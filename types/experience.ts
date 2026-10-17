export type ExperienceCategory = "activity" | "security" | "general";

export type ExperienceReference = {
  label: string;
  url: string;
};

export type Experience = {
  id: string;
  title: string;
  category: ExperienceCategory;
  summary: string;
  organization?: string;
  startDate?: string;
  endDate?: string;
  technologies: string[];
  overview: string;
  roleAndObjectives?: string;
  process?: string;
  problemsAndSolutions?: string;
  resultsAndLearnings?: string;
  images: string[];
  references: ExperienceReference[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ExperienceInput = Omit<Experience, "id" | "createdAt" | "updatedAt">;

export type AdminExperience = Experience & { databaseId: string };
