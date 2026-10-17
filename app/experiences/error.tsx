"use client";

export default function ExperiencesError({ reset }: { reset: () => void }) {
  return (
    <section className="py-24 text-center">
      <h1 className="text-2xl font-extrabold text-slate-950">기록을 불러오지 못했습니다.</h1>
      <p className="mt-3 text-sm text-slate-500">잠시 후 다시 시도해 주세요.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">다시 시도</button>
    </section>
  );
}
