"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logoutAction } from "@/actions/auth";

const navigation = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/projects", label: "프로젝트" },
  { href: "/assignments", label: "주차별 과제" },
  { href: "/#contact", label: "문의" },
] as const;

export default function Header({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isCurrentPage = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="w-fit text-lg font-black tracking-[-0.03em] text-slate-950 sm:text-xl"
          aria-label="홈으로 이동"
        >
          BW.PORTFOLIO
        </Link>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
            {isMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav aria-label="주요 메뉴" className="hidden self-stretch md:block">
          <ul className="flex h-full items-center gap-8 text-sm font-bold text-slate-600">
            {navigation.map((item) => {
              const isActive = isCurrentPage(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex h-16 items-center border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {isAdmin ? (
              <>
                <li>
                  <Link
                    href="/admin"
                    aria-current={pathname.startsWith("/admin") ? "page" : undefined}
                    className={`inline-flex h-16 items-center border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      pathname.startsWith("/admin")
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent hover:text-slate-950"
                    }`}
                  >
                    관리자
                  </Link>
                </li>
                <li>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="inline-flex h-16 items-center border-b-2 border-transparent transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      로그아웃
                    </button>
                  </form>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>

      {isMenuOpen ? (
        <nav aria-label="모바일 메뉴" className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-5 py-3 shadow-sm md:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 text-sm font-bold text-slate-700">
            {navigation.map((item) => {
              const isActive = isCurrentPage(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)} className={`block rounded-lg px-3 py-3 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50"}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {isAdmin ? (
              <>
                <li><Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-slate-50">관리자</Link></li>
                <li>
                  <form action={logoutAction}>
                    <button type="submit" className="w-full rounded-lg px-3 py-3 text-left hover:bg-slate-50">로그아웃</button>
                  </form>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
