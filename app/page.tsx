import FeaturedExperiences from "@/components/FeaturedExperiences";
import HeroSection from "@/components/HeroSection";
import YearlyGoals from "@/components/YearlyGoals";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const isAdmin = session?.user.role === "admin";
  const yearValue = Array.isArray(params.year) ? params.year[0] : params.year;
  const parsedYear = Number.parseInt(yearValue ?? String(new Date().getFullYear()), 10);
  const selectedYear = Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear();
  return (
    <>
      <HeroSection isAdmin={isAdmin} />
      <FeaturedExperiences />
      <YearlyGoals isAdmin={isAdmin} selectedYear={selectedYear} />
    </>
  );
}
