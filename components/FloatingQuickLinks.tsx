import Link from "next/link";

import { logoutAction } from "@/actions/auth";
import { quickLinks } from "@/data/site";

function QuickLinkIcon({ icon }: { icon: "github" | "blog" }) {
  if (icon === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .08 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.7c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M15 3v4h4M8 12h8M8 16h8" />
    </svg>
  );
}

export default function FloatingQuickLinks({ isAdmin }: { isAdmin: boolean }) {
  return (
    <aside className="fixed right-3 bottom-3 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-6" aria-label="외부 바로가기">
      {quickLinks.map((link) => (
        <a key={link.label} href={link.href} aria-label={link.label} className="flex size-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:h-11 sm:w-auto sm:rounded-lg sm:px-4">
          <QuickLinkIcon icon={link.icon} />
          <span className="hidden text-xs font-bold sm:inline">{link.label}</span>
        </a>
      ))}
      {isAdmin ? (
        <>
          <Link href="/admin" aria-label="관리자 페이지" className="flex size-11 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 shadow-sm hover:bg-blue-100 sm:h-11 sm:w-auto sm:rounded-lg sm:px-4"><span className="text-xs font-bold">관리 중</span></Link>
          <form action={logoutAction}><button type="submit" className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 sm:h-11 sm:w-auto sm:rounded-lg sm:px-4"><span className="text-xs font-bold">로그아웃</span></button></form>
        </>
      ) : (
        <Link href="/login" aria-label="관리자 로그인" className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 sm:h-11 sm:w-auto sm:rounded-lg sm:px-4"><span className="text-xs font-bold">관리자</span></Link>
      )}
    </aside>
  );
}
