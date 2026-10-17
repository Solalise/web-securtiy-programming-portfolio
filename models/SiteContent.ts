import { model, models, Schema, type Model } from "mongoose";

import type { SiteContent } from "@/types/portfolio-content";

export interface SiteContentDocument extends SiteContent { key: "main"; createdAt: Date; updatedAt: Date }

const siteContentSchema = new Schema<SiteContentDocument>({
  key: { type: String, required: true, unique: true, enum: ["main"] },
  hero: {
    eyebrow: { type: String, required: true, trim: true, maxlength: 100 },
    titleBefore: { type: String, required: true, trim: true, maxlength: 100 },
    titleAccent: { type: String, required: true, trim: true, maxlength: 100 },
    titleAfter: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 800 },
  },
  about: {
    initials: { type: String, required: true, trim: true, maxlength: 10 },
    profileImage: { type: String, trim: true, maxlength: 2200000 },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    schoolMajor: { type: String, required: true, trim: true, maxlength: 160 },
    club: { type: String, required: true, trim: true, maxlength: 160 },
    interestSummary: { type: String, required: true, trim: true, maxlength: 300 },
    paragraphs: { type: [String], default: [] },
    securityFocus: { type: String, required: true, trim: true, maxlength: 2000 },
    currentStudy: { type: String, required: true, trim: true, maxlength: 2000 },
    futureDirection: { type: String, required: true, trim: true, maxlength: 2000 },
    extraTechnologies: { type: [String], default: [] },
  },
}, { timestamps: true });

const SiteContentModel = (models.SiteContent as Model<SiteContentDocument> | undefined) ?? model<SiteContentDocument>("SiteContent", siteContentSchema);
export default SiteContentModel;
