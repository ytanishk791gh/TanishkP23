import { PersonalInfo, VideoProject, DesignProject, PricingPlan } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Tanishk Yadav',
  username: 'TANISHK_P23',
  experience: '5+ Years',
  email: 'rinkuyadav02319@gmail.com',
  whatsapp: '+91 77239 16961',
  whatsappRaw: '917723916961',
  instagram: 'https://www.instagram.com/tanishk_023?igsi=enV5cWxpdTFlcnNx',
  linkedin: 'https://www.linkedin.com/in/tanishk-yadav-b005893a6?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  heroHeadline: 'Editing That Makes Every Frame Matter.',
  heroSubheadline: 'Video Editor & Visual Designer with 5+ years of experience creating cinematic edits, engaging short-form content, advertisements, YouTube videos and visual designs.',
};

export const defaultHeroPhotoPath = 'https://i.ibb.co/TqP52Yky/IMG-20260716-101341-jpg.jpg';

// Clearly identifiable direct video URL variable for Slot 1
export const slot1VideoUrl = 'https://res.cloudinary.com/jznkawxj/video/upload/v1787760889/lv_0_20260801034840.mp4';

// Clearly identifiable direct video URL variable for Slot 2
export const slot2VideoUrl = 'https://res.cloudinary.com/jznkawxj/video/upload/v1787761434/InShot_20260826_143008062.mp4';

// Clearly identifiable direct video URL variable for Slot 3
export const slot3VideoUrl = 'https://res.cloudinary.com/jznkawxj/video/upload/v1787759641/AQP2gqFWMbdn_NuAnLnw-QJlTSVFjTYdb384E9cXJZRF9rHLEorG7iCif94ir8KIyFLK0sf1NbAnbwFjAZjkTsQ78RD0iw9BRFXwDZk.mp4';

// Clearly identifiable direct video URL variable for Slot 4
export const slot4VideoUrl = 'https://res.cloudinary.com/jznkawxj/video/upload/v1787761715/CCF3.mp4';

export const videoProjects: VideoProject[] = [
  {
    id: 'vid-1',
    title: 'Cinematic Edit',
    category: 'Cinematic & Mood Edit',
    description: 'Atmospheric color grading, sound design, and smooth frame transitions crafted for maximum visual immersion.',
    videoUrl: slot1VideoUrl,
    thumbnailUrl: '/assets/thumbnails/video-1.jpg',
    duration: '0:48',
    aspectRatio: '9:16',
    tags: ['Cinematic Editing', 'Color Grading', 'Sound Design', 'Storytelling'],
  },
  {
    id: 'vid-2',
    title: 'Gym / Fitness Reel',
    category: 'High-Energy & Beat Sync',
    description: 'Dynamic speed ramping, bass-boosted beat synchronizations, and high-impact visual cuts for fitness content.',
    videoUrl: slot2VideoUrl,
    thumbnailUrl: '/assets/thumbnails/video-2.jpg',
    duration: '0:18',
    aspectRatio: '9:16',
    tags: ['Gym / Fitness Reels', 'Beat Sync', 'Speed Ramping', 'Transitions'],
  },
  {
    id: 'vid-3',
    title: 'Advertisement Reel',
    category: 'Commercial & Brand Promo',
    description: 'The main creative objective is to present a high-end financial/trading lifestyle advertisement while making the viewer associate trading with.Wealth, Financial freedom, Luxury, Success, Lifestyle, Professional trading',
    videoUrl: slot3VideoUrl,
    thumbnailUrl: '/assets/thumbnails/video-3.jpg',
    duration: '0:34',
    aspectRatio: '9:16',
    tags: ['Advertisement Reels', 'Text Animation', 'Typography', 'Masking'],
  },
  {
    id: 'vid-4',
    title: 'YouTube / Short-Form Edit',
    category: 'Retention & Engagement',
    description: 'Fast - paced storytelling with animated captions, sound effects, B-roll overlays, and face tracking, motion graphics',
    videoUrl: slot4VideoUrl,
    thumbnailUrl: '/assets/thumbnails/video-4.jpg',
    duration: '0:28',
    aspectRatio: '9:16',
    tags: ['YouTube Shorts', 'Captions / Subtitles', 'B-Roll Editing', 'Visual Effects'],
  },
];

export const videoEditingSkills: string[] = [
  'Cinematic Editing',
  'Reels',
  'YouTube Shorts',
  'YouTube Videos',
  'Gym / Fitness Reels',
  'Advertisement Reels',
  'Storytelling',
  'B-Roll Editing',
  'Motion Graphics',
  'Text Animation',
  'Typography',
  'Transitions',
  'Sound Design',
  'Beat Sync',
  'Color Grading',
  'Visual Effects',
  'Speed Ramping',
  'Masking',
  'Creative Effects',
  'Captions / Subtitles',
];

export const toolsList: { name: string; category: string }[] = [
  { name: 'CapCut', category: 'Video & Speed Pacing' },
  { name: 'Alight Motion', category: 'Motion & Keyframing' },
  { name: 'PicsArt', category: 'Visual Compositing' },
  { name: 'PixelLab', category: 'Text & Typography Styling' },
  { name: 'Canva', category: 'Layouts & Posters' },
  { name: 'AI Tools / AI Websites', category: 'Generation & Enhancement' },
];

// Clearly identifiable direct image URL variable for Photo Editing Slot 1
export const photoSlot1Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787762529/Picsart_26-08-26_15-16-00-803.jpg.jpg';

// Clearly identifiable direct image URL variable for Graphic Design Slot 2
export const graphicDesignSlot2Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787762687/InShot_20260826_153536060.jpg.jpg';

// Clearly identifiable direct image URL variable for YouTube Thumbnail Slot 3
export const youtubeThumbnailSlot3Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787763031/Picsart_26-08-25_19-33-45-285.jpg.jpg';

// Clearly identifiable direct image URL variable for Social Media Design Slot 4
export const socialMediaDesignSlot4Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787763314/file_000000002bd082078374d067ed711d6d.png';

// Clearly identifiable direct image URL variable for Banners & Creative Posters Slot 5
export const bannersPostersSlot5Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787763465/file_00000000db6882118144c36f42428b92.png';

// Clearly identifiable direct image URL variable for Logos, PNG Designs & Stickers Slot 6
export const logosPngStickersSlot6Image = 'https://res.cloudinary.com/jznkawxj/image/upload/v1787763663/file_000000004d60821193c11087fc182f40.png';

export const designProjects: DesignProject[] = [
  {
    id: 'des-1',
    title: 'Photo Editing & Retouching',
    category: 'Photo Editing',
    description: 'Creative lighting balance, mood color grading, and skin/object enhancement for digital media.',
    imageUrl: photoSlot1Image,
    aspectRatio: '4:5',
    tags: ['Color Grade', 'Retouching', 'Lighting'],
  },
  {
    id: 'des-2',
    title: 'Graphic Design & Layouts',
    category: 'Graphic Design',
    description: 'High-contrast promotional visual assets, aesthetic typography compositions, and clean digital art.',
    imageUrl: graphicDesignSlot2Image,
    aspectRatio: '1:1',
    tags: ['Visual Design', 'Composition', 'Branding'],
  },
  {
    id: 'des-3',
    title: 'YouTube Thumbnails',
    category: 'YouTube Thumbnails',
    description: 'High CTR thumbnail concepts with expressive typography, punchy subjects, and glowing accents.',
    imageUrl: youtubeThumbnailSlot3Image,
    aspectRatio: '16:9',
    tags: ['High CTR', 'Thumbnails', 'YouTube'],
  },
  {
    id: 'des-4',
    title: 'Social Media Designs',
    category: 'Social Media Designs',
    description: 'Engaging carousel covers, story posters, and creator branding materials tailored for Instagram.',
    imageUrl: socialMediaDesignSlot4Image,
    aspectRatio: '4:5',
    tags: ['Instagram', 'Carousels', 'Stories'],
  },
  {
    id: 'des-5',
    title: 'Banners & Creative Posters',
    category: 'Banners',
    description: 'Wide format header banners, channel art, and event/music promo posters with cinematic dark vibes. For YouTube & Other Social Media Sites',
    imageUrl: bannersPostersSlot5Image,
    aspectRatio: '16:9',
    tags: ['Header Banners', 'Posters', 'Channel Art'],
  },
  {
    id: 'des-6',
    title: 'Logos, PNG Designs & Stickers',
    category: 'Logos & PNG Designs',
    description: 'Transparent overlays, custom badges, vector cutouts, PNG, and creator emblem designs for Gaming logos, Brand logos & many more',
    imageUrl: logosPngStickersSlot6Image,
    aspectRatio: '1:1',
    tags: ['PNG Overlays', 'Logos', 'Stickers'],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'short-video',
    title: 'Short Video',
    duration: 'Up to 60 Seconds',
    price: '₹400',
    period: '/ video',
    suitableFor: 'Reels & YouTube Shorts',
    features: [
      'Up to 60 Seconds duration',
      'Dynamic beat sync & transitions',
      'Animated captions / subtitles',
      'Sound design & sound effects (SFX)',
      'Optimized for 9:16 vertical retention',
      'Color grading & visual polish',
    ],
    isHighlighted: false,
  },
  {
    id: 'long-video',
    title: 'Long Video',
    duration: '2–5 Minutes',
    price: '₹800',
    period: '/ video',
    suitableFor: 'YouTube & longer content',
    features: [
      '2–5 Minutes duration',
      'Comprehensive story & flow editing',
      'B-Roll insertion & pacing',
      'Background music mixing & audio clean',
      'Lower thirds & motion text',
      'High-quality 1080p / 4K export',
    ],
    isHighlighted: false,
  },
  {
    id: 'monthly-package',
    title: 'Monthly Package',
    duration: 'Full Month Content Retainer',
    price: '₹8,999',
    period: '/ month',
    suitableFor: 'Creators & Brands seeking consistent weekly output',
    features: [
      'Dedicated monthly video editing & visual design',
      'Priority turnaround & direct WhatsApp support',
      'Reels, Shorts, and long-form video mix',
      'Matching graphic design & thumbnail support',
      'Consistent style & brand visual continuity',
      'Flexible revision rounds',
    ],
    isHighlighted: true,
    badge: 'RECOMMENDED / BEST VALUE',
  },
];

export const workflowSteps = [
  {
    step: '01',
    title: 'Brief & Raw Footage',
    description: 'You share your clips, audio preference, goals, or reference styles.',
  },
  {
    step: '02',
    title: 'Story Pacing & Cut',
    description: 'Arranging the narrative sequence, cutting dead frames, and locking dynamic pacing.',
  },
  {
    step: '03',
    title: 'Motion & Sound Design',
    description: 'Adding beat-synced transitions, text animation, subtitles, and immersive sound effects.',
  },
  {
    step: '04',
    title: 'Color Grade & Polish',
    description: 'Fine-tuning lighting, cinematic tone mapping, and delivering ready-to-publish media.',
  },
];
