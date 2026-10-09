"use client";

import { deleteProjectAction } from "@/actions/projects";

type DeleteProjectButtonProps = {
  databaseId: string;
  title: string;
};

export default function DeleteProjectButton({
  databaseId,
  title,
}: DeleteProjectButtonProps) {
  return (
    <form
      action={deleteProjectAction}
      onSubmit={(event) => {
        if (!window.confirm(`“${title}” 프로젝트를 삭제할까요?`)) {
          event.preventDefault();
        }
      }}
    >
      <input name="databaseId" type="hidden" value={databaseId} />
      <button
        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
        type="submit"
      >
        삭제
      </button>
    </form>
  );
}
