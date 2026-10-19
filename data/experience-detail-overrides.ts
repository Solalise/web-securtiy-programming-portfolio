import type { ExperienceDetailSection, ExperienceStatus } from "@/types/experience";

type DetailOverride = {
  status?: ExperienceStatus;
  environment?: string;
  technologies?: string[];
  detailSections: ExperienceDetailSection[];
};

const section = (title: string, subtitle: string, content: string): ExperienceDetailSection => ({ title, subtitle, content });

export const experienceDetailOverrides: Record<string, DetailOverride> = {
  "MongoDB Atlas 데이터베이스 연동": {
    status: "completed", environment: "Next.js · Node.js · MongoDB Atlas", technologies: ["MongoDB Atlas", "Mongoose", "Next.js", "DNS"],
    detailSections: [
      section("Overview", "개요", "웹 애플리케이션의 데이터를 지속적으로 저장하고 관리하기 위해 MongoDB Atlas를 연동했습니다. Next.js와 MongoDB의 연결 구조를 이해하고, 연결 과정에서 발생할 수 있는 네트워크 및 환경 설정 문제를 분석하는 것을 목표로 했습니다.\n\n- Atlas 클러스터와 연결 구조 이해\n- 연결 문자열 및 환경변수 관리\n- Mongoose 기반 데이터 접근\n- 네트워크 접근 설정과 DNS 오류 분석"),
      section("Environment & Tools", "환경 및 기술", "- **Next.js:** 데이터베이스와 연동하는 웹 애플리케이션 환경\n- **MongoDB Atlas:** 클라우드 기반 NoSQL 데이터베이스\n- **Mongoose:** 데이터 모델 및 연결 관리\n- **Node.js / DNS:** 서버 실행 환경과 SRV 호스트 조회\n- **환경변수:** 연결 정보 관리"),
      section("Implementation & Process", "구현 및 실습 과정", "### 3.1 MongoDB Atlas 환경 준비\nAtlas 클러스터와 연결 정보를 확인하고 Database Access와 Network Access가 각각 사용자 인증과 네트워크 허용을 담당한다는 점을 학습했습니다.\n\n### 3.2 Next.js 데이터베이스 연결\n서버 환경에서 SRV 연결 문자열과 Mongoose 모델을 사용해 데이터베이스에 접근하는 구조를 구성했습니다. SRV 연결은 DNS 조회를 통해 실제 서버 정보를 확인한다는 점을 이해했습니다.\n\n### 3.3 데이터 관리 구조\n공지사항과 프로젝트 데이터를 대상으로 생성·조회·수정·삭제가 서버와 데이터베이스 사이에서 처리되는 흐름을 확인했습니다."),
      section("Troubleshooting", "문제 해결", "### MongoDB Atlas SRV 연결 오류\n`ECONNREFUSED` 오류가 발생해 연결 문자열, Database Access, Network Access, SRV 기반 DNS 조회를 순서대로 점검했습니다. 데이터베이스 연결 문제는 코드뿐 아니라 DNS, 클러스터 상태, 네트워크 설정의 영향을 함께 받는다는 점을 확인했습니다.\n\n*최종 해결 여부와 실제 적용한 수정 사항은 연결 로그 확인 후 추가 기록합니다.*"),
      section("Results", "실습 결과", "- MongoDB Atlas와 Next.js의 연결 구조 학습\n- 클라우드 데이터베이스 접근 설정 확인\n- SRV·DNS 연결 오류 분석 경험\n- 환경변수 기반 연결 정보 관리 방식 학습"),
      section("Learnings", "배운 점", "클라우드 데이터베이스 연동에서는 애플리케이션 코드뿐 아니라 사용자 인증, 네트워크 접근 설정, DNS와 연결 문자열을 함께 확인해야 함을 배웠습니다. 오류 메시지를 바탕으로 문제 범위를 좁혀 가는 과정이 중요했습니다."),
    ],
  },
  "멋쟁이사자처럼 14기 활동": {
    status: "in-progress", environment: "GitHub · Next.js · Expo · Supabase", technologies: ["GitHub", "Next.js", "TypeScript", "REST API", "Supabase", "OpenAI API"],
    detailSections: [
      section("Overview", "개요", "멋쟁이사자처럼 대학 14기 백엔드 트랙에서 웹 서비스 개발 기술을 학습하고, 해커톤과 팀 프로젝트로 서비스 구현 경험을 쌓았습니다. 요구사항 분석, 역할 분담, API 설계, 데이터베이스 연동, 기능 통합까지 전체 개발 과정을 이해하는 것이 목표였습니다.\n\n- 백엔드 개발 교육과 API 학습\n- 해커톤 팀 프로젝트 참여\n- GitHub 기반 협업\n- 개인 프로젝트 기획·개발과 피드백 반영"),
      section("Environment & Tools", "환경 및 기술", "- **GitHub:** 코드 관리와 협업\n- **Next.js / TypeScript:** 웹 애플리케이션 개발\n- **Expo / React Native:** 모바일 개발 환경\n- **Supabase:** PostgreSQL 기반 데이터 관리\n- **REST API / OpenAI API:** 서비스 기능 연동"),
      section("Implementation & Process", "구현 및 활동 과정", "### 3.1 해커톤 팀 프로젝트\n해외 여행 중 도난·분실 사고 대응 서비스 TravelGuard 개발에 참여했습니다. 사용자의 사건 진술을 바탕으로 추가 정보를 수집하고, 신고·대응에 필요한 정보를 정리하는 서비스를 Next.js, Expo, Supabase, OpenAI API로 구성했습니다.\n\n### 3.2 협업과 데이터 연동\nGitHub 저장소에서 기능별 작업을 나누고 API 요청 형식과 데이터 구조를 함께 고려해 통합했습니다. Supabase 기반 데이터 저장과 외부 API 요청·응답 구조를 다뤘습니다.\n\n### 3.3 개인 프로젝트\nRepoTutor를 기획해 AST 기반 정적 분석, 코드 관계 시각화, DFS 탐색을 적용했습니다. 피드백을 바탕으로 초보 개발자 관점의 학습 경험을 개선했습니다."),
      section("Troubleshooting", "문제 해결", "지도·경로 API 연동에서는 파라미터와 오류 응답 구조를 문서와 비교하며 점검했습니다. RepoTutor에서는 파일별 GitHub API 요청으로 제한에 도달해, 주요 조회 후 소스 아카이브를 다운로드하는 방식으로 분석 구조를 변경했습니다."),
      section("Results", "활동 결과", "- 멋쟁이사자처럼 14기 백엔드 트랙 참여\n- TravelGuard 해커톤 팀 프로젝트 개발\n- GitHub 협업, API·데이터베이스 연동 경험\n- RepoTutor 개인 프로젝트 기획·개발\n- 발표와 피드백 기반 개선 경험"),
      section("Learnings", "배운 점", "팀 프로젝트에서는 담당 기능뿐 아니라 다른 기능과의 연결 관계를 이해해야 안정적으로 통합할 수 있음을 배웠습니다. API와 데이터베이스 구조를 초기에 명확히 정하는 것, 사용자 문제를 중심으로 기능을 개선하는 것의 중요성도 경험했습니다."),
    ],
  },
  "웹 인증 및 관리자 기능 구현": {
    status: "completed", environment: "Next.js · Auth.js · MongoDB", technologies: ["Auth.js", "JWT", "Next.js", "MongoDB", "RBAC", "Server Actions"],
    detailSections: [
      section("Overview", "개요", "Auth.js 기반 로그인, JWT 세션, 역할 기반 접근 제어(RBAC)를 적용해 관리자만 콘텐츠를 관리할 수 있도록 구현했습니다. 로그인 상태 유지, 역할 구분, 관리자 페이지 접근 제한, 서버 측 권한 검증을 주요 목표로 삼았습니다."),
      section("Environment & Tools", "환경 및 기술", "- **Next.js / Server Actions:** 서버 기능과 데이터 변경 처리\n- **Auth.js / JWT:** 인증과 세션 관리\n- **MongoDB:** 애플리케이션 데이터 관리\n- **RBAC:** 사용자 역할 기반 접근 제어"),
      section("Implementation & Process", "구현 및 실습 과정", "### 3.1 로그인과 JWT 세션\nAuth.js로 로그인 기능을 구성하고 세션을 통해 인증 상태를 확인하도록 했습니다.\n\n### 3.2 역할 기반 접근 제어\n일반 사용자와 관리자를 구분하고 관리자 화면 접근 시 세션과 역할을 확인했습니다.\n\n### 3.3 서버 측 권한 검증\n공통 권한 확인 함수를 구성해 관리자 페이지와 Server Action에서 동일한 관리자 검증을 수행했습니다. 데이터 변경 전에도 권한을 확인하도록 구성했습니다."),
      section("Security Considerations", "보안 설계", "**인증(Authentication)**은 사용자가 누구인지 확인하는 과정이고, **인가(Authorization)**는 해당 기능을 사용할 권한이 있는지 확인하는 과정입니다. 클라이언트에서 버튼을 숨기는 것만으로는 접근을 막을 수 없으므로, 실제 데이터 변경이 일어나는 서버에서도 권한을 검증했습니다."),
      section("Results", "실습 결과", "- Auth.js 기반 로그인과 JWT 세션 적용\n- 사용자 역할 기반 접근 제어 구현\n- 관리자 전용 콘텐츠 관리 기능 구성\n- Server Action 공통 권한 검증 적용"),
      section("Learnings", "배운 점", "로그인 성공과 권한 보유는 서로 다른 개념이며, 서버 측 검증이 실제 접근 통제의 기준이 된다는 점을 배웠습니다. 공통 권한 함수를 통해 일관된 보안 정책을 적용할 수 있었습니다."),
    ],
  },
  "시스템 프로그래밍 기초 실습": {
    status: "in-progress", environment: "Linux · C · VS Code", technologies: ["C", "Linux", "System Calls", "Process", "mmap", "Pipe", "Socket"],
    detailSections: [
      section("Overview", "개요", "C 언어와 Linux 시스템 호출을 활용해 파일 입출력, 프로세스, 메모리 매핑, 파이프, 소켓 통신 원리를 학습했습니다. 운영체제 자원을 응용 프로그램이 어떻게 사용하는지 이해하는 것이 목표였습니다."),
      section("Environment & Tools", "환경 및 기술", "- **C / GCC:** 시스템 프로그래밍 코드 작성과 컴파일\n- **Linux / POSIX API:** 시스템 호출과 프로세스 실행 환경\n- **VS Code:** 소스 코드 작성 및 수정"),
      section("Implementation & Process", "구현 및 실습 과정", "### 3.1 파일 입출력\n`open()`, `read()`, `write()`, `close()`를 통해 파일 디스크립터 기반 입출력과 자원 반환 흐름을 학습했습니다.\n\n### 3.2 프로세스와 메모리\n`fork()`로 부모·자식 프로세스의 실행 흐름을 분석하고, `mmap()`을 통한 가상 주소 공간과 파일 매핑 원리를 학습했습니다.\n\n### 3.3 파이프와 소켓\n파이프의 읽기·쓰기 방향과 파일 디스크립터 관리를 확인하고, 서버·클라이언트 소켓 연결 및 송수신 과정을 분석했습니다.\n\n| 주제 | 주요 함수 | 학습 내용 |\n| --- | --- | --- |\n| 파일 입출력 | open, read, write, close | 파일 디스크립터와 데이터 처리 |\n| 프로세스 | fork, wait | 프로세스 생성과 종료 |\n| 메모리 매핑 | mmap, munmap | 가상 메모리와 파일 매핑 |\n| 파이프 | pipe | 프로세스 간 데이터 전달 |\n| 소켓 | socket, bind, listen, accept | 네트워크 연결 및 통신 |"),
      section("Results", "실습 결과", "- C 언어 기반 시스템 호출 학습\n- 파일 디스크립터, 프로세스, 메모리 매핑 구조 이해\n- 프로세스 간 통신과 소켓 통신 원리 분석"),
      section("Learnings", "배운 점", "응용 프로그램은 운영체제의 시스템 호출을 기반으로 동작하며, 파일 디스크립터는 파일뿐 아니라 파이프와 소켓에도 활용된다는 점을 이해했습니다. 반환값, 오류 처리, 자원 해제도 함께 고려해야 함을 배웠습니다."),
    ],
  },
  "Next.js 웹 애플리케이션 개발": {
    status: "in-progress", environment: "Next.js · React · TypeScript · Node.js", technologies: ["Next.js", "TypeScript", "React", "App Router", "Server Actions"],
    detailSections: [
      section("Overview", "개요", "Next.js App Router와 TypeScript로 웹 애플리케이션을 개발하며 서버·클라이언트 컴포넌트와 Server Action의 역할을 학습했습니다. 라우팅, 데이터 처리, 타입 관리, 포트폴리오·게시판 기능 구현을 주요 목표로 삼았습니다."),
      section("Environment & Tools", "환경 및 기술", "- **Next.js / App Router:** 파일 시스템 기반 라우팅과 서버 렌더링\n- **React:** UI 컴포넌트 구성\n- **TypeScript:** 정적 타입 관리\n- **Server Actions / Node.js:** 서버 측 데이터 변경 처리와 실행 환경"),
      section("Implementation & Process", "구현 및 실습 과정", "### 3.1 App Router와 동적 라우팅\n`app` 디렉터리와 공통 레이아웃을 사용해 페이지를 구성하고, 경로 매개변수로 프로젝트와 게시글의 상세 정보를 표시했습니다.\n\n### 3.2 서버·클라이언트 컴포넌트\n데이터 처리 기능과 사용자 상호작용이 필요한 기능을 구분해 컴포넌트 책임을 나눴습니다.\n\n### 3.3 Server Action과 콘텐츠 관리\n폼 입력을 서버에서 처리하고 데이터베이스와 연결하는 흐름을 학습했으며, 포트폴리오와 게시판의 콘텐츠 관리 기능에 적용했습니다."),
      section("Results", "실습 결과", "- App Router 기반 페이지와 동적 라우팅 구성\n- 서버·클라이언트 컴포넌트 역할 구분\n- Server Action 기반 데이터 처리 방식 학습\n- TypeScript 기반 웹 애플리케이션 개발 경험"),
      section("Learnings", "배운 점", "Next.js는 라우팅만 제공하는 도구가 아니라 서버 렌더링과 데이터 처리를 함께 설계할 수 있는 환경임을 이해했습니다. 서버와 클라이언트 책임을 분리하면 구조를 더 체계적으로 설계할 수 있었습니다."),
    ],
  },
  "OverTheWire Bandit": {
    status: "in-progress", environment: "Linux · SSH · Terminal", technologies: ["Linux", "Bash", "SSH", "find", "grep", "file", "strings"],
    detailSections: [
      section("Overview", "개요", "OverTheWire Bandit은 주어진 조건을 분석해 다음 단계의 비밀번호를 찾는 Linux 기반 보안 워게임입니다. 명령어 암기보다 문제 조건을 해석하고 적절한 명령어를 조합하는 역량을 기르는 것을 목표로 했습니다."),
      section("Environment & Tools", "환경 및 기술", "- **OverTheWire Bandit / SSH:** 원격 Linux 실습 환경\n- **find, grep:** 조건 기반 파일과 문자열 검색\n- **file, strings:** 파일 형식과 바이너리 데이터 확인\n- **sort, uniq:** 데이터 정렬과 중복 분석"),
      section("Implementation & Process", "실습 과정", "### 3.1 SSH와 파일 탐색\n각 레벨에 SSH로 접속해 `ls`, `cd`, `cat`, `find`로 파일과 디렉터리를 탐색했습니다. 숨김 파일과 특수한 이름을 가진 파일도 조건에 따라 찾는 방법을 익혔습니다.\n\n### 3.2 파일 속성과 데이터 처리\n파일 크기·소유권·권한·형식 조건을 활용하고, `file`, `grep`, `sort`, `uniq`, `strings`를 파이프로 연결해 필요한 정보를 추출했습니다.\n\n### 3.3 인코딩과 형식 분석\n텍스트 인코딩, 압축, 데이터 변환 관련 문제를 통해 파일 내용을 해석하는 여러 접근을 학습했습니다."),
      section("Troubleshooting", "문제 해결 방식", "정답이나 파일 위치가 직접 주어지지 않기 때문에 문제 조건을 기준으로 탐색 범위를 좁혔습니다.\n\n1. 파일 조건 확인\n2. 적절한 명령어와 옵션 선택\n3. 실행 결과 분석\n4. 검색 범위와 옵션 수정\n5. 데이터 추출 및 결과 검증"),
      section("Results", "실습 결과", "- Bandit 워게임 단계별 진행\n- SSH 원격 Linux 접속 경험\n- 파일 시스템·권한 구조 학습\n- 조건 기반 파일 탐색과 문자열 검색\n- 파이프 기반 데이터 처리 실습"),
      section("Learnings", "배운 점", "Linux에서는 여러 명령어를 조합해 문제를 해결하는 능력이 중요하며, 파일 이름이나 확장자만으로 실제 형식을 판단할 수 없다는 점을 배웠습니다."),
    ],
  },
  "가상화 기반 보안 실습 환경 구성": {
    status: "in-progress", environment: "Windows Host · VirtualBox · VMware", technologies: ["VirtualBox", "VMware", "Ubuntu", "Kali Linux", "Windows Server", "pfSense"],
    detailSections: [
      section("Overview", "개요", "VirtualBox와 VMware를 사용해 Linux 및 Windows 가상 머신을 구성하고, 실제 시스템과 분리된 보안 실습 환경을 준비했습니다. 운영체제 설치, 가상 디스크·이미지 형식, 가상 네트워크의 기본 구조를 학습했습니다."),
      section("Environment & Tools", "환경 및 기술", "- **VirtualBox / VMware:** 가상 머신 생성과 관리\n- **Ubuntu / Kali Linux:** Linux·보안 도구 학습 환경\n- **Windows Server / Windows 10:** Windows 서버·클라이언트 환경\n- **pfSense:** 향후 방화벽·네트워크 보안 실습 대상\n\n*일부 운영체제는 설치 및 구성 준비 단계입니다.*"),
      section("Implementation & Process", "실습 과정", "### 3.1 VirtualBox 기반 환경\n운영체제 설치 이미지와 가상 디스크의 차이를 확인하고 운영체제별 가상 머신 생성 방법을 학습했습니다.\n\n### 3.2 Kali Linux 이미지 분석\n다운로드한 이미지가 압축된 VirtualBox용 파일임을 확인하고, ISO 설치 이미지와 기존 가상 머신 구성 파일의 차이를 정리했습니다.\n\n### 3.3 VMware 전환과 확장\n수업 요구사항에 맞춰 VMware 환경으로 전환하고 Windows Server 설치를 진행했습니다. Ubuntu, Kali Linux, Windows, pfSense를 활용한 보안 실습 환경 확장을 준비하고 있습니다."),
      section("Troubleshooting", "문제 해결", "Kali Linux 파일이 생성 화면에서 보이지 않아 파일 형식을 확인했습니다. 압축 해제 후 구성 파일과 디스크 이미지를 구분하고 가상화 도구에 맞는 등록 방식을 적용했습니다. 또한 VirtualBox에서 VMware로 전환하며 도구별 이미지 형식과 관리 방식의 차이를 확인했습니다."),
      section("Results", "실습 결과", "- VirtualBox와 VMware 사용 경험\n- Ubuntu 및 Windows Server 환경 구성\n- Kali Linux 이미지 형식 분석\n- 설치 이미지와 가상 디스크 차이 이해\n- 보안 실습 환경 구성 방법 학습"),
      section("Learnings", "배운 점", "가상화는 단순히 여러 운영체제를 실행하는 기능이 아니라 독립적인 실습 환경을 구성·관리하는 기술임을 이해했습니다. 이미지 형식, 자원 할당, 네트워크 설정이 정상 동작에 영향을 준다는 점을 배웠습니다."),
    ],
  },
  "Security Guide 보안 학습 플랫폼": {
    status: "completed", environment: "HTML · CSS · JavaScript · Web Browser", technologies: ["HTML", "CSS", "JavaScript", "OWASP", "XSS"],
    detailSections: [
      section("Overview", "개요", "Security Guide는 OWASP 주요 취약점을 바탕으로 취약한 코드와 개선된 코드를 비교하며 웹 보안 개념을 학습하는 팀 프로젝트입니다. 공격 원리와 방어 원리를 사용자 상호작용과 코드 비교로 이해하도록 구성했습니다."),
      section("Environment & Tools", "환경 및 기술", "- **HTML / CSS / JavaScript:** 학습 화면과 상호작용 구현\n- **OWASP:** 주요 취약점 학습 기준\n- **XSS:** 사용자 입력과 출력 처리 취약점\n- **Web Browser:** 실습 화면 및 결과 확인"),
      section("Implementation & Process", "구현 및 실습 과정", "### 3.1 보안 학습 콘텐츠\nXSS, 접근 제어, 무차별 대입 공격을 주제로 취약점의 원인·위험성·대응 방법을 비교할 수 있도록 구성했습니다.\n\n### 3.2 취약 코드 비교\n사용자 입력의 출력 처리 방식에 따른 XSS 위험을 보여주고, 권한 검증 누락과 접근 제어의 필요성을 비교했습니다. 반복적 인증 시도에는 요청 제한과 계정 보호 정책이 필요한 이유를 학습 콘텐츠로 정리했습니다.\n\n| 학습 주제 | 핵심 개념 | 대응 방향 |\n| --- | --- | --- |\n| XSS | 신뢰할 수 없는 데이터의 출력 처리 | 출력 인코딩 및 안전한 DOM 처리 |\n| 접근 제어 | 권한 검증 누락 | 서버 측 인가 검증 |\n| 무차별 대입 | 반복적인 인증 시도 | 요청 제한 및 계정 보호 |"),
      section("Results", "실습 결과", "- OWASP 기반 보안 학습 플랫폼 구조 설계\n- XSS와 접근 제어 비교 학습 기능 구현\n- 무차별 대입 공격 학습 콘텐츠 구성\n- 취약·개선 코드 비교 방식 적용\n- 팀 프로젝트 완료"),
      section("Learnings", "배운 점", "웹 보안은 공격 이름보다 취약점이 생기는 코드 구조와 데이터 처리 흐름을 이해하는 일이 중요하다는 점을 배웠습니다. 취약·개선 코드를 비교하는 방식이 개념 이해에 도움이 됐습니다."),
    ],
  },
  "디지털 포렌식 · HxD 파일 복구": {
    status: "completed", environment: "Windows · HxD", technologies: ["HxD", "Hexadecimal", "File Signature", "ZIP File Format", "File Carving"],
    detailSections: [
      section("Overview", "개요", "HxD 헥스 에디터로 파일의 16진수 데이터를 분석하고 ZIP 시그니처를 기반으로 압축 데이터를 추출하는 파일 카빙 실습을 진행했습니다. 파일 내부 구조를 기준으로 실제 데이터 형식을 판단하는 것이 목표였습니다."),
      section("Environment & Tools", "환경 및 기술", "- **Windows / HxD:** 바이너리 데이터 확인과 수정\n- **Hexadecimal / File Signature:** 파일 형식 식별\n- **ZIP File Format / File Carving:** 내부 구조를 이용한 데이터 추출"),
      section("Implementation & Process", "실습 과정", "### 3.1 시그니처 탐색\nHxD에서 원본 파일을 열고 ZIP 로컬 파일 헤더 `50 4B 03 04`와 EOCD 시그니처 `50 4B 05 06`의 오프셋을 찾았습니다.\n\n### 3.2 첫 추출과 구조 재분석\n처음에는 시작 시그니처부터 EOCD 시그니처까지만 추출했지만 압축 해제에 실패했습니다. EOCD는 종료 레코드의 시작이며 고정 22바이트와 파일 주석 길이를 포함한다는 구조를 확인했습니다.\n\n### 3.3 재추출\n종료 레코드 전체 구조와 주석 길이를 고려해 추출 범위를 다시 판단했습니다."),
      section("Troubleshooting", "문제 해결", "ZIP 추출 후 파일이 열리지 않은 원인은 종료 시그니처 뒤의 필드가 누락됐기 때문이었습니다. EOCD 구조와 주석 길이를 확인하고 범위를 재설정해 저장·검증했습니다. 시그니처만이 아니라 포맷의 필드 구조까지 확인해야 함을 배웠습니다."),
      section("Results", "실습 결과", "- HxD 기반 16진수 데이터 분석\n- ZIP 시작·종료 시그니처와 오프셋 확인\n- ZIP 데이터 추출 실습과 오류 원인 분석\n- EOCD 레코드와 파일 카빙 원리 학습"),
      section("Learnings", "배운 점", "파일 확장자는 이름일 뿐 실제 형식은 내부 데이터 구조로 판단해야 함을 이해했습니다. 복구 실패 시 포맷의 헤더와 종료 레코드를 다시 분석하는 과정이 포렌식에서 중요했습니다."),
    ],
  },
};
