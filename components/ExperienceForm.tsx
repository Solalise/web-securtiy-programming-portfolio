import Link from "next/link";

import { createExperienceAction, updateExperienceAction } from "@/actions/experiences";
import { experienceCategories } from "@/data/experience";
import type { AdminExperience } from "@/types/experience";

const inputClassName = "mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
const textareaClassName = "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export function getExperienceFormErrorMessage(error: string | string[] | undefined): string | undefined {
  const code = Array.isArray(error) ? error[0] : error;
  if (code === "required") return "제목, 카테고리, 요약, 개요는 필수 입력값입니다.";
  if (code === "invalid-category") return "올바른 카테고리를 선택해 주세요.";
  if (code === "invalid-date") return "날짜 형식과 시작일·종료일 순서를 확인해 주세요.";
  if (code === "invalid-url") return "이미지와 참고 자료에는 http 또는 https URL만 입력할 수 있습니다.";
  if (code === "save-failed") return "기록을 저장하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해 주세요.";
  return undefined;
}

export default function ExperienceForm({ experience, errorMessage }: { experience?: AdminExperience; errorMessage?: string }) {
  const action = experience ? updateExperienceAction : createExperienceAction;
  return (
    <form action={action} className="mt-10 space-y-8">
      {experience ? <input type="hidden" name="databaseId" value={experience.databaseId} /> : null}
      {errorMessage ? <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p> : null}

      <fieldset className="grid min-w-0 gap-6 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
        <legend className="px-2 text-lg font-extrabold text-slate-950">기본 정보</legend>
        <FormField label="제목" name="title"><input className={inputClassName} id="title" name="title" required maxLength={120} defaultValue={experience?.title} /></FormField>
        <FormField label="카테고리" name="category" hint="일반 Linux 활용은 일반 실습, 보안 분석 목적의 Linux 실습은 보안 실습으로 분류"><select className={inputClassName} id="category" name="category" required defaultValue={experience?.category ?? "activity"}>{experienceCategories.map((category) => <option key={category.value} value={category.value}>{category.label} · {category.shortLabel}</option>)}</select></FormField>
        <FormField label="활동 기관 / 실습 환경" name="organization"><input className={inputClassName} id="organization" name="organization" maxLength={120} defaultValue={experience?.organization} /></FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="시작일" name="startDate"><input className={inputClassName} id="startDate" name="startDate" type="date" defaultValue={experience?.startDate} /></FormField>
          <FormField label="종료일" name="endDate"><input className={inputClassName} id="endDate" name="endDate" type="date" defaultValue={experience?.endDate} /></FormField>
        </div>
        <div className="sm:col-span-2"><FormField label="요약" name="summary" hint="목록 카드에 표시되는 1~2문장"><textarea className={textareaClassName} id="summary" name="summary" required maxLength={300} rows={3} defaultValue={experience?.summary} /></FormField></div>
        <div className="sm:col-span-2"><FormField label="기술 및 도구" name="technologies" hint="쉼표 또는 줄바꿈으로 구분"><textarea className={textareaClassName} id="technologies" name="technologies" rows={3} defaultValue={experience?.technologies.join(", ")} /></FormField></div>
        <label className="flex items-center gap-3 text-sm font-bold text-slate-800 sm:col-span-2"><input type="checkbox" name="featured" defaultChecked={experience?.featured} className="size-4 accent-blue-600" />메인 화면 대표 기록으로 표시</label>
      </fieldset>

      <fieldset className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <legend className="px-2 text-lg font-extrabold text-slate-950">상세 기록</legend>
        <FormField label="Overview · 개요" name="overview"><textarea className={textareaClassName} id="overview" name="overview" required maxLength={5000} rows={5} defaultValue={experience?.overview} /></FormField>
        <FormField label="Role & Objectives · 역할 및 목표" name="roleAndObjectives"><textarea className={textareaClassName} id="roleAndObjectives" name="roleAndObjectives" maxLength={5000} rows={5} defaultValue={experience?.roleAndObjectives} /></FormField>
        <FormField label="Process · 진행 과정" name="process"><textarea className={textareaClassName} id="process" name="process" maxLength={10000} rows={7} defaultValue={experience?.process} /></FormField>
        <FormField label="Problems & Solutions · 문제 및 해결 과정" name="problemsAndSolutions"><textarea className={textareaClassName} id="problemsAndSolutions" name="problemsAndSolutions" maxLength={10000} rows={7} defaultValue={experience?.problemsAndSolutions} /></FormField>
        <FormField label="Results & Learnings · 결과 및 배운 점" name="resultsAndLearnings"><textarea className={textareaClassName} id="resultsAndLearnings" name="resultsAndLearnings" maxLength={10000} rows={7} defaultValue={experience?.resultsAndLearnings} /></FormField>
      </fieldset>

      <fieldset className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <legend className="px-2 text-lg font-extrabold text-slate-950">이미지 및 참고 자료</legend>
        <FormField label="이미지 URL" name="images" hint="한 줄에 하나씩 입력"><textarea className={textareaClassName} id="images" name="images" rows={4} defaultValue={experience?.images.join("\n")} /></FormField>
        <FormField label="참고 자료" name="references" hint="한 줄에 ‘표시 이름 | https://주소’ 형식으로 입력"><textarea className={textareaClassName} id="references" name="references" rows={5} defaultValue={experience?.references.map((reference) => `${reference.label} | ${reference.url}`).join("\n")} /></FormField>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700">{experience ? "변경 내용 저장" : "기록 등록"}</button>
        <Link href="/admin/experiences" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-6 text-sm font-bold text-slate-600 hover:bg-slate-50">취소</Link>
      </div>
    </form>
  );
}

function FormField({ label, name, hint, children }: { label: string; name: string; hint?: string; children: React.ReactNode }) {
  return <div className="min-w-0"><label htmlFor={name} className="text-sm font-bold text-slate-800">{label}</label>{hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}{children}</div>;
}
