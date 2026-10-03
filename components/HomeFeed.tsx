'use client';

import React, { useState } from 'react';
import { Post, Story, Language, User } from '@/lib/types';
import { 
  Heart, 
  MessageCircle, 
  Repeat, 
  Bookmark, 
  SlidersHorizontal, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Calendar, 
  Edit3,
  ChevronLeft,
  ChevronRight,
  Send,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomeFeedProps {
  stories: Story[];
  posts: Post[];
  language: Language;
  currentUser: User;
  onOpenStory: (story: Story) => void;
  onOpenCreate: () => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  stories,
  posts,
  language,
  currentUser,
  onOpenStory,
  onOpenCreate,
  onToggleLike,
  onToggleSave,
  onAddComment,
}) => {
  const isFa = language === 'fa';
  const [feedTab, setFeedTab] = useState<'for-you' | 'following'>('for-you');
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showHeartBurst, setShowHeartBurst] = useState<string | null>(null);
  const [eventReminderSet, setEventReminderSet] = useState(false);

  const nextSlide = (postId: string, max: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % max
    }));
  };

  const prevSlide = (postId: string, max: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + max) % max
    }));
  };

  const handleDoubleTap = (postId: string) => {
    setShowHeartBurst(postId);
    onToggleLike(postId);
    setTimeout(() => setShowHeartBurst(null), 700);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleReminderClick = () => {
    setEventReminderSet(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // Ignore if unavailable
    }
  };

  const formatNumber = (num: number) => {
    if (!isFa) return num.toLocaleString();
    return num.toLocaleString('fa-IR');
  };

  const filteredPosts = feedTab === 'following' 
    ? posts.filter(p => p.id === 'post-2' || p.author.id === currentUser.id)
    : posts;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Horizontal Stories Tray */}
      <section aria-label="استوری‌ها" className="w-full pt-3 pb-2 overflow-x-auto no-scrollbar border-b border-[#dae2fd]/40">
        <div className="flex items-center gap-3.5 px-4 w-max">
          {/* Your Story */}
          <div 
            onClick={() => onOpenStory(stories[0])}
            className="flex flex-col items-center gap-1.5 cursor-pointer group select-none"
          >
            <div className="relative p-0.5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#e2e7ff] ring-2 ring-transparent group-hover:ring-[#3525cd] transition-all">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover group-active:scale-95 transition-transform"
                />
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCreate();
                }}
                className="absolute bottom-0 start-0 w-5 h-5 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#131b2e] truncate max-w-[70px] text-center">
              {isFa ? 'استوری شما' : 'Your Story'}
            </span>
          </div>

          {/* Peer Stories */}
          {stories.slice(1).map((story) => (
            <div
              key={story.id}
              onClick={() => onOpenStory(story)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group select-none"
            >
              <div className={`p-[2.5px] rounded-full transition-transform duration-200 group-active:scale-95 shadow-xs ${
                story.hasUnread
                  ? 'bg-gradient-to-tr from-[#b4136d] via-[#fd56a7] to-[#4f46e5]'
                  : 'bg-[#dae2fd]'
              }`}>
                <div className="p-0.5 bg-[#faf8ff] rounded-full">
                  <div className="w-[58px] h-[58px] rounded-full overflow-hidden bg-[#eaedff]">
                    <img
                      src={story.user.avatar}
                      alt={story.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <span className={`text-[11px] truncate max-w-[72px] text-center ${
                story.hasUnread ? 'font-bold text-[#131b2e]' : 'font-normal text-[#464555]'
              }`}>
                {story.user.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Feed Category Switcher / Tabs */}
      <section aria-label="دسته‌بندی فید" className="px-4 my-3 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-full shadow-xs border border-[#dae2fd]/40">
          <button
            type="button"
            onClick={() => setFeedTab('for-you')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              feedTab === 'for-you'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span>{isFa ? 'برای شما' : 'For You'}</span>
            {feedTab === 'for-you' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#fd56a7]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setFeedTab('following')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              feedTab === 'following'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span>{isFa ? 'دنبال‌شده‌ها' : 'Following'}</span>
          </button>
        </div>

        <button
          type="button"
          title={isFa ? 'تنظیمات و فیلتر' : 'Filters'}
          className="w-9 h-9 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#464555] hover:text-[#3525cd] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </section>

      {/* 3. Feed Content Stream */}
      <div className="flex flex-col gap-4 px-4 max-w-[580px] mx-auto w-full">
        {filteredPosts.map((post) => {
          const currentSlide = carouselIndices[post.id] || 0;
          const mediaCount = post.media.length;

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full overflow-hidden shadow-xs ring-1 ring-[#dae2fd]">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {post.author.verified && (
                      <div className="absolute -bottom-0.5 -end-0.5 w-4 h-4 rounded-full bg-[#3525cd] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#3525cd] text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[15px] text-[#131b2e] hover:text-[#3525cd] cursor-pointer transition-colors leading-none">
                        {post.author.name}
                      </span>
                      {post.author.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#3525cd] fill-[#3525cd]" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#464555] text-xs mt-1">
                      <span className="dir-ltr text-start font-mono">@{post.author.username}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-[#777587]/40" />
                      <span>{isFa ? post.timeAgo : post.timeAgoEn}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="گزینه‌های بیشتر"
                  className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] text-[#464555] flex items-center justify-center transition-colors"
                >
                  <span className="text-xl font-bold leading-none">···</span>
                </button>
              </div>

              {/* Post Media Container */}
              <div 
                onDoubleClick={() => handleDoubleTap(post.id)}
                className={`relative w-full rounded-2xl overflow-hidden bg-[#eaedff] group cursor-pointer shadow-inner select-none ${
                  post.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={post.media[currentSlide]}
                  alt="Post visual"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Double Tap Heart Burst */}
                {showHeartBurst === post.id && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-heart-burst">
                    <Heart className="w-24 h-24 text-[#fd56a7] fill-[#fd56a7] drop-shadow-xl" />
                  </div>
                )}

                {/* Multi-image Controls */}
                {mediaCount > 1 && (
                  <>
                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isFa ? `${currentSlide + 1}/${mediaCount}` : `${currentSlide + 1}/${mediaCount}`}</span>
                    </div>

                    {/* Left/Right Prev/Next Buttons */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide(post.id, mediaCount);
                      }}
                      className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide(post.id, mediaCount);
                      }}
                      className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
                      {post.media.map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentSlide
                              ? 'w-5 bg-white shadow-xs'
                              : 'w-1.5 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Location Badge */}
                {post.location && (
                  <div className="absolute bottom-3 start-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#4cd7f6]" />
                    <span>{post.location}</span>
                  </div>
                )}
              </div>

              {/* Interaction Bar */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => onToggleLike(post.id)}
                    aria-label="پسندیدن"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-90 ${
                      post.isLiked
                        ? 'bg-[#ffdad6]/60 text-[#ba1a1a] font-bold'
                        : 'text-[#464555] hover:bg-[#f2f3ff]'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform ${
                        post.isLiked ? 'fill-[#ba1a1a] text-[#ba1a1a] scale-110' : ''
                      }`}
                    />
                    <span className="text-xs font-semibold">
                      {formatNumber(post.likesCount)}
                    </span>
                  </button>

                  {/* Comment Button */}
                  <button
                    type="button"
                    aria-label="نظرات"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#f2f3ff] text-[#464555] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs font-semibold">
                      {formatNumber(post.commentsCount)}
                    </span>
                  </button>

                  {/* Repost Button */}
                  <button
                    type="button"
                    aria-label="بازنشر"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#f2f3ff] text-[#464555] transition-colors"
                  >
                    <Repeat className="w-5 h-5" />
                    <span className="text-xs font-semibold">
                      {formatNumber(post.repostsCount)}
                    </span>
                  </button>
                </div>

                {/* Save Bookmark */}
                <button
                  type="button"
                  onClick={() => onToggleSave(post.id)}
                  aria-label="ذخیره پست"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    post.isSaved
                      ? 'bg-[#e2dfff] text-[#3525cd]'
                      : 'text-[#464555] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${post.isSaved ? 'fill-[#3525cd] text-[#3525cd]' : ''}`}
                  />
                </button>
              </div>

              {/* Caption and Tags */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[13.5px] leading-relaxed text-[#131b2e] text-justify">
                  <span className="font-bold text-[14px] me-1.5 text-[#131b2e]">
                    {post.author.name}
                  </span>
                  {isFa ? post.content : post.contentEn || post.content}
                </p>

                <div className="flex items-center gap-2 flex-wrap text-xs text-[#3525cd] font-semibold">
                  {post.hashtags.map((tag, idx) => (
                    <a key={idx} href="#" className="hover:underline">
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="flex flex-col gap-2 pt-1 border-t border-[#f2f3ff]">
                {post.comments.length > 0 && (
                  <div className="bg-[#f2f3ff]/70 p-2.5 rounded-2xl flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5 text-xs">
                        <span className="font-bold text-[#131b2e]">
                          {post.comments[0].user.name}:
                        </span>
                        <span className="text-[#464555]">
                          {post.comments[0].text}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Comment Input */}
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-full border border-[#dae2fd]/40">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommentSubmit(post.id);
                    }}
                    placeholder={isFa ? `افزودن نظر برای ${post.author.name}...` : `Add comment for ${post.author.name}...`}
                    className="bg-transparent flex-1 text-xs text-[#131b2e] placeholder:text-[#777587] focus:outline-none min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => handleCommentSubmit(post.id)}
                    disabled={!commentInputs[post.id]?.trim()}
                    className="text-[#3525cd] disabled:opacity-40 hover:text-[#4f46e5] text-xs font-bold px-2 py-0.5 rounded-full transition-all"
                  >
                    {isFa ? 'ارسال' : 'Send'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* 4. Micro-Event Highlight Card */}
        <article className="bg-gradient-to-r from-[#eaedff] via-[#f2f3ff] to-[#dae2fd] rounded-3xl p-4 shadow-sm border border-[#dae2fd] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3525cd] flex items-center justify-center text-white shadow-md shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] text-[#131b2e]">
                {isFa ? 'رویداد زنده دیزاین هفتگی' : 'Weekly Live Design Event'}
              </span>
              <span className="text-xs text-[#464555] mt-0.5">
                {isFa ? 'امشب ساعت ۲۰:۳۰ • بررسی پورتفولیوهای خلاقانه' : 'Tonight at 20:30 • Creative portfolio reviews'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReminderClick}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-xs shrink-0 ${
              eventReminderSet
                ? 'bg-emerald-600 text-white'
                : 'bg-[#3525cd] hover:bg-[#4f46e5] text-white active:scale-95'
            }`}
          >
            {eventReminderSet 
              ? (isFa ? 'تنظیم شد ✓' : 'Saved ✓') 
              : (isFa ? 'یادآوری' : 'Remind me')}
          </button>
        </article>
      </div>

      {/* 5. Floating Action Button (FAB) */}
      <aside className="fixed bottom-20 end-4 z-30">
        <button
          type="button"
          onClick={onOpenCreate}
          aria-label="ایجاد پست جدید"
          className="flex items-center gap-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white px-4 py-3 rounded-full shadow-[0_12px_28px_rgba(53,37,205,0.35)] hover:shadow-xl hover:scale-105 active:scale-95 transition-all group"
        >
          <Edit3 className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="text-xs font-bold">
            {isFa ? 'پست جدید' : 'New Post'}
          </span>
        </button>
      </aside>
    </div>
  );
};
