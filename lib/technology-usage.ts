import type { Project } from "@/types/project";

export const technologyAliases: Record<string, string> = {
  ts: "TypeScript", typescript: "TypeScript", js: "JavaScript", javascript: "JavaScript",
  next: "Next.js", "next.js": "Next.js", nextjs: "Next.js", reactjs: "React", react: "React",
  mongodb: "MongoDB", mongo: "MongoDB", mongoose: "Mongoose", "tailwind css": "Tailwind CSS", tailwindcss: "Tailwind CSS",
  authjs: "Auth.js", "auth.js": "Auth.js", git: "Git", github: "GitHub", node: "Node.js", "node.js": "Node.js", nodejs: "Node.js",
  express: "Express.js", "express.js": "Express.js", expressjs: "Express.js",
};

export type TechnologyUsage = { name: string; category: string; status: string; usedCount: number; categoryTotal: number; percentage: number; projects: Project[] };

export function normalizeTechnology(value: string): string {
  const key = value.trim().toLowerCase().replace(/\s+/g, " ");
  return technologyAliases[key] ?? value.trim().replace(/\s+/g, " ");
}

function categoriesFor(name: string): string[] {
  const key = name.toLowerCase();
  if (["javascript", "typescript", "python", "java", "c", "c++"].includes(key)) return ["Programming Languages"];
  if (key === "next.js") return ["Frontend", "Backend"];
  if (["react", "react native", "tailwind css", "html", "css"].includes(key)) return ["Frontend"];
  if (["node.js", "express.js", "rest api", "next.js server actions", "route handlers"].includes(key)) return ["Backend"];
  if (["mongodb", "mongoose", "postgresql", "prisma", "mysql"].includes(key)) return ["Database"];
  if (["auth.js", "bcrypt", "jwt", "web security"].includes(key)) return ["Security"];
  return ["Tools"];
}

export function calculateTechnologyUsage(projects: Project[], extraLines: string[]): TechnologyUsage[] {
  const explicitCategories = new Map<string, Set<string>>();
  const extras = extraLines.map((line) => {
    const [category, rawName, status = "학습 중", aliases = ""] = line.split("|").map((value) => value.trim());
    const name = normalizeTechnology(rawName || "");
    for (const alias of aliases.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean)) technologyAliases[alias] = name;
    if (name && category) {
      const key = name.toLowerCase();
      explicitCategories.set(key, new Set([...(explicitCategories.get(key) ?? []), category]));
    }
    return { category, name, status };
  }).filter((item) => item.name);

  const map = new Map<string, { name: string; category: string; status: string; projects: Project[] }>();
  for (const project of projects) {
    const unique = new Set(project.techStack.map(normalizeTechnology));
    for (const name of unique) {
      const categories = explicitCategories.get(name.toLowerCase()) ?? new Set(categoriesFor(name));
      for (const category of categories) {
        const key = `${category}\u0000${name.toLowerCase()}`;
        const entry = map.get(key) ?? { name, category, status: "프로젝트 사용", projects: [] };
        entry.projects.push(project);
        map.set(key, entry);
      }
    }
  }

  for (const extra of extras) {
    const categories = explicitCategories.get(extra.name.toLowerCase()) ?? new Set([extra.category || categoriesFor(extra.name)[0]]);
    for (const category of categories) {
      const key = `${category}\u0000${extra.name.toLowerCase()}`;
      const entry = map.get(key) ?? { name: extra.name, category, status: extra.status, projects: [] };
      entry.status = entry.projects.length ? "프로젝트 사용" : extra.status;
      map.set(key, entry);
    }
  }

  const entries = [...map.values()].map((entry) => ({ ...entry, usedCount: entry.projects.length }));
  const results: TechnologyUsage[] = [];
  for (const category of new Set(entries.map((entry) => entry.category))) {
    const categoryEntries = entries.filter((entry) => entry.category === category);
    const categoryTotal = categoryEntries.reduce((sum, entry) => sum + entry.usedCount, 0);
    const calculated = categoryEntries.map((entry) => {
      const exact = categoryTotal ? (entry.usedCount / categoryTotal) * 100 : 0;
      return { entry, exact, percentage: Math.floor(exact) };
    });
    let remainder = categoryTotal ? 100 - calculated.reduce((sum, item) => sum + item.percentage, 0) : 0;
    calculated.sort((a, b) => (b.exact - b.percentage) - (a.exact - a.percentage));
    for (const item of calculated) {
      if (remainder <= 0) break;
      item.percentage += 1;
      remainder -= 1;
    }
    for (const item of calculated) results.push({ ...item.entry, categoryTotal, percentage: item.percentage });
  }
  return results.sort((a, b) => a.category.localeCompare(b.category) || b.usedCount - a.usedCount || a.name.localeCompare(b.name));
}
