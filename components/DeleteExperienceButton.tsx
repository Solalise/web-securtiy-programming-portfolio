"use client";

import { deleteExperienceAction } from "@/actions/experiences";

export default function DeleteExperienceButton({ databaseId, title }: { databaseId: string; title: string }) {
  return (
    <form action={deleteExperienceAction} onSubmit={(event) => {
      if (!window.confirm(`“${title}” 기록을 삭제할까요?`)) event.preventDefault();
    }}>
      <input type="hidden" name="databaseId" value={databaseId} />
      <button type="submit" className="inline-flex min-h-9 items-center justify-center rounded-lg border border-red-200 px-3 text-xs font-bold text-red-600 hover:bg-red-50">삭제</button>
    </form>
  );
}
