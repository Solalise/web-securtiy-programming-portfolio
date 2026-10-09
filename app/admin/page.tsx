import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        관리자 대시보드
      </h1>
      <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-zinc-950">프로젝트</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          포트폴리오 프로젝트를 등록하고 수정하거나 삭제합니다.
        </p>
        <Link
          href="/admin/projects"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          프로젝트 관리
        </Link>
      </div>
    </section>
  );
}
