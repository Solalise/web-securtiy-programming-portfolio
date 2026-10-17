import type { Metadata } from "next";
import Link from "next/link";

import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "문의 작성",
  description: "Q&A 게시판에 새로운 문의를 작성합니다.",
};

export default function NewContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Link href="/contact" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
        ← 문의 목록
      </Link>
      <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-blue-600">WRITE</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">문의 작성</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
        답변 확인과 작성글 관리를 위해 작성 비밀번호를 잊지 않도록 보관해 주세요.
      </p>
      <div className="mt-10 max-w-3xl">
        <ContactForm />
      </div>
    </section>
  );
}
