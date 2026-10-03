export type Language = 'fa' | 'en';

export type TabType = 'home' | 'explore' | 'create' | 'notifications' | 'profile';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
  role?: string;
  bio?: string;
  link?: string;
  stats?: {
    posts: number | string;
    followers: string;
    following: number | string;
  };
}

export interface Story {
  id: string;
  user: User;
  hasUnread: boolean;
  image: string;
  timestamp: string;
  caption?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timeAgo: string;
  likes?: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  author: User;
  timeAgo: string;
  timeAgoEn: string;
  content: string;
  contentEn?: string;
  hashtags: string[];
  media: string[];
  aspectRatio?: '4/3' | '4/5' | '1/1' | '16/9';
  location?: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
  badge?: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'milestone' | 'system';
  user?: User;
  otherUsersCount?: number;
  timeAgo: string;
  isUnread: boolean;
  postThumbnail?: string;
  commentText?: string;
  milestoneTitle?: string;
  milestoneDesc?: string;
  isFollowedBack?: boolean;
  category: 'all' | 'interactions' | 'followers';
}

export interface TrendingTopic {
  tag: string;
  count: string;
  category: string;
}

export interface ExploreMedia {
  id: string;
  title: string;
  imageUrl: string;
  type: 'image' | 'video' | 'carousel';
  duration?: string;
  carouselCount?: number;
  likes: string;
  aspect: 'aspect-[4/5]' | 'aspect-square' | 'aspect-[3/4]' | 'aspect-[9/16]';
}
