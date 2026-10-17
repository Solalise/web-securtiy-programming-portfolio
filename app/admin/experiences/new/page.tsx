import type { Metadata } from "next";

import ExperienceForm, { getExperienceFormErrorMessage } from "@/components/ExperienceForm";

export const metadata: Metadata = { title: "Experience 추가" };

export default async function NewExperiencePage({ searchParams }: PageProps<"/admin/experiences/new">) {
  const { error } = await searchParams;
  return (
    <section className="py-16 sm:py-24">
      <p className="text-sm font-bold text-blue-600">ADMIN · EXPERIENCE &amp; LABS</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">새 기록 추가</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">실제로 수행한 활동 또는 실습 내용만 기록해 주세요.</p>
      <ExperienceForm errorMessage={getExperienceFormErrorMessage(error)} />
    </section>
  );
}
