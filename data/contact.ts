// 문의 페이지의 제목, 안내 문구, 문의 유형과 관리자 표시 문구를 수정하는 파일입니다.
export const contactPageContent = {
  eyebrow: "Q&A BOARD",
  title: "문의 게시판",
  description: [
    "프로젝트, 개발 관련 질문 또는 협업 문의를 자유롭게 남겨주세요.",
    "확인 후 직접 답변해 드리겠습니다.",
  ],
  writeButton: "문의 작성",
  emptyMessage: "등록된 문의가 없습니다.",
  privateTitle: "비밀글입니다",
  pendingAnswer: "아직 답변이 등록되지 않았습니다.",
  errorMessage: "문의를 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  privacyNotice:
    "문의 답변과 처리 상태 관리를 위해 이름, 이메일, 문의 내용을 수집합니다. 수집 정보는 문의 처리 목적이 달성될 때까지 보관하며, 이후 삭제합니다. 관계 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기준을 따릅니다.",
} as const;

export const adminContactContent = {
  eyebrow: "ADMIN",
  title: "문의 관리",
  description: "접수된 문의의 상세 내용과 처리 상태를 관리합니다.",
  emptyMessage: "해당 상태의 문의가 없습니다.",
  detailTitle: "문의 상세",
} as const;

export const contactCategories = [
  { value: "collaboration", label: "프로젝트 협업" },
  { value: "development", label: "개발 관련 질문" },
  { value: "other", label: "기타 문의" },
] as const;

export type ContactCategory = (typeof contactCategories)[number]["value"];

export const contactStatuses = [
  { value: "pending", label: "답변 대기" },
  { value: "answered", label: "답변 완료" },
] as const;

export type ContactStatus = (typeof contactStatuses)[number]["value"];

export function getContactCategoryLabel(category: ContactCategory): string {
  return contactCategories.find((item) => item.value === category)?.label ?? category;
}

export function normalizeContactStatus(status: string): ContactStatus {
  return status === "answered" || status === "completed" ? "answered" : "pending";
}

export function getContactStatusLabel(status: string): string {
  const normalized = normalizeContactStatus(status);
  return contactStatuses.find((item) => item.value === normalized)?.label ?? normalized;
}
