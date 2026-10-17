import { model, models, Schema, type Model } from "mongoose";

import type { GoalStatus, PortfolioItemKind } from "@/types/portfolio-content";

export interface PortfolioItemDocument {
  kind: PortfolioItemKind; title: string; description?: string; year?: number; category?: string;
  status?: GoalStatus; achievedAt?: string; order: number; organization?: string; date?: string;
  period?: string; link?: string; createdAt: Date; updatedAt: Date;
}

const portfolioItemSchema = new Schema<PortfolioItemDocument>({
  kind: { type: String, required: true, enum: ["goal", "award", "certification", "roadmap"], index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 3000 },
  year: { type: Number, min: 2000, max: 2200 },
  category: { type: String, trim: true, maxlength: 100 },
  status: { type: String, enum: ["planned", "in-progress", "completed"] },
  achievedAt: { type: String, trim: true },
  order: { type: Number, required: true, default: 0 },
  organization: { type: String, trim: true, maxlength: 160 },
  date: { type: String, trim: true },
  period: { type: String, trim: true, maxlength: 100 },
  link: { type: String, trim: true, maxlength: 500 },
}, { timestamps: true });

portfolioItemSchema.index({ kind: 1, year: -1, order: 1 });
const PortfolioItemModel = (models.PortfolioItem as Model<PortfolioItemDocument> | undefined) ?? model<PortfolioItemDocument>("PortfolioItem", portfolioItemSchema);
export default PortfolioItemModel;
