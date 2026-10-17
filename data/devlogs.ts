import type { DevLog } from "@/types/devlog";

// 개발 로그 페이지의 안내 문구와 각 로그 내용을 수정하는 파일입니다.
export const devLogPageContent = {
  eyebrow: "DEV LOG",
  title: "개발 로그",
  description: [
    "프로젝트를 개발하며 겪은 문제와 해결 과정,",
    "새롭게 배운 내용을 기록합니다.",
  ],
} as const;

export const devLogs: DevLog[] = [
  {
    id: "mongodb-atlas-connection",
    title: "MongoDB Atlas 연결 오류 해결",
    summary:
      "Next.js 프로젝트에서 MongoDB Atlas 연결이 실패했던 원인을 확인하고 Network Access 설정과 연결 환경을 점검한 과정을 정리했습니다.",
    content: {
      problem:
        "애플리케이션에서 MongoDB Atlas에 연결할 때 연결 오류가 발생해 공지사항 데이터를 정상적으로 조회하지 못했습니다.",
      cause:
        "MongoDB Atlas의 Network Access 설정과 연결 환경을 점검할 필요가 있었습니다.",
      solution: [
        "MongoDB Atlas Network Access 설정 확인",
        "현재 개발 환경의 네트워크 접근 허용 여부 확인",
        "`.env.local`의 MongoDB URI 확인",
        "DB 이름 및 연결 문자열 확인",
        "개발 서버 재시작 후 연결 재검증",
      ],
      learned:
        "DB 연결 문제가 발생했을 때 코드뿐 아니라 외부 서비스의 네트워크 설정, 환경변수, 연결 문자열을 함께 확인해야 한다는 것을 배웠습니다.",
    },
    tags: ["MongoDB", "Atlas", "트러블슈팅"],
    createdAt: "2026-09-28",
  },
  {
    id: "nextjs-dynamic-routing",
    title: "Next.js 동적 라우팅 구현",
    summary:
      "프로젝트별 상세 페이지를 만들기 위해 App Router의 동적 라우팅 구조를 적용한 과정을 정리했습니다.",
    content: {
      problem:
        "모든 프로젝트에 별도의 페이지 파일을 만드는 대신 프로젝트 ID에 따라 하나의 상세 페이지에서 데이터를 보여줄 필요가 있었습니다.",
      solution: [
        "`app/projects/[id]/page.tsx` 구성",
        "프로젝트 ID 기반 데이터 조회",
        "`generateStaticParams()` 적용",
        "존재하지 않는 프로젝트는 `notFound()` 처리",
      ],
      learned:
        "Next.js의 파일 기반 동적 라우팅과 정적 페이지 생성 방식을 이해하게 되었습니다.",
    },
    tags: ["Next.js", "App Router", "Routing"],
    createdAt: "2026-10-03",
  },
  {
    id: "typescript-data-structure",
    title: "TypeScript 기반 프로젝트 데이터 구조 설계",
    summary:
      "프로젝트와 과제 데이터를 UI에서 분리하고 TypeScript 타입을 활용해 구조적으로 관리했습니다.",
    content: {
      problem:
        "페이지 컴포넌트 내부에 데이터를 직접 작성하면 향후 MongoDB로 변경하거나 데이터를 확장할 때 유지보수가 어려워질 수 있었습니다.",
      solution: [
        "`types` 폴더에 데이터 타입 분리",
        "`data` 폴더에 더미 데이터 분리",
        "재사용 가능한 UI 컴포넌트 구성",
        "데이터와 화면 렌더링 역할 분리",
      ],
      learned:
        "처음부터 데이터 구조와 UI를 분리하면 향후 DB 연결과 기능 확장이 더 쉬워진다는 것을 확인했습니다.",
    },
    tags: ["TypeScript", "Architecture", "Refactoring"],
    createdAt: "2026-10-04",
  },
  {
    id: "responsive-ui",
    title: "포트폴리오 반응형 UI 구성",
    summary:
      "모바일부터 데스크톱까지 자연스럽게 사용할 수 있도록 포트폴리오의 주요 레이아웃을 반응형으로 구성했습니다.",
    content: {
      solution: [
        "모바일 1열 구조 적용",
        "화면 크기에 따라 2열, 3열 확장",
        "긴 한국어 문장 줄바꿈 처리",
        "기술 태그 flex-wrap 적용",
        "버튼 및 카드 크기 조정",
      ],
      learned:
        "데스크톱 화면만 기준으로 UI를 설계하지 않고 처음부터 다양한 화면 크기를 고려해야 한다는 것을 배웠습니다.",
    },
    tags: ["Tailwind CSS", "Responsive", "UI"],
    createdAt: "2026-10-04",
  },
];

export function getDevLogById(id: string): DevLog | undefined {
  return devLogs.find((devLog) => devLog.id === id);
}
