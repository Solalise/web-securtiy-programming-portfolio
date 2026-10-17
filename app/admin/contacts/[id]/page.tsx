import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { saveContactAnswerAction } from "@/actions/contacts";
import DeleteContactAnswerButton from "@/components/DeleteContactAnswerButton";
import DeleteContactButton from "@/components/DeleteContactButton";
import {
  adminContactContent,
  getContactCategoryLabel,
  getContactStatusLabel,
} from "@/data/contact";
import { getAdminContact } from "@/lib/contacts";

export const metadata: Metadata = { title: adminContactContent.detailTitle };
export const dynamic = "force-dynamic";

export default async function AdminContactDetailPage({
  params,
}: PageProps<"/admin/contacts/[id]">) {
  const { id } = await params;
  const contact = await getAdminContact(id);
  if (!contact) notFound();

  return (
    <article className="py-16 sm:py-24">
      <Link href="/admin/contacts" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
        ← 문의 목록
      </Link>
      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            {getContactCategoryLabel(contact.category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            {contact.title}
          </h1>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {getContactStatusLabel(contact.status)}
        </span>
      </div>

      <dl className="mt-8 grid gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:grid-cols-2">
        <Info label="이름" value={contact.name} />
        <Info label="이메일" value={contact.email} />
        <Info label="접수일" value={formatDateTime(contact.createdAt)} />
        <Info label="수정일" value={formatDateTime(contact.updatedAt)} />
      </dl>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-zinc-950">문의 내용</h2>
        <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8">
          {contact.content}
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-zinc-950">
          {contact.answer ? "관리자 답변 수정" : "관리자 답변 작성"}
        </h2>
        <form action={saveContactAnswerAction} className="mt-5">
          <input type="hidden" name="id" value={contact.id} />
          <textarea
            name="answer"
            required
            maxLength={5000}
            rows={7}
            defaultValue={contact.answer}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <button type="submit" className="mt-4 min-h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700" style={{ color: "#ffffff" }}>
            답변 저장
          </button>
        </form>
        {contact.answer ? (
          <div className="mt-3">
            <DeleteContactAnswerButton id={contact.id} />
          </div>
        ) : null}
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <Link href={`/contact/${contact.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          공개 상세 페이지 보기 →
        </Link>
        <DeleteContactButton id={contact.id} title={contact.title} />
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-semibold text-zinc-400">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-zinc-800">{value}</dd></div>;
}

function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}
