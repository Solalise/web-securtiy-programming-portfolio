import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-14 text-center sm:px-8">
        <div>
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.03em] text-white"
            aria-label="홈으로 이동"
          >
            BW.PORTFOLIO
          </Link>
        </div>
        <nav className="mt-7" aria-label="하단 메뉴">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/projects">Project</Link></li>
            <li><Link className="hover:text-white" href="/assignments">Study</Link></li>
            <li><Link className="hover:text-white" href="/#contact">Contact</Link></li>
          </ul>
        </nav>
        <p className="mt-7 text-sm text-slate-400">개인 포트폴리오 웹사이트 | Next.js · TypeScript 기반 제작</p>
        <p className="mt-3 text-xs text-slate-500">&copy; 2026 Bowon Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
