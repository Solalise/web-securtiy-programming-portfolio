// 소개 페이지의 프로필, 관심 분야, 기술 스택과 학습 방향을 수정하는 파일입니다.
export const aboutPageContent = {
  eyebrow: "ABOUT",
  title: "소개",
  description: [
    "웹 보안과 백엔드 개발을 중심으로 공부하고 있으며,",
    "취약점 분석과 보안 리서치 분야로 성장하는 것을 목표로 하고 있습니다.",
  ],
  profileEyebrow: "PROFILE",
  profileTitle: "프로필",
  interestsEyebrow: "INTERESTS",
  interestsTitle: "관심 분야",
  skillsEyebrow: "SKILLS",
  skillsTitle: "기술 스택",
  directionEyebrow: "DIRECTION",
  directionTitle: "학습 방향",
  focusTitle: "현재 집중하고 있는 것",
} as const;

export const profile = {
  initials: "BW",
  name: "최보원",
  major: "정보보호학과",
  details: [
    { label: "집중 분야", value: "웹 보안" },
    { label: "관심 분야", value: "백엔드 개발" },
    { label: "목표", value: "취약점 분석 · 모의해킹" },
  ],
  paragraphs: [
    "정보보호학과에서 웹 개발과 보안을 함께 공부하고 있습니다.",
    "단순히 기능을 구현하는 것에 그치지 않고, 웹 애플리케이션이 어떤 구조로 동작하는지 이해하고 그 과정에서 발생할 수 있는 보안 문제를 분석하는 것에 관심이 있습니다.",
    "현재는 Next.js와 TypeScript를 중심으로 프론트엔드와 백엔드를 함께 학습하고 있으며, MongoDB와 인증 구조 등 실제 웹 서비스에 필요한 기술을 익히고 있습니다.",
    "장기적으로는 웹 취약점 분석과 모의해킹 역량을 쌓고, 이후 리버싱과 시스템 보안 분야까지 학습 범위를 넓히는 것이 목표입니다.",
  ],
} as const;

export const interests = [
  { marker: "01", title: "웹 보안", description: "웹 애플리케이션의 동작 구조와 취약점을 분석하고, 안전한 개발 방법을 학습하는 데 관심이 있습니다." },
  { marker: "02", title: "백엔드 개발", description: "API, 데이터베이스, 인증과 같은 서버 측 기능을 구현하며 웹 서비스 전체 흐름을 이해하는 것을 목표로 합니다." },
  { marker: "03", title: "취약점 분석", description: "실제 서비스에서 발생할 수 있는 보안 문제를 발견하고, 원인과 공격 흐름을 분석하는 역량을 키우고 있습니다." },
] as const;

export const skillGroups = [
  { title: "프론트엔드", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { title: "백엔드", skills: ["Next.js Server Actions", "Route Handlers", "REST API"] },
  { title: "데이터베이스", skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma"] },
  { title: "인증 / 보안", skills: ["Auth.js", "bcrypt", "JWT", "Web Security"] },
  { title: "도구", skills: ["Git", "GitHub", "Vercel", "VS Code"] },
] as const;

export const learningSteps = [
  { label: "현재", title: "웹 개발과 백엔드 기초 강화", description: "Next.js · TypeScript · MongoDB · 인증" },
  { label: "다음 단계", title: "웹 취약점 분석과 모의해킹 심화", description: "웹 구조 이해 · 취약점 실습 · 보안 프로젝트" },
  { label: "장기 목표", title: "리버싱과 시스템 보안으로 확장", description: "시스템 구조 이해 · 리버싱 · 보안 연구" },
] as const;

export const currentFocus = [
  "Next.js와 TypeScript 기반 웹 개발",
  "MongoDB를 활용한 데이터 처리",
  "웹 인증 및 접근 제어",
  "웹 취약점 분석 기초",
  "프로젝트를 통한 실전 개발 경험",
] as const;
