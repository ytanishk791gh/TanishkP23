import React, { useState, useEffect } from 'react';
import { ActivePage } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VideoPortfolioSection } from './components/VideoPortfolioSection';
import { DesignPortfolioSection } from './components/DesignPortfolioSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MediaGuideModal } from './components/MediaGuideModal';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [customHeroPhoto, setCustomHeroPhoto] = useState<string | null>(null);
  const [isMediaGuideOpen, setIsMediaGuideOpen] = useState(false);
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string | undefined>(undefined);

  // Scroll to top on page switch
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planTitle: string) => {
    setSelectedPlanForContact(planTitle);
    handlePageChange('contact');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Sticky Fixed Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenMediaHelper={() => setIsMediaGuideOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        
        {/* PAGE 1: HOME */}
        {activePage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HeroSection
              setActivePage={handlePageChange}
              customHeroPhoto={customHeroPhoto}
            />

            {/* Quick Preview of Work & Capabilities on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800/80">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl">
                <div>
                  <span className="text-xs font-mono-code text-orange-400 uppercase font-semibold">
                    EXPLORE PORTFOLIO
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">
                    Ready to explore video edits, graphic designs & rates?
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Check out cinematic reels, short-form edits, design assets, and clear pricing.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => handlePageChange('work')}
                    className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-wider text-xs shadow-lg transition-all"
                  >
                    View All Work
                  </button>
                  <button
                    onClick={() => handlePageChange('contact')}
                    className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold uppercase tracking-wider text-xs transition-all"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: WORK / SERVICES */}
        {activePage === 'work' && (
          <div className="pt-24 animate-in fade-in duration-300">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left border-b border-zinc-800/80">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-3">
                <span>PORTFOLIO & SERVICES</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                Work That Speaks Without Words.
              </h1>
              <p className="text-zinc-300 text-base sm:text-lg md:text-xl max-w-3xl mt-4 leading-relaxed">
                From high-energy short-form content to cinematic storytelling and visual design — every project is built to communicate clearly and look better.
              </p>
            </div>

            {/* Video Editing Section */}
            <VideoPortfolioSection onOpenMediaGuide={() => setIsMediaGuideOpen(true)} />

            {/* Photo & Graphic Design Section */}
            <div className="border-t border-zinc-800/80">
              <DesignPortfolioSection onOpenMediaGuide={() => setIsMediaGuideOpen(true)} />
            </div>

            {/* Simple Clear Pricing Section */}
            <div className="border-t border-zinc-800/80">
              <PricingSection 
                setActivePage={handlePageChange} 
                onSelectPlan={handleSelectPlan}
              />
            </div>
          </div>
        )}

        {/* PAGE: ABOUT */}
        {activePage === 'about' && (
          <div className="pt-24 animate-in fade-in duration-300">
            <AboutSection setActivePage={handlePageChange} />
          </div>
        )}

        {/* PAGE 3: CONTACT */}
        {activePage === 'contact' && (
          <div className="pt-24 animate-in fade-in duration-300">
            <ContactSection preselectedPlan={selectedPlanForContact} />
          </div>
        )}

      </main>

      {/* Media Guide / Upload Helper Modal */}
      <MediaGuideModal
        isOpen={isMediaGuideOpen}
        onClose={() => setIsMediaGuideOpen(false)}
        onUploadHeroPhoto={(url) => setCustomHeroPhoto(url)}
        customHeroPhoto={customHeroPhoto}
      />

      {/* Footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}
