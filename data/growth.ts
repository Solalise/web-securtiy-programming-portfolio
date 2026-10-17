// 성장 과정 페이지의 제목, 소개 문구와 타임라인 단계를 수정하는 파일입니다.
export const growthPageContent = {
  eyebrow: "MY GROWTH JOURNEY",
  title: "성장 과정",
  description:
    "웹 개발의 기초부터 백엔드와 인증을 거쳐 웹 보안으로 관심 분야를 넓혀 온 과정을 정리했습니다.",
} as const;

export type GrowthStep = {
  step: string;
  title: string;
  description: string;
};

export const growthSteps: GrowthStep[] = [
  {
    step: "01",
    title: "웹 개발 기초",
    description: "HTML, CSS, JavaScript를 학습하며 웹 개발의 기초를 익혔습니다.",
  },
  {
    step: "02",
    title: "Next.js / TypeScript",
    description: "Next.js와 TypeScript 기반 웹 개발 흐름을 학습했습니다.",
  },
  {
    step: "03",
    title: "MongoDB / 인증",
    description: "데이터베이스 연동과 사용자 인증 구조를 구현했습니다.",
  },
  {
    step: "04",
    title: "웹 보안",
    description: "웹 취약점과 보안 관점의 개발을 꾸준히 학습하고 있습니다.",
  },
  {
    step: "05",
    title: "다음 목표",
    description: "모의해킹과 더 깊은 보안 분야로 확장하는 것이 목표입니다.",
  },
];
