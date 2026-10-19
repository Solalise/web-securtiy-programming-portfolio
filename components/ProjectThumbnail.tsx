type ProjectThumbnailProps = {
  title: string;
  category: string;
  status?: string;
  imageSrc?: string;
  size?: "card" | "hero";
};

export default function ProjectThumbnail({
  title,
  category,
  status,
  imageSrc,
  size = "card",
}: ProjectThumbnailProps) {
  const isHero = size === "hero";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-zinc-50 ${
        isHero
          ? "min-h-72 rounded-2xl border border-zinc-200 sm:min-h-96"
          : "aspect-[16/9]"
      }`}
      aria-label={`${title} 프로젝트 이미지 자리`}
      role="img"
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- Project thumbnails may be supplied by an administrator.
        <img src={imageSrc} alt={`${title} 프로젝트 화면`} className="size-full object-contain bg-white" />
      ) : (
        <div
          className={`relative flex items-center justify-center rounded-2xl border border-zinc-200 bg-white font-mono font-bold text-blue-600 ${
            isHero ? "size-28 text-3xl sm:size-36 sm:text-4xl" : "size-16 text-lg"
          }`}
        >
          {title.slice(0, 2).toUpperCase()}
          <span className="absolute -right-1.5 -bottom-1.5 size-4 rounded-full border-2 border-zinc-50 bg-blue-600" />
        </div>
      )}
      <span className="absolute right-5 bottom-5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-500 sm:right-7 sm:bottom-7">
        {status ?? category}
      </span>
    </div>
  );
}
