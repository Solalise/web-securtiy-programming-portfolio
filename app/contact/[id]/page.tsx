import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import {
  saveContactAnswerAction,
  unlockContactAction,
} from "@/actions/contacts";
import DeleteContactAnswerButton from "@/components/DeleteContactAnswerButton";
import DeleteContactButton from "@/components/DeleteContactButton";
import DeleteOwnContactButton from "@/components/DeleteOwnContactButton";
import {
  contactPageContent,
  getContactCategoryLabel,
  getContactStatusLabel,
} from "@/data/contact";
import { hasContactAccess } from "@/lib/contact-access";
import { getPublicContact } from "@/lib/contacts";

export const dynamic = "force-dynamic";

type ContactDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<ContactDetailPageProps, "params">): Promise<Metadata> {
  const { id } = await params;
  const contact = await getPublicContact(id);
  return contact
    ? { title: contact.isPrivate ? contactPageContent.privateTitle : contact.title }
    : { title: "문의를 찾을 수 없습니다" };
}

export default async function ContactDetailPage({
  params,
  searchParams,
}: ContactDetailPageProps) {
  const [{ id }, query, session] = await Promise.all([params, searchParams, auth()]);
  const contact = await getPublicContact(id);
  if (!contact) notFound();

  const isAdmin = session?.user.role === "admin";
  const authorHasAccess = await hasContactAccess(id);
  const canRead = !contact.isPrivate || isAdmin || authorHasAccess;
  const error = Array.isArray(query.error) ? query.error[0] : query.error;

  if (!canRead) {
    return (
      <section className="mx-auto max-w-xl py-16 sm:py-24">
        <Link href="/contact" className="text-sm font-semibold text-blue-600 hover:text-blue-700">← 문의 목록</Link>
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-center sm:p-10">
          <span className="text-3xl" aria-hidden="true">🔒</span>
          <h1 className="mt-4 text-2xl font-bold text-zinc-950">비밀글입니다</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">작성 시 설정한 비밀번호를 입력하면 내용을 확인할 수 있습니다.</p>
          {error === "invalid-password" ? <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">비밀번호가 올바르지 않습니다.</p> : null}
          {error === "too-many-attempts" ? <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">확인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.</p> : null}
          <form action={unlockContactAction} className="mt-6">
            <input type="hidden" name="id" value={id} />
            <label htmlFor="unlock-password" className="sr-only">작성 비밀번호</label>
            <input id="unlock-password" name="password" type="password" required autoComplete="current-password" className="h-11 w-full rounded-lg border border-zinc-300 px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
            <button type="submit" className="mt-3 min-h-11 w-full rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700" style={{ color: "#ffffff" }}>비밀글 확인</button>
          </form>
        </div>
      </section>
    );
  }

  const canManage = isAdmin || authorHasAccess;

  return (
    <article className="py-16 sm:py-24">
      <Link href="/contact" className="text-sm font-semibold text-blue-600 hover:text-blue-700">← 문의 목록</Link>
      {error === "unauthorized" ? <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">이 문의를 관리할 권한이 없습니다.</p> : null}
      <header className="mt-8 border-b border-zinc-200 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          {contact.isPrivate ? <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">🔒 비밀글</span> : null}
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${contact.status === "answered" ? "bg-blue-50 text-blue-700" : "bg-zinc-100 text-zinc-600"}`}>{getContactStatusLabel(contact.status)}</span>
        </div>
        <h1 className="mt-4 break-words text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">{contact.title}</h1>
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
          <Info label="작성자" value={maskName(contact.name)} />
          <Info label="작성일" value={formatDateTime(contact.createdAt)} />
          <Info label="문의 유형" value={getContactCategoryLabel(contact.category)} />
        </dl>
      </header>

      <section className="min-h-52 border-b border-zinc-200 py-10" aria-labelledby="question-title">
        <h2 id="question-title" className="text-lg font-bold text-zinc-950">문의 내용</h2>
        <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-8 text-zinc-700 sm:text-base">{contact.content}</p>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8" aria-labelledby="answer-title">
        <h2 id="answer-title" className="text-lg font-bold text-zinc-950">관리자 답변</h2>
        {contact.answer ? (
          <>
            <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-8 text-zinc-700 sm:text-base">{contact.answer}</p>
            <p className="mt-6 text-xs text-zinc-500">
              작성 {contact.answeredAt ? formatDateTime(contact.answeredAt) : "-"}
              {contact.answerUpdatedAt && contact.answerUpdatedAt !== contact.answeredAt ? ` · 수정 ${formatDateTime(contact.answerUpdatedAt)}` : ""}
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">{contactPageContent.pendingAnswer}</p>
        )}
      </section>

      {isAdmin ? (
        <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8" aria-labelledby="answer-form-title">
          <h2 id="answer-form-title" className="text-lg font-bold text-zinc-950">{contact.answer ? "답변 수정" : "답변 작성"}</h2>
          {error === "invalid-answer" ? <p className="mt-4 text-sm text-red-600" role="alert">답변을 5,000자 이내로 입력해 주세요.</p> : null}
          <form action={saveContactAnswerAction} className="mt-5">
            <input type="hidden" name="id" value={contact.id} />
            <textarea name="answer" required maxLength={5000} rows={7} defaultValue={contact.answer} className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm leading-7 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
            <button type="submit" className="mt-4 min-h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700" style={{ color: "#ffffff" }}>답변 저장</button>
          </form>
          {contact.answer ? <div className="mt-3"><DeleteContactAnswerButton id={contact.id} /></div> : null}
        </section>
      ) : null}

      {canManage ? (
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <Link href={`/contact/${contact.id}/edit`} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-700 hover:border-blue-300 hover:text-blue-600">문의 수정</Link>
          {isAdmin ? <DeleteContactButton id={contact.id} title={contact.title} /> : <DeleteOwnContactButton id={contact.id} title={contact.title} />}
        </div>
      ) : null}

      {!isAdmin && !authorHasAccess ? (
        <section className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5" aria-labelledby="author-access-title">
          <h2 id="author-access-title" className="text-sm font-bold text-zinc-900">작성자 관리</h2>
          <p className="mt-2 text-xs leading-5 text-zinc-500">작성 비밀번호를 확인하면 이 문의를 수정하거나 삭제할 수 있습니다.</p>
          {error === "invalid-password" ? <p className="mt-3 text-sm text-red-600" role="alert">비밀번호가 올바르지 않습니다.</p> : null}
          {error === "too-many-attempts" ? <p className="mt-3 text-sm text-red-600" role="alert">확인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.</p> : null}
          <form action={unlockContactAction} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input type="hidden" name="id" value={id} />
            <label htmlFor="author-password" className="sr-only">작성 비밀번호</label>
            <input id="author-password" name="password" type="password" required autoComplete="current-password" className="h-10 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
            <button type="submit" className="min-h-10 rounded-lg border border-blue-600 bg-white px-4 text-sm font-bold text-blue-600 hover:bg-blue-50">작성자 인증</button>
          </form>
        </section>
      ) : null}
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex gap-2"><dt className="font-semibold text-zinc-400">{label}</dt><dd>{value}</dd></div>;
}

function maskName(name: string): string {
  const characters = Array.from(name.trim());
  if (characters.length === 0) return "익명";
  return `${characters[0]}${"*".repeat(Math.min(3, Math.max(1, characters.length - 1)))}`;
}

function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}
