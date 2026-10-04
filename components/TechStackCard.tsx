import type { TechStack } from "@/data/techStack";

type TechStackCardProps = {
  tech: TechStack;
};

export default function TechStackCard({ tech }: TechStackCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5">
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-blue-700"
        aria-hidden="true"
      >
        {tech.icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-zinc-900">{tech.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{tech.description}</p>
      </div>
    </article>
  );
}
