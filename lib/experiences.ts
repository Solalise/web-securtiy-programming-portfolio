import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import { initialExperiences } from "@/data/experiences";
import { experienceDetailOverrides } from "@/data/experience-detail-overrides";
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
let seedPromise: Promise<void> | null = null;

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

async function seedExperiencesIfEmpty(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      await connectDB();
      await ExperienceModel.bulkWrite(
        initialExperiences.map((experience) => ({
          updateOne: {
            filter: { title: experience.title },
            update: { $setOnInsert: experience },
            upsert: true,
          },
        })),
      );
    })().catch((error: unknown) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

function toExperience(document: HydratedExperience): Experience {
  const seeded = initialExperiences.find((item) => item.title === document.title);
  const detailOverride = experienceDetailOverrides[document.title];
  return {
    id: document._id.toString(),
    title: document.title,
    category: document.category,
    summary: seeded?.summary ?? document.summary,
    organization: seeded?.organization ?? (document.organization || undefined),
    environment: detailOverride?.environment ?? seeded?.environment ?? (document.environment || undefined),
    status: detailOverride?.status ?? seeded?.status ?? document.status ?? "completed",
    startDate: document.startDate || undefined,
    endDate: document.endDate || undefined,
    technologies: detailOverride?.technologies ?? seeded?.technologies ?? [...document.technologies],
    overview: seeded?.overview ?? document.overview,
    roleAndObjectives: seeded?.roleAndObjectives ?? (document.roleAndObjectives || undefined),
    process: seeded?.process ?? (document.process || undefined),
    problemsAndSolutions: seeded?.problemsAndSolutions ?? (document.problemsAndSolutions || undefined),
    resultsAndLearnings: seeded?.resultsAndLearnings ?? (document.resultsAndLearnings || undefined),
    results: seeded?.results ?? (document.results || undefined),
    learnings: seeded?.learnings ?? (document.learnings || undefined),
    detailSections: detailOverride?.detailSections,
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
  await seedExperiencesIfEmpty();
  await migrateLegacyCategories();
  const filter = category ? { category } : {};
  const documents = await ExperienceModel.find(filter)
    .sort({ startDate: -1, createdAt: -1 })
    .exec();
  return documents.map(toExperience);
}

export async function getFeaturedExperiences(): Promise<Experience[]> {
  await seedExperiencesIfEmpty();
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
  await seedExperiencesIfEmpty();
  await migrateLegacyCategories();
  const document = await ExperienceModel.findById(id).exec();
  return document ? toExperience(document) : null;
}

export async function getAdminExperiences(): Promise<AdminExperience[]> {
  await seedExperiencesIfEmpty();
  await migrateLegacyCategories();
  const documents = await ExperienceModel.find()
    .sort({ updatedAt: -1 })
    .exec();
  return documents.map(toAdminExperience);
}

export async function getAdminExperience(id: string): Promise<AdminExperience | null> {
  if (!isValidObjectId(id)) return null;
  await seedExperiencesIfEmpty();
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
