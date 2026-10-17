import type { Metadata } from "next";

import { auth } from "@/auth";
import Footer from "@/components/Footer";
import FloatingQuickLinks from "@/components/FloatingQuickLinks";
import Header from "@/components/Header";
import { siteIdentity } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteIdentity.name} | 개발자 포트폴리오`,
    template: `%s | ${siteIdentity.name}`,
  },
  description: siteIdentity.description,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased">
        <Header />
        <div className="flex min-h-screen flex-col">
          <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-8">
            {children}
          </main>
          <Footer />
        </div>
        <FloatingQuickLinks isAdmin={session?.user.role === "admin"} />
      </body>
    </html>
  );
}
