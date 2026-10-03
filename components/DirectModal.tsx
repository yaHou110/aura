'use client';

import React, { useState } from 'react';
import { Language, User } from '@/lib/types';
import { X, Send, Search, CheckCheck } from 'lucide-react';

interface DirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentUser: User;
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

const CHAT_USERS = [
  {
    id: 'nima-kian',
    name: 'نیما کیان',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy3GArCRUHuTla3lr10ZaEYETL7Z9LIVLHo_1TZ2Hko-rFjaSOP3qbS5F2GpESxZ7n4AGfoGzEUmqo2Zu5gRlZQf2Fa8dIwmX5ZClSGAZvZHwStu7VV_deBheBrLB3vxsdB-y7NfqiOEVxBYU7KldeHsQd2wjDMnvASCuuOrHb2toAPwK4-RQVVFMyGBpJHuMFVfZ6kByGB5soxTAGqpww8gKNcfZ532Sj-aXksOdxlne9_12l8H8q',
    lastMessage: 'طرح جدید سیستم دیزاین رو چک کردی؟',
    time: '۱۰ دقیقه پیش',
    unread: 1
  },
  {
    id: 'mona-soltani',
    name: 'مونا سلطانی',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB15TtAvDy7tY8yv_62bH-fIqXp5JDK3dDiyng_IULKJbEerkTPseuXlxxRFE_8fIohcRNXDyiRd5zsAdpU9NZHKxarTvZR-Jouud9Ab8FJgfwY3igmyxytUufp022-H8k58zmE_m8Il0PIILJyzHZY7tf4xeJAkrwq9E7Ap1plTZLhMyJ2lsZs5Sd-tfdUyJl16cWN0oL42eynfe1tfgLy60Uk1y2H-NwVWHl4YdfjVdNnmVrriIVp',
    lastMessage: 'ممنون از لطفت! دوربین سونی A7 IV بود.',
    time: '۱ ساعت پیش',
    unread: 0
  },
  {
    id: 'sara-rad',
    name: 'سارا رادمنش',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANdrmiuPR8lfGzqVScvxWI5eL0sNva6knf3c6I_MhtGfTy32dEwyuc6pOLPobJ09ZijrV3XFQIwxiWPcMKXiWQJ-jMLkmYWbzk3E8ZVkTJHg6bSkNKhnhFBfZ-ax1WIEuGexPSYJmjv_Lrsqe5L5XyHbjYWlADG_XFB3PYGp8lm_zUfxNTrD-Psw8n9Mx_thA3yCJLDgPUc5qd3YZMuTssDGGAuwuhVgvK2slzUvUsBwDI_sNGXFWj',
    lastMessage: 'فردا برای جلسه هماهنگیم؟',
    time: 'دیروز',
    unread: 0
  }
];

export const DirectModal: React.FC<DirectModalProps> = ({
  isOpen,
  onClose,
  language,
  currentUser,
}) => {
  const isFa = language === 'fa';
  const [selectedUser, setSelectedUser] = useState(CHAT_USERS[0]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'nima-kian': [
      { id: 'm1', senderId: 'nima-kian', text: 'سلام درسا جان، روزت بخیر!', time: '۱۰:۱۵' },
      { id: 'm2', senderId: 'current-user', text: 'سلام نیما، ممنون. پروژه‌ها چطور پیش میره؟', time: '۱۰:۱۶' },
      { id: 'm3', senderId: 'nima-kian', text: 'طرح جدید سیستم دیزاین رو چک کردی؟', time: '۱۰:۲۰' }
    ]
  });
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg]
    }));
    setInputText('');
  };

  const currentChat = messages[selectedUser.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-[#eaedff] overflow-hidden"
      >
        {/* Top Header */}
        <div className="h-16 px-4 bg-[#faf8ff] border-b border-[#dae2fd]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-[#3525cd]"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xs text-[#131b2e]">
                {selectedUser.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {isFa ? 'آنلاین' : 'Online'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] text-[#464555] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Switcher Avatars */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#f2f3ff] border-b border-[#dae2fd]/40 overflow-x-auto no-scrollbar">
          {CHAT_USERS.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all shrink-0 ${
                selectedUser.id === user.id
                  ? 'bg-[#3525cd] text-white font-bold shadow-xs'
                  : 'bg-white text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
              <span>{user.name}</span>
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#faf8ff]">
          {currentChat.map((msg) => {
            const isMe = msg.senderId === 'current-user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#3525cd] text-white rounded-br-xs'
                      : 'bg-white text-[#131b2e] border border-[#eaedff] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#777587] mt-0.5 px-1">
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#3525cd]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-[#f2f3ff] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isFa ? 'پیامی بنویسید...' : 'Type a message...'}
            className="flex-1 h-10 px-4 rounded-full bg-[#f2f3ff] text-xs text-[#131b2e] border border-[#dae2fd]/60 focus:outline-none focus:ring-1 focus:ring-[#3525cd]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white flex items-center justify-center disabled:opacity-40 transition-all active:scale-95"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
