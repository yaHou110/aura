'use client';

import React, { useEffect, useState } from 'react';
import { Story, Language } from '@/lib/types';
import { X, Heart, Send, Check } from 'lucide-react';

interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
  language: Language;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  language,
}) => {
  const isFa = language === 'fa';
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [hasSentReply, setHasSentReply] = useState(false);

  useEffect(() => {
    if (!story) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onClose]);

  if (!story) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setHasSentReply(true);
    setReplyText('');
    setTimeout(() => setHasSentReply(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm h-full max-h-[88vh] sm:rounded-3xl overflow-hidden bg-black flex flex-col justify-between p-4 shadow-2xl">
        {/* Story Background Image */}
        <img
          src={story.image}
          alt={story.user.name}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

        {/* Top Header & Progress */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* User info & Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={story.user.avatar}
                alt={story.user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
              />
              <div className="flex flex-col text-white">
                <span className="font-bold text-xs leading-none drop-shadow">
                  {story.user.name}
                </span>
                <span className="text-[10px] text-white/80 mt-0.5">
                  {story.timestamp}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Caption & Interactive Reply */}
        <div className="relative z-10 flex flex-col gap-3">
          {story.caption && (
            <p className="text-white text-xs font-medium leading-relaxed bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              {story.caption}
            </p>
          )}

          {hasSentReply ? (
            <div className="bg-emerald-600/90 backdrop-blur-md text-white text-xs p-2.5 rounded-full flex items-center justify-center gap-1.5 font-bold animate-in zoom-in-95">
              <Check className="w-4 h-4" />
              <span>{isFa ? 'پاسخ شما ارسال شد!' : 'Reply sent!'}</span>
            </div>
          ) : (
            <form onSubmit={handleSendReply} className="flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={isFa ? `پاسخ به ${story.user.name}...` : `Reply to ${story.user.name}...`}
                className="flex-1 h-10 px-4 rounded-full bg-white/20 backdrop-blur-md text-white placeholder:text-white/60 text-xs border border-white/20 focus:outline-none focus:bg-white/30"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors active:scale-125"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? 'text-[#fd56a7] fill-[#fd56a7]' : 'text-white'}`}
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
