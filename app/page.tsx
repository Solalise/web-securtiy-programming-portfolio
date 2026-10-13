import AssignmentPreview from "@/components/AssignmentPreview";
import FloatingQuickLinks from "@/components/FloatingQuickLinks";
import GrowthTimeline from "@/components/GrowthTimeline";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AssignmentPreview />
      <GrowthTimeline />
      <FloatingQuickLinks />
    </>
  );
}
