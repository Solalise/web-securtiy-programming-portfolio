import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ExperienceForm, { getExperienceFormErrorMessage } from "@/components/ExperienceForm";
import { getAdminExperience } from "@/lib/experiences";

export const metadata: Metadata = { title: "Experience 수정" };
export const dynamic = "force-dynamic";

export default async function EditExperiencePage({ params, searchParams }: PageProps<"/admin/experiences/[id]/edit">) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const experience = await getAdminExperience(id);
  if (!experience) notFound();
  return (
    <section className="py-16 sm:py-24">
      <p className="text-sm font-bold text-blue-600">ADMIN · EXPERIENCE &amp; LABS</p>
      <h1 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">기록 수정</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">{experience.title}의 내용을 수정합니다.</p>
      <ExperienceForm experience={experience} errorMessage={getExperienceFormErrorMessage(error)} />
    </section>
  );
}
