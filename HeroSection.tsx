import React, { useState, useRef, useEffect } from 'react';
import { ActivePage } from '../types';
import { personalInfo, defaultHeroPhotoPath } from '../data/portfolioData';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  Film, 
  Palette, 
  Clock, 
  Flame,
  CheckCircle2,
  ExternalLink,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

interface HeroSectionProps {
  setActivePage: (page: ActivePage) => void;
  customHeroPhoto?: string | null;
  onUploadPhoto?: (file: File) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  setActivePage,
  customHeroPhoto,
  onUploadPhoto 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Mouse tilt math
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt angle (gentle, max ±12 deg)
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    
    // Glow percentages
    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlowX(gX);
    setGlowY(gY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  const heroPhotoSrc = customHeroPhoto || defaultHeroPhotoPath;

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambient Glow & Cinematic Light Fields */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-orange-600/15 rounded-full blur-[140px] animate-pulse-slow"
        />
        <div 
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px]"
        />
        <div 
          className="absolute top-20 left-10 w-[300px] h-[300px] bg-orange-950/20 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-grain opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Top Identity Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="font-semibold text-white tracking-wider">{personalInfo.username}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300">5+ Years Craft</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Editing That Makes <br className="hidden sm:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-400">
                Every Frame Matter.
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500/20"></span>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              {personalInfo.heroSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-cta-view-work"
                onClick={() => setActivePage('work')}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-black font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_35px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-work-together"
                onClick={() => setActivePage('contact')}
                className="group px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/60 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>LET&apos;S WORK TOGETHER</span>
                <Sparkles className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Quick Experience & Specialization Tags */}
            <div className="pt-6 border-t border-zinc-800/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span className="text-zinc-200">Reels & Short-Form Viral Cuts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span className="text-zinc-200">Cinematic Color Grading & Sound FX</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span className="text-zinc-200">High-CTR Visual Designs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hero Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* Dynamic Glow behind image responding to cursor */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-70 blur-2xl transition-all duration-300 pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(249, 115, 22, 0.4) 0%, rgba(234, 88, 12, 0.15) 45%, transparent 70%)`
              }}
            />

            {/* 3D Interactive Card Container */}
            <div
              id="hero-interactive-card"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
              }}
              className="relative w-full max-w-md rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3 sm:p-4 backdrop-blur-xl shadow-2xl overflow-visible cursor-pointer group"
            >
              {/* Subtle Glowing Corner Accents */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                style={{
                  boxShadow: isHovered ? `0 0 35px rgba(249,115,22,0.25)` : 'none',
                  border: isHovered ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(63,63,70,0.4)'
                }}
              />

              {/* Main Portrait / Visual Card */}
              <div className="relative rounded-xl overflow-hidden bg-zinc-900 aspect-[4/5] flex flex-col justify-between border border-zinc-800/80">
                
                {/* Real Image */}
                {!imageError ? (
                  <img
                    id="hero-profile-image"
                    src={heroPhotoSrc}
                    alt="Tanishk Yadav - Video Editor & Visual Designer"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-[center_18%] sm:object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  /* High-end Styled Editorial / Studio Composition Fallback */
                  <div className="w-full h-full relative flex flex-col justify-between p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
                    {/* Top Studio Overlay Badges */}
                    <div className="flex items-center justify-between z-10">
                      <div className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-orange-500/30 text-[10px] font-mono-code text-orange-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span>REC 4K 60FPS</span>
                      </div>
                      <div className="text-[10px] font-mono-code text-zinc-500">
                        TIMELINE 00:05:23
                      </div>
                    </div>

                    {/* Center Aesthetic Studio Iconography */}
                    <div className="my-auto flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-zinc-900 border border-orange-500/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(249,115,22,0.25)] group-hover:scale-110 transition-transform">
                        <Film className="w-9 h-9 text-orange-400" />
                      </div>
                      <span className="font-display font-black text-2xl text-white tracking-wide mb-1">
                        {personalInfo.name}
                      </span>
                      <span className="text-xs font-mono-code text-orange-400 tracking-wider">
                        {personalInfo.username}
                      </span>
                      <p className="text-[11px] text-zinc-400 mt-2 max-w-xs leading-relaxed">
                        Video Editor & Visual Designer
                      </p>
                    </div>

                    {/* Bottom Waveform & Track Simulator */}
                    <div className="z-10 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-zinc-800/80">
                      <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-400 mb-1.5">
                        <span className="flex items-center gap-1 text-orange-400">
                          <SlidersHorizontal className="w-3 h-3" /> AUDIO & COLOR GRADE
                        </span>
                        <span>LUT: CINEMATIC WARM</span>
                      </div>
                      <div className="h-6 flex items-center gap-0.5 overflow-hidden">
                        {[40, 65, 80, 45, 95, 70, 30, 85, 100, 55, 75, 40, 90, 60, 30, 85, 95, 50, 70, 40, 60, 80, 50, 90, 45, 65, 80, 40, 70].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-gradient-to-t from-orange-600 to-amber-400 rounded-full transition-all duration-300"
                            style={{ height: `${isHovered ? (h * 0.9 + (i % 3) * 5) : h * 0.6}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtle Image Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-sm text-white tracking-wide">
                      {personalInfo.name}
                    </h2>
                    <span className="text-[11px] font-mono-code text-orange-400">
                      {personalInfo.username}
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                    PRO EDITOR
                  </div>
                </div>
              </div>

              {/* FLOATING BADGE 1: 5+ YEARS (Top Left) */}
              <div 
                className="absolute -top-4 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-zinc-900/95 border border-orange-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-all duration-300 animate-float-subtle"
                style={{
                  transform: `translate3d(${rotateY * -1}px, ${rotateX * -1}px, 20px)`
                }}
              >
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono-code">Experience</div>
                  <div className="font-display font-black text-sm text-white tracking-tight">5+ YEARS</div>
                </div>
              </div>

              {/* FLOATING BADGE 2: VIDEO EDITOR (Bottom Left) */}
              <div 
                className="absolute -bottom-4 -left-3 sm:-left-5 px-3.5 py-2 rounded-xl bg-zinc-900/95 border border-zinc-800 hover:border-orange-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-all duration-300"
                style={{
                  transform: `translate3d(${rotateY * -0.8}px, ${rotateX * -0.8}px, 30px)`
                }}
              >
                <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-orange-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono-code">Craft</div>
                  <div className="font-display font-bold text-xs text-white">VIDEO EDITOR</div>
                </div>
              </div>

              {/* FLOATING BADGE 3: VISUAL DESIGNER (Right Middle) */}
              <div 
                className="absolute -right-3 sm:-right-6 top-1/3 px-3.5 py-2 rounded-xl bg-zinc-900/95 border border-zinc-800 hover:border-orange-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-all duration-300"
                style={{
                  transform: `translate3d(${rotateY * 0.8}px, ${rotateX * 0.8}px, 25px)`
                }}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono-code">Design</div>
                  <div className="font-display font-bold text-xs text-white">VISUAL DESIGNER</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
