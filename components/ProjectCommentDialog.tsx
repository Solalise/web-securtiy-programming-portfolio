"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import {
  createProjectCommentAction,
} from "@/actions/project-interactions";
import type { ProjectComment } from "@/lib/project-interactions";
import type { Project } from "@/types/project";

const initialCommentActionState = {
  status: "idle" as const,
  message: "",
};

export default function ProjectCommentDialog({
  project,
  comments,
  onClose,
}: {
  project: Project;
  comments: ProjectComment[];
  onClose: () => void;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    createProjectCommentAction,
    initialCommentActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/35 p-4 py-8 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-comment-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">COMMENTS</p>
            <h2 id="project-comment-title" className="mt-1 text-2xl font-bold tracking-tight text-zinc-950">
              {project.title} · 댓글 {comments.length}개
            </h2>
          </div>
          <button type="button" onClick={onClose} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-lg text-zinc-600 hover:bg-zinc-50" aria-label="댓글 창 닫기">×</button>
        </div>

        <div className="mt-6 max-h-[38vh] space-y-3 overflow-y-auto pr-1">
          {comments.length ? comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><strong className="text-sm text-zinc-900">{comment.authorName}</strong><time className="text-xs text-zinc-500" dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time></div>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-700">{comment.content}</p>
            </article>
          )) : <p className="rounded-xl bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-500">아직 댓글이 없습니다. 첫 번째 의견을 남겨 주세요.</p>}
        </div>

        <form ref={formRef} action={formAction} className="mt-6 border-t border-zinc-200 pt-6">
          <input type="hidden" name="projectSlug" value={project.id} />
          <label htmlFor="dialog-comment-author" className="text-sm font-bold text-zinc-900">이름</label>
          <input id="dialog-comment-author" name="authorName" required maxLength={80} placeholder="이름 또는 닉네임" className="mt-2 min-h-11 w-full rounded-lg border border-zinc-300 px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          <label htmlFor="dialog-comment-content" className="mt-5 block text-sm font-bold text-zinc-900">댓글</label>
          <textarea id="dialog-comment-content" name="content" required maxLength={1000} rows={4} placeholder="프로젝트에 대한 생각을 들려주세요." className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          {state.message ? <p role={state.status === "error" ? "alert" : "status"} className={`mt-3 text-sm ${state.status === "error" ? "text-red-600" : "text-emerald-700"}`}>{state.message}</p> : null}
          <div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs text-zinc-500">1,000자 이내</p><SubmitButton /></div>
        </form>
      </section>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-300">{pending ? "등록 중..." : "댓글 남기기"}</button>;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}
