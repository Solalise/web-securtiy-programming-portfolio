import type { Metadata } from "next";
import Link from "next/link";

import {
  contactPageContent,
  getContactStatusLabel,
} from "@/data/contact";
import { getPublicContacts } from "@/lib/contacts";

export const metadata: Metadata = {
  title: contactPageContent.title,
  description: contactPageContent.description.join(" "),
};

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const params = await searchParams;
  const queryValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const query = (queryValue ?? "").trim().slice(0, 80);
  const parsedPage = Number.parseInt(pageValue ?? "1", 10);
  const result = await getPublicContacts({
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
    query,
  });

  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-blue-600">
            {contactPageContent.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            {contactPageContent.title}
          </h1>
          <p className="mt-5 max-w-2xl break-keep text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            <span className="block">{contactPageContent.description[0]}</span>
            <span className="block">{contactPageContent.description[1]}</span>
          </p>
        </div>
        <Link
          href="/contact/new"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          style={{ color: "#ffffff" }}
        >
          {contactPageContent.writeButton}
        </Link>
      </div>

      <form action="/contact" method="get" className="mt-10 flex gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:mt-12">
        <label htmlFor="contact-search" className="sr-only">문의 검색</label>
        <input
          id="contact-search"
          name="q"
          type="search"
          maxLength={80}
          defaultValue={query}
          placeholder="제목과 내용으로 검색"
          className="h-11 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
        <button type="submit" className="rounded-lg border border-blue-600 bg-white px-5 text-sm font-bold text-blue-600 hover:bg-blue-50">
          검색
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="hidden grid-cols-[4rem_minmax(0,1fr)_8rem_8rem_7rem] gap-4 border-b border-zinc-200 bg-zinc-50 px-6 py-3 text-center text-xs font-semibold text-zinc-500 md:grid">
          <span>번호</span><span className="text-left">제목</span><span>작성자</span><span>작성일</span><span>답변 상태</span>
        </div>
        {result.contacts.length > 0 ? (
          <ol className="divide-y divide-zinc-200">
            {result.contacts.map((contact, index) => (
              <li key={contact.id} className="grid gap-3 px-5 py-5 md:grid-cols-[4rem_minmax(0,1fr)_8rem_8rem_7rem] md:items-center md:gap-4 md:px-6 md:text-center">
                <span className="hidden text-sm text-zinc-500 md:block">
                  {result.totalItems - (result.page - 1) * 10 - index}
                </span>
                <Link href={`/contact/${contact.id}`} className="min-w-0 text-left font-semibold text-zinc-950 hover:text-blue-600">
                  <span className="flex items-center gap-2">
                    {contact.isPrivate ? <span aria-label="비밀글">🔒</span> : null}
                    <span className="truncate">{contact.isPrivate ? contactPageContent.privateTitle : contact.title}</span>
                  </span>
                </Link>
                <BoardValue label="작성자" value={maskName(contact.name)} />
                <BoardValue label="작성일" value={formatDate(contact.createdAt)} />
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold md:mx-auto ${contact.status === "answered" ? "bg-blue-50 text-blue-700" : "bg-zinc-100 text-zinc-600"}`}>
                  {getContactStatusLabel(contact.status)}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="px-5 py-16 text-center text-sm text-zinc-500">
            {query ? "검색 결과가 없습니다." : contactPageContent.emptyMessage}
          </p>
        )}
      </div>

      {result.totalPages > 1 ? (
        <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="문의 목록 페이지">
          {Array.from({ length: result.totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              href={getPageHref(page, query)}
              aria-current={page === result.page ? "page" : undefined}
              className={`flex size-10 items-center justify-center rounded-lg border text-sm font-bold ${page === result.page ? "border-blue-600 bg-blue-600 text-white" : "border-zinc-300 bg-white text-zinc-600 hover:border-blue-300 hover:text-blue-600"}`}
              style={page === result.page ? { color: "#ffffff" } : undefined}
            >
              {page}
            </Link>
          ))}
        </nav>
      ) : null}
    </section>
  );
}

function BoardValue({ label, value }: { label: string; value: string }) {
  return <span className="text-sm text-zinc-600"><span className="mr-2 font-semibold text-zinc-400 md:hidden">{label}</span>{value}</span>;
}

function maskName(name: string): string {
  const characters = Array.from(name.trim());
  if (characters.length === 0) return "익명";
  return `${characters[0]}${"*".repeat(Math.min(3, Math.max(1, characters.length - 1)))}`;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "short" }).format(new Date(date));
}

function getPageHref(page: number, query: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `/contact?${params.toString()}`;
}
