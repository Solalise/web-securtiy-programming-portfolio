// 메인 화면의 올해 목표 제목과 네 개의 목표 카드를 수정하는 파일입니다.
export const yearlyGoalsContent = {
  eyebrow: "2026 GOALS",
  title: "2026년 목표",
} as const;

export type YearlyGoal = {
  number: string;
  title: string;
  descriptions: string[];
};

export const yearlyGoals: YearlyGoal[] = [
  {
    number: "01",
    title: "웹 보안 및 취약점 분석 역량 강화",
    descriptions: [
      "웹 취약점 분석과 모의해킹 실습",
      "워게임 및 CTF를 통한 실전 보안 역량 향상",
    ],
  },
  {
    number: "02",
    title: "실전 프로젝트 경험 확대",
    descriptions: [
      "풀스택 웹 프로젝트 완성도 향상",
      "실제 서비스 구현 및 보안 설계 경험 축적",
    ],
  },
  {
    number: "03",
    title: "전공 학업 및 기초 역량 강화",
    descriptions: [
      "전공 학습과 높은 학업 성취도 유지",
      "자료구조, 알고리즘, 네트워크, 운영체제 등 핵심 CS 역량 강화",
    ],
  },
  {
    number: "04",
    title: "정보보호 분야 진로 준비",
    descriptions: [
      "취약점 분석 및 모의해킹 중심의 진로 탐색",
      "리버싱 및 시스템 보안 분야로 학습 범위 확장",
    ],
  },
];
