import type { Metadata } from "next";

import DevLogList from "@/components/DevLogList";
import { devLogs } from "@/data/devlogs";

export const metadata: Metadata = {
  title: "개발 로그",
  description: "프로젝트를 개발하며 겪은 문제와 해결 과정, 새롭게 배운 내용을 기록합니다.",
};

export default function DevLogPage() {
  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">DEV LOG</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        개발 로그
      </h1>
      <p className="mt-5 max-w-2xl break-keep text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
        프로젝트를 개발하며 겪은 문제와 해결 과정,
        <br className="hidden sm:block" /> 새롭게 배운 내용을 기록합니다.
      </p>

      <div className="mt-10 sm:mt-12">
        <DevLogList devLogs={devLogs} />
      </div>
    </section>
  );
}
