import { growthSteps } from "@/data/growth";

export default function GrowthTimeline() {
  return (
    <section className="border-t border-slate-200 py-16 sm:py-20" aria-labelledby="growth-title">
      <p className="text-xs font-bold tracking-[0.22em] text-blue-600 sm:text-sm">GROWTH</p>
      <h2 id="growth-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">성장 과정</h2>

      <ol className="mt-11 grid gap-0 lg:grid-cols-5">
        {growthSteps.map((item, index) => (
          <li key={item.step} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
            {index < growthSteps.length - 1 ? (
              <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-slate-200 lg:top-5 lg:right-0 lg:bottom-auto lg:left-10 lg:h-px lg:w-[calc(100%-2.5rem)]" />
            ) : null}
            <div className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-xs font-black text-blue-600">
              {item.step}
            </div>
            <div className="pt-1 lg:mt-5 lg:pt-0">
              <h3 className="text-base font-extrabold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
