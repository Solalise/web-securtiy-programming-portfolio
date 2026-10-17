import type { Metadata } from "next";
import Link from "next/link";

import {
  adminContactContent,
  contactStatuses,
  getContactCategoryLabel,
  getContactStatusLabel,
  type ContactStatus,
} from "@/data/contact";
import { getAdminContacts } from "@/lib/contacts";

export const metadata: Metadata = { title: adminContactContent.title };
export const dynamic = "force-dynamic";

const statusValues = new Set<string>(contactStatuses.map((item) => item.value));

export default async function AdminContactsPage({
  searchParams,
}: PageProps<"/admin/contacts">) {
  const { status: requestedStatus } = await searchParams;
  const statusValue = Array.isArray(requestedStatus) ? requestedStatus[0] : requestedStatus;
  const activeStatus =
    statusValue && statusValues.has(statusValue)
      ? (statusValue as ContactStatus)
      : undefined;
  const contacts = await getAdminContacts(activeStatus);

  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">{adminContactContent.eyebrow}</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        {adminContactContent.title}
      </h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">
        {adminContactContent.description}
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="문의 상태 필터">
        <FilterLink href="/admin/contacts" active={!activeStatus}>전체</FilterLink>
        {contactStatuses.map((status) => (
          <FilterLink
            key={status.value}
            href={`/admin/contacts?status=${status.value}`}
            active={activeStatus === status.value}
          >
            {status.label}
          </FilterLink>
        ))}
      </nav>

      {contacts.length > 0 ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1.8fr)_minmax(0,1fr)_7rem_7rem] gap-4 border-b border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-500 lg:grid">
            <span>이름</span><span>제목</span><span>유형</span><span>접수일</span><span>상태</span>
          </div>
          <ul className="divide-y divide-zinc-200">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <Link
                  href={`/admin/contacts/${contact.id}`}
                  className="grid gap-3 px-5 py-5 transition-colors hover:bg-zinc-50 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.8fr)_minmax(0,1fr)_7rem_7rem] lg:items-center lg:gap-4 lg:px-6"
                >
                  <AdminValue label="이름" value={contact.name} />
                  <AdminValue label="제목" value={`${contact.isPrivate ? "🔒 " : ""}${contact.title}`} emphasized />
                  <AdminValue label="유형" value={getContactCategoryLabel(contact.category)} />
                  <AdminValue label="접수일" value={formatDate(contact.createdAt)} />
                  <AdminValue label="상태" value={getContactStatusLabel(contact.status)} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-600">
          {adminContactContent.emptyMessage}
        </p>
      )}
    </section>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-blue-600 bg-blue-600 text-white" : "border-zinc-300 bg-white text-zinc-600 hover:border-blue-300 hover:text-blue-600"}`}
      style={active ? { color: "#ffffff" } : undefined}
    >
      {children}
    </Link>
  );
}

function AdminValue({ label, value, emphasized = false }: { label: string; value: string; emphasized?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-zinc-400 lg:hidden">{label}</p>
      <p className={`mt-1 truncate text-sm lg:mt-0 ${emphasized ? "font-semibold text-zinc-950" : "text-zinc-700"}`}>{value}</p>
    </div>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "short" }).format(new Date(date));
}
