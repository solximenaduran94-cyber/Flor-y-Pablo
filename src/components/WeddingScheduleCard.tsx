import React from 'react';
import { Church, GlassWater, Sparkles, Clock } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';

export const WeddingScheduleCard: React.FC = () => {
  const timelineEvents = [
    {
      time: '12:00 hs',
      title: 'Ceremonia',
      description: 'El momento más esperado para celebrar nuestro amor y dar el “Sí, para siempre”.',
      icon: <Church className="w-5 h-5 text-[#9E7B42]" />,
    },
    {
      time: '13:30 hs (aprox.)',
      title: 'Celebración en el Restaurante',
      description: 'Horario estimado de llegada a “Lo de Charly” para compartir el almuerzo y brindar juntos (horario definitivo a confirmar).',
      icon: <GlassWater className="w-5 h-5 text-[#9E7B42]" />,
    },
    {
      time: 'Luego',
      title: 'Brindis y Alegría',
      description: 'Sobremesa, música y una tarde inolvidable celebrando el comienzo de nuestra vida juntos.',
      icon: <Sparkles className="w-5 h-5 text-[#9E7B42]" />,
    },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="detalles-boda">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#B39054]/45 text-[#9E7B42] shadow-sm mb-3">
            <Clock className="w-7 h-7 text-[#9E7B42]" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#9E7B42] font-semibold">
            <OliveBranch size={16} />
            <span>Itinerario del Evento</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#3C2F23] font-bold tracking-wide mt-1">
            Detalles de la Boda
          </h3>

          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

          <p className="text-sm text-[#5E4D3E] font-body font-medium max-w-md mx-auto">
            Te compartimos el cronograma estimado para disfrutar juntos cada instante de este gran día.
          </p>
        </div>

        {/* Timeline list */}
        <div className="relative space-y-4 sm:space-y-5">
          {/* Vertical connecting line in champagne gold & warm sand */}
          <div className="absolute left-[27px] sm:left-[31px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#B39054]/60 via-[#C7B299] to-[#B39054]/60 hidden sm:block pointer-events-none" />

          {timelineEvents.map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/45 shadow-sm hover:border-[#B39054] transition-all duration-300"
            >
              {/* Icon circle */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-[#F3EAE0] border border-[#B39054]/45 flex items-center justify-center shrink-0 shadow-xs">
                {item.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#3C2F23] tracking-wide">
                    {item.title}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D4] border border-[#C7B299]/60 text-[#3C2F23] text-xs font-cinzel font-semibold">
                    <Clock className="w-3 h-3 text-[#9E7B42]" />
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-[#5E4D3E] font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom touch */}
        <div className="mt-6 pt-4 border-t border-[#C7B299]/35 flex items-center justify-center gap-2 text-xs font-cinzel text-[#9E7B42]">
          <WeddingRingsIcon size={20} />
          <span className="text-[#5E4D3E] font-medium">¡Te esperamos para celebrar este momento inolvidable!</span>
        </div>
      </div>
    </div>
  );
};
