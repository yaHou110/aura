'use client';

import React, { useState } from 'react';
import { Language, User, Post } from '@/lib/types';
import { X, Image, Hash, MapPin, Sparkles, Send, Check } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentUser: User;
  onPublishPost: (newPost: Post) => void;
}

const SAMPLE_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fm6wXnCR5BNEKUGTMkGfi3Bp-2ibKnXpGppA_RkwiFkFRdSKVq8Cw7htlEOkXhU_0Gia6YHrlvizyB0SgIKRUbu-6n5tvi9cK5aH2qe-zo2NmIHuY87kx1VdZhecIGWLXL1Cvuk_t9gXDEG06xCEMMrs0znsBro9HRYSlE7xRT5w4Uoz_XN3jmeTdKbExnFf8eUDvlvYExYUZ6tFAdCzfK2BfPuSCtidZiAztSfHKUM6cWHewwNy',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCtVEBkicFaFHodMjV6NJ4SC1YkSscBoU6IBZzkGsDnxkkuJkJD2GVKoBqZDxw9R6tVdJXDKtjPJwM2rPhwRY3o5XeoA1UwrJgAVA6ZhmaBJnMF5TSIkJS8XG--Px2NhdXpZYhwvbk7EoOPQOrzxtVUP2LIDWLT007MdmtADHmLv9IeIoBeGA1107vcH3-bCZMkxXcH8ls3svqBqHjmxORC0Lhlc9F6q4zFGVM5XzrTkv6SCqaGMIjm',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDae1uTtGQUs5Pi6QHf1LTBVpRa4Tj4O4mW3oP5KvBQ6M8w_QfBQ0UAdWiOvShCZxjPCz7wY1EqrYsdHsiAXG2P599JWMcDYuAXyH-NtW0bs9ZMAJpkUt2reBQt2IXbJXiY9tqOfoZwdssuPfQsHPHLKHHq12scC_Odw2_zPBs9SBZhyTQ5EdUONxOBOhJ28u6EyKxNC8v7YVzxlZWzw5FL6O7QZf3ZytjnNSVk0K5BfP5N-SCaDCdz',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBjK9uFLC9qSp3eA9JE-2-ByxX8PGO18qtoVUsoqEk9rWYQguvVUrMByHZHR1vNxE7qztZ59p2xhq6J6H-2K_hvGB_Hv8zSQUo0hzdwW6EpihbHj7PMpxFVUIFTJOwmn2PJHf9Nbj0IMOIucIlnu-nB8QSX-R5zdbotXkfh4PWmtpqgSONjp_r933jSg7gsX8YKDgMcDds3_gV-knRiuFKEQ5Z5oAn-zD3fgTDbPbXwvFSfc7GfJttd'
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  language,
  currentUser,
  onPublishPost,
}) => {
  const isFa = language === 'fa';
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [selectedTag, setSelectedTag] = useState('#طراحی_رابط_کاربری');
  const [location, setLocation] = useState('تهران، ایران');
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isOpen) return null;

  const handlePublish = () => {
    if (!content.trim()) return;
    setIsPublishing(true);

    setTimeout(() => {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: currentUser,
        timeAgo: 'همین الان',
        timeAgoEn: 'Just now',
        content: content.trim(),
        contentEn: content.trim(),
        hashtags: [selectedTag, '#آئورا'],
        media: [selectedImage],
        aspectRatio: '4/3',
        location: location.trim(),
        likesCount: 1,
        commentsCount: 0,
        repostsCount: 0,
        isLiked: true,
        isSaved: false,
        comments: []
      };

      onPublishPost(newPost);
      setIsPublishing(false);
      setContent('');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 border border-[#eaedff] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f2f3ff] pb-3">
          <div className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#3525cd]"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xs text-[#131b2e]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[#464555]">
                {isFa ? 'انتشار برای عموم' : 'Public post'}
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

        {/* Text Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder={isFa ? 'ایده یا تجربه جدیدی داری؟ اینجا بنویس...' : 'Share a thought, design concept or experience...'}
          className="w-full text-xs text-[#131b2e] placeholder:text-[#777587] resize-none focus:outline-none leading-relaxed p-1"
          autoFocus
        />

        {/* Selected Image Preview */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#eaedff] border border-[#dae2fd]">
          <img
            src={selectedImage}
            alt="Selected preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 start-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
            {isFa ? 'تصویر ضمیمه' : 'Attached Photo'}
          </div>
        </div>

        {/* Sample Images Picker */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#464555]">
            {isFa ? 'انتخاب تصویر از گالری:' : 'Choose photo from gallery:'}
          </span>
          <div className="grid grid-cols-4 gap-2">
            {SAMPLE_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === img
                    ? 'border-[#3525cd] scale-95 shadow-xs'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                {selectedImage === img && (
                  <div className="absolute inset-0 bg-[#3525cd]/25 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['#طراحی_رابط_کاربری', '#تکنولوژی', '#عکاسی', '#هنر', '#مینیمال'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                selectedTag === tag
                  ? 'bg-[#3525cd] text-white font-bold'
                  : 'bg-[#eaedff] text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Location input */}
        <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#dae2fd]/50">
          <MapPin className="w-4 h-4 text-[#3525cd] shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={isFa ? 'موقعیت مکانی (اختیاری)...' : 'Location...'}
            className="w-full bg-transparent text-xs text-[#131b2e] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handlePublish}
          disabled={!content.trim() || isPublishing}
          className="w-full h-11 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 active:scale-98"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
          <span>
            {isPublishing
              ? (isFa ? 'در حال ارسال...' : 'Publishing...')
              : (isFa ? 'انتشار پست در فید' : 'Publish Post')}
          </span>
        </button>
      </div>
    </div>
  );
};
