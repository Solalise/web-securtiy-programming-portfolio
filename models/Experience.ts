import { model, models, Schema, type Model } from "mongoose";

import type { ExperienceCategory } from "@/types/experience";

export interface ExperienceDocument {
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
  references: Array<{ label: string; url: string }>;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const referenceSchema = new Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 100 },
    url: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { _id: false },
);

const experienceSchema = new Schema<ExperienceDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: {
      type: String,
      required: true,
      enum: ["activity", "security", "general"],
      index: true,
    },
    summary: { type: String, required: true, trim: true, maxlength: 300 },
    organization: { type: String, trim: true, maxlength: 120 },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    technologies: { type: [String], default: [] },
    overview: { type: String, required: true, trim: true, maxlength: 5000 },
    roleAndObjectives: { type: String, trim: true, maxlength: 5000 },
    process: { type: String, trim: true, maxlength: 10000 },
    problemsAndSolutions: { type: String, trim: true, maxlength: 10000 },
    resultsAndLearnings: { type: String, trim: true, maxlength: 10000 },
    images: { type: [String], default: [] },
    references: { type: [referenceSchema], default: [] },
    featured: { type: Boolean, required: true, default: false, index: true },
  },
  { timestamps: true },
);

experienceSchema.index({ category: 1, featured: -1, startDate: -1 });

const ExperienceModel =
  (models.Experience as Model<ExperienceDocument> | undefined) ??
  model<ExperienceDocument>("Experience", experienceSchema);

export default ExperienceModel;
