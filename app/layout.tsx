import type { Metadata } from "next";

import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BW. | 개발자 포트폴리오",
    template: "%s | BW.",
  },
  description: "개인 개발자 포트폴리오 웹사이트입니다.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased">
        <Header isAdmin={session?.user.role === "admin"} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
