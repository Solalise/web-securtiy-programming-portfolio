"use client";

import { deleteContactAnswerAction } from "@/actions/contacts";

export default function DeleteContactAnswerButton({ id }: { id: string }) {
  return (
    <form
      action={deleteContactAnswerAction}
      onSubmit={(event) => {
        if (!window.confirm("등록된 관리자 답변을 삭제할까요?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50">
        답변 삭제
      </button>
    </form>
  );
}
