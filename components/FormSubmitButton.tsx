"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-300">{pending ? "저장 중..." : children}</button>;
}
