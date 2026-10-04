type InterestCardProps = {
  marker: string;
  title: string;
  description: string;
};

export default function InterestCard({
  marker,
  title,
  description,
}: InterestCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7">
      <div
        className="flex size-11 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-blue-700"
        aria-hidden="true"
      >
        {marker}
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-zinc-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{description}</p>
    </article>
  );
}
