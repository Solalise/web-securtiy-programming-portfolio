export type ExperienceCategory = "activity" | "security" | "general";
export type ExperienceStatus = "completed" | "in-progress";

export type ExperienceReference = {
  label: string;
  url: string;
};

export type ExperienceDetailSection = {
  title: string;
  subtitle: string;
  content: string;
};

export type Experience = {
  id: string;
  title: string;
  category: ExperienceCategory;
  summary: string;
  organization?: string;
  environment?: string;
  status?: ExperienceStatus;
  startDate?: string;
  endDate?: string;
  technologies: string[];
  overview: string;
  roleAndObjectives?: string;
  process?: string;
  problemsAndSolutions?: string;
  resultsAndLearnings?: string;
  results?: string;
  learnings?: string;
  detailSections?: ExperienceDetailSection[];
  images: string[];
  references: ExperienceReference[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ExperienceInput = Omit<Experience, "id" | "createdAt" | "updatedAt">;

export type AdminExperience = Experience & { databaseId: string };
