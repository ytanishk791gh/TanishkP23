import React, { useState, useEffect } from 'react';
import { DesignProject } from '../types';
import { designProjects } from '../data/portfolioData';
import { 
  Palette, 
  Eye, 
  Maximize2, 
  X, 
  Sparkles, 
  Layers, 
  Image as ImageIcon,
  ArrowUpRight,
  Download
} from 'lucide-react';

interface DesignPortfolioSectionProps {
  onOpenMediaGuide?: () => void;
}

export const DesignPortfolioSection: React.FC<DesignPortfolioSectionProps> = ({ onOpenMediaGuide }) => {
  const [selectedDesign, setSelectedDesign] = useState<DesignProject | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Listen for Escape key to close the lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDesign(null);
      }
    };

    if (selectedDesign) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDesign]);

  const categories = ['all', 'Photo Editing', 'Graphic Design', 'YouTube Thumbnails', 'Social Media Designs', 'Banners', 'Logos & PNG'];

  const filteredDesigns = designProjects.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'Photo Editing') return item.category.includes('Photo');
    if (activeTab === 'Graphic Design') return item.category.includes('Graphic');
    if (activeTab === 'YouTube Thumbnails') return item.category.includes('Thumbnails');
    if (activeTab === 'Social Media Designs') return item.category.includes('Social');
    if (activeTab === 'Banners') return item.category.includes('Banners');
    if (activeTab === 'Logos & PNG') return item.category.includes('Logos') || item.category.includes('PNG');
    return true;
  });

  return (
    <section id="graphic-design-section" className="py-20 relative">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-code mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>VISUAL CRAFT & ARTWORK</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Photo & Graphic Design
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              Clean, creative visuals designed for social media, creators and digital content.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === cat
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat === 'all' ? 'All Visuals' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6+ Design Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDesigns.map((design, idx) => (
            <div
              key={design.id}
              id={`design-card-${design.id}`}
              onClick={() => setSelectedDesign(design)}
              className="group relative rounded-2xl bg-zinc-950/90 border border-zinc-800/90 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_15px_35px_rgba(249,115,22,0.2)] flex flex-col justify-between"
            >
              {/* Media Slot Area */}
              <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-zinc-800/60">
                
                {design.imageUrl && (design.imageUrl.startsWith('http') || design.imageUrl.startsWith('data:')) ? (
                  /* High-Quality Image Display */
                  <div className={`w-full h-full relative overflow-hidden flex items-center justify-center ${design.id === 'des-6' ? 'bg-zinc-950 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:14px_14px]' : 'bg-black'}`}>
                    <img
                      src={design.imageUrl}
                      alt={design.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full ${design.id === 'des-6' ? 'object-contain p-5' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                      loading="lazy"
                    />
                    {/* Contrast Gradient Overlay (subtle for standard images) */}
                    {design.id !== 'des-6' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-black/50 pointer-events-none" />
                    )}

                    {/* Slot Label Overlay */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="text-[11px] font-mono-code text-orange-400 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-orange-500/30">
                        Slot {idx + 1} • {design.category}
                      </span>
                    </div>

                    {/* Dark hover overlay with quick view */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center z-20 backdrop-blur-xs">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.6)]">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        View Full Image
                      </span>
                      <span className="text-[10px] font-mono-code text-orange-300">
                        Click to Preview Lightbox
                      </span>
                    </div>

                    {/* Top-Right Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-orange-500/30 text-[10px] font-mono-code text-orange-400 z-10 shadow-md">
                      Slot #{idx + 1}
                    </div>
                  </div>
                ) : (
                  /* Visual Creative Graphic Card Display Fallback */
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black group-hover:scale-105 transition-transform duration-500">
                    
                    {/* Subtle Geometric Design Grid Accent */}
                    <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
                    
                    {/* Visual Slot Graphics */}
                    <div className="z-10 w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700/80 group-hover:border-orange-500/80 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] flex items-center justify-center transition-all duration-300 mb-3">
                      <Palette className="w-6 h-6 text-orange-400" />
                    </div>

                    <span className="z-10 font-display font-bold text-base text-white text-center tracking-wide group-hover:text-orange-300 transition-colors">
                      {design.title}
                    </span>

                    <span className="z-10 text-[11px] font-mono-code text-zinc-400 mt-1">
                      Slot {idx + 1} • {design.category}
                    </span>

                    {/* Dark hover overlay with quick view */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center z-20 backdrop-blur-xs">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        View Full Asset
                      </span>
                      <span className="text-[10px] font-mono-code text-zinc-400">
                        {design.imageUrl}
                      </span>
                    </div>

                    {/* Top-Right Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono-code text-orange-400 z-10">
                      Slot #{idx + 1}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Info */}
              <div className="p-5 bg-zinc-950 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono-code text-orange-400 uppercase font-semibold">
                      {design.category}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/50 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-colors">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-orange-300 transition-colors mb-2">
                    {design.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    {design.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supported Design Capabilities Banner */}
        <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white">
                Custom Graphics, Branding Assets & Creative Posters
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Photo Retouching • YouTube Thumbnails • Carousels • PNG Overlays • Stickers • Channel Art
              </p>
            </div>
          </div>

          <div className="text-xs font-mono-code text-zinc-400 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 shrink-0">
            Path: <span className="text-orange-400">/assets/designs/design-*.jpg</span>
          </div>
        </div>

      </div>

      {/* ==================================================== */}
      {/* DESIGN LIGHTBOX MODAL */}
      {/* ==================================================== */}
      {selectedDesign && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSelectedDesign(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800/90 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30 flex flex-col my-auto transition-all max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900/90">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h3 className="font-display font-bold text-base text-white truncate">
                    {selectedDesign.title}
                  </h3>
                  <span className="text-xs font-mono-code text-orange-400">
                    {selectedDesign.category} • Slot #{filteredDesigns.findIndex(d => d.id === selectedDesign.id) + 1}
                  </span>
                </div>
              </div>

              <button
                id="close-design-modal"
                onClick={() => setSelectedDesign(null)}
                className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0 ml-2"
                aria-label="Close design preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Design Image Canvas Area */}
            <div className={`relative w-full bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4 min-h-[260px] max-h-[68vh] ${selectedDesign.id === 'des-6' ? 'bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:14px_14px]' : ''}`}>
              {selectedDesign.imageUrl && (selectedDesign.imageUrl.startsWith('http') || selectedDesign.imageUrl.startsWith('data:')) ? (
                <div className="relative max-w-full max-h-full flex items-center justify-center">
                  <img
                    src={selectedDesign.imageUrl}
                    alt={selectedDesign.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/10] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-zinc-900 via-black to-zinc-950">
                  <div className="w-20 h-20 rounded-3xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(249,115,22,0.25)]">
                    <ImageIcon className="w-10 h-10 text-orange-400" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white mb-2">
                    {selectedDesign.title}
                  </h4>
                  <p className="text-zinc-400 text-sm max-w-md leading-relaxed mb-6">
                    {selectedDesign.description}
                  </p>
                  
                  <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300">
                    <span className="text-orange-400">Asset Path:</span> {selectedDesign.imageUrl}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-zinc-800/80 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {selectedDesign.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-orange-400/90 font-mono-code">
                High Resolution Photo
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
