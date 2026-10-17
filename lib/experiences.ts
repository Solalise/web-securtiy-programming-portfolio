import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import ExperienceModel, { type ExperienceDocument } from "@/models/Experience";
import type {
  AdminExperience,
  Experience,
  ExperienceCategory,
  ExperienceInput,
} from "@/types/experience";

type HydratedExperience = HydratedDocument<ExperienceDocument>;

export class ExperienceNotFoundError extends Error {}

let categoryMigration: Promise<void> | null = null;

async function migrateLegacyCategories(): Promise<void> {
  categoryMigration ??= ExperienceModel.collection.updateMany(
    { category: "development" as ExperienceCategory },
    { $set: { category: "general" } },
  ).then(() => undefined).catch((error: unknown) => {
    categoryMigration = null;
    throw error;
  });
  await categoryMigration;
}

function toExperience(document: HydratedExperience): Experience {
  return {
    id: document._id.toString(),
    title: document.title,
    category: document.category,
    summary: document.summary,
    organization: document.organization || undefined,
    startDate: document.startDate || undefined,
    endDate: document.endDate || undefined,
    technologies: [...document.technologies],
    overview: document.overview,
    roleAndObjectives: document.roleAndObjectives || undefined,
    process: document.process || undefined,
    problemsAndSolutions: document.problemsAndSolutions || undefined,
    resultsAndLearnings: document.resultsAndLearnings || undefined,
    images: [...document.images],
    references: document.references.map((reference) => ({
      label: reference.label,
      url: reference.url,
    })),
    featured: document.featured,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}

function toAdminExperience(document: HydratedExperience): AdminExperience {
  return { ...toExperience(document), databaseId: document._id.toString() };
}

export async function getExperiences(
  category?: ExperienceCategory,
): Promise<Experience[]> {
  await connectDB();
  await migrateLegacyCategories();
  const filter = category ? { category } : {};
  const documents = await ExperienceModel.find(filter)
    .sort({ startDate: -1, createdAt: -1 })
    .exec();
  return documents.map(toExperience);
}

export async function getFeaturedExperiences(): Promise<Experience[]> {
  await connectDB();
  await migrateLegacyCategories();
  const documents = await ExperienceModel.find({ featured: true })
    .sort({ updatedAt: -1 })
    .exec();
  const order: ExperienceCategory[] = ["activity", "security", "general"];
  return order.flatMap((category) => {
    const item = documents.find((document) => document.category === category);
    return item ? [toExperience(item)] : [];
  });
}

export async function getExperience(id: string): Promise<Experience | null> {
  if (!isValidObjectId(id)) return null;
  await connectDB();
  await migrateLegacyCategories();
  const document = await ExperienceModel.findById(id).exec();
  return document ? toExperience(document) : null;
}

export async function getAdminExperiences(): Promise<AdminExperience[]> {
  await connectDB();
  await migrateLegacyCategories();
  const documents = await ExperienceModel.find()
    .sort({ updatedAt: -1 })
    .exec();
  return documents.map(toAdminExperience);
}

export async function getAdminExperience(id: string): Promise<AdminExperience | null> {
  if (!isValidObjectId(id)) return null;
  await connectDB();
  await migrateLegacyCategories();
  const document = await ExperienceModel.findById(id).exec();
  return document ? toAdminExperience(document) : null;
}

export async function createExperience(input: ExperienceInput): Promise<AdminExperience> {
  await connectDB();
  const document = await ExperienceModel.create(input);
  return toAdminExperience(document);
}

export async function updateExperience(
  id: string,
  input: ExperienceInput,
): Promise<AdminExperience> {
  if (!isValidObjectId(id)) throw new ExperienceNotFoundError();
  await connectDB();
  const document = await ExperienceModel.findByIdAndUpdate(id, input, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
  if (!document) throw new ExperienceNotFoundError();
  return toAdminExperience(document);
}

export async function deleteExperience(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new ExperienceNotFoundError();
  await connectDB();
  const document = await ExperienceModel.findByIdAndDelete(id).exec();
  if (!document) throw new ExperienceNotFoundError();
}
