'use client';

import React from 'react';
import { Language, TabType, User } from '@/lib/types';
import { MessageSquare, Globe } from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  language: Language;
  onToggleLanguage: () => void;
  currentUser: User;
  onOpenDirect: () => void;
  onGoToProfile: () => void;
  unreadMessagesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  language,
  onToggleLanguage,
  currentUser,
  onOpenDirect,
  onGoToProfile,
  unreadMessagesCount = 2,
}) => {
  const isFa = language === 'fa';

  const getTabTitle = () => {
    switch (currentTab) {
      case 'home':
        return isFa ? 'Home' : 'خانه';
      case 'explore':
        return isFa ? 'Explore' : 'کاوش';
      case 'notifications':
        return isFa ? 'Notifications' : 'اعلان‌ها';
      case 'profile':
        return isFa ? 'Profile' : 'پروفایل';
      case 'create':
        return isFa ? 'New Post' : 'پست جدید';
      default:
        return 'Home';
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 transition-colors">
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3525cd] via-[#4f46e5] to-[#fd56a7] p-[1.5px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-[#3525cd] rounded-[10px] flex items-center justify-center text-white">
              {/* Stylized Aura Logo Icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" strokeOpacity="0.35" />
                <path d="M12 4a8 8 0 1 1-8 8" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[17px] tracking-tight text-[#131b2e]">
                {isFa ? 'آئورا' : 'Aura'}
              </span>
              <span className="text-[11px] text-[#464555] font-normal tracking-wide">
                {isFa ? 'Aura' : 'آئورا'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#3525cd] mt-0.5">
              {getTabTitle()}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            title={isFa ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
            className="min-h-[40px] px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 shadow-xs"
            aria-label="تغییر زبان"
          >
            <Globe className="w-3.5 h-3.5 text-[#3525cd]" />
            <span className={isFa ? 'text-[#3525cd] font-bold' : 'text-[#464555]'}>فا</span>
            <span className="opacity-30">/</span>
            <span className={!isFa ? 'text-[#3525cd] font-bold' : 'text-[#464555]'}>EN</span>
          </button>

          {/* Direct Messages */}
          <button
            type="button"
            onClick={onOpenDirect}
            aria-label="پیام‌ها"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#464555] hover:text-[#3525cd] hover:bg-[#e2e7ff] transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#fd56a7] ring-2 ring-[#faf8ff] animate-pulse" />
            )}
          </button>

          {/* User Mini Profile Avatar */}
          <button
            type="button"
            onClick={onGoToProfile}
            aria-label="پروفایل کاربری"
            className="w-10 h-10 rounded-full p-0.5 hover:ring-2 hover:ring-[#3525cd] transition-all flex items-center justify-center"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover shadow-xs"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
