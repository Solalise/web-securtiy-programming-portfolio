export type GrowthPointType = "enrollment" | "military" | "return" | "project" | "activity" | "lab" | "other";

export type GrowthEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  growthValue: number;
  type: GrowthPointType;
  technologies: string[];
  linkedProjectId?: string;
  linkedExperienceId?: string;
  visible: boolean;
};

export type GrowthEventInput = Omit<GrowthEvent, "id">;
export type GrowthChartEntry = {
  key: string;
  title: string;
  type: GrowthPointType;
  href?: string;
};
export type GrowthChartPoint = {
  id: string;
  date: string;
  label: string;
  title: string;
  description: string;
  growthValue: number;
  type: GrowthPointType;
  href?: string;
  entries: GrowthChartEntry[];
};
export type GrowthTimelineItem = GrowthChartEntry & {
  date: string;
  description: string;
  technologies: string[];
};
