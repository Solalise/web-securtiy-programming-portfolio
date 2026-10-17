"use server";

import { createHmac } from "node:crypto";

import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  contactCategories,
  contactPageContent,
  type ContactCategory,
} from "@/data/contact";
import { auth } from "@/auth";
import {
  clearContactAccess,
  grantContactAccess,
  hasContactAccess,
} from "@/lib/contact-access";
import {
  consumeContactRateLimit,
  createContact,
  deleteContactAnswer,
  deleteContact,
  getContactPasswordHash,
  saveContactAnswer,
  updateContactByAuthor,
} from "@/lib/contacts";
import { requireAdmin } from "@/lib/require-admin";

type ContactField =
  | "name"
  | "email"
  | "category"
  | "title"
  | "content"
  | "password"
  | "privacy";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const categoryValues = new Set<string>(contactCategories.map((item) => item.value));

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getClientFingerprint(requestHeaders: Headers): string {
  const forwarded =
    requestHeaders.get("x-vercel-forwarded-for") ??
    requestHeaders.get("x-forwarded-for") ??
    requestHeaders.get("x-real-ip") ??
    "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const secret =
    process.env.CONTACT_RATE_LIMIT_SECRET ??
    process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("A server-side secret is required for contact rate limiting.");
  }

  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function submitContactAction(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = getText(formData, "name");
  const email = getText(formData, "email").toLowerCase();
  const category = getText(formData, "category");
  const title = getText(formData, "title");
  const content = getText(formData, "content");
  const password = String(formData.get("password") ?? "");
  const isPrivate = formData.get("isPrivate") === "on";
  const privacyAccepted = formData.get("privacy") === "on";
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (!name || name.length > 50) fieldErrors.name = "이름을 50자 이내로 입력해 주세요.";
  if (!emailPattern.test(email) || email.length > 254) {
    fieldErrors.email = "올바른 이메일 주소를 입력해 주세요.";
  }
  if (!categoryValues.has(category)) fieldErrors.category = "문의 유형을 선택해 주세요.";
  if (!title || title.length > 120) fieldErrors.title = "제목을 120자 이내로 입력해 주세요.";
  if (!content || content.length > 5000) fieldErrors.content = "내용을 5,000자 이내로 입력해 주세요.";
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    fieldErrors.password = "비밀번호는 8자 이상 72바이트 이하로 입력해 주세요.";
  }
  if (!privacyAccepted) fieldErrors.privacy = "개인정보 수집 및 이용에 동의해 주세요.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "입력 내용을 확인해 주세요.", fieldErrors };
  }

  let contactId: string;

  try {
    const fingerprint = getClientFingerprint(await headers());
    const isAllowed = await consumeContactRateLimit(fingerprint);

    if (!isAllowed) {
      return {
        status: "error",
        message: "짧은 시간에 너무 많은 문의가 접수되었습니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    contactId = await createContact({
      name,
      email,
      category: category as ContactCategory,
      title,
      content,
      isPrivate,
      passwordHash: await hash(password, 12),
    });
  } catch {
    return { status: "error", message: contactPageContent.errorMessage };
  }

  await grantContactAccess(contactId);
  revalidateContactPaths(contactId);
  redirect(`/contact/${contactId}`);
}

export async function unlockContactAction(formData: FormData): Promise<void> {
  const id = getText(formData, "id");
  const password = String(formData.get("password") ?? "");
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    redirect(`/contact/${id}?error=invalid-password`);
  }

  const fingerprint = getClientFingerprint(await headers());
  const isAllowed = await consumeContactRateLimit(
    `${fingerprint}:unlock:${id}`,
    10,
  );
  if (!isAllowed) redirect(`/contact/${id}?error=too-many-attempts`);

  const passwordHash = await getContactPasswordHash(id);

  if (!passwordHash || !(await compare(password, passwordHash))) {
    redirect(`/contact/${id}?error=invalid-password`);
  }

  await grantContactAccess(id);
  redirect(`/contact/${id}`);
}

export async function saveContactAnswerAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = getText(formData, "id");
  const answer = getText(formData, "answer");
  if (!answer || answer.length > 5000) {
    redirect(`/contact/${id}?error=invalid-answer`);
  }

  await saveContactAnswer(id, answer);
  revalidateContactPaths(id);
  redirect(`/contact/${id}`);
}

export async function deleteContactAnswerAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = getText(formData, "id");
  await deleteContactAnswer(id);
  revalidateContactPaths(id);
  redirect(`/contact/${id}`);
}

export async function updateOwnContactAction(formData: FormData): Promise<void> {
  const id = getText(formData, "id");
  await requireContactManager(id);

  const name = getText(formData, "name");
  const email = getText(formData, "email").toLowerCase();
  const category = getText(formData, "category");
  const title = getText(formData, "title");
  const content = getText(formData, "content");
  const isPrivate = formData.get("isPrivate") === "on";

  if (
    !name ||
    name.length > 50 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !categoryValues.has(category) ||
    !title ||
    title.length > 120 ||
    !content ||
    content.length > 5000
  ) {
    redirect(`/contact/${id}/edit?error=invalid-input`);
  }

  await updateContactByAuthor(id, {
    name,
    email,
    category: category as ContactCategory,
    title,
    content,
    isPrivate,
  });
  revalidateContactPaths(id);
  redirect(`/contact/${id}`);
}

export async function deleteOwnContactAction(formData: FormData): Promise<void> {
  const id = getText(formData, "id");
  await requireContactManager(id);
  await deleteContact(id);
  await clearContactAccess(id);
  revalidatePath("/contact");
  revalidatePath("/admin/contacts");
  redirect("/contact");
}

export async function deleteContactAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = getText(formData, "id");
  if (id) await deleteContact(id);

  revalidatePath("/contact");
  revalidatePath("/admin/contacts");
  redirect("/admin/contacts");
}

async function requireContactManager(id: string): Promise<void> {
  const session = await auth();
  if (session?.user.role === "admin") return;
  if (await hasContactAccess(id)) return;
  redirect(`/contact/${id}?error=unauthorized`);
}

function revalidateContactPaths(id: string): void {
  revalidatePath("/contact");
  revalidatePath(`/contact/${id}`);
  revalidatePath(`/contact/${id}/edit`);
  revalidatePath("/admin/contacts");
  revalidatePath(`/admin/contacts/${id}`);
}
