// 공통 기술 스택 이름, 설명과 아이콘 문자를 수정하는 파일입니다.
export type TechStack = {
  name: string;
  description: string;
  icon: string;
};

export const techStack: TechStack[] = [
  { name: "Next.js", description: "React Framework", icon: "N" },
  { name: "TypeScript", description: "Type Safe Development", icon: "TS" },
  { name: "MongoDB", description: "NoSQL Database", icon: "M" },
  { name: "Auth.js", description: "Authentication", icon: "A" },
  { name: "Tailwind CSS", description: "Styling", icon: "TW" },
  { name: "Vercel", description: "Deployment", icon: "V" },
];
