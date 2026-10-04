import type { Metadata } from "next";

import InterestCard from "@/components/InterestCard";
import SkillGroup from "@/components/SkillGroup";

export const metadata: Metadata = {
  title: "소개",
  description: "최보원의 웹 보안 및 백엔드 개발 포트폴리오 소개",
};

const interests = [
  {
    marker: "01",
    title: "웹 보안",
    description:
      "웹 애플리케이션의 동작 구조와 취약점을 분석하고, 안전한 개발 방법을 학습하는 데 관심이 있습니다.",
  },
  {
    marker: "02",
    title: "백엔드 개발",
    description:
      "API, 데이터베이스, 인증과 같은 서버 측 기능을 구현하며 웹 서비스 전체 흐름을 이해하는 것을 목표로 합니다.",
  },
  {
    marker: "03",
    title: "취약점 분석",
    description:
      "실제 서비스에서 발생할 수 있는 보안 문제를 발견하고, 원인과 공격 흐름을 분석하는 역량을 키우고 있습니다.",
  },
];

const skillGroups = [
  {
    title: "프론트엔드",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "백엔드",
    skills: ["Next.js Server Actions", "Route Handlers", "REST API"],
  },
  {
    title: "데이터베이스",
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma"],
  },
  {
    title: "인증 / 보안",
    skills: ["Auth.js", "bcrypt", "JWT", "Web Security"],
  },
  {
    title: "도구",
    skills: ["Git", "GitHub", "Vercel", "VS Code"],
  },
];

const learningSteps = [
  {
    label: "현재",
    title: "웹 개발과 백엔드 기초 강화",
    description: "Next.js · TypeScript · MongoDB · 인증",
  },
  {
    label: "다음 단계",
    title: "웹 취약점 분석과 모의해킹 심화",
    description: "웹 구조 이해 · 취약점 실습 · 보안 프로젝트",
  },
  {
    label: "장기 목표",
    title: "리버싱과 시스템 보안으로 확장",
    description: "시스템 구조 이해 · 리버싱 · 보안 연구",
  },
];

const currentFocus = [
  "Next.js와 TypeScript 기반 웹 개발",
  "MongoDB를 활용한 데이터 처리",
  "웹 인증 및 접근 제어",
  "웹 취약점 분석 기초",
  "프로젝트를 통한 실전 개발 경험",
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <section>
        <p className="mb-3 text-sm font-semibold text-blue-600">ABOUT</p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          소개
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          웹 보안과 백엔드 개발을 중심으로 공부하고 있으며,
          <br className="hidden sm:block" /> 취약점 분석과 보안 리서치 분야로
          성장하는 것을 목표로 하고 있습니다.
        </p>
      </section>

      <section className="mt-12 grid gap-8 border-t border-zinc-200 pt-12 sm:mt-16 sm:pt-16 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14">
        <aside className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
          <div className="flex size-20 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xl font-bold tracking-tight text-blue-700">
            BW
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-950">
            최보원
          </h2>
          <p className="mt-1 text-sm text-zinc-500">정보보호학과</p>

          <dl className="mt-8 space-y-5 border-t border-zinc-200 pt-6">
            <ProfileInfo label="집중 분야" value="웹 보안" />
            <ProfileInfo label="관심 분야" value="백엔드 개발" />
            <ProfileInfo label="목표" value="취약점 분석 · 모의해킹" />
          </dl>
        </aside>

        <div className="min-w-0 lg:py-2">
          <p className="text-sm font-semibold text-blue-600">PROFILE</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            프로필
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-zinc-600">
            <p>정보보호학과에서 웹 개발과 보안을 함께 공부하고 있습니다.</p>
            <p>
              단순히 기능을 구현하는 것에 그치지 않고, 웹 애플리케이션이 어떤
              구조로 동작하는지 이해하고 그 과정에서 발생할 수 있는 보안 문제를
              분석하는 것에 관심이 있습니다.
            </p>
            <p>
              현재는 Next.js와 TypeScript를 중심으로 프론트엔드와 백엔드를 함께
              학습하고 있으며, MongoDB와 인증 구조 등 실제 웹 서비스에 필요한
              기술을 익히고 있습니다.
            </p>
            <p>
              장기적으로는 웹 취약점 분석과 모의해킹 역량을 쌓고, 이후 리버싱과
              시스템 보안 분야까지 학습 범위를 넓히는 것이 목표입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-zinc-200 pt-16 sm:mt-24 sm:pt-20">
        <SectionHeading eyebrow="INTERESTS" title="관심 분야" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest) => (
            <InterestCard key={interest.title} {...interest} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-zinc-200 pt-16 sm:mt-24 sm:pt-20">
        <SectionHeading eyebrow="SKILLS" title="기술 스택" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} {...group} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-zinc-200 pt-16 sm:mt-24 sm:pt-20">
        <SectionHeading eyebrow="DIRECTION" title="학습 방향" />
        <ol className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {learningSteps.map((step, index) => (
            <li key={step.label} className="contents">
              <article className="rounded-xl border border-zinc-200 bg-white p-6">
                <p className="text-xs font-semibold text-blue-600">{step.label}</p>
                <h3 className="mt-3 font-bold leading-6 text-zinc-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {step.description}
                </p>
              </article>
              {index < learningSteps.length - 1 && (
                <span
                  className="flex items-center justify-center py-1 text-zinc-300 lg:px-1"
                  aria-hidden="true"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:mt-20 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
          현재 집중하고 있는 것
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentFocus.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
              <span
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-zinc-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-zinc-800">{value}</dd>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
