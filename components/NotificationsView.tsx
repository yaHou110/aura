'use client';

import React, { useState } from 'react';
import { Language, NotificationItem } from '@/lib/types';
import { 
  Heart, 
  MessageSquare, 
  UserPlus, 
  AtSign, 
  PartyPopper, 
  Sparkles, 
  Clock, 
  Reply, 
  Send, 
  Check, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface NotificationsViewProps {
  language: Language;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  language,
  notifications: initialNotifs,
  onMarkAllRead,
}) => {
  const isFa = language === 'fa';
  const [activeFilter, setActiveFilter] = useState<'all' | 'interactions' | 'followers'>('all');
  const [notifs, setNotifs] = useState(initialNotifs);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [repliedComments, setRepliedComments] = useState<Record<string, string>>({});

  const handleMarkAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, isUnread: false })));
    onMarkAllRead();
  };

  const toggleFollowBack = (id: string) => {
    setNotifs(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, isFollowedBack: !n.isFollowedBack };
      }
      return n;
    }));
  };

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    setRepliedComments(prev => ({ ...prev, [id]: replyText }));
    setActiveReplyId(null);
    setReplyText('');
  };

  const filteredNotifs = notifs.filter(n => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const todayNotifs = filteredNotifs.filter(n => 
    n.id === 'notif-1' || n.id === 'notif-2' || n.id === 'notif-3'
  );

  const thisWeekNotifs = filteredNotifs.filter(n => 
    n.id === 'notif-4' || n.id === 'notif-5' || n.id === 'notif-6'
  );

  const unreadCount = notifs.filter(n => n.isUnread).length;

  return (
    <div className="flex flex-col w-full px-4 pb-20">
      {/* 1. Segmented Control Filters */}
      <div className="sticky top-16 z-30 -mx-4 px-4 py-2.5 bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="flex items-center p-1 bg-[#eaedff] rounded-full w-full gap-1 shadow-xs border border-[#dae2fd]/40">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span>{isFa ? 'همه اعلان‌ها' : 'All'}</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#fd56a7]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('interactions')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1 ${
              activeFilter === 'interactions'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span>{isFa ? 'تعاملات' : 'Interactions'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('followers')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1 ${
              activeFilter === 'followers'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span>{isFa ? 'دنبال‌کننده‌ها' : 'Followers'}</span>
          </button>
        </div>
      </div>

      {/* 2. Activity Overview Summary Pill */}
      <div className="mt-3 mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#e2e7ff] via-[#eaedff] to-[#f2f3ff] border border-[#dae2fd] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] shadow-xs shrink-0">
            <TrendingUp className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <p className="font-bold text-xs text-[#131b2e] leading-snug">
              {isFa ? 'تعاملات امروز شما عالی بود!' : 'Your engagement was outstanding today!'}
            </p>
            <p className="text-[11px] text-[#464555] mt-0.5">
              {isFa ? '۳۸٪ افزایش واکنش نسبت به روز گذشته' : '38% increase in reactions vs yesterday'}
            </p>
          </div>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#3525cd] animate-pulse shrink-0" />
      </div>

      {/* 3. Section: Today */}
      {todayNotifs.length > 0 && (
        <section className="flex flex-col gap-2.5 mb-5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm text-[#131b2e]">
                {isFa ? 'امروز' : 'Today'}
              </h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#0f0069] text-[10px] font-bold">
                  {isFa ? `${unreadCount} جدید` : `${unreadCount} new`}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs text-[#3525cd] font-semibold hover:underline"
              >
                {isFa ? 'علامت‌گذاری همه به عنوان خوانده‌شده' : 'Mark all read'}
              </button>
            )}
          </div>

          {/* Render Today Notifications */}
          {todayNotifs.map((item) => {
            if (item.type === 'like') {
              return (
                <article
                  key={item.id}
                  className="group relative p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:shadow-md transition-all flex items-start gap-3"
                >
                  {item.isUnread && (
                    <div className="absolute top-4 start-2 w-2 h-2 rounded-full bg-[#3525cd]" />
                  )}
                  {/* Multi-Avatar Stacking */}
                  <div className="relative shrink-0 w-11 h-11">
                    <img
                      src={item.user?.avatar}
                      alt={item.user?.name}
                      className="w-8 h-8 rounded-full object-cover absolute top-0 start-0 shadow-xs"
                    />
                    <div className="w-7 h-7 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold flex items-center justify-center absolute bottom-0 end-0 shadow-xs ring-1 ring-white">
                      ۱۲+
                    </div>
                    <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#b4136d] text-white flex items-center justify-center shadow-xs">
                      <Heart className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>

                  {/* Content & Meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#131b2e] leading-snug">
                      <span className="font-bold text-[#131b2e]">{item.user?.name}</span>
                      {isFa ? ' و ۱۲ نفر دیگر پست شما را پسندیدند.' : ' and 12 others liked your post.'}
                    </p>
                    <span className="text-[10px] text-[#464555] mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.timeAgo}</span>
                    </span>
                  </div>

                  {/* Post Thumbnail */}
                  {item.postThumbnail && (
                    <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-[#eaedff] border border-[#dae2fd]">
                      <img
                        src={item.postThumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                </article>
              );
            }

            if (item.type === 'comment') {
              const isReplying = activeReplyId === item.id;
              const hasReplied = repliedComments[item.id];

              return (
                <article
                  key={item.id}
                  className="group relative p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:shadow-md transition-all flex flex-col gap-2"
                >
                  {item.isUnread && (
                    <div className="absolute top-4 start-2 w-2 h-2 rounded-full bg-[#3525cd]" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.user?.avatar}
                        alt={item.user?.name}
                        className="w-11 h-11 rounded-full object-cover shadow-xs"
                      />
                      <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
                        <MessageSquare className="w-2.5 h-2.5 fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#131b2e] leading-snug">
                        <span className="font-bold text-[#131b2e]">{item.user?.name}</span>
                        {isFa ? ' برای پست شما دیدگاهی نوشت:' : ' commented on your post:'}
                      </p>

                      <div className="mt-1 p-2 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs">
                        {item.commentText}
                      </div>

                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-[#464555] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.timeAgo}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveReplyId(isReplying ? null : item.id)}
                          className="text-xs text-[#3525cd] font-bold hover:underline flex items-center gap-1"
                        >
                          <Reply className="w-3 h-3" />
                          <span>{isFa ? 'پاسخ دادن' : 'Reply'}</span>
                        </button>
                      </div>
                    </div>

                    {item.postThumbnail && (
                      <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-[#eaedff] border border-[#dae2fd]">
                        <img
                          src={item.postThumbnail}
                          alt="Thumbnail"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                  </div>

                  {/* Inline Reply Input Box */}
                  {isReplying && (
                    <div className="mt-1 pt-2 border-t border-[#f2f3ff] flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendReply(item.id);
                        }}
                        placeholder={isFa ? `پاسخ به ${item.user?.name}...` : `Reply to ${item.user?.name}...`}
                        className="flex-1 h-9 px-3 rounded-full bg-[#f2f3ff] text-xs text-[#131b2e] border border-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#3525cd]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendReply(item.id)}
                        className="h-9 px-3 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] transition-all flex items-center gap-1"
                      >
                        <Send className="w-3 h-3 rtl:rotate-180" />
                        <span>{isFa ? 'ارسال' : 'Send'}</span>
                      </button>
                    </div>
                  )}

                  {/* If already replied, show feedback */}
                  {hasReplied && (
                    <div className="bg-emerald-50 text-emerald-800 text-[11px] p-2 rounded-xl flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>{isFa ? `پاسخ شما ارسال شد: «${hasReplied}»` : `Reply sent: "${hasReplied}"`}</span>
                    </div>
                  )}
                </article>
              );
            }

            if (item.type === 'follow') {
              return (
                <article
                  key={item.id}
                  className="group relative p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  {item.isUnread && (
                    <div className="absolute top-4 start-2 w-2 h-2 rounded-full bg-[#3525cd]" />
                  )}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={item.user?.avatar}
                        alt={item.user?.name}
                        className="w-11 h-11 rounded-full object-cover shadow-xs"
                      />
                      <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#006a7c] text-white flex items-center justify-center shadow-xs">
                        <UserPlus className="w-2.5 h-2.5 fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#131b2e] leading-snug">
                        <span className="font-bold text-[#131b2e]">{item.user?.name}</span>
                        {isFa ? ' شما را دنبال کرد.' : ' started following you.'}
                      </p>
                      <span className="text-[10px] text-[#464555] mt-0.5 block truncate">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollowBack(item.id)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs active:scale-95 ${
                      item.isFollowedBack
                        ? 'bg-[#eaedff] text-[#131b2e]'
                        : 'bg-[#3525cd] hover:bg-[#4f46e5] text-white'
                    }`}
                  >
                    {item.isFollowedBack
                      ? (isFa ? 'دنبال شد ✓' : 'Following ✓')
                      : (isFa ? 'دنبال کردن متقابل' : 'Follow back')}
                  </button>
                </article>
              );
            }

            return null;
          })}
        </section>
      )}

      {/* 4. Section: This Week */}
      {thisWeekNotifs.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-extrabold text-sm text-[#131b2e]">
              {isFa ? 'این هفته' : 'This Week'}
            </h2>
            <span className="text-[11px] text-[#464555]">
              {isFa ? 'فعالیت‌های پیشین' : 'Previous activities'}
            </span>
          </div>

          {/* Mention notification */}
          <article className="group p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:shadow-md transition-all flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB_6rjMQLzYNqRKrBgu4zeD_FaCsURfHcm1sMKL7yqQTRi29ebSnEH6ylEzVp-fc07A0ysETbitgOUUMa1Cu0uq7cM1BcYgdsZGY6bzCTYGneL6Xie37UZTFRnUj284BFC5x2bZhzSorYnAra1Cc0mi1MO1IphMu6upyuFtbsdPDBwqNgU0yPSQug1S3cJbrkSSElHmzGd0gERvnGOc9Yy-sNi5XD6OO5dkGvNRupzuf5iJ35m6DvX"
                alt="Niloofar Abbasi"
                className="w-11 h-11 rounded-full object-cover shadow-xs"
              />
              <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#fd56a7] text-white flex items-center justify-center shadow-xs">
                <AtSign className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#131b2e] leading-snug">
                <span className="font-bold text-[#131b2e]">نیلوفر عباسی</span>
                {isFa ? ' شما را در یک گفتگو تگ کرد:' : ' tagged you in a discussion:'}
              </p>
              <p className="text-xs text-[#464555] mt-1 line-clamp-2">
                «نمونه کارهای @dorsa_design دقیقا همون حسی رو داره که تیم ما براش دنبال ایده بود.»
              </p>
              <span className="text-[10px] text-[#464555] mt-1 block">
                {isFa ? '۲ روز پیش' : '2 days ago'}
              </span>
            </div>

            <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-[#eaedff] border border-[#dae2fd]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN7g61AVi2GoKWCKCvZ52-fwQzixxMiCJbBgapT0IFYYaWNJL-0hAYgJaUjE3UDsx7YVdtrlGpaoV_wzMLgA49AHZ-ra6DLb2iaVMrH5gOu0qiuf0FC7WT5NOf-u8qGEuZSImB-MJt9FHAqFVG4u0i971r_vfw-FzPGYHZF82Q0xyU6UmLw5E-q1pXLqKIWtCZXfvoNLigFDsLSyxMt1tqwOZB9ezf_xRr1XG05gWvsBTaFkMCN3DU"
                alt="Brand project"
                className="w-full h-full object-cover"
              />
            </div>
          </article>

          {/* Milestone Notification */}
          <article className="p-3.5 rounded-2xl bg-gradient-to-br from-white to-[#f2f3ff] border border-[#dae2fd] shadow-xs hover:shadow-md transition-all flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ffd9e4] text-[#8c0053] flex items-center justify-center shadow-xs shrink-0">
              <PartyPopper className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#b4136d]">
                  {isFa ? 'دستاورد جدید' : 'New Milestone'}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#777587]" />
                <span className="text-[10px] text-[#464555]">
                  {isFa ? '۴ روز پیش' : '4 days ago'}
                </span>
              </div>
              <p className="font-bold text-xs text-[#131b2e] leading-tight mt-0.5">
                {isFa ? 'پست شما به بیش از ۱,۰۰۰ بازدید رسید 🎉' : 'Your post reached 1,000+ views 🎉'}
              </p>
              <p className="text-[11px] text-[#464555] mt-0.5">
                {isFa ? 'این پست در صدر بازخوردهای این هفته شما قرار دارد.' : 'Top performing post of the week.'}
              </p>
            </div>
          </article>

          {/* System Update Notification */}
          <article className="p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:shadow-md transition-all flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#3525cd]">
                  {isFa ? 'به‌روزرسانی آئورا' : 'Aura Update'}
                </span>
                <span className="text-[10px] text-[#464555]">• {isFa ? '۵ روز پیش' : '5 days ago'}</span>
              </div>
              <p className="text-xs text-[#131b2e] leading-snug mt-1">
                {isFa 
                  ? 'نسخه جدید قابلیت پخش زنده و ارسال تصاویر با کیفیت بالا اکنون برای حساب شما فعال شد.'
                  : 'New live streaming and high-fidelity photo upload features are now active.'}
              </p>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
