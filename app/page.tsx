'use client';

import React, { useState, useEffect } from 'react';
import { TabType, Language, Story, Post } from '@/lib/types';
import { 
  CURRENT_USER, 
  INITIAL_STORIES, 
  INITIAL_POSTS, 
  INITIAL_NOTIFICATIONS, 
  TRENDING_TOPICS, 
  SUGGESTED_CREATORS, 
  EXPLORE_MEDIA_ITEMS 
} from '@/lib/data';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { HomeFeed } from '@/components/HomeFeed';
import { ExploreView } from '@/components/ExploreView';
import { NotificationsView } from '@/components/NotificationsView';
import { ProfileView } from '@/components/ProfileView';
import { CreatePostModal } from '@/components/CreatePostModal';
import { StoryModal } from '@/components/StoryModal';
import { DirectModal } from '@/components/DirectModal';
import { HimoraModal } from '@/components/HimoraModal';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function App() {
  const [language, setLanguage] = useState<Language>('fa');
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals state
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDirectOpen, setIsDirectOpen] = useState(false);
  const [isHimoraOpen, setIsHimoraOpen] = useState(false);

  // Sync document direction with language
  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'fa' ? 'en' : 'fa'));
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isNowLiked = !p.isLiked;
        return {
          ...p,
          isLiked: isNowLiked,
          likesCount: isNowLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  const handleToggleSave = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, isSaved: !p.isSaved };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          user: currentUser,
          text,
          timeAgo: language === 'fa' ? 'همین الان' : 'Just now',
          likes: 0
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));
  };

  const handlePublishPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentTab('home');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const unreadNotifsCount = notifications.filter(n => n.isUnread).length;

  return (
    <PhoneFrame
      language={language}
      currentTab={currentTab}
      onChangeTab={setCurrentTab}
      onOpenCreate={() => setIsCreateOpen(true)}
      onOpenHimoraModal={() => setIsHimoraOpen(true)}
      onToggleLanguage={toggleLanguage}
    >
      {/* App Top Sticky Header */}
      <Header
        currentTab={currentTab}
        language={language}
        onToggleLanguage={toggleLanguage}
        currentUser={currentUser}
        onOpenDirect={() => setIsDirectOpen(true)}
        onGoToProfile={() => setCurrentTab('profile')}
        unreadMessagesCount={1}
      />

      {/* Screen Views depending on currentTab */}
      <div className="flex-1 w-full flex flex-col">
        {currentTab === 'home' && (
          <HomeFeed
            stories={stories}
            posts={posts}
            language={language}
            currentUser={currentUser}
            onOpenStory={(s) => setActiveStory(s)}
            onOpenCreate={() => setIsCreateOpen(true)}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onAddComment={handleAddComment}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            language={language}
            trendingTopics={TRENDING_TOPICS}
            suggestedCreators={SUGGESTED_CREATORS}
            exploreItems={EXPLORE_MEDIA_ITEMS}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView
            language={language}
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            language={language}
            currentUser={currentUser}
            onOpenHimoraModal={() => setIsHimoraOpen(true)}
          />
        )}
      </div>

      {/* Fixed Bottom Tab Navigation */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onOpenCreate={() => setIsCreateOpen(true)}
        language={language}
        unreadNotifsCount={unreadNotifsCount}
      />

      {/* Modals & Dialogs */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        language={language}
        currentUser={currentUser}
        onPublishPost={handlePublishPost}
      />

      <StoryModal
        key={activeStory?.id || 'none'}
        story={activeStory}
        onClose={() => setActiveStory(null)}
        language={language}
      />

      <DirectModal
        isOpen={isDirectOpen}
        onClose={() => setIsDirectOpen(false)}
        language={language}
        currentUser={currentUser}
      />

      <HimoraModal
        isOpen={isHimoraOpen}
        onClose={() => setIsHimoraOpen(false)}
        language={language}
      />
    </PhoneFrame>
  );
}
