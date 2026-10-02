export type ActivePage = 'home' | 'work' | 'about' | 'contact';

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  aspectRatio?: '9:16' | '16:9';
  tags: string[];
}

export interface DesignProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  aspectRatio?: '1:1' | '16:9' | '4:5' | '3:4';
  tags: string[];
}

export interface PricingPlan {
  id: string;
  title: string;
  duration: string;
  price: string;
  period?: string;
  suitableFor: string;
  features: string[];
  isHighlighted?: boolean;
  badge?: string;
}

export interface PersonalInfo {
  name: string;
  username: string;
  experience: string;
  email: string;
  whatsapp: string;
  whatsappRaw: string;
  instagram: string;
  linkedin: string;
  heroHeadline: string;
  heroSubheadline: string;
}
