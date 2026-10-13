export const heroContent = {
  eyebrow: "WEB SECURITY & BACKEND DEVELOPER",
  titleBefore: "웹 보안과 백엔드에",
  titleAccent: "집중하는",
  titleAfter: "포트폴리오",
  description:
    "웹 보안에 대한 관심을 바탕으로 백엔드 개발과 취약점 분석을 학습하고, 실제 서비스를 만들며 성장하는 개발자입니다.",
} as const;

export const projectImagePaths: Record<string, string> = {
  repotutor: "/images/projects/repotutor.png",
  travelguard: "/images/projects/travelguard.png",
  portfolio: "/images/projects/portfolio.png",
};

export const quickLinks = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "Blog", href: "#", icon: "blog" },
] as const;

export const interestBadges = [
  "Next.js",
  "TypeScript",
  "MongoDB",
  "Web Security",
  "Backend",
] as const;
