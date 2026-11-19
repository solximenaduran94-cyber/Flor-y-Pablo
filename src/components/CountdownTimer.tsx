import React, { useState, useEffect } from 'react';
import { OliveBranch, BotanicalCorner } from './BotanicalDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Target: 13 February 2027 at 12:00:00 (ceremony start)
      const targetDate = new Date(2027, 1, 13, 12, 0, 0);

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4" id="cuenta-regresiva">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Luminous warm accents in champagne and nude silk */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#E6D8C6]/45 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#B39054]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <OliveBranch size={18} glow />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#9E7B42] uppercase font-semibold">
              Cuenta Regresiva
            </p>
            <div className="scale-x-[-1]">
              <OliveBranch size={18} glow />
            </div>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl text-[#3C2F23] font-bold mb-4">
            Cada segundo nos acerca a nuestro sueño
          </h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/50 shadow-sm group hover:border-[#B39054] transition-all duration-300"
              >
                <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-[#3C2F23] tabular-nums leading-none tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#756250] font-cinzel">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs sm:text-sm text-[#6E5B49] font-body italic font-medium">
            {timeLeft.isPast
              ? '¡El gran día ha llegado! ¡Gracias por acompañarnos!'
              : 'Sábado 13 de Febrero de 2027 · 12:00 hs'}
          </p>
        </div>
      </div>
    </div>
  );
};
