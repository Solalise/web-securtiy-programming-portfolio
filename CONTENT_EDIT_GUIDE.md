# 포트폴리오 콘텐츠 수정 가이드

화면의 문구 대부분은 `data` 폴더에 모아 두었습니다. 문구만 바꿀 때는 컴포넌트나 페이지 코드를 수정하지 않고 아래 변수의 값만 변경하면 됩니다.

## 메인 화면

- 메인 제목: `data/site.ts`의 `heroContent.titleBefore`, `heroContent.titleAccent`, `heroContent.titleAfter`
- 메인 영문 문구: `data/site.ts`의 `heroContent.eyebrow`
- 메인 소개 문구: `data/site.ts`의 `heroContent.description`
- 메인 버튼 문구: `data/site.ts`의 `heroContent.projectsButton`, `heroContent.contactButton`
- 메인 관심 기술 배지: `data/site.ts`의 `interestBadges`
- 프로젝트별 기본 이미지 경로: `data/site.ts`의 `projectImagePaths`

운영 중에는 관리자 로그인 후 Home의 **메인 소개 편집**과 **올해 목표** 편집 UI를 사용합니다. 목표는 연도별로 MongoDB에 보관됩니다.

## 자기소개 페이지

- 페이지 제목과 섹션 이름: `data/about.ts`의 `aboutPageContent`
- 이름, 전공, 소개 문단: `data/about.ts`의 `profile`
- 관심 분야 카드: `data/about.ts`의 `interests`
- 소개 페이지 기술 스택: `data/about.ts`의 `skillGroups`
- 학습 방향: `data/about.ts`의 `learningSteps`
- 현재 집중 항목: `data/about.ts`의 `currentFocus`

운영 중인 About 콘텐츠는 관리자 로그인 후 페이지 안의 편집 UI에서 관리합니다. 프로필과 보안 관심 분야는 `SiteContent`, 수상·자격증·로드맵은 `PortfolioItem`에 저장됩니다. 프로젝트 기술 비중은 수동 입력하지 않고 `Project.techStack`에서 계산합니다.

## 성장 과정과 올해 목표

- 성장 과정 페이지 제목과 안내: `data/growth.ts`의 `growthPageContent`
- 성장 과정 타임라인: `data/growth.ts`의 `growthSteps`
- 올해 목표 섹션 제목: `data/goals.ts`의 `yearlyGoalsContent`
- 네 개의 올해 목표: `data/goals.ts`의 `yearlyGoals`

목표를 추가할 때는 기존 항목과 같은 형태로 `number`, `title`, `descriptions`를 작성합니다. 실제 달성 여부는 별도로 표시하지 않습니다.

## 프로젝트 추가 및 수정

프로젝트는 정적 파일이 아니라 MongoDB에서 관리합니다.

1. 사이트의 `/login`에서 관리자 계정으로 로그인합니다.
2. `/admin/projects`로 이동합니다.
3. 새 프로젝트는 **새 프로젝트 추가**, 기존 프로젝트는 목록의 **수정** 버튼을 사용합니다.
4. 저장하면 프로젝트 목록, 상세 페이지와 메인 최신 프로젝트 영역에 반영됩니다.

초기 데이터 원본을 확인해야 할 때만 `data/projects.ts`를 확인합니다. 운영 중인 프로젝트를 변경할 때는 관리자 페이지를 사용하세요.

## 기술 스택

- 소개 페이지의 그룹별 기술: `data/about.ts`의 `skillGroups`
- 공통 기술 스택 카드 데이터: `data/techStack.ts`의 `techStack`

## Experience & Labs

Experience & Labs 기록은 MongoDB에서 관리하며 초기 예시 데이터는 자동으로 만들지 않습니다.

1. `/login`에서 관리자 계정으로 로그인합니다.
2. `/admin/experiences`에서 새 기록을 추가하거나 기존 기록을 수정·삭제합니다.
3. 카테고리는 대외활동, 보안 실습, 개발 실습 중 하나를 선택합니다.
4. 메인 화면에 보여줄 기록은 **대표 기록으로 표시**를 선택합니다. 카테고리별 최신 대표 기록 한 개가 노출됩니다.

공개 목록은 `/experiences`, 상세 페이지는 `/experiences/[id]`에서 확인합니다. 비어 있는 선택 항목은 상세 화면에 표시되지 않습니다.

## 개발 로그

- 페이지 제목과 안내 문구: `data/devlogs.ts`의 `devLogPageContent`
- 각 개발 로그: `data/devlogs.ts`의 `devLogs`

새 로그의 `id`는 영문 소문자와 하이픈으로 중복되지 않게 작성하세요. 상세 페이지 주소에 이 값이 사용됩니다.

## 문의 게시판

- 페이지 제목과 소개 문구: `data/contact.ts`의 `contactPageContent`
- 개인정보 수집 안내: `data/contact.ts`의 `contactPageContent.privacyNotice`
- 문의 유형: `data/contact.ts`의 `contactCategories`
- 답변 상태 표시 이름: `data/contact.ts`의 `contactStatuses`

방문자는 `/contact`에서 문의를 검색·열람하고 `/contact/new`에서 문의를 등록할 수 있습니다. 비밀글은 작성 비밀번호로 본인 확인을 마친 작성자와 관리자만 내용을 볼 수 있습니다.

관리자는 로그인 후 `/admin/contacts`에서 전체·답변 대기·답변 완료 문의를 분류해 확인하고, 상세 화면에서 답변 등록·수정·삭제와 문의 삭제를 할 수 있습니다. 답변 상태는 답변의 등록 또는 삭제에 따라 자동으로 변경됩니다.

## Header, Footer와 외부 링크

- 사이트 이름: `data/site.ts`의 `siteIdentity.name`
- 상단 메뉴: `data/site.ts`의 `mainNavigation`
- Footer 메뉴: `data/site.ts`의 `footerNavigation`
- Footer 소개 및 저작권 문구: `data/site.ts`의 `footerContent`
- GitHub, 블로그 링크: `data/site.ts`의 `quickLinks`

`quickLinks`의 `href`가 `#`인 항목은 실제 주소로 교체해야 합니다. 예: `https://github.com/사용자명`.

## 수정 후 확인

파일을 저장한 뒤 개발 서버에서 화면을 확인하고 다음 명령을 실행합니다.

```bash
npx tsc --noEmit
npm run lint
npm run build
```

MongoDB 연결 주소, 관리자 비밀번호와 인증 키는 콘텐츠 파일에 작성하지 말고 `.env.local`에서만 관리하세요.
