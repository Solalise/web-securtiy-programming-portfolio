# BW. Portfolio

Next.js App Router와 TypeScript로 구성한 개인 개발자 포트폴리오입니다.

## 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## 환경변수와 관리자 로그인

`.env.local`에 다음 값을 설정합니다. 실제 비밀번호와 인증 키는 저장소에 커밋하지 않습니다.

```dotenv
MONGODB_URI=mongodb+srv://...
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
AUTH_SECRET=충분히-긴-무작위-문자열
AUTH_URL=http://localhost:3000
ADMIN_EMAIL=관리자-이메일
ADMIN_PASSWORD=관리자-비밀번호
ADMIN_NAME=관리자-표시이름
```

`MONGODB_DNS_SERVERS`는 선택 항목입니다. 현재 네트워크처럼 시스템 DNS의 MongoDB SRV 조회가 차단되는 경우에만 쉼표로 구분해 설정합니다. 값을 생략하면 운영체제의 기존 DNS 설정을 그대로 사용합니다.

환경변수를 설정한 뒤 아래 로컬 전용 명령으로 계정 존재 여부를 확인하거나 관리자 계정을 생성·갱신합니다. 명령은 비밀번호와 해시를 출력하지 않습니다.

```bash
npm run admin:check
npm run admin:create
```

Growth Journey의 입학·군복무·복학 기본 기준점은 다음 명령으로 기존 데이터를 덮어쓰지 않고 준비할 수 있습니다.

```bash
npm run growth:seed
```

`/login`에서 `ADMIN_EMAIL`, `ADMIN_PASSWORD`로 로그인합니다. 해당 이메일의 관리자 계정이 MongoDB에 없으면 첫 로그인 시에도 bcrypt 해시로 생성됩니다. 공개 회원가입 경로는 없으며 기존 일반 사용자를 관리자로 승격하지 않습니다. 비밀번호를 바꾸려면 `.env.local`의 `ADMIN_PASSWORD`를 변경한 뒤 `npm run admin:create`를 다시 실행합니다. 로그인 후 `/admin/experiences`에서 Experience & Labs 기록을 관리할 수 있습니다.

로그인 상태에서는 Home의 소개·연도별 목표와 About의 프로필·관심 분야·기술 항목·성과·로드맵에 편집 UI가 표시됩니다. 콘텐츠와 프로필 이미지는 `sitecontents`, 기타 항목은 `portfolioitems`, 관리자 계정은 `adminusers` MongoDB 컬렉션에 저장됩니다. 프로젝트 기술 사용 비중은 `projects.techStack`에서 자동 계산됩니다.

## 검증

```bash
npm run lint
npx tsc --noEmit
npm run build
```
