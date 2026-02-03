import { Separator } from "../ui/separator";

export default function PromotionalContent() {
  return (
    <div className="hidden w-full flex-1 flex-col justify-center px-16 py-20 md:flex relative bg-linear-to-tr from-primary to-secondary-foreground overflow-hidden">
      <div className="relative z-10 flex flex-col max-w-lg">
        <div className="space-y-6">
          <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Next-Gen AI
            <br />
            <span className="text-sidebar-primary-foreground/90">
              SEO Engine
            </span>
          </h1>
          <p className="text-white/70 text-lg xl:text-xl leading-relaxed">
            Stop guessing and start growing. Scan 200+ ranking factors in
            seconds to skyrocket your search visibility with precise AI fixes.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-6 xl:gap-8">
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-white">
              12K+
            </div>
            <div className="text-white/50 text-xs font-medium uppercase tracking-wider">
              SEO Professionals
            </div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-white/10" />
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-white">
              200+
            </div>
            <div className="text-white/50 text-xs font-medium uppercase tracking-wider">
              Ranking Factors
            </div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-white/10" />
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-white">94%</div>
            <div className="text-white/50 text-xs font-medium uppercase tracking-wider">
              Avg. Fix Rate
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-sidebar-primary/20 rounded-full blur-3xl" />
    </div>
  );
}
