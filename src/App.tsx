import React, { useState, useEffect } from 'react';
import { BotanicalBackground } from './components/BotanicalBackground';
import {
  BotanicalWreathMedallion,
  BotanicalDivider,
  FloatingBotanicalLeaves,
  EucalyptusBranch,
  OliveBranch,
  WeddingRingsIcon,
} from './components/BotanicalDecorations';
import { CountdownTimer } from './components/CountdownTimer';
import { WeddingScheduleCard } from './components/WeddingScheduleCard';
import { LocationCard } from './components/LocationCard';
import { GiftAliasCard } from './components/GiftAliasCard';
import { RsvpSection } from './components/RsvpSection';
import { GuestMessagesWall } from './components/GuestMessagesWall';
import { MusicPlayer } from './components/MusicPlayer';
import { WaterRippleEffect } from './components/WaterRippleEffect';
import { Toast } from './components/Toast';
import { DigitalPassModal } from './components/DigitalPassModal';
import { Calendar, Clock, MapPin, Share2, Ticket, Heart } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Pablo & Flor | Nuestra Boda · 13 de Febrero 2027';
    const currentUrl = window.location.origin + window.location.pathname;
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) ogUrlMeta.setAttribute('content', currentUrl);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', currentUrl);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Pablo & Flor | Nuestra Boda 🌿💍',
          text: 'Después de elegirnos cada día, llegó el momento de elegirnos para siempre. Te invitamos a celebrar nuestra boda. Sábado 13 de Febrero de 2027 - 12:00 hs ceremonia · Celebración en Restaurante "Lo de Charly".',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('¡Enlace de la invitación copiado al portapapeles!');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#3C2F23] font-body selection:bg-[#B39054]/25 selection:text-[#3C2F23]">
      {/* Interactive Water Ripple Effect on Tap / Swipe */}
      <WaterRippleEffect />

      {/* Dynamic Botanical Foliage Canvas Background */}
      <BotanicalBackground />

      {/* Floating Natural Foliage Accents */}
      <FloatingBotanicalLeaves />

      {/* Ambient Music Player ("A Thousand Years" - Christina Perri) */}
      <MusicPlayer />

      {/* Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Digital VIP Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Main Invitation Layout */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-24 text-center">

        {/* HERO SECTION */}
        <header className="relative flex flex-col items-center justify-center pt-2 pb-6">
          {/* Subtle Indicator in Champagne Gold & Nude Ivory */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0]/80 border border-[#B39054]/40 text-xs uppercase tracking-[0.3em] text-[#8C6A34] font-cinzel font-semibold mb-3 shadow-sm backdrop-blur-md">
            <OliveBranch size={16} glow />
            <span>Bienvenidos a Nuestro Gran Día</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} glow />
            </div>
          </div>

          {/* Botanical Wreath Medallion with Monogram P & F */}
          <div className="my-2">
            <BotanicalWreathMedallion className="w-52 h-52 sm:w-64 sm:h-64">
              <div className="flex flex-col items-center justify-center select-none py-1">
                {/* Monogram initials in warm cocoa #3C2F23 with antique champagne gold #9E7B42 ampersand */}
                <div className="flex items-center justify-center gap-1.5 leading-none">
                  <span className="font-cinzel text-4xl sm:text-5xl text-[#3C2F23] font-bold tracking-normal">
                    P
                  </span>
                  <span className="font-script text-3xl sm:text-4xl text-[#9E7B42] mx-1">
                    &
                  </span>
                  <span className="font-cinzel text-4xl sm:text-5xl text-[#3C2F23] font-bold tracking-normal">
                    F
                  </span>
                </div>
                {/* Subtle champagne gold divider */}
                <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#B39054] to-transparent my-2" />
                <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#756250] font-semibold">
                  13 · 02 · 2027
                </span>
              </div>
            </BotanicalWreathMedallion>
          </div>

          {/* Calligraphic Script Header */}
          <p className="font-script text-4xl sm:text-6xl text-[#6B533E] leading-tight mt-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
            Nuestra Boda
          </p>

          {/* Bride & Groom Names */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-[#3C2F23] tracking-[0.12em] uppercase mt-2 mb-3 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            PABLO <span className="text-[#9E7B42] font-serif font-light">&</span> FLOR
          </h1>

          {/* Botanical Divider */}
          <BotanicalDivider className="my-4" />

          {/* Key Date & Place - Warm Nude Translucent Glass */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2 mb-4 px-5 py-2.5 rounded-full bg-[#FAF6F0]/82 border border-[#B39054]/40 text-xs sm:text-sm font-cinzel text-[#3C2F23] shadow-sm backdrop-blur-md">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#9E7B42]" />
              <strong className="font-semibold">Sábado 13 de Febrero</strong>
            </span>
            <span className="text-[#B59E84] hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#9E7B42]" />
              <strong className="font-semibold">12:00 hs (Ceremonia)</strong>
            </span>
            <span className="text-[#B59E84] hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9E7B42]" />
              <strong className="font-semibold">Restaurante “Lo de Charly”</strong>
            </span>
          </div>

          {/* Dedicated Phrase */}
          <div className="max-w-xl mx-auto px-5 py-4 my-3 rounded-2xl bg-[#FAF6F0]/80 border border-[#C7B299]/45 text-center backdrop-blur-md shadow-sm">
            <p className="font-serif-luxury italic text-base sm:text-lg text-[#4A3A2C] leading-relaxed">
              “Después de elegirnos cada día, llegó el momento de elegirnos para siempre. Queremos compartir con ustedes la alegría de celebrar nuestro amor y el comienzo de nuestra vida juntos.”
            </p>
          </div>

          {/* Action buttons: Pass & Share */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => setIsPassModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9E7B42] via-[#B39054] to-[#9E7B42] hover:from-[#8C6A34] hover:to-[#A38047] border border-[#C9AC7C]/60 text-[#FAF7F2] font-cinzel text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer shadow-md backdrop-blur-sm"
            >
              <Ticket className="w-4 h-4 text-[#FAF7F2]" />
              <span>Ver Mi Pase Digital</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF6F0]/85 hover:bg-[#EFE4D4] border border-[#B39054]/45 text-[#3C2F23] font-cinzel text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:border-[#9E7B42] backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4 text-[#9E7B42]" />
              <span>Compartir Invitación</span>
            </button>
          </div>
        </header>

        {/* 1. CUENTA REGRESIVA */}
        <section aria-label="Cuenta regresiva del casamiento">
          <CountdownTimer />
        </section>

        {/* 2. DETALLES DE LA BODA (CRONOGRAMA) */}
        <section aria-label="Detalles de la boda e itinerario">
          <WeddingScheduleCard />
        </section>

        {/* UBICACIÓN Y CÓMO LLEGAR */}
        <section aria-label="Ubicación y cómo llegar al restaurante">
          <LocationCard onShowToast={showToast} />
        </section>

        {/* REGALOS Y TRANSFERENCIA (LLUVIA DE SOBRES) */}
        <section aria-label="Regalos y datos de transferencia bancaria">
          <GiftAliasCard onShowToast={showToast} />
        </section>

        {/* 8. CONFIRMACIÓN DE ASISTENCIA (RSVP) */}
        <section aria-label="Confirmación de asistencia">
          <RsvpSection onShowToast={showToast} />
        </section>

        {/* 9. MURO DE MENSAJES Y BENDICIONES */}
        <section aria-label="Mensajes y bendiciones para los novios">
          <GuestMessagesWall onShowToast={showToast} />
        </section>

        {/* FOOTER */}
        <footer className="mt-14 pt-8 border-t border-[#B39054]/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <OliveBranch size={22} glow />
            <WeddingRingsIcon size={24} />
            <div className="scale-x-[-1]">
              <OliveBranch size={22} glow />
            </div>
          </div>
          <p className="font-script text-3xl sm:text-4xl text-[#6B533E] leading-none drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]">
            ¡Los esperamos para celebrar nuestro amor!
          </p>
          <p className="font-cinzel text-xl sm:text-2xl text-[#3C2F23] font-extrabold tracking-widest uppercase mt-2">
            PABLO & FLOR
          </p>
          <p className="font-cinzel text-xs text-[#6E5B49] uppercase tracking-[0.25em] font-semibold mt-1">
            13 de Febrero de 2027 · Restaurante “Lo de Charly”
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-cinzel text-[#756250] font-semibold">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#3C2F23] underline cursor-pointer"
            >
              Volver arriba ↑
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleShare}
              className="hover:text-[#3C2F23] underline cursor-pointer"
            >
              Compartir invitación
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
