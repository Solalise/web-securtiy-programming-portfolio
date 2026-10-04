import type { Assignment } from "@/types/assignment";

export const assignments: Assignment[] = [
  {
    week: 1,
    title: "소개 및 수업 시작",
    summary:
      "수업의 전체 진행 방식과 웹 프로그래밍 프로젝트의 방향을 확인하고, 학기 동안 사용할 개발 환경과 과제를 준비했습니다.",
    topics: ["수업 소개", "웹 프로그래밍 개요", "포트폴리오 프로젝트 방향 설정"],
    status: "완료",
  },
  {
    week: 2,
    title: "개발 환경 구축",
    summary:
      "React, Next.js, TypeScript 등 이번 학기에 사용할 웹 개발 기술과 개발 환경을 구성했습니다.",
    topics: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Vercel",
    ],
    status: "완료",
  },
  {
    week: 3,
    title: "Next.js 기본 구조와 라우팅",
    summary:
      "Next.js 프로젝트 구조와 App Router 기반 라우팅을 학습하고, Server Component와 Client Component의 차이를 익혔습니다.",
    topics: [
      "App Router",
      "파일 기반 라우팅",
      "Server Component",
      "Client Component",
      "GitHub",
      "Vercel 배포",
    ],
    status: "완료",
  },
  {
    week: 4,
    title: "Next.js 주요 기능",
    summary:
      "동적 라우팅, 데이터 처리, Server Action, Route Handler 등 Next.js의 주요 기능을 예제를 통해 구현했습니다.",
    topics: [
      "Dynamic Route",
      "loading.tsx",
      "Server Action",
      "Route Handler",
      "shadcn/ui",
    ],
    status: "완료",
  },
  {
    week: 5,
    title: "공지사항 게시판",
    summary:
      "공지사항 목록, 상세 조회, 글 작성 기능을 구현하며 게시판 형태의 CRUD 구조를 학습했습니다.",
    topics: [
      "게시글 목록",
      "게시글 상세",
      "글 작성",
      "FormData",
      "Server Action",
      "입력 검증",
    ],
    status: "완료",
  },
  {
    week: 6,
    title: "MongoDB 연동",
    summary:
      "MongoDB Atlas와 Mongoose를 이용해 기존 메모리 기반 데이터를 실제 데이터베이스에 저장하고 조회하도록 변경했습니다.",
    topics: [
      "MongoDB Atlas",
      "Mongoose",
      "Schema",
      "Model",
      "CRUD",
      "환경변수",
      "DB 연결 관리",
    ],
    status: "완료",
  },
  {
    week: 7,
    title: "사용자 인증",
    summary:
      "Auth.js와 bcrypt를 사용하여 회원가입과 로그인, 사용자 세션 처리 등 기본 인증 구조를 학습했습니다.",
    topics: [
      "Authentication",
      "Auth.js",
      "Credentials Provider",
      "bcrypt",
      "JWT Session",
      "로그인",
      "회원가입",
    ],
    status: "완료",
  },
];
