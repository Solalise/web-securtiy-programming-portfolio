export type Assignment = {
  week: number;
  title: string;
  summary: string;
  topics: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: "완료" | "진행 중";
};
