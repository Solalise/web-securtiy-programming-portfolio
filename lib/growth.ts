import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import GrowthEventModel, { type GrowthEventDocument } from "@/models/GrowthEvent";
import type { Experience } from "@/types/experience";
import type {
  GrowthChartEntry,
  GrowthChartPoint,
  GrowthEvent,
  GrowthEventInput,
  GrowthPointType,
  GrowthTimelineItem,
} from "@/types/growth";
import type { Project } from "@/types/project";

type HydratedGrowthEvent = HydratedDocument<GrowthEventDocument>;
type ActualRecord = { key: string; date: string; title: string; description: string; technologies: string[]; type: GrowthPointType; href: string };

export class GrowthEventNotFoundError extends Error {}

function legacyType(document: HydratedGrowthEvent): GrowthPointType {
  if (document.type) return document.type;
  if (document.category === "project") return "project";
  if (document.category === "activity") return "activity";
  if (document.category === "security" || document.category === "general") return "lab";
  return "other";
}

function toGrowthEvent(document: HydratedGrowthEvent): GrowthEvent {
  return {
    id: document._id.toString(),
    date: document.date,
    title: document.title,
    description: document.description,
    growthValue: document.growthValue ?? 0,
    type: legacyType(document),
    technologies: [...document.technologies],
    linkedProjectId: document.linkedProjectId || (document.linkType === "project" ? document.linkedId : undefined),
    linkedExperienceId: document.linkedExperienceId || (document.linkType === "experience" ? document.linkedId : undefined),
    visible: document.visible ?? document.showInTimeline ?? true,
  };
}

export async function getGrowthEvents(): Promise<GrowthEvent[]> {
  await connectDB();
  const documents = await GrowthEventModel.find().sort({ date: 1, createdAt: 1 }).exec();
  return documents.map(toGrowthEvent);
}

export async function createGrowthEvent(input: GrowthEventInput): Promise<GrowthEvent> {
  await connectDB();
  return toGrowthEvent(await GrowthEventModel.create(input));
}

export async function updateGrowthEvent(id: string, input: GrowthEventInput): Promise<GrowthEvent> {
  if (!isValidObjectId(id)) throw new GrowthEventNotFoundError();
  await connectDB();
  const document = await GrowthEventModel.findByIdAndUpdate(id, input, { returnDocument: "after", runValidators: true }).exec();
  if (!document) throw new GrowthEventNotFoundError();
  return toGrowthEvent(document);
}

export async function deleteGrowthEvent(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new GrowthEventNotFoundError();
  await connectDB();
  if (!await GrowthEventModel.findByIdAndDelete(id).exec()) throw new GrowthEventNotFoundError();
}

function recordDate(period: string | undefined, fallback: string | undefined): string | null {
  const match = period?.match(/(20\d{2})(?:[./-](0?[1-9]|1[0-2]))?/);
  if (match) return `${match[1]}-${String(match[2] ?? "1").padStart(2, "0")}-01`;
  if (fallback && /^\d{4}-\d{2}-\d{2}/.test(fallback)) return fallback.slice(0, 10);
  return null;
}

function actualRecords(projects: Project[], experiences: Experience[], today: string): ActualRecord[] {
  const records = new Map<string, ActualRecord>();
  for (const project of projects) {
    const date = recordDate(project.period, project.createdAt);
    if (!date || date > today) continue;
    records.set(`project:${project.id}`, { key: `project:${project.id}`, date, title: project.title, description: project.summary, technologies: project.techStack, type: "project", href: `/projects/${project.id}` });
  }
  for (const experience of experiences) {
    const date = recordDate(experience.startDate, experience.createdAt);
    if (!date || date > today) continue;
    const type: GrowthPointType = experience.category === "activity" ? "activity" : "lab";
    records.set(`experience:${experience.id}`, { key: `experience:${experience.id}`, date, title: experience.title, description: experience.summary, technologies: experience.technologies, type, href: `/experiences/${experience.id}` });
  }
  return [...records.values()].sort((a, b) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key));
}

function recordEntry(record: ActualRecord): GrowthChartEntry {
  return { key: record.key, title: record.title, type: record.type, href: record.href };
}

export function buildGrowthJourney(
  projects: Project[],
  experiences: Experience[],
  events: GrowthEvent[],
  today = new Date().toISOString().slice(0, 10),
): { points: GrowthChartPoint[]; timeline: GrowthTimelineItem[] } {
  const records = actualRecords(projects, experiences, today);
  const recordMap = new Map(records.map((record) => [record.key, record]));
  const anchors = events.filter((event) => event.visible && event.date <= today).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  const linkedKeys = new Set(anchors.flatMap((anchor) => [
    anchor.linkedProjectId ? `project:${anchor.linkedProjectId}` : "",
    anchor.linkedExperienceId ? `experience:${anchor.linkedExperienceId}` : "",
  ]).filter(Boolean));

  const points: GrowthChartPoint[] = anchors.map((anchor) => {
    const linkedKey = anchor.linkedProjectId ? `project:${anchor.linkedProjectId}` : anchor.linkedExperienceId ? `experience:${anchor.linkedExperienceId}` : null;
    const linked = linkedKey ? recordMap.get(linkedKey) : undefined;
    const periodEntries = records.filter((record) => record.date.slice(0, 7) === anchor.date.slice(0, 7)).map(recordEntry);
    if (linked && !periodEntries.some((entry) => entry.key === linked.key)) periodEntries.push(recordEntry(linked));
    return {
      id: `anchor:${anchor.id}`,
      date: anchor.date,
      label: anchor.date.slice(0, 7).replace("-", "."),
      title: anchor.title,
      description: anchor.description,
      growthValue: anchor.growthValue,
      type: anchor.type,
      href: linked?.href,
      entries: periodEntries,
    };
  });

  const lastAnchor = anchors.at(-1);
  if (lastAnchor) {
    const laterRecords = records.filter((record) => record.date > lastAnchor.date && !linkedKeys.has(record.key));
    const groups = new Map<string, ActualRecord[]>();
    for (const record of laterRecords) groups.set(record.date.slice(0, 7), [...(groups.get(record.date.slice(0, 7)) ?? []), record]);
    let value = lastAnchor.growthValue;
    for (const [period, group] of groups) {
      value += group.length;
      points.push({
        id: `records:${period}`,
        date: `${period}-01`,
        label: period.replace("-", "."),
        title: group.length === 1 ? group[0].title : `실제 경험 ${group.length}건`,
        description: group.map((record) => record.title).join(", "),
        growthValue: value,
        type: group.length === 1 ? group[0].type : "other",
        href: group.length === 1 ? group[0].href : undefined,
        entries: group.map(recordEntry),
      });
    }
  }
  points.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  const timeline = new Map<string, GrowthTimelineItem>();
  for (const record of records.filter((record) => !linkedKeys.has(record.key))) {
    timeline.set(record.key, { key: record.key, date: record.date, title: record.title, type: record.type, description: record.description, technologies: record.technologies, href: record.href });
  }
  for (const anchor of anchors) {
    const linkedKey = anchor.linkedProjectId ? `project:${anchor.linkedProjectId}` : anchor.linkedExperienceId ? `experience:${anchor.linkedExperienceId}` : null;
    const linked = linkedKey ? recordMap.get(linkedKey) : undefined;
    timeline.set(`anchor:${anchor.id}`, { key: `anchor:${anchor.id}`, date: anchor.date, title: anchor.title, type: anchor.type, description: anchor.description, technologies: anchor.technologies, href: linked?.href });
  }
  return { points, timeline: [...timeline.values()].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)) };
}
