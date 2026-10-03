'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { HIMORA_INFO } from '@/lib/data';
import { X, PhoneCall, Copy, Check, MessageSquare, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface HimoraModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HimoraModal: React.FC<HimoraModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isFa = language === 'fa';
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(HIMORA_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#eaedff] relative overflow-hidden"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#3525cd]/20 to-[#fd56a7]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3525cd] via-[#4f46e5] to-[#fd56a7] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-[#131b2e]">
                {HIMORA_INFO.name}
              </span>
              <span className="text-[10px] text-[#464555]">
                {HIMORA_INFO.nameEn}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#464555] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#131b2e] leading-relaxed relative z-10 text-justify">
          {HIMORA_INFO.description}
        </p>

        {/* Call to Action Box for client */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f2f3ff] via-[#eaedff] to-[#dae2fd] border border-[#dae2fd] flex flex-col gap-3 relative z-10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#131b2e]">
              {isFa ? 'تماس مستقیم جهت توسعه و سفارش:' : 'Direct Contact for Projects:'}
            </span>
            <span className="text-[10px] text-[#3525cd] font-bold bg-white px-2 py-0.5 rounded-full shadow-xs">
              {isFa ? 'پاسخگویی سریع' : 'Fast Response'}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#dae2fd]/60">
            <span className="text-base font-extrabold text-[#3525cd] tracking-wider dir-ltr font-mono">
              {HIMORA_INFO.phone}
            </span>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="flex items-center gap-1 text-xs text-[#464555] hover:text-[#3525cd] font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{isFa ? 'کپی شد' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isFa ? 'کپی' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <a
              href={`tel:${HIMORA_INFO.phone}`}
              className="h-10 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isFa ? 'برقراری تماس' : 'Call Now'}</span>
            </a>

            <a
              href={`https://wa.me/98${HIMORA_INFO.phone.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 rounded-full bg-[#006a7c] hover:bg-[#00505f] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isFa ? 'پیام در واتس‌اپ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-2 relative z-10 pt-1">
          <span className="text-xs font-bold text-[#131b2e]">
            {isFa ? 'خدمات تخصصی گروه هیمورا:' : 'Specialized Services:'}
          </span>
          <div className="flex flex-col gap-1.5">
            {HIMORA_INFO.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#464555]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3525cd] shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[10px] text-[#777587] border-t border-[#f2f3ff]">
          {isFa ? 'طراحی و پیاده‌سازی شده با استانداردهای مدرن PWA و واکنش‌گرا' : 'Crafted with modern PWA and responsive standards'}
        </div>
      </div>
    </div>
  );
};
