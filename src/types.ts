export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  date: string;
  views: number;
  commentsCount: number;
  image: string;
  isFeatured?: boolean;
  reviewRating?: number; // WP Review integration
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  color?: string;
}

export interface ThemeSettings {
  accentColor: string;
  layout: 'both' | 'right' | 'left' | 'full';
  showSlider: boolean;
  showTeasers: boolean;
  siteTitle: string;
  siteDescription: string;
  language: 'ru' | 'en';
  darkMode: boolean;
}
