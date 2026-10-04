"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/about", label: "소개" },
  { href: "/projects", label: "프로젝트" },
  { href: "/assignments", label: "과제" },
  { href: "/devlog", label: "개발 로그" },
  { href: "/login", label: "관리자" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/"
          className="w-fit text-xl font-bold tracking-tight text-zinc-950"
          aria-label="홈으로 이동"
        >
          BW<span className="text-blue-600">.</span>
        </Link>

        <nav aria-label="주요 메뉴" className="-mb-1">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-zinc-600 sm:gap-x-7">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex border-b-2 py-2 transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
