"use client";

import { useActionState } from "react";

import {
  submitContactAction,
  type ContactFormState,
} from "@/actions/contacts";
import { contactCategories, contactPageContent } from "@/data/contact";

const inputClassName =
  "mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialContactFormState,
  );
  return (
    <form
      action={formAction}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {state.message ? (
        <p
          className={`mb-7 rounded-lg border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role={state.status === "success" ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="이름" name="name" error={state.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            required
            maxLength={50}
            autoComplete="name"
            className={inputClassName}
          />
        </FormField>

        <FormField label="이메일" name="email" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClassName}
          />
        </FormField>

        <FormField
          label="문의 유형"
          name="category"
          error={state.fieldErrors?.category}
        >
          <select id="category" name="category" required className={inputClassName}>
            <option value="">문의 유형을 선택해 주세요</option>
            {contactCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="제목" name="title" error={state.fieldErrors?.title}>
          <input
            id="title"
            name="title"
            required
            maxLength={120}
            className={inputClassName}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField label="내용" name="content" error={state.fieldErrors?.content}>
            <textarea
              id="content"
              name="content"
              required
              maxLength={5000}
              rows={9}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-7 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </FormField>
        </div>

        <FormField
          label="작성 비밀번호"
          name="password"
          error={state.fieldErrors?.password}
        >
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={72}
            autoComplete="new-password"
            className={inputClassName}
            aria-describedby="password-hint"
          />
          <p id="password-hint" className="mt-2 text-xs leading-5 text-zinc-500">
            비밀글 열람과 작성글 수정·삭제에 사용합니다. 8자 이상 입력해 주세요.
          </p>
        </FormField>

        <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold text-zinc-800">
          <input
            name="isPrivate"
            type="checkbox"
            className="size-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
          />
          비밀글로 작성
        </label>
      </div>

      <div className="mt-7 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <p className="text-xs leading-5 text-zinc-600">
          {contactPageContent.privacyNotice}
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-semibold text-zinc-800">
          <input
            name="privacy"
            type="checkbox"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
          />
          개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
        {state.fieldErrors?.privacy ? (
          <p className="mt-2 text-xs text-red-600">{state.fieldErrors.privacy}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
        style={{ color: "#ffffff" }}
      >
        {isPending ? "등록 중..." : "문의 등록"}
      </button>
    </form>
  );
}

function FormField({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-zinc-800">
        {label} <span className="text-blue-600">*</span>
      </label>
      {children}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
