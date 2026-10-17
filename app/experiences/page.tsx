import type { Metadata } from "next";

import ExperienceExplorer from "@/components/ExperienceExplorer";
import { getExperiences } from "@/lib/experiences";
import type { Experience } from "@/types/experience";

export const metadata: Metadata = {
  title: "Experience & Labs",
  description: "다양한 활동과 실습을 통해 쌓아온 경험과 배움을 기록합니다.",
};

export const dynamic = "force-dynamic";

export default async function ExperiencesPage() {
  let experiences: Experience[] = [];
  let failed = false;
  try {
    experiences = await getExperiences();
  } catch {
    failed = true;
  }

  return (
    <section className="py-16 sm:py-24">
      <p className="text-sm font-bold tracking-[0.2em] text-blue-600">EXPERIENCE &amp; LABS</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Experience &amp; Labs</h1>
      <p className="mt-5 max-w-2xl break-keep text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
        다양한 활동과 실습을 통해 쌓아온 경험과 배움을 기록합니다.
      </p>
      <div className="mt-10 sm:mt-12">
        {failed ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-5 py-12 text-center text-sm text-red-700">데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
        ) : <ExperienceExplorer experiences={experiences} />}
      </div>
    </section>
  );
}
