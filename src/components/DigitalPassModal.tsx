import React, { useState } from 'react';
import { X, QrCode, Download, Share2, Sparkles, MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  EucalyptusBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';
import ringsDetail from '../assets/images/wedding_eucalyptus_detail_1792701737708.jpg';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [guestName, setGuestName] = useState('Invitado Especial');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Pase de Invitado - Boda Pablo & Flor 🌿💍',
          text: `¡Tengo mi pase para el casamiento de Pablo y Flor! Sábado 13 de Febrero de 2027 a las 12:00 hs · Celebración en Restaurante "Lo de Charly".`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('¡Enlace del pase copiado!');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pass-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3C2F23]/55 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl eucalyptus-card border-2 border-[#B39054]/55 shadow-2xl p-6 sm:p-7 text-center overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] text-[#756250] hover:text-[#3C2F23] border border-[#C7B299]/60 transition-colors cursor-pointer z-20"
          aria-label="Cerrar pase"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D4] border border-[#B39054]/45 text-[#8C6A34] text-[10px] font-cinzel font-bold tracking-widest uppercase mb-3">
          <WeddingRingsIcon size={14} />
          <span>Pase Digital de Boda</span>
        </div>

        {/* Title */}
        <h3 id="pass-title" className="font-cinzel text-xl sm:text-2xl font-black text-[#3C2F23] uppercase tracking-wider mb-0.5">
          PABLO <span className="text-[#9E7B42]">&</span> FLOR
        </h3>
        <p className="font-cinzel text-xs text-[#9E7B42] tracking-[0.25em] uppercase font-semibold">
          Nuestra Boda 🌿
        </p>

        {/* Rings image circular avatar */}
        <div className="w-20 h-20 mx-auto my-3 rounded-full border-2 border-[#B39054] overflow-hidden shadow-md">
          <img src={ringsDetail} alt="Alianzas y detalles de boda" className="w-full h-full object-cover" />
        </div>

        {/* Guest name badge */}
        <div className="my-2 p-2.5 rounded-xl bg-[#FAF7F2]/85 border border-[#C7B299]/50">
          <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#756250] block font-semibold">
            Invitado / Familia
          </span>
          {isEditing ? (
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="w-full text-center font-cinzel text-sm font-bold text-[#3C2F23] bg-transparent border-b border-[#B39054] focus:outline-none"
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className="font-cinzel text-sm sm:text-base font-bold text-[#3C2F23] hover:text-[#9E7B42] cursor-pointer transition-colors"
              title="Haz clic para personalizar tu nombre"
            >
              {guestName} ✎
            </p>
          )}
        </div>

        {/* Details list */}
        <div className="space-y-1.5 my-3 text-left text-xs font-cinzel text-[#4A3A2C] bg-[#FAF7F2]/85 p-3 rounded-xl border border-[#C7B299]/45">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#9E7B42] shrink-0" />
            <span>Sábado 13 de Febrero de 2027</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#9E7B42] shrink-0" />
            <span>Ceremonia: 12:00 hs · Restaurante: ~13:30 hs</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#9E7B42] shrink-0" />
            <span>Restaurante “Lo de Charly” · Av. Pte. J. D. Perón 424, Muñiz</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#9E7B42] to-[#B39054] hover:from-[#8C6A34] hover:to-[#A38047] text-[#FAF7F2] font-cinzel text-xs font-bold tracking-wider cursor-pointer border border-[#C9AC7C]/50 shadow-md"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FAF7F2]" />
            <span>Compartir Pase</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-[#EFE4D4] hover:bg-[#E6D8C6] border border-[#C7B299]/55 text-[#3C2F23] font-cinzel text-xs font-semibold cursor-pointer transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
