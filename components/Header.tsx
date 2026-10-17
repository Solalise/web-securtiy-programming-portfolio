"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { mainNavigation, siteIdentity } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-lg font-black tracking-[-0.03em] text-slate-950" aria-label="홈으로 이동">{siteIdentity.name}</Link>
        <button type="button" aria-expanded={open} aria-label={open ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setOpen((value) => !value)} className="flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-600 md:hidden">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
        <nav aria-label="주요 메뉴" className="hidden self-stretch md:block">
          <ul className="flex h-full items-center gap-7 text-sm font-bold text-slate-600">
            {mainNavigation.map((item) => <li key={item.href}><Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} className={`inline-flex h-16 items-center border-b-2 transition-colors ${isCurrent(item.href) ? "border-blue-600 text-blue-600" : "border-transparent hover:text-slate-950"}`}>{item.label}</Link></li>)}
          </ul>
        </nav>
      </div>
      {open ? <nav aria-label="모바일 메뉴" className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-5 py-3 shadow-sm md:hidden"><ul className="grid gap-1 text-sm font-bold text-slate-700">{mainNavigation.map((item) => <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)} className={`block rounded-lg px-4 py-3 ${isCurrent(item.href) ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50"}`}>{item.label}</Link></li>)}</ul></nav> : null}
    </header>
  );
}
