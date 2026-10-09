import Link from "next/link";

import { createProjectAction, updateProjectAction } from "@/actions/projects";
import type { AdminProject } from "@/lib/projects";

type ProjectFormProps = {
  project?: AdminProject;
  errorMessage?: string;
};

const inputClassName =
  "mt-2 h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
const textareaClassName =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm leading-6 text-zinc-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export function getProjectFormErrorMessage(
  errorCode: string | string[] | undefined,
): string | undefined {
  const code = Array.isArray(errorCode) ? errorCode[0] : errorCode;

  if (code === "required") {
    return "제목, slug, 요약, 카테고리, 상태는 필수 입력값입니다.";
  }

  if (code === "invalid-slug") {
    return "Slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.";
  }

  if (code === "duplicate-slug") {
    return "이미 사용 중인 slug입니다. 다른 slug를 입력해 주세요.";
  }

  if (code === "not-found") {
    return "수정할 프로젝트를 찾을 수 없습니다.";
  }

  if (code === "save-failed") {
    return "프로젝트를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return undefined;
}

export default function ProjectForm({
  project,
  errorMessage,
}: ProjectFormProps) {
  const action = project ? updateProjectAction : createProjectAction;

  return (
    <form action={action} className="mt-10 space-y-8">
      {project && (
        <input name="databaseId" type="hidden" value={project.databaseId} />
      )}
      {errorMessage && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <fieldset className="grid gap-6 rounded-xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
        <legend className="px-2 text-lg font-bold text-zinc-950">기본 정보</legend>
        <FormField label="제목" name="title">
          <input
            className={inputClassName}
            id="title"
            name="title"
            required
            defaultValue={project?.title}
          />
        </FormField>
        <FormField label="Slug" name="slug">
          <input
            className={inputClassName}
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="my-project"
            defaultValue={project?.id}
          />
        </FormField>
        <FormField label="카테고리" name="category">
          <input
            className={inputClassName}
            id="category"
            name="category"
            required
            defaultValue={project?.category}
          />
        </FormField>
        <FormField label="상태" name="status">
          <input
            className={inputClassName}
            id="status"
            name="status"
            required
            placeholder="개발 중"
            defaultValue={project?.status}
          />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="요약" name="summary">
            <textarea
              className={textareaClassName}
              id="summary"
              name="summary"
              required
              rows={3}
              defaultValue={project?.summary}
            />
          </FormField>
        </div>
        <FormField label="기술 스택" name="techStack" hint="쉼표 또는 줄바꿈으로 구분">
          <textarea
            className={textareaClassName}
            id="techStack"
            name="techStack"
            rows={3}
            defaultValue={project?.techStack.join(", ")}
          />
        </FormField>
        <FormField label="썸네일 URL" name="thumbnail">
          <input
            className={inputClassName}
            id="thumbnail"
            name="thumbnail"
            defaultValue={project?.thumbnail}
          />
        </FormField>
      </fieldset>

      <fieldset className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <legend className="px-2 text-lg font-bold text-zinc-950">프로젝트 상세</legend>
        <FormField label="개요" name="overview">
          <textarea className={textareaClassName} id="overview" name="overview" rows={5} defaultValue={project?.overview} />
        </FormField>
        <FormField label="문제" name="problem">
          <textarea className={textareaClassName} id="problem" name="problem" rows={5} defaultValue={project?.problem} />
        </FormField>
        <FormField label="핵심 기능" name="features" hint="쉼표 또는 줄바꿈으로 구분">
          <textarea className={textareaClassName} id="features" name="features" rows={5} defaultValue={project?.features.join("\n")} />
        </FormField>
        <FormField label="내 역할" name="role">
          <textarea className={textareaClassName} id="role" name="role" rows={4} defaultValue={project?.role} />
        </FormField>
        <FormField label="트러블슈팅" name="troubleshooting">
          <textarea className={textareaClassName} id="troubleshooting" name="troubleshooting" rows={5} defaultValue={project?.troubleshooting} />
        </FormField>
        <FormField label="배운 점" name="learned" hint="쉼표 또는 줄바꿈으로 구분">
          <textarea className={textareaClassName} id="learned" name="learned" rows={5} defaultValue={project?.learned.join("\n")} />
        </FormField>
      </fieldset>

      <fieldset className="grid gap-6 rounded-xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
        <legend className="px-2 text-lg font-bold text-zinc-950">링크 및 부가 정보</legend>
        <FormField label="GitHub URL" name="githubUrl">
          <input className={inputClassName} id="githubUrl" name="githubUrl" type="url" defaultValue={project?.githubUrl} />
        </FormField>
        <FormField label="Demo URL" name="demoUrl">
          <input className={inputClassName} id="demoUrl" name="demoUrl" type="url" defaultValue={project?.demoUrl} />
        </FormField>
        <FormField label="기간" name="period">
          <input className={inputClassName} id="period" name="period" defaultValue={project?.period} />
        </FormField>
        <FormField label="팀 형태" name="teamSize">
          <input className={inputClassName} id="teamSize" name="teamSize" defaultValue={project?.teamSize} />
        </FormField>
        <label className="flex items-center gap-3 text-sm font-semibold text-zinc-800 sm:col-span-2">
          <input
            className="size-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
            name="featured"
            type="checkbox"
            defaultChecked={project?.featured}
          />
          홈 추천 프로젝트로 표시
        </label>
      </fieldset>

      <div className="flex flex-wrap justify-end gap-3">
        <Link
          href="/admin/projects"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          취소
        </Link>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          type="submit"
        >
          {project ? "변경 사항 저장" : "프로젝트 추가"}
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  name,
  hint,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-zinc-800" htmlFor={name}>
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
      {children}
    </div>
  );
}
