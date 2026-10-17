"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSiteContent, removePortfolioItem, savePortfolioItem, saveSiteContent } from "@/lib/portfolio-content";
import { requireAdmin } from "@/lib/require-admin";
import type { GoalStatus, PortfolioItemKind } from "@/types/portfolio-content";

const kinds = new Set<PortfolioItemKind>(["goal", "award", "certification", "roadmap"]);
const statuses = new Set<GoalStatus>(["planned", "in-progress", "completed"]);
const text = (data: FormData, name: string, max = 3000) => String(data.get(name) ?? "").trim().slice(0, max);
const lines = (data: FormData, name: string, maxItems = 40) => text(data, name, 10000).split("\n").map((value) => value.trim()).filter(Boolean).slice(0, maxItems);

export async function updateHeroAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const content = await getSiteContent();
  const hero = { eyebrow: text(formData, "eyebrow", 100), titleBefore: text(formData, "titleBefore", 100), titleAccent: text(formData, "titleAccent", 100), titleAfter: text(formData, "titleAfter", 100), description: text(formData, "description", 800) };
  if (Object.values(hero).some((value) => !value)) redirect("/?error=required#home");
  await saveSiteContent({ ...content, hero });
  revalidatePath("/");
  redirect("/?saved=hero#home");
}

export async function updateAboutAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const content = await getSiteContent();
  const about = {
    ...content.about,
    paragraphs: lines(formData, "paragraphs", 10), securityFocus: text(formData, "securityFocus", 2000), currentStudy: text(formData, "currentStudy", 2000), futureDirection: text(formData, "futureDirection", 2000), extraTechnologies: lines(formData, "extraTechnologies", 60),
  };
  if (!about.securityFocus || !about.currentStudy || !about.futureDirection) redirect("/about?error=required#about-edit");
  await saveSiteContent({ ...content, about });
  revalidatePath("/about");
  redirect("/about?saved=about#about-edit");
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const content = await getSiteContent();
  const name = text(formData, "name", 80);
  const schoolMajor = text(formData, "schoolMajor", 160);
  const club = text(formData, "club", 160);
  const interestSummary = text(formData, "interestSummary", 300);
  if (!name || !schoolMajor || !club || !interestSummary) redirect("/about?error=required#profile");

  let profileImage = ["on", "true"].includes(String(formData.get("removeProfileImage") ?? "")) ? undefined : content.about.profileImage;
  const image = formData.get("profileImage");
  if (image instanceof File && image.size > 0) {
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!allowedTypes.has(image.type) || image.size > 1500000) redirect("/about?error=profile-image#profile");
    profileImage = `data:${image.type};base64,${Buffer.from(await image.arrayBuffer()).toString("base64")}`;
  }

  await saveSiteContent({ ...content, about: { ...content.about, profileImage, name, schoolMajor, club, interestSummary } });
  revalidatePath("/about");
  redirect("/about?saved=profile#profile");
}

export async function savePortfolioItemAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const kind = text(formData, "kind", 30) as PortfolioItemKind;
  const returnTo = kind === "goal" ? "/" : "/about";
  if (!kinds.has(kind)) redirect(`${returnTo}?error=invalid`);
  const title = text(formData, "title", 160);
  if (!title) redirect(`${returnTo}?error=required#${kind}`);
  const statusValue = text(formData, "status", 30) as GoalStatus;
  const link = text(formData, "link", 500);
  const achievedAt = text(formData, "achievedAt", 10);
  const date = text(formData, "date", 10);
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if ((achievedAt && !datePattern.test(achievedAt)) || (date && !datePattern.test(date))) redirect(`${returnTo}?error=date#${kind}`);
  if (link) {
    try { const url = new URL(link); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); } catch { redirect(`${returnTo}?error=url#${kind}`); }
  }
  const yearValue = Number.parseInt(text(formData, "year", 4), 10);
  await savePortfolioItem(text(formData, "databaseId", 100) || undefined, {
    kind, title, description: text(formData, "description") || undefined,
    year: Number.isFinite(yearValue) ? Math.min(2200, Math.max(2000, yearValue)) : undefined,
    category: text(formData, "category", 100) || undefined,
    status: statuses.has(statusValue) ? statusValue : undefined,
    achievedAt: achievedAt || undefined,
    order: Number.parseInt(text(formData, "order", 5), 10) || 0,
    organization: text(formData, "organization", 160) || undefined,
    date: date || undefined,
    period: text(formData, "period", 100) || undefined,
    link: link || undefined,
  });
  revalidatePath(returnTo);
  redirect(`${returnTo}?saved=${kind}#${kind}`);
}

export async function deletePortfolioItemAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const kind = text(formData, "kind", 30) as PortfolioItemKind;
  const returnTo = kind === "goal" ? "/" : "/about";
  await removePortfolioItem(text(formData, "databaseId", 100));
  revalidatePath(returnTo);
  redirect(`${returnTo}?saved=deleted#${kind}`);
}
