import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";

export type NoticeItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export async function getNotices(): Promise<NoticeItem[]> {
  await connectDB();

  const notices = await Notice.find()
    .sort({ createdAt: -1 })
    .select({ title: 1, content: 1, createdAt: 1, updatedAt: 1 })
    .lean();

  return notices.map((notice) => ({
    id: notice._id.toString(),
    title: notice.title,
    content: notice.content,
    createdAt: notice.createdAt.toISOString(),
    updatedAt: notice.updatedAt.toISOString(),
  }));
}
