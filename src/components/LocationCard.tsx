import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Copy, Check, ExternalLink, CalendarPlus } from 'lucide-react';
import { BotanicalCorner, OliveBranch } from './BotanicalDecorations';

interface LocationCardProps {
  onShowToast: (message: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const address = 'Restaurante "Lo de Charly"';
  const streetAddress = 'Av. Pte. J. D. Perón 424, Muñiz, Buenos Aires';
  const city = 'Horario estimado de llegada: 13:30 hs (a confirmar)';
  const fullAddress = `Lo De Charly, Av. Pte. J. D. Perón 424, B1662ASR Muñiz, Provincia de Buenos Aires`;
  const mapsUrl = 'https://maps.app.goo.gl/oTJodo5kRGHZfxoZ7?g_st=iw';
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${address} (${streetAddress}) - Google Maps: ${mapsUrl}`);
    setCopied(true);
    onShowToast('¡Dirección copiada al portapapeles!');
    setTimeout(() => setCopied(false), 2500);
  };

  // 13 February 2027 from 12:00 to 20:00
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Boda de Pablo y Flor 🌿'
  )}&dates=20270213T120000/20270213T200000&details=${encodeURIComponent(
    `Celebración del casamiento de Pablo y Flor.\nCeremonia: 12:00 hs · Celebración en Restaurante "Lo de Charly" (${streetAddress}): 13:30 hs (aprox., a confirmar).\nMapa: ${mapsUrl}`
  )}&location=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="ubicacion">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#B39054]/45 text-[#9E7B42] shadow-sm mb-3">
            <MapPin className="w-7 h-7 text-[#9E7B42]" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-[#9E7B42] font-semibold">
            ¿Cuándo y Dónde?
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#3C2F23] font-bold tracking-wide mt-1.5">
            Ubicación del Restaurante
          </h3>
          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
        </div>

        {/* Date & Time Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {/* Day block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/45 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#F3EAE0] border border-[#B39054]/40 flex items-center justify-center text-[#9E7B42] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#756250] block">
                Día del Evento
              </span>
              <span className="text-base sm:text-lg font-bold text-[#3C2F23] font-cinzel block">
                13 de Febrero
              </span>
              <span className="text-xs text-[#9E7B42] font-semibold font-body block">
                Sábado · 2027
              </span>
            </div>
          </div>

          {/* Time block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/45 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#F3EAE0] border border-[#B39054]/40 flex items-center justify-center text-[#9E7B42] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#756250] block">
                Horario Ceremonia
              </span>
              <span className="text-base sm:text-lg font-bold text-[#3C2F23] font-cinzel block">
                12:00 hs
              </span>
              <span className="text-xs text-[#9E7B42] font-medium font-body block">
                Restaurante ~13:30 hs (a confirmar)
              </span>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/45 text-center mb-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-[#9E7B42] mb-2">
            <OliveBranch size={16} />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-semibold text-[#5E4D3E]">
              Lugar de Celebración
            </span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} />
            </div>
          </div>

          <h4 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#3C2F23] tracking-wide uppercase">
            {address}
          </h4>

          <p className="font-body text-base sm:text-lg text-[#5E4D3E] font-semibold mt-1 leading-relaxed">
            {streetAddress}
          </p>

          <p className="font-body text-xs sm:text-sm text-[#9E7B42] font-medium mt-0.5 leading-relaxed">
            {city}
          </p>

          {/* Embedded Google Maps Preview */}
          <div className="mt-4 rounded-xl overflow-hidden border border-[#C7B299]/55 shadow-md bg-[#F3EAE0]">
            <iframe
              title='Ubicación en Google Maps - Restaurante "Lo de Charly", Av. Pte. J. D. Perón 424, Muñiz'
              src={embedMapsUrl}
              className="w-full h-48 sm:h-56 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Copy Address Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="mt-4 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#EFE4D4] hover:bg-[#E6D8C6] border border-[#B39054]/45 text-[#3C2F23] text-xs font-cinzel font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:border-[#9E7B42]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#7D6336]" />
                <span className="text-[#7D6336] font-semibold">¡Dirección Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#9E7B42]" />
                <span>Copiar Dirección</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons: Google Maps & Add to Calendar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-gradient-to-r from-[#9E7B42] via-[#B39054] to-[#9E7B42] hover:from-[#8C6A34] hover:to-[#A38047] border border-[#C9AC7C]/60 text-[#FAF7F2] font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FAF7F2]" />
            <span>Cómo Llegar (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
          </a>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#FAF7F2]/85 hover:bg-[#EFE4D4] border border-[#B39054]/45 text-[#3C2F23] font-cinzel text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:border-[#9E7B42]"
          >
            <CalendarPlus className="w-4 h-4 text-[#9E7B42]" />
            <span>Agendar en Google Calendar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
