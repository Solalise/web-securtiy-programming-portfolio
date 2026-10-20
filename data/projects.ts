import type { Project } from "@/types/project";

// MongoDB가 비어 있을 때 한 번 등록되는 초기 프로젝트 데이터입니다. 운영 중 수정은 관리자 페이지를 사용하세요.
export const projects: Project[] = [
  {
    id: "web-server-security",
    title: "Next.js 웹 애플리케이션 개발 및 인증 시스템 구현",
    summary:
      "Next.js와 TypeScript로 풀스택 웹 애플리케이션을 단계적으로 구현하며 데이터베이스 연동과 사용자 인증의 동작 원리를 학습하는 전공 수업 실습 프로젝트입니다.",
    category: "Web Development / Backend / Security",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "MongoDB Atlas",
      "Mongoose",
      "Auth.js",
      "bcrypt",
      "GitHub",
      "Vercel",
    ],
    thumbnail: "/images/projects/web-server-security.png",
    overview:
      "Full-Stack Web Development & Authentication\n\n웹서버보안프로그래밍 전공 수업에서 Next.js와 TypeScript를 활용하여 풀스택 웹 애플리케이션을 단계적으로 개발하는 프로젝트입니다. 기본 페이지 구성부터 동적 라우팅, Server Action, MongoDB 연동, 사용자 인증까지 기능을 확장하며 프론트엔드와 백엔드의 동작 원리를 학습하고 있습니다.\n\n특히 MongoDB를 활용한 데이터 영속성, bcrypt 기반 비밀번호 해싱, Auth.js 인증 처리를 중심으로 실제 웹 서비스에 필요한 개발 및 보안 기초를 익히고 있습니다.",
    problem:
      "Frontend\nReact 기반 컴포넌트, Next.js App Router, Tailwind CSS와 shadcn/ui를 활용해 페이지 UI를 구성하고 Server Component와 Client Component의 역할을 구분했습니다.\n\nBackend\nServer Action과 Route Handler, FormData 기반 입력 처리를 활용해 서버에서 데이터를 검증하고 처리하는 흐름을 학습했습니다.\n\nDatabase\nMongoDB Atlas와 Mongoose로 공지사항 데이터를 생성·조회하고, 개발 환경의 불필요한 중복 연결을 줄이기 위한 연결 캐싱 구조를 적용했습니다.\n\nAuthentication & Security\nAuth.js Credentials Provider, bcrypt, JWT 세션과 환경변수를 사용해 인증 정보와 데이터베이스 접속 정보를 안전하게 다루는 방식을 학습했습니다.",
    features: [
      "01. Next.js 프로젝트 환경 구축: App Router, TypeScript, Tailwind CSS 환경을 구성하고 Counter 및 About 페이지를 구현했습니다.",
      "02. 동적 라우팅 및 서버 기능: 상품 목록·상세 페이지, loading.tsx 기반 로딩 UI, Server Action 좋아요 실습과 JSON Route Handler를 구현했습니다.",
      "03. 공지사항 게시판: 목록·상세 조회와 글 작성 기능을 Server Action 및 FormData로 처리하고 작성 후 이동 흐름을 구성했습니다.",
      "04. MongoDB 연동: 메모리 기반 공지사항 데이터를 MongoDB Atlas와 Mongoose 모델로 전환하고 연결 오류에 대비한 오류 처리를 구성했습니다.",
      "05. 인증 시스템: Credentials Provider로 회원가입·로그인·로그아웃을 구현하고, bcrypt 해시 비교와 JWT 세션 기반 로그인 상태 표시를 적용했습니다.",
    ],
    role:
      "평문 비밀번호를 저장하지 않고 bcrypt로 해싱하여 저장하며, 로그인 시 입력값과 해시를 비교합니다.\n\nMONGODB_URI와 AUTH_SECRET은 환경변수로 관리하고, 인증 실패 시 이메일 또는 비밀번호 중 어느 값이 틀렸는지 드러나지 않도록 동일한 오류 메시지를 사용합니다.\n\n사용자 입력은 서버에서 검증하고, 데이터베이스 오류가 발생하더라도 내부 연결 정보가 화면에 노출되지 않도록 구성했습니다. 인증(Authentication)과 인가(Authorization)의 차이도 함께 학습하고 있으며, 관리자 인가 기능은 아직 이 수업 프로젝트의 완료 항목으로 표기하지 않았습니다.",
    troubleshooting:
      "MongoDB Atlas의 SRV 연결은 DNS와 Network Access 설정의 영향을 받으므로 연결 문자열, 데이터베이스 사용자 권한, 네트워크 허용 설정을 함께 점검했습니다.\n\n현재는 수업 진도에 맞춰 기능을 확장 중이며, 이후 사용자별 접근 권한 제어와 추가 웹 보안 기능을 학습하며 이 상세 페이지에 기록을 이어갈 예정입니다.",
    learned: [
      "사용자 요청이 서버에서 처리되어 데이터베이스에 저장되는 전체 흐름",
      "Server Action과 데이터베이스 접근 계층을 분리하는 방법",
      "App Router의 동적 라우팅과 Server·Client Component 역할 구분",
      "bcrypt 해싱, JWT 세션, 환경변수 보호를 인증 흐름에 적용하는 방법",
      "인증과 인가가 서로 다른 보안 책임이라는 점",
    ],
    githubUrl: "https://github.com/Solalise/web-server-security-4week",
    demoUrl: "https://web-server-security-4week.vercel.app/",
    period: "2026.09 ~ 진행 중",
    teamSize: "개인 실습 프로젝트 · 대학교 전공 수업",
    status: "진행중",
    featured: false,
  },
  {
    id: "repotutor",
    title: "RepoTutor",
    summary:
      "GitHub 저장소의 코드 구조와 실행 흐름을 분석하고, 이를 시각화하여 초보 개발자의 프로젝트 이해를 돕는 코드 학습 서비스입니다.",
    category: "AI / 개발 학습",
    techStack: ["Next.js", "TypeScript", "React", "Auth.js", "GitHub API", "AST (ts-morph)", "AI"],
    thumbnail: "/images/projects/repotutor.png",
    overview:
      "RepoTutor는 GitHub 저장소를 분석하여 복잡한 코드 구조와 기능 간 연결 관계를 시각적으로 보여주는 학습 서비스입니다.\n\n단순히 AI가 코드를 설명하는 방식에서 벗어나, AST 기반 정적 분석과 그래프 탐색을 활용해 사용자가 프로젝트의 구조와 동작 흐름을 단계적으로 이해하도록 돕는 것을 목표로 합니다.",
    problem:
      "AI 코딩 도구를 활용한 개발이 증가하면서 코드의 동작 원리를 충분히 이해하지 못한 채 프로젝트를 완성하는 경우가 발생하고 있습니다.\n\n특히 초보 개발자는 자신이 담당하지 않은 팀원의 코드나 여러 파일에 분산된 기능의 연결 관계를 파악하는 데 어려움을 겪습니다. 기존 AI 코드 설명 방식 역시 사용자가 직접 분석할 파일을 찾아 질문해야 하며, 프로젝트 전체 맥락을 이해하기 어렵다는 한계가 있습니다.",
    features: [
      "GitHub 저장소 분석: 저장소의 파일 구조와 주요 코드 관계를 자동으로 분석",
      "AST 기반 정적 분석: Import 관계, 함수 호출 관계, API 연결 관계 등을 추출",
      "코드 흐름 시각화: 분석한 코드 관계를 그래프로 구성하고 DFS 기반 탐색 지원",
      "학습용 보기: 복잡한 코드 구조를 초보자가 이해하기 쉬운 한국어 설명 중심으로 제공",
      "개발자 보기: 실제 함수명과 파일 간 의존 관계 등 기술적인 코드 구조 확인",
      "기능 단위 분석: 특정 기능과 관련된 코드 및 연결 관계를 집중적으로 탐색",
      "AI 기반 코드 학습: 필요한 코드 맥락을 바탕으로 주요 로직과 개발 개념 설명 기능 개발",
    ],
    role: "프로젝트 아이디어 기획부터 서비스 구조 설계, UI/UX 구성, GitHub 저장소 분석 기능 구현 및 개선까지 전반적인 개발 과정을 담당했습니다.\n\n특히 초보 개발자의 학습 경험을 중심으로 AST 기반 코드 분석 구조와 학습용·개발자 보기의 시각화 방식을 설계하고, AI 호출 비용을 줄이기 위한 분석 구조 최적화를 진행했습니다.",
    troubleshooting:
      "1. GitHub API 요청 제한 문제\n초기에는 저장소 분석 과정에서 파일별로 GitHub API를 호출하여 비인증 API 요청 제한에 빠르게 도달하는 문제가 발생했습니다. 이를 해결하기 위해 저장소 메타데이터와 커밋 정보를 조회한 후 소스 코드 아카이브를 다운로드하는 방식으로 변경하여 API 요청 수를 크게 줄였습니다.\n\n2. AI 토큰 사용량 최적화\n저장소 전체 코드를 AI에 전달하면 불필요한 토큰 사용과 처리 비용이 증가하는 문제가 있었습니다. 이를 개선하기 위해 AST 기반 정적 분석으로 코드 간 관계를 먼저 추출하고, 사용자가 학습하려는 기능과 관련된 코드만 AI에 전달하는 구조를 설계했습니다.\n\n3. 초보자 중심 시각화 개선\n초기 코드 그래프는 함수명과 파일 간 연결 관계를 중심으로 표시되어 초보자가 실제 기능의 동작을 이해하기 어려웠습니다. 이를 개선하기 위해 학습용 보기와 개발자 보기를 분리하고, 학습용 화면에서는 한국어 역할 설명을 중심으로 코드 흐름을 파악할 수 있도록 구성했습니다.",
    learned: [
      "AST를 활용한 코드 구조 분석 및 관계 추출 방법",
      "GitHub API 요청 제한과 대규모 저장소 분석 최적화",
      "DFS 기반 그래프 탐색 및 코드 흐름 시각화",
      "AI 토큰 사용량을 고려한 효율적인 분석 구조 설계",
      "초보 개발자의 이해도를 고려한 UI/UX 설계",
      "Next.js와 TypeScript를 활용한 풀스택 서비스 개발",
    ],
    period: "2026",
    teamSize: "개인 프로젝트",
    status: "진행중",
    featured: true,
  },
  {
    id: "travelguard",
    title: "TravelGuard · 해외 여행자 사건·사고 대응",
    summary:
      "해외 여행 중 발생할 수 있는 분실·도난 사건 대응을 돕는 여행 안전 지원 서비스입니다.",
    category: "여행 / 안전",
    techStack: ["Next.js", "Expo", "Supabase", "TypeScript", "OpenAI", "Maps API"],
    thumbnail: "/images/projects/travelguard.png",
    overview:
      "멋쟁이사자처럼 해커톤에서 개발한 TravelGuard는 해외 여행자가 사건·사고를 겪었을 때 진술 내용을 정리하고, 추가 질문과 기관·지도 안내를 통해 대응을 돕는 서비스입니다.",
    problem:
      "해외에서 도난이나 분실 사고가 발생하면 언어와 현지 신고 절차 문제 때문에 여행자가 필요한 정보를 정리하고 신고를 진행하기 어렵습니다.",
    features: [
      "사건 진술 입력 및 정리",
      "AI 기반 추가 질문",
      "사건 정보 정리",
      "주변 경찰서·대사관 등 기관 안내",
      "지도 연동과 경로 안내",
      "신고서 초안 생성",
      "사건 카드 관리",
    ],
    role: "팀 프로젝트에서 서비스 기획과 백엔드 구조를 함께 설계하고, 사건 진술·AI 추가 질문·기관 및 지도 연동 흐름 구현에 참여했습니다.",
    troubleshooting:
      "지도 API 요청 오류와 모바일 환경의 지도 연동 문제를 점검하고, AI 추가 질문이 중복되지 않도록 질문 생성 흐름을 개선했습니다.",
    learned: [
      "Next.js와 Expo를 함께 사용하는 서비스 설계",
      "Supabase 기반 데이터 관리",
      "외부 지도 API 연동",
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
      "기존 정적 포트폴리오를 Next.js·TypeScript·MongoDB 기반으로 개편한 개인 포트폴리오입니다.",
    category: "Web / Portfolio",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Auth.js", "Tailwind CSS"],
    thumbnail: "/images/projects/portfolio.png",
    overview:
      "기존 HTML/CSS/JavaScript 기반 정적 포트폴리오를 Next.js와 TypeScript 기반의 동적 포트폴리오로 확장하는 프로젝트입니다.",
    problem:
      "기존 포트폴리오는 localStorage 중심의 정적 구조여서 프로젝트나 학습 기록을 체계적으로 관리하기 어려웠습니다.",
    features: [
      "MongoDB 기반 프로젝트·실습 기록 관리",
      "프로젝트 목록과 상세 페이지",
      "Experience & Labs 기록",
      "Q&A 문의 게시판",
      "관리자 로그인",
      "관리자 콘텐츠 관리",
    ],
    role: "전체 기획, UI 설계, 프론트엔드 및 백엔드 구현을 직접 진행합니다.",
    troubleshooting:
      "정적 localStorage 구조를 MongoDB 데이터 모델로 이전하고, DNS 연결 오류를 분석해 데이터베이스 연결 방식을 정리했습니다.",
    learned: [
      "Next.js App Router",
      "TypeScript 기반 컴포넌트 설계",
      "MongoDB 연동",
      "관리자 인증 및 CRUD 설계",
    ],
    period: "2026",
    teamSize: "개인 프로젝트",
    status: "진행중",
    featured: true,
  },
  {
    id: "portfolio-semester1",
    title: "1학기 개인 포트폴리오 사이트",
    summary:
      "HTML과 CSS를 기반으로 프로젝트와 블로그를 소개하기 위해 제작한 첫 개인 포트폴리오 웹사이트입니다.",
    category: "Web / Portfolio",
    techStack: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/portfolio-semester1.png",
    overview:
      "1학기에 제작한 개인 포트폴리오 사이트로, 프로젝트와 블로그를 한곳에서 소개할 수 있는 정적 웹사이트를 구현했습니다.",
    problem:
      "학습한 작업물과 프로젝트를 체계적으로 보여줄 수 있는 개인 소개 페이지가 필요했습니다.",
    features: [
      "프로젝트 소개 페이지",
      "블로그 링크 제공",
      "자기소개 콘텐츠 구성",
      "반응형 페이지 레이아웃",
    ],
    role: "기획, 디자인, HTML·CSS·JavaScript 기반 프론트엔드 구현을 직접 진행했습니다.",
    troubleshooting:
      "프로젝트 소개와 개인 정보를 한 화면에서 읽기 쉽게 전달할 수 있도록 섹션 구조와 시각적 위계를 조정했습니다.",
    learned: [
      "HTML·CSS 기반 페이지 구조 설계",
      "반응형 레이아웃 구현",
      "프로젝트를 소개하는 콘텐츠 구성 방법",
    ],
    period: "1학기",
    teamSize: "개인 프로젝트",
    status: "완료",
    featured: true,
  },
  {
    id: "majormate",
    title: "MajorMate",
    summary:
      "전공별 정보 공유와 스터디 모집·매칭 기능을 제공하는 대학생 맞춤형 전공 커뮤니티 플랫폼입니다.",
    category: "Community / Education",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "MongoDB",
      "Mongoose",
      "Auth.js",
      "bcrypt",
    ],
    thumbnail: "/images/projects/majormate.png",
    overview:
      "복학경로당 리턴즈 팀이 개발한 MajorMate는 전공별 정보를 공유하고 스터디를 모집·매칭할 수 있도록 만든 대학생 전공 커뮤니티 플랫폼입니다.",
    problem:
      "대학생이 전공별 정보와 스터디 참여 기회를 한곳에서 찾고, 관심사가 맞는 구성원과 연결될 수 있는 커뮤니티 공간이 필요했습니다.",
    features: [
      "전공별 정보 공유 게시판",
      "게시글 작성·조회·수정·삭제",
      "게시글 검색",
      "페이지네이션 기반 목록 조회",
      "스터디 모집 및 매칭",
      "Auth.js 기반 사용자 인증",
    ],
    role: "게시판 백엔드 개발을 담당해 게시글 CRUD, 검색, 페이지네이션과 목록 조회 기능을 구현했습니다.",
    troubleshooting:
      "게시판 기능에서 작성·조회·수정·삭제, 검색, 페이지네이션이 일관되게 동작하도록 Next.js Server Actions와 MongoDB 쿼리 구조를 구성했습니다.",
    learned: [
      "Next.js Server Actions 기반 데이터 처리",
      "MongoDB와 Mongoose를 활용한 게시판 모델링",
      "Auth.js와 bcrypt를 이용한 인증 처리",
      "GitHub Pull Request 기반 팀 협업",
      "Vercel 배포 흐름",
    ],
    teamSize: "팀 프로젝트 · 복학경로당 리턴즈",
    status: "진행중",
    featured: true,
  },
  {
    id: "security-guide",
    title: "Security Guide",
    summary:
      "OWASP 취약점 사례를 바탕으로 취약 코드와 보안 조치 코드를 비교하며 학습하는 웹 보안 플랫폼입니다.",
    category: "Web Security",
    techStack: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/security-guide.png",
    overview:
      "Security Guide는 웹 취약점의 원인과 대응 방식을 코드 단위로 비교하며 학습할 수 있도록 만든 보안 학습 플랫폼입니다.",
    problem:
      "보안 개념만으로는 취약점이 실제 코드에서 어떻게 발생하고 방어되는지 이해하기 어려워, 취약한 구현과 개선된 구현을 함께 확인할 수 있는 학습 흐름이 필요했습니다.",
    features: [
      "OWASP 취약점 사례 정리",
      "취약 코드와 보안 코드 비교",
      "XSS 학습 콘텐츠",
      "접근 통제 학습 콘텐츠",
      "무차별 대입 대응 학습 콘텐츠",
    ],
    role: "학습 콘텐츠 구조를 설계하고 취약점 사례, 방어 코드, 사용자 인증·접근 통제 기능을 구현했습니다.",
    troubleshooting:
      "보안 조치가 단순 설명에 그치지 않도록 취약한 코드와 개선된 코드를 나란히 비교하는 구조로 학습 흐름을 구성했습니다.",
    learned: [
      "OWASP 기반 취약점 분석 관점",
      "XSS와 접근 통제 방어 방법",
      "로그인 시도 제한 등 무차별 대입 대응",
      "보안 학습 콘텐츠 설계",
    ],
    period: "2026",
    teamSize: "팀 프로젝트",
    status: "완료",
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectStatusLabel(project: Pick<Project, "id" | "status">): string {
  const statusByProjectId: Record<string, string> = {
    "web-server-security": "진행중",
    repotutor: "진행중",
    portfolio: "진행중",
    majormate: "진행중",
    "security-guide": "완료",
  };

  if (statusByProjectId[project.id]) return statusByProjectId[project.id];
  return project.status === "완료" ? "완료" : "기획";
}
