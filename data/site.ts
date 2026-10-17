// 사이트 이름, 메인 문구, 공통 메뉴, Footer와 외부 링크를 수정하는 파일입니다.
export const siteIdentity = {
  name: "BW.PORTFOLIO",
  description: "개인 개발자 포트폴리오 웹사이트입니다.",
} as const;

export const heroContent = {
  eyebrow: "WEB SECURITY & BACKEND DEVELOPER",
  titleBefore: "웹 보안과 백엔드에",
  titleAccent: "집중하는",
  titleAfter: "포트폴리오",
  description:
    "웹 보안에 대한 관심을 바탕으로 백엔드 개발과 취약점 분석을 학습하고, 실제 서비스를 만들며 성장하는 개발자입니다.",
  projectsButton: "프로젝트 보기",
  contactButton: "문의하기",
} as const;

export const mainNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Project" },
  { href: "/experiences", label: "Experience & Labs" },
  { href: "/growth", label: "Growth Journey" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerContent = {
  description: "개인 포트폴리오 웹사이트 | Next.js · TypeScript 기반 제작",
  copyright: "© 2026 Bowon Portfolio. All rights reserved.",
} as const;

export const footerNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Project" },
  { href: "/experiences", label: "Experience & Labs" },
  { href: "/growth", label: "Growth Journey" },
  { href: "/contact", label: "Contact" },
] as const;

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
