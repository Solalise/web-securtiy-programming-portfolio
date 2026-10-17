import Link from "next/link";

import { footerContent, footerNavigation, siteIdentity } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-14 text-center sm:px-8">
        <div>
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.03em] text-white"
            aria-label="홈으로 이동"
          >
            {siteIdentity.name}
          </Link>
        </div>
        <nav className="mt-7" aria-label="하단 메뉴">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-7 text-sm text-slate-400">{footerContent.description}</p>
        <p className="mt-3 text-xs text-slate-500">{footerContent.copyright}</p>
      </div>
    </footer>
  );
}
