import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import {
  normalizeContactStatus,
  type ContactCategory,
  type ContactStatus,
} from "@/data/contact";
import { connectDB } from "@/lib/mongodb";
import ContactModel, { type ContactDocument } from "@/models/Contact";
import ContactRateLimitModel from "@/models/ContactRateLimit";

export type ContactInput = {
  name: string;
  email: string;
  category: ContactCategory;
  title: string;
  content: string;
  isPrivate: boolean;
  passwordHash: string;
};

type ContactBase = {
  id: string;
  name: string;
  category: ContactCategory;
  title: string;
  content: string;
  status: ContactStatus;
  isPrivate: boolean;
  answer?: string;
  answeredAt?: string;
  answerUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicContact = ContactBase;

export type PublicContactListItem = Omit<
  PublicContact,
  "content" | "answer" | "answeredAt" | "answerUpdatedAt" | "updatedAt"
>;

export type AdminContact = ContactBase & { email: string };

export type AdminContactListItem = Omit<AdminContact, "email" | "content">;

export type ContactPageResult = {
  contacts: PublicContactListItem[];
  page: number;
  totalPages: number;
  totalItems: number;
};

export class ContactNotFoundError extends Error {}

type HydratedContact = HydratedDocument<ContactDocument>;

function serializeContact(document: HydratedContact): AdminContact {
  return {
    id: document._id.toString(),
    name: document.name,
    email: document.email,
    category: document.category as ContactCategory,
    title: document.title,
    content: document.content,
    status: normalizeContactStatus(document.status),
    isPrivate: document.isPrivate ?? false,
    answer: document.answer || undefined,
    answeredAt: document.answeredAt?.toISOString(),
    answerUpdatedAt: document.answerUpdatedAt?.toISOString(),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}

export async function createContact(input: ContactInput): Promise<string> {
  await connectDB();
  const contact = await ContactModel.create({ ...input, status: "pending" });
  return contact._id.toString();
}

export async function getPublicContacts({
  page,
  query,
  pageSize = 10,
}: {
  page: number;
  query: string;
  pageSize?: number;
}): Promise<ContactPageResult> {
  await connectDB();

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = escapedQuery
    ? {
        isPrivate: { $ne: true },
        $or: [
          { title: { $regex: escapedQuery, $options: "i" } },
          { content: { $regex: escapedQuery, $options: "i" } },
        ],
      }
    : {};
  const totalItems = await ContactModel.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const contacts = await ContactModel.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .select({ name: 1, title: 1, category: 1, status: 1, isPrivate: 1, createdAt: 1 })
    .exec();

  return {
    contacts: contacts.map((contact) => ({
      id: contact._id.toString(),
      name: contact.name,
      category: contact.category as ContactCategory,
      title: contact.title,
      status: normalizeContactStatus(contact.status),
      isPrivate: contact.isPrivate ?? false,
      createdAt: contact.createdAt.toISOString(),
    })),
    page: safePage,
    totalPages,
    totalItems,
  };
}

export async function getPublicContact(id: string): Promise<PublicContact | null> {
  if (!isValidObjectId(id)) return null;
  await connectDB();
  const contact = await ContactModel.findById(id)
    .select({ email: 0, passwordHash: 0 })
    .exec();
  if (!contact) return null;
  return {
    id: contact._id.toString(),
    name: contact.name,
    category: contact.category as ContactCategory,
    title: contact.title,
    content: contact.content,
    status: normalizeContactStatus(contact.status),
    isPrivate: contact.isPrivate ?? false,
    answer: contact.answer || undefined,
    answeredAt: contact.answeredAt?.toISOString(),
    answerUpdatedAt: contact.answerUpdatedAt?.toISOString(),
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  };
}

export async function getContactPasswordHash(id: string): Promise<string | null> {
  if (!isValidObjectId(id)) return null;
  await connectDB();
  const contact = await ContactModel.findById(id).select("+passwordHash").exec();
  return contact?.passwordHash ?? null;
}

export async function updateContactByAuthor(
  id: string,
  input: Omit<ContactInput, "passwordHash">,
): Promise<void> {
  if (!isValidObjectId(id)) throw new ContactNotFoundError();
  await connectDB();
  const contact = await ContactModel.findByIdAndUpdate(id, input, {
    runValidators: true,
    returnDocument: "after",
  }).exec();
  if (!contact) throw new ContactNotFoundError();
}

export async function consumeContactRateLimit(
  fingerprint: string,
  maximumRequests = 5,
): Promise<boolean> {
  await connectDB();
  await ContactRateLimitModel.init();

  const windowMilliseconds = 15 * 60 * 1000;
  const now = Date.now();
  const windowStart = Math.floor(now / windowMilliseconds) * windowMilliseconds;
  const key = `${fingerprint}:${windowStart}`;
  const expiresAt = new Date(windowStart + windowMilliseconds * 2);

  let bucket;

  try {
    bucket = await ContactRateLimitModel.findOneAndUpdate(
      { key },
      {
        $inc: { count: 1 },
        $setOnInsert: { expiresAt },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    ).exec();
  } catch (error: unknown) {
    if (
      typeof error !== "object" ||
      error === null ||
      !("code" in error) ||
      error.code !== 11000
    ) {
      throw error;
    }

    bucket = await ContactRateLimitModel.findOneAndUpdate(
      { key },
      { $inc: { count: 1 } },
      { returnDocument: "after" },
    ).exec();
  }

  return Boolean(bucket && bucket.count <= maximumRequests);
}

export async function getAdminContacts(
  status?: ContactStatus,
): Promise<AdminContactListItem[]> {
  await connectDB();

  const statusFilter =
    status === "answered"
      ? { status: { $in: ["answered", "completed"] } }
      : status === "pending"
        ? { status: { $in: ["pending", "unread", "read"] } }
        : {};
  const contacts = await ContactModel.find(statusFilter)
    .sort({ createdAt: -1, _id: -1 })
    .select({ email: 0, content: 0 })
    .exec();

  return contacts.map((contact) => ({
    id: contact._id.toString(),
    name: contact.name,
    category: contact.category as ContactCategory,
    title: contact.title,
    status: normalizeContactStatus(contact.status),
    isPrivate: contact.isPrivate ?? false,
    answer: contact.answer || undefined,
    answeredAt: contact.answeredAt?.toISOString(),
    answerUpdatedAt: contact.answerUpdatedAt?.toISOString(),
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  }));
}

export async function getAdminContact(id: string): Promise<AdminContact | null> {
  if (!isValidObjectId(id)) return null;

  await connectDB();
  const contact = await ContactModel.findById(id).exec();
  return contact ? serializeContact(contact) : null;
}

export async function saveContactAnswer(id: string, answer: string): Promise<void> {
  if (!isValidObjectId(id)) throw new ContactNotFoundError();

  await connectDB();
  const existing = await ContactModel.findById(id).select({ answeredAt: 1 }).exec();
  if (!existing) throw new ContactNotFoundError();
  const now = new Date();
  const contact = await ContactModel.findByIdAndUpdate(
    id,
    {
      answer,
      status: "answered",
      answeredAt: existing.answeredAt ?? now,
      answerUpdatedAt: now,
    },
    { runValidators: true, returnDocument: "after" },
  ).exec();

  if (!contact) throw new ContactNotFoundError();
}

export async function deleteContactAnswer(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new ContactNotFoundError();
  await connectDB();
  const contact = await ContactModel.findByIdAndUpdate(
    id,
    {
      $set: { status: "pending" },
      $unset: { answer: 1, answeredAt: 1, answerUpdatedAt: 1 },
    },
    { returnDocument: "after" },
  ).exec();
  if (!contact) throw new ContactNotFoundError();
}

export async function deleteContact(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new ContactNotFoundError();

  await connectDB();
  const contact = await ContactModel.findByIdAndDelete(id).exec();
  if (!contact) throw new ContactNotFoundError();
}
