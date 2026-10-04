import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-zinc-950"
            aria-label="홈으로 이동"
          >
            BW<span className="text-blue-600">.</span>
          </Link>
          <p className="mt-2">&copy; 2026 최보원.</p>
        </div>

        <div className="flex gap-5 font-medium text-zinc-600">
          {/* TODO: 실제 GitHub 및 이메일 주소로 교체 */}
          <a className="transition-colors hover:text-blue-600" href="#">
            GitHub
          </a>
          <a className="transition-colors hover:text-blue-600" href="#">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
