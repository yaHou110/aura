'use client';

import React, { useState, useEffect } from 'react';
import { Language, TabType } from '@/lib/types';
import { HIMORA_INFO } from '@/lib/data';
import { 
  Smartphone, 
  Monitor, 
  PhoneCall, 
  Copy, 
  Check, 
  Sparkles, 
  Wifi, 
  Battery, 
  Maximize2, 
  RotateCw,
  Sliders,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  language: Language;
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onOpenCreate: () => void;
  onOpenHimoraModal: () => void;
  onToggleLanguage: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  language,
  currentTab,
  onChangeTab,
  onOpenCreate,
  onOpenHimoraModal,
  onToggleLanguage,
}) => {
  const isFa = language === 'fa';
  const [isPhoneMode, setIsPhoneMode] = useState(true);
  const [phoneScale, setPhoneScale] = useState<number>(0.92);
  const [currentTime, setCurrentTime] = useState('09:41');
  const [copied, setCopied] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Clock in status bar
  useEffect(() => {
    const toFaDigits = (s: string) => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(isFa 
        ? `${toFaDigits(hours)}:${toFaDigits(minutes)}` 
        : `${hours}:${minutes}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [isFa]);

  // Check physical viewport width
  useEffect(() => {
    const checkWidth = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(HIMORA_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If user opens directly on a mobile phone, render native full-screen app
  if (isMobileScreen) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0f19] text-[#131b2e] flex flex-col items-center justify-start py-4 px-4 relative overflow-x-hidden selection:bg-[#e2dfff] selection:text-[#0f0069]">
      {/* Background ambient light effects */}
      <div className="fixed top-[-15%] start-[20%] w-[500px] h-[500px] rounded-full bg-[#3525cd]/20 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] end-[15%] w-[450px] h-[450px] rounded-full bg-[#fd56a7]/15 blur-[120px] pointer-events-none" />

      {/* Top Floating Control Bar */}
      <header className="w-full max-w-5xl z-30 mb-4 flex flex-wrap items-center justify-between gap-3 bg-[#131b2e]/85 backdrop-blur-xl border border-[#dae2fd]/15 p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#fd56a7] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            A
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-xs">
                {isFa ? 'پیش‌نمایش اپلیکیشن آئورا' : 'Aura Social App Preview'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3525cd]/40 text-[#c3c0ff] border border-[#3525cd]/40">
                PWA / Native Feel
              </span>
            </div>
            <span className="text-[10px] text-[#c7c4d8]/80">
              {isFa ? 'توسعه توسط گروه نرم‌افزاری هیمورا' : 'Developed by Himora Software Group'}
            </span>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center gap-2">
          {/* Main "حالت گوشی" Button requested by user */}
          <div className="flex items-center bg-[#0b0f19] p-1 rounded-xl border border-[#dae2fd]/15">
            <button
              type="button"
              onClick={() => setIsPhoneMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isPhoneMode
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#c7c4d8] hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isFa ? 'حالت گوشی' : 'Phone View'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPhoneMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isPhoneMode
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#c7c4d8] hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isFa ? 'تمام صفحه وب' : 'Full Web'}</span>
            </button>
          </div>

          {/* Scale selector for Phone mode */}
          {isPhoneMode && (
            <div className="hidden lg:flex items-center gap-1 bg-[#0b0f19] p-1 rounded-xl border border-[#dae2fd]/15 text-xs text-[#c7c4d8]">
              {[0.85, 0.92, 1.0].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPhoneScale(s)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    phoneScale === s ? 'bg-white/20 text-white' : 'hover:text-white'
                  }`}
                >
                  {Math.round(s * 100)}%
                </button>
              ))}
            </div>
          )}

          {/* Quick Himora Contact Button in Topbar */}
          <button
            type="button"
            onClick={onOpenHimoraModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#b4136d] to-[#fd56a7] text-white text-xs font-bold shadow-md hover:opacity-95 active:scale-95 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{HIMORA_INFO.name}</span>
            <span className="dir-ltr font-mono">{HIMORA_INFO.phone}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex items-start justify-center pb-8">
        {isPhoneMode ? (
          /* Phone Simulator View with Side Companion Panel */
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full max-w-6xl">
            {/* 1. Realistic Smartphone Chassis Container */}
            <div 
              className="relative transition-all duration-300 origin-top shrink-0"
              style={{
                transform: `scale(${phoneScale})`,
                marginBottom: phoneScale < 1 ? `-${(1 - phoneScale) * 880}px` : '0px'
              }}
            >
              {/* Outer Phone Frame (Titanium look) */}
              <div className="w-[395px] h-[852px] bg-[#1a1e29] rounded-[52px] p-[10px] relative shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
                {/* Physical Side Buttons */}
                <div className="absolute -start-[12px] top-[115px] w-[3px] h-[28px] bg-[#2d3345] rounded-s-md" /> {/* Action button */}
                <div className="absolute -start-[12px] top-[160px] w-[3px] h-[50px] bg-[#2d3345] rounded-s-md" /> {/* Vol up */}
                <div className="absolute -start-[12px] top-[225px] w-[3px] h-[50px] bg-[#2d3345] rounded-s-md" /> {/* Vol down */}
                <div className="absolute -end-[12px] top-[180px] w-[3px] h-[75px] bg-[#2d3345] rounded-e-md" />   {/* Power */}

                {/* Inner Screen Bezel */}
                <div className="w-full h-full bg-[#faf8ff] rounded-[42px] overflow-hidden flex flex-col relative border border-black/40">
                  {/* Status Bar */}
                  <div className="h-11 px-7 flex items-center justify-between z-50 bg-[#faf8ff]/95 backdrop-blur-md select-none text-[13px] font-semibold text-[#131b2e]">
                    <span className="font-mono tracking-tight">{currentTime}</span>

                    {/* Dynamic Island */}
                    <div className="absolute start-1/2 -translate-x-1/2 top-2 w-[110px] h-[28px] bg-black rounded-full flex items-center justify-between px-2.5 z-50 shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-[#0b0f19] ring-1 ring-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1e2330] ring-1 ring-emerald-500/40" />
                    </div>

                    <div className="flex items-center gap-1.5 text-[#131b2e]">
                      <span className="text-[10px] font-extrabold tracking-tight">5G</span>
                      <Wifi className="w-3.5 h-3.5" />
                      <Battery className="w-4 h-4 fill-[#131b2e]" />
                    </div>
                  </div>

                  {/* App Screen Body with Smooth Scroll */}
                  <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col bg-[#faf8ff]">
                    {children}
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-50">
                    <div className="w-32 h-1 bg-black/30 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Desktop Companion Control & Himora Software Showcase Panel */}
            <aside className="w-full max-w-sm flex flex-col gap-4 self-center lg:self-start lg:mt-6">
              {/* Himora Software Group Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#131b2e] to-[#1c2438] border border-[#dae2fd]/15 text-white shadow-xl flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3525cd]/25 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3525cd] to-[#fd56a7] text-white flex items-center justify-center font-extrabold text-base shadow-md">
                      H
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-sm text-white">
                        {HIMORA_INFO.name}
                      </h3>
                      <span className="text-[10px] text-[#c7c4d8]">
                        مجری و طراح سیستم‌های هوشمند
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    آماده همکاری
                  </span>
                </div>

                <p className="text-xs text-[#c7c4d8] leading-relaxed relative z-10 text-justify">
                  این اپلیکیشن نمونه کار اختصاصی گروه نرم‌افزاری هیمورا است. جهت سفارش، سفارشی‌سازی یا توسعه پروژه‌های مشابه وب و اپلیکیشن تماس بگیرید:
                </p>

                {/* Direct Phone Number Banner */}
                <div className="p-3 bg-[#0b0f19]/80 rounded-2xl border border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#777587]">شماره تماس مستقیم:</span>
                    <a 
                      href={`tel:${HIMORA_INFO.phone}`} 
                      className="text-base font-extrabold text-[#fd56a7] font-mono tracking-wider hover:underline dir-ltr text-start"
                    >
                      {HIMORA_INFO.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      title="کپی شماره"
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`tel:${HIMORA_INFO.phone}`}
                      title="تماس فوری"
                      className="w-8 h-8 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-sm"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 relative z-10">
                  <button
                    type="button"
                    onClick={onOpenHimoraModal}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-center text-white transition-all"
                  >
                    اطلاعات بیشتر هیمورا
                  </button>
                  <a
                    href={`https://wa.me/98${HIMORA_INFO.phone.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-[#006a7c] hover:bg-[#00505f] text-xs font-bold text-center text-white transition-all flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>ارسال پیام</span>
                  </a>
                </div>
              </div>

              {/* Quick Jump Buttons to Explore the App */}
              <div className="p-4 rounded-3xl bg-[#131b2e]/80 border border-[#dae2fd]/10 text-white flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#c7c4d8]">
                  {isFa ? 'دسترسی سریع به صفحات اپلیکیشن:' : 'Quick Navigation:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeTab('home')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-start transition-all ${
                      currentTab === 'home'
                        ? 'bg-[#3525cd] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-[#c7c4d8]'
                    }`}
                  >
                    🏠 {isFa ? 'صفحه اصلی (فید)' : 'Home Feed'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTab('explore')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-start transition-all ${
                      currentTab === 'explore'
                        ? 'bg-[#3525cd] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-[#c7c4d8]'
                    }`}
                  >
                    🧭 {isFa ? 'کاوش و ترندها' : 'Explore'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTab('notifications')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-start transition-all ${
                      currentTab === 'notifications'
                        ? 'bg-[#3525cd] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-[#c7c4d8]'
                    }`}
                  >
                    🔔 {isFa ? 'مرکز اعلان‌ها' : 'Notifications'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTab('profile')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-start transition-all ${
                      currentTab === 'profile'
                        ? 'bg-[#3525cd] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-[#c7c4d8]'
                    }`}
                  >
                    👤 {isFa ? 'پروفایل کاربری' : 'Profile'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onOpenCreate}
                  className="w-full mt-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-xs font-bold text-center hover:opacity-95 shadow-xs"
                >
                  ➕ {isFa ? 'ایجاد پست جدید (تست انتشار)' : 'Create New Post'}
                </button>
              </div>
            </aside>
          </div>
        ) : (
          /* Full Responsive Web Mode */
          <div className="w-full max-w-xl mx-auto bg-[#faf8ff] rounded-3xl shadow-2xl border border-[#dae2fd]/40 overflow-hidden flex flex-col">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
