import type { Metadata } from "next";

import AssignmentCard from "@/components/AssignmentCard";
import { assignments } from "@/data/assignments";

export const metadata: Metadata = {
  title: "주차별 과제",
  description: "웹 프로그래밍 수업에서 진행한 1~7주차 실습과 과제를 정리했습니다.",
};

export default function AssignmentsPage() {
  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ASSIGNMENTS</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        주차별 과제
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
        웹 프로그래밍 수업에서 진행한 1~7주차 실습과 과제를 정리했습니다.
        <br className="hidden sm:block" /> 각 주차별 학습 내용과 GitHub 및 배포
        결과를 확인할 수 있습니다.
      </p>

      <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.week} assignment={assignment} />
        ))}
      </div>
    </section>
  );
}
