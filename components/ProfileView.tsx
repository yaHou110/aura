'use client';

import React, { useState } from 'react';
import { Language, User } from '@/lib/types';
import { PROFILE_POSTS, PROFILE_REELS, PROFILE_HIGHLIGHTS, HIMORA_INFO } from '@/lib/data';
import { 
  CheckCircle2, 
  Link as LinkIcon, 
  Edit3, 
  Share2, 
  Settings, 
  Plus, 
  Grid3X3, 
  Play, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  Lock, 
  PhoneCall, 
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ProfileViewProps {
  language: Language;
  currentUser: User;
  onUpdateBio?: (newBio: string) => void;
  onOpenHimoraModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  language,
  currentUser,
  onOpenHimoraModal,
}) => {
  const isFa = language === 'fa';
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved'>('posts');
  const [isCopied, setIsCopied] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(currentUser.bio || '');
  const [currentBio, setCurrentBio] = useState(currentUser.bio || '');

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://${currentUser.link}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveBio = () => {
    setCurrentBio(bioInput);
    setIsEditingBio(false);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Header Profile Info */}
      <div className="px-4 pt-3">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar with Ring */}
          <div className="relative shrink-0">
            <div className="w-22 h-22 rounded-full p-[3px] bg-gradient-to-tr from-[#3525cd] via-[#4f46e5] to-[#fd56a7] shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#faf8ff] p-[2px]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>
            </div>
            <button
              type="button"
              title={isFa ? 'افزودن استوری' : 'Add story'}
              className="absolute bottom-0 start-0 w-7 h-7 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all ring-2 ring-[#faf8ff]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Stats Triad */}
          <div className="flex-1 grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="font-extrabold text-[15px] text-[#131b2e] leading-tight">
                {currentUser.stats?.posts}
              </span>
              <span className="text-[11px] text-[#464555] mt-0.5">
                {isFa ? 'پست‌ها' : 'Posts'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="font-extrabold text-[15px] text-[#131b2e] leading-tight">
                {currentUser.stats?.followers}
              </span>
              <span className="text-[11px] text-[#464555] mt-0.5">
                {isFa ? 'دنبال‌کننده' : 'Followers'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="font-extrabold text-[15px] text-[#131b2e] leading-tight">
                {currentUser.stats?.following}
              </span>
              <span className="text-[11px] text-[#464555] mt-0.5">
                {isFa ? 'دنبال‌شده' : 'Following'}
              </span>
            </div>
          </div>
        </div>

        {/* Bio Information */}
        <div className="mt-3 flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-base text-[#131b2e]">
              {currentUser.name}
            </h1>
            <CheckCircle2 className="w-4 h-4 text-[#3525cd] fill-[#3525cd]" />
          </div>

          <span className="text-xs text-[#464555] self-start dir-ltr font-mono mt-0.5">
            @{currentUser.username}
          </span>

          {isEditingBio ? (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-xl border border-[#3525cd] bg-white text-[#131b2e] focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveBio}
                  className="px-3 py-1 bg-[#3525cd] text-white text-xs font-bold rounded-full"
                >
                  {isFa ? 'ذخیره' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingBio(false)}
                  className="px-3 py-1 bg-[#eaedff] text-[#131b2e] text-xs font-semibold rounded-full"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-[#131b2e] mt-2">
              {currentBio}
            </p>
          )}

          <a
            href={`https://${currentUser.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-[#3525cd] text-xs font-semibold self-start hover:underline"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="dir-ltr font-mono">{currentUser.link}</span>
          </a>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setIsEditingBio(true)}
            className="flex-1 h-10 px-3 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isFa ? 'ویرایش پروفایل' : 'Edit Profile'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 h-10 px-3 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">{isFa ? 'کپی شد!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{isFa ? 'اشتراک‌گذاری' : 'Share'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenHimoraModal}
            title={isFa ? 'درباره هیمورا و تنظیمات' : 'About & Settings'}
            className="w-10 h-10 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] text-[#464555] hover:text-[#3525cd] flex items-center justify-center active:scale-95 transition-all shrink-0"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Story Highlights (برگزیده‌ها) */}
      <div className="w-full mt-5">
        <div className="px-4 flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold text-[#131b2e]">
            {isFa ? 'برگزیده‌ها' : 'Highlights'}
          </span>
          <button
            type="button"
            className="text-xs text-[#3525cd] font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span>{isFa ? 'افزودن جدید' : 'New'}</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 py-1 no-scrollbar">
          {PROFILE_HIGHLIGHTS.map((hl) => (
            <div
              key={hl.id}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full p-[2px] bg-[#dae2fd] group-hover:bg-[#3525cd] transition-colors flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#faf8ff] p-[2px]">
                  <img
                    src={hl.image}
                    alt={hl.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] text-[#131b2e] group-hover:text-[#3525cd] transition-colors font-medium">
                {hl.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Developer / Himora Agency Showcase Banner */}
      <div className="px-4 mt-5">
        <div 
          onClick={onOpenHimoraModal}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#3525cd]/10 via-[#eaedff] to-[#fd56a7]/10 border border-[#3525cd]/20 flex items-center justify-between cursor-pointer hover:border-[#3525cd]/40 transition-all shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#fd56a7] text-white flex items-center justify-center shadow-xs shrink-0 font-extrabold text-sm">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs text-[#131b2e]">
                {HIMORA_INFO.name}
              </span>
              <span className="text-[11px] text-[#464555] mt-0.5">
                {isFa ? 'توسعه‌دهنده اختصاصی سامانه • تماس: ' : 'Official Developer • Call: '}
                <span className="font-bold text-[#3525cd] dir-ltr font-mono">{HIMORA_INFO.phone}</span>
              </span>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-[#4f46e5]"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Profile Tab Switcher */}
      <div className="w-full mt-5">
        <div className="flex items-center justify-around bg-[#eaedff] px-4 py-1 rounded-2xl mx-4 shadow-xs border border-[#dae2fd]/40">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-2 flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'posts'
                ? 'bg-white text-[#3525cd] shadow-xs'
                : 'text-[#464555]'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>{isFa ? 'پست‌ها' : 'Posts'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            className={`flex-1 py-2 flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reels'
                ? 'bg-white text-[#3525cd] shadow-xs'
                : 'text-[#464555]'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>{isFa ? 'ویدیوها' : 'Reels'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-white text-[#3525cd] shadow-xs'
                : 'text-[#464555]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isFa ? 'ذخیره‌ها' : 'Saved'}</span>
          </button>
        </div>

        {/* Tab 1: Posts Grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 px-1 mt-3">
            {PROFILE_POSTS.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-[#eaedff]"
              >
                <img
                  src={item.image}
                  alt="Profile post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <MessageSquare className="w-3.5 h-3.5 fill-white" />
                    <span>{item.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Reels Video Grid */}
        {activeTab === 'reels' && (
          <div className="grid grid-cols-3 gap-1 px-1 mt-3">
            {PROFILE_REELS.map((reel) => (
              <div
                key={reel.id}
                className="relative aspect-[9/16] overflow-hidden rounded-lg group cursor-pointer bg-[#eaedff]"
              >
                <img
                  src={reel.image}
                  alt="Reel preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white drop-shadow-md text-[11px] font-bold">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{reel.views}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Saved Collections */}
        {activeTab === 'saved' && (
          <div className="px-4 mt-4">
            <div className="flex flex-col items-center justify-center py-10 text-center bg-[#f2f3ff] rounded-3xl p-6 border border-[#dae2fd]/60">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#3525cd] mb-3 shadow-xs">
                <Lock className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-extrabold text-sm text-[#131b2e]">
                {isFa ? 'مجموعه‌های ذخیره‌شده خصوصی هستند' : 'Saved collections are private'}
              </h3>
              <p className="text-xs text-[#464555] mt-1.5 max-w-xs leading-relaxed">
                {isFa 
                  ? 'فقط شما می‌توانید پست‌ها و ایده‌هایی را که در این بخش ذخیره کرده‌اید مشاهده کنید.'
                  : 'Only you can view your saved bookmarks and inspirations.'}
              </p>
              <button
                type="button"
                className="mt-4 px-5 py-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                {isFa ? 'مشاهده همه مجموعه‌ها' : 'Explore Collections'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
