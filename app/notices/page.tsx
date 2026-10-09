import type { Metadata } from "next";

import { getNotices } from "@/lib/notices";

export const metadata: Metadata = {
  title: "공지사항",
  description: "MongoDB에서 조회한 공지사항 목록입니다.",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">NOTICES</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        공지사항
      </h1>

      {notices.length === 0 ? (
        <p className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-600">
          등록된 공지사항이 없습니다.
        </p>
      ) : (
        <ul className="mt-10 space-y-4 sm:mt-12">
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="rounded-xl border border-zinc-200 bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-zinc-950">
                {notice.title}
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-600">
                {notice.content}
              </p>
              <time
                className="mt-4 block text-sm text-zinc-500"
                dateTime={notice.createdAt}
              >
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "medium",
                }).format(new Date(notice.createdAt))}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
