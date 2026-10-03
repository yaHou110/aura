'use client';

import React from 'react';
import { TabType, Language } from '@/lib/types';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onOpenCreate: () => void;
  language: Language;
  unreadNotifsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  onOpenCreate,
  language,
  unreadNotifsCount = 3,
}) => {
  const isFa = language === 'fa';

  return (
    <nav className="sticky bottom-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#dae2fd]/60 transition-all pb-safe">
      <div className="flex justify-around items-center h-16 px-2 max-w-[580px] mx-auto">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          aria-label={isFa ? 'خانه' : 'Home'}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all min-h-[48px] ${
            currentTab === 'home'
              ? 'text-[#3525cd] font-bold scale-105'
              : 'text-[#464555] hover:text-[#3525cd]'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] font-medium mt-1">
            {isFa ? 'خانه' : 'Home'}
          </span>
        </button>

        {/* Tab 2: Explore */}
        <button
          type="button"
          onClick={() => onChangeTab('explore')}
          aria-label={isFa ? 'کاوش' : 'Explore'}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all min-h-[48px] ${
            currentTab === 'explore'
              ? 'text-[#3525cd] font-bold scale-105'
              : 'text-[#464555] hover:text-[#3525cd]'
          }`}
        >
          <Compass className={`w-5 h-5 ${currentTab === 'explore' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] font-medium mt-1">
            {isFa ? 'کاوش' : 'Explore'}
          </span>
        </button>

        {/* Center Tab: Create Post */}
        <div className="flex items-center justify-center px-1">
          <button
            type="button"
            onClick={onOpenCreate}
            aria-label={isFa ? 'ایجاد پست جدید' : 'Create New Post'}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(79,70,229,0.38)] hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 4: Notifications */}
        <button
          type="button"
          onClick={() => onChangeTab('notifications')}
          aria-label={isFa ? 'اعلان‌ها' : 'Notifications'}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all min-h-[48px] ${
            currentTab === 'notifications'
              ? 'text-[#3525cd] font-bold scale-105'
              : 'text-[#464555] hover:text-[#3525cd]'
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${currentTab === 'notifications' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#fd56a7] ring-2 ring-[#faf8ff]" />
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">
            {isFa ? 'اعلان‌ها' : 'Alerts'}
          </span>
        </button>

        {/* Tab 5: Profile */}
        <button
          type="button"
          onClick={() => onChangeTab('profile')}
          aria-label={isFa ? 'پروفایل' : 'Profile'}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all min-h-[48px] ${
            currentTab === 'profile'
              ? 'text-[#3525cd] font-bold scale-105'
              : 'text-[#464555] hover:text-[#3525cd]'
          }`}
        >
          <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] font-medium mt-1">
            {isFa ? 'پروفایل' : 'Profile'}
          </span>
        </button>
      </div>
    </nav>
  );
};
