'use client';

import React, { useState } from 'react';
import { Language, User, TrendingTopic, ExploreMedia } from '@/lib/types';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Play, 
  Layers, 
  Heart, 
  RefreshCw,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface ExploreViewProps {
  language: Language;
  trendingTopics: TrendingTopic[];
  suggestedCreators: User[];
  exploreItems: ExploreMedia[];
  onOpenStory?: (creator: User) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  language,
  trendingTopics,
  suggestedCreators,
  exploreItems,
}) => {
  const isFa = language === 'fa';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tabFilter, setTabFilter] = useState<'featured' | 'recent'>('featured');
  const [followedIds, setFollowedIds] = useState<Record<string, boolean>>({});
  const [likedMediaIds, setLikedMediaIds] = useState<Record<string, boolean>>({});
  const [itemsList, setItemsList] = useState(exploreItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleFollow = (userId: string) => {
    setFollowedIds(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const toggleLikeMedia = (mediaId: string) => {
    setLikedMediaIds(prev => ({ ...prev, [mediaId]: !prev[mediaId] }));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      // Add extra exploration cards
      const additional: ExploreMedia[] = [
        {
          id: `ex-new-${Date.now()}-1`,
          title: isFa ? 'معماری و نور در یزد' : 'Light & Architecture in Yazd',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwgfx-2Tx0sXBmTOt8oiPJT4W_EHf4aaZWEpHVHfnblR6LscTXJSUa9miy9VqBkyHeADNwl98u3cnHfuTcNzsK07OUuL5snS1aCZCnlKWn-b1gvk54xRbcq3_hLXuEpv4cyN5P346mB9QJFECiS-mvUi3aJtLPTPOVxnOlwV13NLpusY4v9TouSdE_KBEwP99PSfInCvEqfH1dDCwSJr5Wbjj7vd2-Jj2JXAp239Zj4jS6aOGl1Hh3',
          type: 'image',
          likes: '۱.۷K',
          aspect: 'aspect-square'
        },
        {
          id: `ex-new-${Date.now()}-2`,
          title: isFa ? 'استودیوی ضبط پادکست' : 'Podcast Studio Setup',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvXcukgMkkqAKwXpfaaacsGkLAd3-jK3t0xf_pdWhwKZmPTDsGoj_3LEYL-Yk1SoqrUTHxthi3zRM7cTZfOfK9e7KKDHUCqSuPxeFp7tol-U4hl6fKhoEOBJPvRUIBxVQSboH5FIdMxWJSKknPkm_SWAVIrHPsEn5B1nDGjZSNKLN9eif8HYGUt2wR4oGfpj9cqHJmUyJjqFO-_txaWRvwc6BD5TBNKyzwoDleebdOoR_zYjMZ8K4k',
          type: 'video',
          duration: '۰:۴۵',
          likes: '۲.۴K',
          aspect: 'aspect-[4/5]'
        }
      ];
      setItemsList(prev => [...prev, ...additional]);
      setIsLoadingMore(false);
    }, 600);
  };

  // Filter items by query or tag
  const filteredItems = itemsList.filter(item => {
    if (selectedTag) {
      return item.title.toLowerCase().includes(selectedTag.replace('#', '').toLowerCase());
    }
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Search Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative flex items-center w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#777587]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isFa ? 'جستجوی افراد، موضوعات یا برچسب‌ها...' : 'Search creators, topics, or hashtags...'}
            className="w-full h-11 ps-10 pe-10 bg-[#f2f3ff] text-[#131b2e] text-xs rounded-full border border-[#dae2fd]/60 placeholder:text-[#777587] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3525cd]/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 end-9 flex items-center pe-2 text-[#777587] hover:text-[#131b2e]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-[#777587] hover:text-[#3525cd]"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Trending Topics Horizontal Strip */}
      <section className="flex flex-col mt-2">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#fd56a7] fill-[#fd56a7]" />
            <h2 className="text-sm font-bold text-[#131b2e]">
              {isFa ? 'موضوعات داغ و ترند' : 'Trending Topics'}
            </h2>
          </div>
          <span className="text-[11px] text-[#464555]">
            {isFa ? 'به‌روزرسانی لحظه‌ای' : 'Live updates'}
          </span>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-1">
          {trendingTopics.map((topic, idx) => {
            const isSelected = selectedTag === topic.tag;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTag(isSelected ? null : topic.tag)}
                className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all shrink-0 active:scale-95 text-start shadow-xs ${
                  isSelected
                    ? 'bg-[#3525cd] text-white border-[#3525cd]'
                    : 'bg-[#eaedff] text-[#131b2e] border-transparent hover:border-[#3525cd]/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#3525cd]'
                }`}>
                  #
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold">
                    {topic.tag}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#464555]'}`}>
                    {topic.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Suggested Creators Horizontal Carousel */}
      <section className="flex flex-col mt-4">
        <div className="px-4 flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#3525cd]" />
            <h2 className="text-sm font-bold text-[#131b2e]">
              {isFa ? 'پیشنهادی برای شما' : 'Suggested for You'}
            </h2>
          </div>
          <span className="text-xs text-[#3525cd] font-semibold cursor-pointer hover:underline">
            {isFa ? 'مشاهده همه' : 'See all'}
          </span>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-1">
          {suggestedCreators.map((creator) => {
            const isFollowing = followedIds[creator.id];
            return (
              <div
                key={creator.id}
                className="flex flex-col items-center justify-between w-36 p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs shrink-0 text-center transition-all hover:shadow-md"
              >
                <div className="relative mb-1.5">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#3525cd] to-[#fd56a7]">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {creator.verified && (
                    <div className="absolute bottom-0 end-0 bg-[#3525cd] text-white p-0.5 rounded-full ring-2 ring-white">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-[#3525cd] text-white" />
                    </div>
                  )}
                </div>

                <span className="font-bold text-xs text-[#131b2e] truncate w-full">
                  {creator.name}
                </span>
                <span className="text-[10px] text-[#464555] truncate w-full mb-3">
                  {creator.role}
                </span>

                <button
                  type="button"
                  onClick={() => toggleFollow(creator.id)}
                  className={`w-full py-1.5 px-2 rounded-full text-xs font-semibold transition-all shadow-xs active:scale-95 ${
                    isFollowing
                      ? 'bg-[#e2e7ff] text-[#131b2e]'
                      : 'bg-[#3525cd] hover:bg-[#4f46e5] text-white'
                  }`}
                >
                  {isFollowing
                    ? (isFa ? 'دنبال شد' : 'Following')
                    : (isFa ? 'دنبال کردن' : 'Follow')}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Visual Exploration Grid (Masonry 2-columns) */}
      <section className="flex flex-col mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#b4136d]" />
            <h2 className="text-sm font-bold text-[#131b2e]">
              {isFa ? 'کاوش تصویر و محتوا' : 'Media Discovery'}
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-[#eaedff] rounded-full p-0.5 border border-[#dae2fd]/40">
            <button
              type="button"
              onClick={() => setTabFilter('featured')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                tabFilter === 'featured'
                  ? 'bg-white shadow-xs text-[#3525cd] font-bold'
                  : 'text-[#464555]'
              }`}
            >
              {isFa ? 'منتخب' : 'Featured'}
            </button>
            <button
              type="button"
              onClick={() => setTabFilter('recent')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                tabFilter === 'recent'
                  ? 'bg-white shadow-xs text-[#3525cd] font-bold'
                  : 'text-[#464555]'
              }`}
            >
              {isFa ? 'جدیدترین' : 'Recent'}
            </button>
          </div>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {filteredItems.filter((_, i) => i % 2 === 0).map((item) => {
              const isLiked = likedMediaIds[item.id];
              return (
                <div
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden shadow-xs bg-white border border-[#eaedff] cursor-pointer"
                >
                  <div className={`relative w-full ${item.aspect}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                    {/* Media Type Badges */}
                    {item.type === 'video' && (
                      <div className="absolute top-2.5 end-2.5 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-[10px] font-semibold">
                        <Play className="w-3 h-3 fill-white" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    {item.type === 'carousel' && (
                      <div className="absolute top-2.5 end-2.5 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-[10px] font-semibold">
                        <Layers className="w-3 h-3" />
                        <span>{item.carouselCount}</span>
                      </div>
                    )}

                    {/* Footer on Image */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white">
                      <span className="text-[11px] font-bold truncate max-w-[70%]">
                        {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLikeMedia(item.id);
                        }}
                        className="flex items-center gap-1 text-[11px] active:scale-125 transition-transform"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? 'text-[#fd56a7] fill-[#fd56a7]' : 'text-white'
                          }`}
                        />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {filteredItems.filter((_, i) => i % 2 !== 0).map((item) => {
              const isLiked = likedMediaIds[item.id];
              return (
                <div
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden shadow-xs bg-white border border-[#eaedff] cursor-pointer"
                >
                  <div className={`relative w-full ${item.aspect}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                    {/* Media Type Badges */}
                    {item.type === 'video' && (
                      <div className="absolute top-2.5 end-2.5 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-[10px] font-semibold">
                        <Play className="w-3 h-3 fill-white" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    {item.type === 'carousel' && (
                      <div className="absolute top-2.5 end-2.5 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-[10px] font-semibold">
                        <Layers className="w-3 h-3" />
                        <span>{item.carouselCount}</span>
                      </div>
                    )}

                    {/* Footer on Image */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white">
                      <span className="text-[11px] font-bold truncate max-w-[70%]">
                        {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLikeMedia(item.id);
                        }}
                        className="flex items-center gap-1 text-[11px] active:scale-125 transition-transform"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? 'text-[#fd56a7] fill-[#fd56a7]' : 'text-white'
                          }`}
                        />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-6 flex justify-center w-full">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#eaedff] text-[#131b2e] text-xs font-bold hover:bg-[#dae2fd] transition-all active:scale-95 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin text-[#3525cd]' : ''}`} />
            <span>
              {isLoadingMore
                ? (isFa ? 'در حال بارگذاری...' : 'Loading...')
                : (isFa ? 'نمایش پست‌های بیشتر' : 'Load more posts')}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
