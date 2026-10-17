import { model, models, Schema, type Model } from "mongoose";

import type { GrowthPointType } from "@/types/growth";

export interface GrowthEventDocument {
  date: string;
  title: string;
  description: string;
  growthValue?: number;
  type?: GrowthPointType;
  technologies: string[];
  linkedProjectId?: string;
  linkedExperienceId?: string;
  visible?: boolean;
  category?: string;
  linkType?: string;
  linkedId?: string;
  showInTimeline?: boolean;
  countAsExperience?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const growthEventSchema = new Schema<GrowthEventDocument>({
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  growthValue: { type: Number, min: 0, max: 1000, default: 0 },
  type: { type: String, enum: ["enrollment", "military", "return", "project", "activity", "lab", "other"], default: "other", index: true },
  technologies: { type: [String], default: [] },
  linkedProjectId: { type: String, trim: true, maxlength: 100 },
  linkedExperienceId: { type: String, trim: true, maxlength: 100 },
  visible: { type: Boolean, default: true, index: true },
  category: { type: String },
  linkType: { type: String },
  linkedId: { type: String },
  showInTimeline: { type: Boolean },
  countAsExperience: { type: Boolean },
}, { timestamps: true });

growthEventSchema.index({ date: 1, createdAt: 1 });

const GrowthEventModel = (models.GrowthEvent as Model<GrowthEventDocument> | undefined) ?? model<GrowthEventDocument>("GrowthEvent", growthEventSchema);
export default GrowthEventModel;
