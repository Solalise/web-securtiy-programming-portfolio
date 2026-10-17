type SkillGroupProps = {
  title: string;
  skills: readonly string[];
};

export default function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6">
      <h3 className="font-bold text-zinc-950">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} 기술 목록`}>
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
