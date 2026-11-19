import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { MessageSquareHeart, Send, Music2 } from 'lucide-react';
import {
  BotanicalCorner,
  OliveBranch,
  EucalyptusBranch,
  WeddingRingsIcon,
} from './BotanicalDecorations';

export interface GuestMessageDoc {
  id: string;
  authorName: string;
  message: string;
  song?: string;
  createdAt?: Timestamp | null;
}

export async function saveGuestMessageToPage(
  rawAuthorName: string,
  rawMessage: string,
  rawSong?: string
): Promise<void> {
  const authorName = rawAuthorName.trim().slice(0, 100);
  const message = rawMessage.trim().slice(0, 1000);
  const song = rawSong ? rawSong.trim().slice(0, 200) : '';

  if (!authorName || !message) {
    return;
  }

  const payload: Record<string, unknown> = {
    authorName,
    message,
    createdAt: serverTimestamp(),
  };

  if (song) {
    payload.song = song;
  }

  try {
    await addDoc(collection(db, 'messages'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'messages');
  }
}

interface GuestMessagesWallProps {
  onShowToast: (message: string) => void;
}

export const GuestMessagesWall: React.FC<GuestMessagesWallProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<GuestMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Listen to messages collection without strict index dependencies
    const q = query(
      collection(db, 'messages'),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: GuestMessageDoc[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            let parsedTimestamp: Timestamp | null = null;
            if (data.createdAt instanceof Timestamp) {
              parsedTimestamp = data.createdAt;
            } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
              parsedTimestamp = data.createdAt;
            } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
              parsedTimestamp = Timestamp.fromDate(new Date(data.createdAt));
            }

            return {
              id: docSnap.id,
              authorName: String(data.authorName || ''),
              message: String(data.message || ''),
              song: data.song ? String(data.song) : undefined,
              createdAt: parsedTimestamp,
            };
          })
          .filter((msg) => msg.authorName && msg.message && msg.authorName !== 'Test Node');

        // Sort descending: newest first (newly created messages without timestamp yet stay at the top)
        docs.sort((a, b) => {
          const timeA = a.createdAt ? a.createdAt.toMillis() : Date.now();
          const timeB = b.createdAt ? b.createdAt.toMillis() : Date.now();
          return timeB - timeA;
        });

        setMessages(docs);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'messages');
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      onShowToast('Por favor escribí tu nombre');
      return;
    }
    if (!messageText.trim()) {
      onShowToast('Por favor escribí tu mensaje para los novios');
      return;
    }

    setSubmitting(true);
    try {
      await saveGuestMessageToPage(authorName, messageText);
      setMessageText('');
      onShowToast('¡Tu mensaje para Pablo y Flor quedó publicado! 🌿💍');
    } catch {
      onShowToast('No se pudo publicar el mensaje. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (ts?: Timestamp | null) => {
    if (!ts) return 'Recién publicado';
    try {
      return ts.toDate().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="mensajes-novios">
      <div className="relative p-6 sm:p-8 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF7F2]/90 border border-[#B39054]/45 text-[#9E7B42] shadow-sm mb-3">
            <MessageSquareHeart className="w-7 h-7 text-[#9E7B42]" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-[#9E7B42] font-semibold">
            <OliveBranch size={16} glow />
            <span>Libro de Buenos Deseos{messages.length > 0 ? ` (${messages.length})` : ''}</span>
            <div className="scale-x-[-1]">
              <OliveBranch size={16} glow />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#3C2F23] font-bold tracking-wide mt-1">
            Mensajes para Pablo & Flor 🌿
          </h3>

          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />

          <p className="text-sm text-[#5E4D3E] font-body font-medium max-w-md mx-auto">
            Dejales tus buenos deseos y mensajes de cariño a los novios para esta nueva etapa de sus vidas.
          </p>
        </div>

        {/* Form to write a message directly on the page */}
        <form
          onSubmit={handlePostMessage}
          className="space-y-3 text-left bg-[#FAF7F2]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#C7B299]/45 mb-7 shadow-sm"
        >
          <div>
            <label
              htmlFor="wall-author-name"
              className="block text-xs font-cinzel tracking-wider uppercase text-[#8C6A34] font-bold mb-1"
            >
              Tu Nombre / Familia *
            </label>
            <input
              id="wall-author-name"
              type="text"
              required
              maxLength={100}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ej: Familia Morales / Tía Graciela"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] backdrop-blur-sm border border-[#C7B299]/60 text-[#3C2F23] placeholder-[#9A8672] text-sm focus:outline-none focus:border-[#B39054] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="wall-message-text"
              className="block text-xs font-cinzel tracking-wider uppercase text-[#8C6A34] font-bold mb-1"
            >
              Tu Mensaje para los Novios *
            </label>
            <textarea
              id="wall-message-text"
              rows={3}
              required
              maxLength={1000}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribiles tus mejores deseos para esta nueva etapa juntos..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] backdrop-blur-sm border border-[#C7B299]/60 text-[#3C2F23] placeholder-[#9A8672] text-sm focus:outline-none focus:border-[#B39054] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#9E7B42] via-[#B39054] to-[#9E7B42] hover:from-[#8C6A34] hover:to-[#A38047] disabled:opacity-50 text-[#FAF7F2] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md border border-[#C9AC7C]/55 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#FAF7F2]" />
            <span>{submitting ? 'Publicando...' : 'Publicar Mensaje en el Muro'}</span>
          </button>
        </form>

        {/* Messages Wall List */}
        <div className="space-y-3.5 text-left max-h-[420px] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-8 text-[#756250] text-sm font-body">
              Cargando mensajes y buenos deseos...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/40">
              <div className="flex justify-center mb-2">
                <WeddingRingsIcon size={24} />
              </div>
              <p className="text-sm text-[#5E4D3E] font-body">
                ¡Sé la primera persona en dejarle un mensaje de cariño a Pablo y Flor! 🌿💍
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className="relative p-4 rounded-2xl bg-[#FAF7F2]/85 backdrop-blur-md border border-[#C7B299]/50 shadow-sm transition-all hover:border-[#B39054]"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EFE4D4] border border-[#B39054]/45 text-[#9E7B42] text-xs font-cinzel font-bold">
                      {item.authorName.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-cinzel text-sm font-bold text-[#3C2F23] tracking-wide">
                      {item.authorName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#756250] font-body">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#4A3A2C] font-body leading-relaxed pl-9 font-medium">
                  “{item.message}”
                </p>

                {item.song && (
                  <div className="mt-2 pl-9 flex items-center gap-1.5 text-xs text-[#9E7B42] font-body">
                    <Music2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Tema sugerido: {item.song}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
