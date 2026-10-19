import type { Metadata } from "next";
import Image from "next/image";

import { deletePortfolioItemAction, savePortfolioItemAction, updateAboutAction, updateProfileAction } from "@/actions/portfolio-content";
import { auth } from "@/auth";
import FormSubmitButton from "@/components/FormSubmitButton";
import GrowthAdmin from "@/components/GrowthAdmin";
import GrowthJourneyTimeline from "@/components/GrowthJourneyTimeline";
import TechnologyUsage from "@/components/TechnologyUsage";
import { getPortfolioItems, getSiteContent } from "@/lib/portfolio-content";
import { getProjects } from "@/lib/projects";
import { buildGrowthJourney, getGrowthEvents } from "@/lib/growth";
import { getExperiences } from "@/lib/experiences";
import { calculateTechnologyUsage } from "@/lib/technology-usage";
import type { PortfolioItem, PortfolioItemKind } from "@/types/portfolio-content";

export const metadata: Metadata = { title: "소개", description: "최보원의 웹 보안 및 백엔드 개발 역량과 학습 방향을 소개합니다." };
export const dynamic = "force-dynamic";

const statusLabels = { planned: "예정", "in-progress": "진행 중", completed: "완료" } as const;

export default async function AboutPage({ searchParams }: PageProps<"/about">) {
  const [session, content, projects, experiences, growthEvents, awards, certifications, params] = await Promise.all([
    auth(), getSiteContent(), getProjects(), getExperiences(), getGrowthEvents(), getPortfolioItems("award"), getPortfolioItems("certification"), searchParams,
  ]);
  const isAdmin = session?.user.role === "admin";
  const technologies = calculateTechnologyUsage(projects, content.about.extraTechnologies);
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const { timeline } = buildGrowthJourney(projects, experiences, growthEvents);

  return (
    <div className="py-16 sm:py-24">
      <section>
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">ABOUT</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">소개</h1>
        {saved ? <p role="status" className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">변경 내용이 저장되었습니다.</p> : null}
        {error ? <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error === "profile-image" ? "프로필 이미지는 1.5MB 이하의 JPG, PNG, WebP 파일만 사용할 수 있습니다." : "입력 내용을 확인해주세요."}</p> : null}
      </section>

      <section id="profile" className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.4fr)]">
          <div className="relative min-h-80 bg-gradient-to-br from-blue-50 to-slate-100 lg:min-h-[34rem]">
            {content.about.profileImage ? <Image src={content.about.profileImage} alt={`${content.about.name} 프로필 사진`} fill unoptimized sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover" /> : <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-700"><svg viewBox="0 0 120 120" aria-hidden="true" className="size-32 text-blue-200"><circle cx="60" cy="42" r="24" fill="currentColor" /><path d="M18 112c2-28 19-44 42-44s40 16 42 44" fill="currentColor" /></svg><span className="mt-3 text-sm font-bold text-slate-500">기본 프로필 이미지</span></div>}
          </div>
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-sm font-bold tracking-[0.18em] text-blue-600">PROFILE</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">프로필</h2>
            <dl className="mt-7 border-y border-slate-200"><ProfileRow label="이름" value={content.about.name} /><ProfileRow label="학교 / 전공" value={content.about.schoolMajor} /><ProfileRow label="동아리 활동" value={content.about.club} /><ProfileRow label="관심 분야" value={content.about.interestSummary} /></dl>
            <div className="mt-7 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {isAdmin ? <ProfileEdit content={content.about} /> : null}
          </div>
        </div>
      </section>

      {isAdmin ? <AboutEdit content={content.about} /> : null}

      <Section id="security-interest" eyebrow="SECURITY INTEREST" title="웹 보안 관심 분야">
        <div className="grid gap-5 lg:grid-cols-3">
          <FocusCard number="01" title="주요 관심 분야 · 웹 취약점 분석" text={content.about.securityFocus} />
          <FocusCard number="02" title="현재 집중적으로 학습하는 분야" text={content.about.currentStudy} />
          <FocusCard number="03" title="향후 확장하고 싶은 분야" text={content.about.futureDirection} />
        </div>
      </Section>

      <Section id="technology" eyebrow="SKILLS" title="프로젝트 기반 기술 스택">
        <p className="mb-7 max-w-3xl text-sm leading-7 text-slate-500">각 비율은 숙련도가 아니라 카테고리 안에서 집계된 기술 사용 빈도입니다. 실제 프로젝트 데이터만 사용하며, 각 카테고리의 합계는 100%입니다. 기술을 선택하면 연결된 프로젝트를 확인할 수 있습니다.</p>
        <TechnologyUsage technologies={technologies} />
      </Section>

      <Section id="achievement" eyebrow="ACHIEVEMENTS" title="Achievements & Certifications">
        <div className="grid gap-6 lg:grid-cols-2">
          <ItemCollection title="수상 경력" empty="등록된 수상 경력이 없습니다." items={awards} kind="award" isAdmin={isAdmin} />
          <ItemCollection title="자격증" empty="등록된 자격증이 없습니다." items={certifications} kind="certification" isAdmin={isAdmin} />
        </div>
      </Section>

      <Section id="growth" eyebrow="GROWTH TIMELINE" title="성장 과정">
        <GrowthJourneyTimeline items={timeline} />
        {isAdmin ? <GrowthAdmin events={growthEvents} projects={projects} experiences={experiences} /> : null}
      </Section>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) { return <section id={id} className="mt-16 border-t border-slate-200 pt-16 sm:mt-24 sm:pt-20"><p className="text-sm font-bold tracking-[0.18em] text-blue-600">{eyebrow}</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h2><div className="mt-8">{children}</div></section>; }
function ProfileRow({ label, value }: { label: string; value: string }) { return <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-slate-200 py-4 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)]"><dt className="text-sm font-bold text-slate-500">{label}</dt><dd className="break-words text-sm font-bold leading-6 text-slate-900">{value}</dd></div>; }
function FocusCard({ number, title, text }: { number: string; title: string; text: string }) { return <article className="rounded-xl border border-slate-200 bg-white p-6"><span className="text-xs font-black text-blue-600">{number}</span><h3 className="mt-3 font-extrabold text-slate-950">{title}</h3><p className="mt-4 break-keep text-sm leading-7 text-slate-600">{text}</p></article>; }

function ProfileEdit({ content }: { content: Awaited<ReturnType<typeof getSiteContent>>["about"] }) {
  const input = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <details id="profile-edit" className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5"><summary className="cursor-pointer text-sm font-bold text-blue-700">프로필 수정</summary><form action={updateProfileAction} className="mt-5 grid gap-3"><label className="text-xs font-bold text-slate-600">프로필 사진<input name="profileImage" type="file" accept="image/jpeg,image/png,image/webp" className={input + " mt-2 block w-full"} /></label><p className="text-xs text-slate-500">JPG, PNG, WebP · 최대 1.5MB</p>{content.profileImage ? <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" name="removeProfileImage" value="true" /> 현재 사진 삭제</label> : null}<input name="name" required defaultValue={content.name} className={input} placeholder="이름" /><input name="schoolMajor" required defaultValue={content.schoolMajor} className={input} placeholder="학교 / 전공" /><input name="club" required defaultValue={content.club} className={input} placeholder="동아리 활동" /><input name="interestSummary" required defaultValue={content.interestSummary} className={input} placeholder="관심 분야" /><div><FormSubmitButton>프로필 저장</FormSubmitButton></div></form></details>;
}

function AboutEdit({ content }: { content: Awaited<ReturnType<typeof getSiteContent>>["about"] }) {
  const input = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <details id="about-edit" className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5"><summary className="cursor-pointer text-sm font-bold text-blue-700">관심 분야 및 기술 항목 편집</summary><form action={updateAboutAction} className="mt-5 grid gap-3 sm:grid-cols-2"><textarea name="paragraphs" defaultValue={content.paragraphs.join("\n")} rows={4} className={input + " sm:col-span-2"} placeholder="소개 문단 · 한 줄에 하나" /><textarea name="securityFocus" required defaultValue={content.securityFocus} rows={5} className={input + " sm:col-span-2"} /><textarea name="currentStudy" required defaultValue={content.currentStudy} rows={5} className={input + " sm:col-span-2"} /><textarea name="futureDirection" required defaultValue={content.futureDirection} rows={5} className={input + " sm:col-span-2"} /><textarea name="extraTechnologies" defaultValue={content.extraTechnologies.join("\n")} rows={5} className={input + " sm:col-span-2"} placeholder="기술 분류: 카테고리 | 기술명 | 학습 중/사용 경험 | 별칭1, 별칭2" /><p className="text-xs leading-5 text-slate-500 sm:col-span-2">같은 기술을 여러 카테고리에 배치하려면 카테고리별로 한 줄씩 입력하세요. 실제 프로젝트 사용 기록이 없는 기술은 차트 비율에 포함되지 않습니다.</p><div><FormSubmitButton>About 저장</FormSubmitButton></div></form></details>;
}

function ItemCollection({ title, empty, items, kind, isAdmin }: { title: string; empty: string; items: PortfolioItem[]; kind: PortfolioItemKind; isAdmin: boolean }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-extrabold text-slate-950">{title}</h3>{items.length ? <ul className="mt-5 space-y-4">{items.map((item) => <li key={item.id} className="rounded-lg bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.organization}{item.date ? " · " + item.date : ""}</p></div>{item.status ? <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">{statusLabels[item.status]}</span> : null}</div>{item.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p> : null}{item.link ? <a href={item.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-bold text-blue-600">증빙 자료 →</a> : null}{isAdmin ? <ItemAdmin item={item} /> : null}</li>)}</ul> : <p className="mt-5 text-sm text-slate-500">{empty}</p>}{isAdmin ? <details className="mt-5 border-t border-slate-200 pt-4"><summary className="cursor-pointer text-sm font-bold text-blue-700">항목 추가</summary><ItemForm kind={kind} /></details> : null}</section>;
}

function ItemAdmin({ item }: { item: PortfolioItem }) { return <details className="mt-4 border-t border-slate-200 pt-3"><summary className="cursor-pointer text-xs font-bold text-blue-700">편집</summary><ItemForm kind={item.kind} item={item} /><form action={deletePortfolioItemAction} className="mt-3"><input type="hidden" name="kind" value={item.kind} /><input type="hidden" name="databaseId" value={item.id} /><button type="submit" className="text-xs font-bold text-red-600">삭제</button></form></details>; }

function ItemForm({ kind, item }: { kind: PortfolioItemKind; item?: PortfolioItem }) {
  const input = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <form action={savePortfolioItemAction} className="mt-4 grid gap-3"><input type="hidden" name="kind" value={kind} />{item ? <input type="hidden" name="databaseId" value={item.id} /> : null}<input name="title" required defaultValue={item?.title} className={input} placeholder={kind === "roadmap" ? "단계명" : "이름"} /><textarea name="description" defaultValue={item?.description} rows={3} className={input} placeholder="설명 / 상세 내용" /><input name="organization" defaultValue={item?.organization} className={input} placeholder="주최·발급 기관" /><input name="category" defaultValue={item?.category} className={input} placeholder="학습 분야 / 카테고리" /><input name="date" type="date" defaultValue={item?.date} className={input} /><input name="period" defaultValue={item?.period} className={input} placeholder="목표 기간" /><select name="status" defaultValue={item?.status ?? "planned"} className={input}><option value="planned">예정 / 준비 중</option><option value="in-progress">진행 중</option><option value="completed">완료 / 취득 완료</option></select><input name="link" type="url" defaultValue={item?.link} className={input} placeholder="증빙 자료 URL" /><input name="order" type="number" defaultValue={item?.order ?? 0} className={input} placeholder="표시 순서" /><div><FormSubmitButton>{item ? "저장" : "추가"}</FormSubmitButton></div></form>;
}
