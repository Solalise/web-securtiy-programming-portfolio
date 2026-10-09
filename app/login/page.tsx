import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { loginAction } from "@/actions/auth";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "관리자 로그인",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const [session, { error }] = await Promise.all([auth(), searchParams]);

  if (session?.user.role === "admin") {
    redirect("/admin");
  }

  const hasError = error === "credentials";

  return (
    <section className="mx-auto max-w-md py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold text-blue-600">ADMIN</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        관리자 로그인
      </h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">
        프로젝트 관리 권한이 있는 계정으로 로그인하세요.
      </p>

      <form
        action={loginAction}
        className="mt-10 space-y-5 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
      >
        {hasError ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            이메일 또는 비밀번호가 올바르지 않습니다.
          </p>
        ) : null}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-zinc-800"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="min-h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-zinc-800"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="min-h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          로그인
        </button>
      </form>
    </section>
  );
}
