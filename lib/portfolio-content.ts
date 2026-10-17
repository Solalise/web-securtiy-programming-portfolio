import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import { heroContent } from "@/data/site";
import { connectDB } from "@/lib/mongodb";
import PortfolioItemModel, { type PortfolioItemDocument } from "@/models/PortfolioItem";
import SiteContentModel from "@/models/SiteContent";
import type { PortfolioItem, PortfolioItemKind, SiteContent } from "@/types/portfolio-content";

export const defaultSiteContent: SiteContent = {
  hero: { eyebrow: heroContent.eyebrow, titleBefore: heroContent.titleBefore, titleAccent: heroContent.titleAccent, titleAfter: heroContent.titleAfter, description: heroContent.description },
  about: {
    initials: "BW", profileImage: undefined, name: "최보원", schoolMajor: "중부대학교 / 정보보호학과", club: "멋쟁이사자처럼 14기",
    interestSummary: "웹 보안 / 백엔드 개발 / 취약점 분석",
    paragraphs: ["정보보호학과에서 웹 개발과 보안을 함께 공부하고 있습니다.", "기능 구현에 그치지 않고 웹 애플리케이션의 동작 구조와 보안 문제의 원인을 이해하는 개발자를 목표로 합니다."],
    securityFocus: "웹 애플리케이션의 동작 원리와 취약점 발생 원인을 이해하고, 실제 실습 환경에서 취약점을 분석하며 대응 방법을 학습하는 데 관심을 가지고 있습니다.",
    currentStudy: "웹 서비스의 인증·인가, 입력값 검증, 세션 관리, 데이터베이스 연동 등 백엔드 구현과 연결되는 웹 보안 원리를 학습하고 있습니다.",
    futureDirection: "웹 취약점 분석을 기반으로 리버스 엔지니어링과 시스템 취약점 분석(Pwnable)까지 학습 범위를 확장하고자 합니다.",
    extraTechnologies: [],
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  await connectDB();
  const document = await SiteContentModel.findOne({ key: "main" }).lean<SiteContent>().exec();
  return document ? { hero: document.hero, about: document.about } : defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await connectDB();
  await SiteContentModel.updateOne({ key: "main" }, { $set: { ...content, key: "main" } }, { upsert: true, runValidators: true });
}

function toItem(document: HydratedDocument<PortfolioItemDocument>): PortfolioItem {
  return { id: document._id.toString(), kind: document.kind, title: document.title, description: document.description || undefined, year: document.year, category: document.category || undefined, status: document.status, achievedAt: document.achievedAt || undefined, order: document.order, organization: document.organization || undefined, date: document.date || undefined, period: document.period || undefined, link: document.link || undefined };
}

export async function getPortfolioItems(kind: PortfolioItemKind): Promise<PortfolioItem[]> {
  await connectDB();
  const documents = await PortfolioItemModel.find({ kind }).sort({ year: -1, order: 1, date: -1 }).exec();
  return documents.map(toItem);
}

export async function savePortfolioItem(id: string | undefined, input: Omit<PortfolioItem, "id">): Promise<void> {
  await connectDB();
  if (id) {
    if (!isValidObjectId(id)) throw new Error("Invalid item id");
    const result = await PortfolioItemModel.findByIdAndUpdate(id, input, { runValidators: true }).exec();
    if (!result) throw new Error("Item not found");
    return;
  }
  await PortfolioItemModel.create(input);
}

export async function removePortfolioItem(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new Error("Invalid item id");
  await connectDB();
  await PortfolioItemModel.findByIdAndDelete(id).exec();
}
