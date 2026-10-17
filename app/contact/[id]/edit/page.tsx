import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateOwnContactAction } from "@/actions/contacts";
import { auth } from "@/auth";
import { contactCategories } from "@/data/contact";
import { hasContactAccess } from "@/lib/contact-access";
import { getAdminContact } from "@/lib/contacts";

export const metadata: Metadata = { title: "문의 수정" };
export const dynamic = "force-dynamic";

export default async function EditContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const [{ id }, query, session] = await Promise.all([params, searchParams, auth()]);
  const isAdmin = session?.user.role === "admin";
  if (!isAdmin && !(await hasContactAccess(id))) redirect(`/contact/${id}?error=unauthorized`);
  const contact = await getAdminContact(id);
  if (!contact) notFound();
  const error = Array.isArray(query.error) ? query.error[0] : query.error;

  return (
    <section className="py-16 sm:py-24">
      <Link href={`/contact/${id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">← 문의 상세</Link>
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">문의 수정</h1>
      <form action={updateOwnContactAction} className="mt-10 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        <input type="hidden" name="id" value={id} />
        {error === "invalid-input" ? <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">입력 내용을 다시 확인해 주세요.</p> : null}
        <div className="grid gap-6 sm:grid-cols-2">
          <EditField label="이름" name="name"><input id="name" name="name" required maxLength={50} defaultValue={contact.name} className={inputClassName} /></EditField>
          <EditField label="이메일" name="email"><input id="email" name="email" type="email" required maxLength={254} defaultValue={contact.email} className={inputClassName} /></EditField>
          <EditField label="문의 유형" name="category"><select id="category" name="category" required defaultValue={contact.category} className={inputClassName}>{contactCategories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></EditField>
          <EditField label="제목" name="title"><input id="title" name="title" required maxLength={120} defaultValue={contact.title} className={inputClassName} /></EditField>
          <div className="sm:col-span-2"><EditField label="내용" name="content"><textarea id="content" name="content" required maxLength={5000} rows={9} defaultValue={contact.content} className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm leading-7 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></EditField></div>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-800 sm:col-span-2"><input name="isPrivate" type="checkbox" defaultChecked={contact.isPrivate} className="size-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600" />비밀글로 설정</label>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Link href={`/contact/${id}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-300 px-5 text-sm font-semibold text-zinc-700">취소</Link>
          <button type="submit" className="min-h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700" style={{ color: "#ffffff" }}>변경 사항 저장</button>
        </div>
      </form>
    </section>
  );
}

const inputClassName = "mt-2 h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function EditField({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return <div><label htmlFor={name} className="text-sm font-semibold text-zinc-800">{label}</label>{children}</div>;
}
