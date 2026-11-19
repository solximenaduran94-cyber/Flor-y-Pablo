import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, ExternalLink, Play, Pause, Disc, Sparkles } from 'lucide-react';
import aThousandYearsSong from '../assets/a_thousand_years.mp3';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(aThousandYearsSong);
    let promptTimer: ReturnType<typeof setTimeout> | undefined;
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayPrompt(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Function to start music on first user touch / click / scroll
    const startAudioPlayback = () => {
      if (hasInteractedRef.current && !audio.paused) return;
      hasInteractedRef.current = true;
      audio.play().catch(() => {});
      cleanupInteractionListeners();
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener('click', startAudioPlayback);
      window.removeEventListener('touchstart', startAudioPlayback);
      window.removeEventListener('pointerdown', startAudioPlayback);
      window.removeEventListener('scroll', startAudioPlayback);
      window.removeEventListener('keydown', startAudioPlayback);
    };

    // Attempt direct autoplay immediately on page load
    audio
      .play()
      .then(() => {
        hasInteractedRef.current = true;
        setIsPlaying(true);
      })
      .catch(() => {
        // Browser blocked autoplay without user gesture:
        // Listen on any user interaction anywhere on the window
        window.addEventListener('click', startAudioPlayback, { once: true });
        window.addEventListener('touchstart', startAudioPlayback, { once: true, passive: true });
        window.addEventListener('pointerdown', startAudioPlayback, { once: true });
        window.addEventListener('scroll', startAudioPlayback, { once: true, passive: true });
        window.addEventListener('keydown', startAudioPlayback, { once: true });

        // Show friendly prompt after 1.2s if still paused
        promptTimer = setTimeout(() => {
          if (audio.paused) {
            setShowPlayPrompt(true);
          }
        }, 1200);
      });

    return () => {
      if (promptTimer) clearTimeout(promptTimer);
      cleanupInteractionListeners();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const handlePromptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    audioRef.current?.play().catch(() => {});
    setShowPlayPrompt(false);
  };

  const SPOTIFY_URL = 'https://open.spotify.com/search/Christina%20Perri%20A%20Thousand%20Years';
  const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=Christina+Perri+A+Thousand+Years';

  return (
    <>
      {/* Floating Ambient Music Control */}
      <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
        {/* Subtle Play Prompt if browser blocked initial autoplay before user interaction */}
        {showPlayPrompt && !isPlaying && (
          <button
            type="button"
            onClick={handlePromptClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FAF7F2]/95 border border-[#B39054] text-[#3C2F23] text-xs font-cinzel font-semibold tracking-wider shadow-lg backdrop-blur-md animate-bounce cursor-pointer hover:bg-[#EFE4D4] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9E7B42]" />
            <span>Tocar para escuchar música 🎶</span>
          </button>
        )}

        {/* Expanded Info Card (if clicked) */}
        {showDetails && (
          <div className="p-4 rounded-2xl bg-[#FAF7F2]/95 border border-[#B39054]/45 backdrop-blur-xl shadow-2xl w-72 text-left mb-1 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#C7B299]/40">
              <Disc className="w-5 h-5 text-[#9E7B42] animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <p className="text-[10px] font-cinzel uppercase tracking-wider text-[#756250]">
                  Música de la Boda
                </p>
                <p className="font-cinzel text-xs font-bold text-[#3C2F23]">
                  A Thousand Years
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5E4D3E] italic font-serif-luxury mb-3 leading-relaxed">
              “I have loved you for a thousand years, I&apos;ll love you for a thousand more...”
            </p>
            <p className="text-[11px] font-cinzel text-[#9E7B42] font-bold mb-3">
              Christina Perri
            </p>

            <div className="flex gap-2">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#CC0000]/85 hover:bg-[#CC0000] text-[#FAF7F2] text-[11px] font-cinzel font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#1DB954]/85 hover:bg-[#1DB954] text-[#FAF7F2] text-[11px] font-cinzel font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="flex items-center gap-1 bg-[#FAF7F2]/92 backdrop-blur-md border border-[#B39054]/45 rounded-full p-1.5 shadow-lg hover:border-[#9E7B42]/70 transition-all">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[#3C2F23] hover:text-[#8C6A34] transition-all cursor-pointer"
            title="A Thousand Years - Christina Perri"
          >
            <div className="relative flex items-center justify-center">
              {isPlaying ? (
                <>
                  <span className="absolute -inset-1 rounded-full bg-[#B39054]/25 animate-ping" />
                  <Volume2 className="w-4 h-4 text-[#9E7B42] relative z-10" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-[#756250] relative z-10" />
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[11px] font-cinzel tracking-wider text-[#3C2F23] block font-bold leading-tight">
                {isPlaying ? 'A Thousand Years' : 'Música'}
              </span>
              <span className="text-[9px] text-[#756250] font-body block leading-tight">
                Christina Perri
              </span>
            </div>
            {isPlaying && (
              <span className="flex items-center gap-0.5 ml-1" aria-hidden="true">
                <span className="w-0.5 h-2.5 bg-[#B39054] rounded-full animate-bounce" />
                <span className="w-0.5 h-3.5 bg-[#6B533E] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-0.5 h-2 bg-[#B39054] rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="p-1.5 text-[#9E7B42] hover:text-[#3C2F23] rounded-full transition-colors cursor-pointer"
            title="Ver detalles de la canción"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
