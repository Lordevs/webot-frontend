import { Calendar, Video, Timer } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function PromotionalContent() {
  const features = [
    {
      icon: <Calendar className="w-5 h-5 text-emerald-400" />,
      text: "Automated calendar booking",
    },
    {
      icon: <WhatsAppIcon className="w-5 h-5 text-emerald-400" />,
      text: "WhatsApp integration",
    },
    {
      icon: <Video className="w-5 h-5 text-emerald-400" />,
      text: "Google Meet links generated",
    },
    {
      icon: <Timer className="w-5 h-5 text-emerald-400" />,
      text: "Setup in under 10 minutes",
    },
  ];

  return (
    <div className="hidden w-full flex-1 flex-col justify-center px-16 py-20 md:flex relative bg-linear-to-tr from-primary to-[#232324] overflow-hidden">
      {/* WhatsApp background branding */}
      <div className="absolute top-10 right-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
        <WhatsAppIcon className="w-64 h-64 text-white" />
      </div>

      <div className="relative z-10 flex flex-col max-w-lg">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <WhatsAppIcon className="w-4 h-4" />
            <span>Official Integration</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Schedule meetings
            <br />
            <span className="text-white/80 italic">directly from WhatsApp</span>
          </h1>
          <p className="text-white/70 text-lg xl:text-xl leading-relaxed font-medium">
            Connect your calendar and let your customers book appointments
            through WhatsApp chat.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group/item">
              <div className="shrink-0 p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <span className="text-white/90 font-medium text-lg">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none" />
    </div>
  );
}
