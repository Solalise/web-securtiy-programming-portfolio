import type { Project } from "@/types/project";

// MongoDB가 비어 있을 때 한 번 등록되는 초기 프로젝트 데이터입니다. 운영 중 수정은 관리자 페이지를 사용하세요.
export const projects: Project[] = [
  {
    id: "repotutor",
    title: "RepoTutor",
    summary:
      "GitHub 저장소를 분석하여 개인 맞춤형 학습 경로를 제공하는 AI 기반 학습 도우미입니다.",
    category: "AI / 개발 학습",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Auth.js", "GitHub API", "AI"],
    overview:
      "RepoTutor는 GitHub 저장소의 코드 구조와 주요 흐름을 분석하여 사용자가 프로젝트를 더 쉽게 이해하고 학습할 수 있도록 돕는 서비스입니다.",
    problem:
      "AI 코딩 도구를 사용해 개발하는 경우 자신이 작성한 코드나 팀원이 작성한 코드를 충분히 이해하지 못하는 문제가 발생할 수 있습니다. 특히 초보 개발자는 규모가 있는 저장소의 전체 흐름을 파악하기 어렵습니다.",
    features: [
      "저장소 분석",
      "기능 단위 코드 흐름 설명",
      "주요 코드 설명",
      "개발 용어 설명",
      "취약 지점 학습",
      "맞춤형 학습 흐름",
    ],
    role: "서비스 기획, 기능 설계, UI 구성, 백엔드 구조 설계 및 AI 기반 저장소 분석 기능 설계를 담당했습니다.",
    troubleshooting:
      "대규모 저장소 전체 코드를 AI에 전달하면 토큰 사용량과 처리 시간이 증가하는 문제가 있어 필요한 파일과 코드만 선별하여 분석하도록 구조를 개선했습니다.",
    learned: [
      "대규모 코드베이스를 효율적으로 분석하는 방법",
      "AI API 활용 시 토큰 관리의 중요성",
      "코드 구조를 사용자에게 이해하기 쉽게 시각화하는 방법",
      "Next.js 기반 풀스택 서비스 설계",
    ],
    period: "2026",
    teamSize: "개인 프로젝트",
    status: "기획 및 개발",
    featured: true,
  },
  {
    id: "travelguard",
    title: "TravelGuard",
    summary:
      "해외 여행 중 발생할 수 있는 분실·도난 사건 대응을 돕는 여행 안전 지원 서비스입니다.",
    category: "여행 / 안전",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI", "React Native"],
    overview:
      "TravelGuard는 해외 여행자가 도난이나 분실 사고를 겪었을 때 사건 내용을 정리하고 주변 기관을 찾으며 신고에 필요한 문서를 준비할 수 있도록 돕는 서비스입니다.",
    problem:
      "해외에서 도난이나 분실 사고가 발생하면 언어와 현지 신고 절차 문제 때문에 여행자가 필요한 정보를 정리하고 신고를 진행하기 어렵습니다.",
    features: [
      "사건 진술 입력",
      "AI 기반 추가 질문",
      "사건 정보 정리",
      "주변 경찰서 등 기관 탐색",
      "경로 안내",
      "신고서 초안 생성",
      "사건 카드 관리",
    ],
    role: "백엔드 API, 데이터 모델, 인증 구조, 지도 및 외부 API 연동, AI 질문 로직과 신고서 생성 기능 등을 구현했습니다.",
    troubleshooting:
      "Google Routes API 요청 오류와 모바일 지도 라이브러리 개발 환경 문제를 해결하고, AI 질문이 중복으로 생성되는 문제를 개선했습니다.",
    learned: [
      "Next.js API 설계",
      "Prisma와 PostgreSQL 데이터 모델링",
      "외부 지도 API 연동",
      "JWT 기반 인증",
      "AI를 실제 서비스 흐름에 연결하는 방법",
    ],
    period: "2026",
    teamSize: "팀 프로젝트",
    status: "완료",
    featured: true,
  },
  {
    id: "portfolio",
    title: "포트폴리오",
    summary:
      "Next.js와 TypeScript를 기반으로 프로젝트와 개발 기록을 관리하는 개인 포트폴리오입니다.",
    category: "Web / Portfolio",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Auth.js", "Tailwind CSS"],
    overview:
      "기존 HTML/CSS/JavaScript 기반 정적 포트폴리오를 Next.js와 TypeScript 기반의 동적 포트폴리오로 확장하는 프로젝트입니다.",
    problem:
      "기존 포트폴리오는 localStorage 중심의 정적 구조여서 프로젝트나 학습 기록을 체계적으로 관리하기 어려웠습니다.",
    features: [
      "프로젝트 목록",
      "프로젝트 상세",
      "과제 모음",
      "개발 로그",
      "관리자 로그인",
      "관리자 콘텐츠 관리",
    ],
    role: "전체 기획, UI 설계, 프론트엔드 및 백엔드 구현을 직접 진행합니다.",
    troubleshooting:
      "현재 개발 진행 중이며 구현 과정에서 발생하는 문제를 개발 로그로 정리할 예정입니다.",
    learned: [
      "Next.js App Router",
      "TypeScript 기반 컴포넌트 설계",
      "MongoDB 연동",
      "관리자 인증 및 CRUD 설계",
    ],
    period: "2026",
    teamSize: "개인 프로젝트",
    status: "개발 중",
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
