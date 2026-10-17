export type GoalStatus = "planned" | "in-progress" | "completed";
export type PortfolioItemKind = "goal" | "award" | "certification" | "roadmap";

export type PortfolioItem = {
  id: string;
  kind: PortfolioItemKind;
  title: string;
  description?: string;
  year?: number;
  category?: string;
  status?: GoalStatus;
  achievedAt?: string;
  order: number;
  organization?: string;
  date?: string;
  period?: string;
  link?: string;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    description: string;
  };
  about: {
    initials: string;
    profileImage?: string;
    name: string;
    schoolMajor: string;
    club: string;
    interestSummary: string;
    paragraphs: string[];
    securityFocus: string;
    currentStudy: string;
    futureDirection: string;
    extraTechnologies: string[];
  };
};
