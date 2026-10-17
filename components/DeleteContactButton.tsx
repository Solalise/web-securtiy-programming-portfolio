"use client";

import { deleteContactAction } from "@/actions/contacts";

export default function DeleteContactButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <form
      action={deleteContactAction}
      onSubmit={(event) => {
        if (!window.confirm(`“${title}” 문의를 삭제할까요? 삭제 후 복구할 수 없습니다.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        문의 삭제
      </button>
    </form>
  );
}
