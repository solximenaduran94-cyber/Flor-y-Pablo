import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';
import { BotanicalCorner, WeddingRingsIcon } from './BotanicalDecorations';

interface GiftAliasCardProps {
  onShowToast: (message: string) => void;
}

export const GiftAliasCard: React.FC<GiftAliasCardProps> = ({ onShowToast }) => {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const bankDetails = {
    alias: 'PabloyFlor.2027',
    cbu: '0140066303500656424937',
    titular: 'Florencia Belen Curra',
    entity: 'Banco Provincia',
  };

  const copyToClipboard = (text: string, type: 'alias' | 'cbu' | 'all') => {
    navigator.clipboard.writeText(text);
    if (type === 'alias') {
      setCopiedAlias(true);
      onShowToast(`¡Alias "${text}" copiado al portapapeles!`);
      setTimeout(() => setCopiedAlias(false), 2500);
    } else if (type === 'cbu') {
      setCopiedCbu(true);
      onShowToast(`¡CBU "${text}" copiado al portapapeles!`);
      setTimeout(() => setCopiedCbu(false), 2500);
    } else {
      setCopiedAll(true);
      onShowToast('¡Todos los datos bancarios fueron copiados!');
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const handleCopyAll = () => {
    const fullText = [
      `🌿 BODA PABLO & FLOR - LLUVIA DE SOBRES 💍`,
      `Entidad: ${bankDetails.entity}`,
      `Titular: ${bankDetails.titular}`,
      `Alias: ${bankDetails.alias}`,
      `CBU: ${bankDetails.cbu}`,
    ].join('\n');
    copyToClipboard(fullText, 'all');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="regalos">
      <div className="relative p-6 sm:p-9 rounded-3xl eucalyptus-card overflow-hidden">
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />

        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#B39054]/45 text-[#9E7B42] shadow-sm mb-3">
            <Gift className="w-7 h-7 text-[#9E7B42]" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-[#9E7B42] font-semibold">
            Obsequios &amp; Buenos Deseos
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#3C2F23] font-bold tracking-wide mt-1">
            Lluvia de Sobres
          </h3>
          <div className="eucalyptus-divider max-w-xs mx-auto my-3" />
        </div>

        <p className="text-center text-[#5E4D3E] text-sm sm:text-base font-body max-w-md mx-auto leading-relaxed font-medium">
          Nuestro mayor y mejor regalo es tu presencia en este día tan especial.
          Si deseás hacernos un presente, podés hacerlo a través de transferencia bancaria:
        </p>

        {/* Bank Transfer Details Card */}
        <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#C7B299]/45 shadow-sm text-left">
          {/* Header of Bank Box */}
          <div className="flex items-center justify-between pb-3 border-b border-[#C7B299]/40 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F3EAE0] border border-[#B39054]/40 flex items-center justify-center text-[#9E7B42]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#756250] font-medium block">
                  Entidad Bancaria
                </span>
                <span className="font-cinzel text-base font-extrabold text-[#9E7B42]">
                  {bankDetails.entity}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#EFE4D4] hover:bg-[#E6D8C6] border border-[#B39054]/40 text-xs font-cinzel font-semibold text-[#3C2F23] transition-all cursor-pointer shadow-xs"
              title="Copiar todos los datos de la cuenta"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-[#7D6336]" /> : <Copy className="w-3.5 h-3.5 text-[#9E7B42]" />}
              <span>{copiedAll ? '¡Copiados!' : 'Copiar Todo'}</span>
            </button>
          </div>

          {/* Key fields */}
          <div className="space-y-3.5">
            {/* Alias Box */}
            <div className="p-3.5 rounded-xl bg-[#F6EFE4]/90 backdrop-blur-sm border border-[#C7B299]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#756250] block">
                  Alias de Transferencia
                </span>
                <span className="font-mono text-lg sm:text-xl font-bold text-[#3C2F23] tracking-wide select-all">
                  {bankDetails.alias}
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(bankDetails.alias, 'alias')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-gradient-to-r from-[#9E7B42] to-[#B39054] hover:from-[#8C6A34] hover:to-[#A38047] border border-[#C9AC7C]/50 text-[#FAF7F2] font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-sm transition-all"
              >
                {copiedAlias ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>Copiar Alias</span>
                  </>
                )}
              </button>
            </div>

            {/* CBU Box */}
            <div className="p-3.5 rounded-xl bg-[#F6EFE4]/90 backdrop-blur-sm border border-[#C7B299]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#756250] block">
                  CBU
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#3C2F23] tracking-wide select-all break-all">
                  {bankDetails.cbu}
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(bankDetails.cbu, 'cbu')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#EFE4D4] hover:bg-[#E6D8C6] border border-[#B39054]/45 text-[#3C2F23] font-cinzel text-xs font-semibold tracking-wider cursor-pointer shadow-xs transition-all shrink-0"
              >
                {copiedCbu ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#7D6336]" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9E7B42]" />
                    <span>Copiar CBU</span>
                  </>
                )}
              </button>
            </div>

            {/* Supplementary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F6EFE4]/75 backdrop-blur-sm border border-[#C7B299]/40">
                <span className="text-[#756250] block font-cinzel uppercase">Titular de Cuenta</span>
                <span className="text-[#3C2F23] font-semibold text-sm">{bankDetails.titular}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F6EFE4]/75 backdrop-blur-sm border border-[#C7B299]/40">
                <span className="text-[#756250] block font-cinzel uppercase">Banco</span>
                <span className="text-[#3C2F23] font-semibold text-sm">{bankDetails.entity}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#6E5B49] font-body font-medium mt-5 flex items-center justify-center gap-1.5">
          <WeddingRingsIcon size={16} />
          <span>¡Muchísimas gracias por tu generosidad y cariño!</span>
          <WeddingRingsIcon size={16} />
        </p>
      </div>
    </div>
  );
};
