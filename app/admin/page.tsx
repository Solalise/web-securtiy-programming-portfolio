import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        관리자 대시보드
      </h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AdminCard
          title="Experience & Labs"
          description="대외활동과 보안·개발 실습 기록을 등록하고 대표 노출 여부를 관리합니다."
          href="/admin/experiences"
          linkLabel="Experience 관리"
        />
        <AdminCard
          title="프로젝트"
          description="포트폴리오 프로젝트를 등록하고 수정하거나 삭제합니다."
          href="/admin/projects"
          linkLabel="프로젝트 관리"
        />
        <AdminCard
          title="문의"
          description="방문자가 남긴 문의를 확인하고 처리 상태를 관리합니다."
          href="/admin/contacts"
          linkLabel="문의 관리"
        />
      </div>
    </section>
  );
}

function AdminCard({ title, description, href, linkLabel }: { title: string; description: string; href: string; linkLabel: string }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
      <Link href={href} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700" style={{ color: "#ffffff" }}>
        {linkLabel}
      </Link>
    </article>
  );
}
