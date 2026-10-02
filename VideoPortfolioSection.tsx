import React, { useState, useEffect, useRef } from 'react';
import { VideoProject } from '../types';
import { videoProjects, videoEditingSkills, toolsList } from '../data/portfolioData';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  X, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Film, 
  Wrench,
  Clock,
  Layers,
  Flame,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

interface VideoPortfolioSectionProps {
  onOpenMediaGuide?: () => void;
}

export const VideoPortfolioSection: React.FC<VideoPortfolioSectionProps> = ({ onOpenMediaGuide }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close modal on ESC key and reset video state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          handleCloseModal();
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [selectedVideo]);

  const handleOpenVideo = (project: VideoProject) => {
    setVideoError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
    setSelectedVideo(project);
  };

  const handleCloseModal = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
    setVideoError(false);
    setIsFullscreen(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreenContainerRef.current) return;
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const categories = ['all', 'Cinematic', 'Reels', 'Commercial', 'YouTube'];

  const filteredProjects = videoProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Cinematic') return project.title.includes('Cinematic') || project.category.includes('Cinematic');
    if (activeFilter === 'Reels') return project.title.includes('Reel') || project.category.includes('Reel');
    if (activeFilter === 'Commercial') return project.title.includes('Advertisement') || project.category.includes('Commercial');
    if (activeFilter === 'YouTube') return project.title.includes('YouTube') || project.category.includes('Retention');
    return true;
  });

  return (
    <section id="video-editing-section" className="py-20 relative">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Video Editing
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              I create engaging, cinematic and high-retention video content for creators, brands and social platforms.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat === 'all' ? 'All Videos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`video-card-${project.id}`}
              onClick={() => handleOpenVideo(project)}
              className="group relative rounded-2xl bg-zinc-950/90 border border-zinc-800/90 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] cursor-pointer flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative rounded-xl overflow-hidden bg-zinc-900 aspect-video sm:aspect-[16/10] mb-5 border border-zinc-800/80 flex items-center justify-center">
                
                {/* Visual Thumbnail representation */}
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black group-hover:scale-105 transition-transform duration-500">
                  {/* Subtle video timeline background visualization */}
                  <div className="absolute inset-0 opacity-20 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-between items-center text-[9px] font-mono-code text-zinc-500">
                      <span>{project.title}</span>
                      <span>{project.duration}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-3/4 bg-orange-500/40 rounded-full"></div>
                      <div className="h-1.5 w-1/2 bg-zinc-700 rounded-full"></div>
                      <div className="h-1.5 w-5/6 bg-amber-500/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* Aesthetic Project Visual Graphics */}
                  <div className="z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 group-hover:border-orange-500/80 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 mb-3">
                      <Play className="w-7 h-7 text-orange-500 fill-orange-500/30 ml-1 group-hover:text-orange-400 group-hover:fill-orange-400/50" />
                    </div>
                    <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-widest">
                      Click to Preview Reel
                    </span>
                  </div>

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono-code text-orange-400">
                    {project.duration || '4K Edit'}
                  </div>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-[10px] font-mono-code text-zinc-300">
                    Slot {idx + 1}
                  </div>
                </div>

                {/* Hover Glow Highlight Overlay */}
                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Card Meta Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-code text-orange-400 uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/60 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide mb-2 group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/70">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================== */}
        {/* VIDEO EDITING SKILLS SECTION (Clean Tag Badges) */}
        {/* ==================================================== */}
        <div className="rounded-3xl bg-zinc-950/80 border border-zinc-800/90 p-8 sm:p-10 mb-16 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono-code mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPERTISE & TECHNIQUES</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Video Editing Skills
              </h3>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              Specialized technical editing capabilities mastered over 5+ years of daily creation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {videoEditingSkills.map((skill) => (
              <div
                key={skill}
                className="group px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-850 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-200 flex items-center gap-2 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform"></span>
                <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* TOOLS I USE SECTION (Clean Text Badges) */}
        {/* ==================================================== */}
        <div className="rounded-3xl bg-zinc-950/80 border border-zinc-800/90 p-8 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono-code mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>TOOLKIT & WORKFLOW</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Tools I Use
              </h3>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              The creative applications used to craft, keyframe, style, and polish every visual deliverable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {toolsList.map((tool) => (
              <div
                key={tool.name}
                className="group p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-850 transition-all duration-300 flex flex-col justify-between h-28"
              >
                <div className="flex items-center justify-between">
                  <span className="w-2 h-2 rounded-full bg-orange-500/60 group-hover:bg-orange-400"></span>
                  <span className="text-[10px] font-mono-code text-zinc-400">PRO</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    {tool.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==================================================== */}
      {/* VIDEO PREVIEW MODAL & 9:16 FULLSCREEN CONTAINER */}
      {/* ==================================================== */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            ref={fullscreenContainerRef}
            className={`relative overflow-hidden bg-black flex items-center justify-center transition-all ${
              isFullscreen 
                ? 'w-screen h-screen fixed inset-0 z-[100]' 
                : 'w-full max-w-[340px] sm:max-w-[390px] md:max-w-[420px] rounded-3xl border border-zinc-800 shadow-[0_0_60px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30 flex-col my-auto'
            }`}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
          >
            {/* Modal Header (visible in normal modal or in fullscreen when controls are visible) */}
            <div className={`w-full flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 z-20 transition-opacity duration-300 ${
              isFullscreen ? (controlsVisible ? 'absolute top-0 left-0 right-0 opacity-100' : 'opacity-0 pointer-events-none') : 'relative'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                  <Film className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <h3 className="font-display font-bold text-sm text-white truncate">
                    {selectedVideo.title}
                  </h3>
                  <span className="text-[11px] font-mono-code text-orange-400">
                    {selectedVideo.category} • {selectedVideo.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button
                  id="toggle-fullscreen-top-btn"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Toggle Fullscreen"
                  title="Toggle Fullscreen (9:16)"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  id="close-video-modal"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dedicated 9:16 Video Stage Container */}
            <div 
              className={`relative bg-black flex items-center justify-center overflow-hidden group ${
                isFullscreen 
                  ? 'max-w-full max-h-full shadow-2xl' 
                  : 'aspect-[9/16] max-h-[64vh] sm:max-h-[68vh] w-full'
              }`}
              style={
                isFullscreen 
                  ? {
                      width: 'min(100vw, calc(100vh * 9 / 16))',
                      height: 'min(100vh, calc(100vw * 16 / 9))',
                      aspectRatio: '9 / 16'
                    }
                  : undefined
              }
            >
              {!videoError ? (
                <>
                  <video
                    ref={videoRef}
                    id={`player-${selectedVideo.id}`}
                    src={selectedVideo.videoUrl}
                    playsInline
                    autoPlay
                    preload="auto"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onError={() => setVideoError(true)}
                    onClick={togglePlay}
                    className="w-full h-full object-contain bg-black cursor-pointer"
                  />

                  {/* Centered Large Play Button when Paused */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer pointer-events-auto z-10 animate-in fade-in duration-150"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-black ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Video Overlay Controls Bar */}
                  <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20 transition-opacity duration-300 ${
                    controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    
                    {/* Scrub Progress Bar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-zinc-700/80 accent-orange-500 rounded-lg cursor-pointer transition-all hover:h-2"
                      />
                    </div>

                    {/* Bottom Controls Row */}
                    <div className="flex items-center justify-between text-xs font-mono-code text-zinc-300 pt-0.5">
                      
                      {/* Play/Pause & Time */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-orange-400 transition-colors p-1"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </button>

                        <span className="text-[11px] text-zinc-300">
                          {formatSeconds(currentTime)} / {formatSeconds(duration || 18)}
                        </span>
                      </div>

                      {/* Volume & Fullscreen Actions */}
                      <div className="flex items-center gap-2">
                        {/* Volume / Mute */}
                        <div className="flex items-center gap-1.5 group/vol">
                          <button
                            onClick={toggleMute}
                            className="text-zinc-300 hover:text-white transition-colors p-1"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-4 h-4 text-orange-400" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-12 h-1 bg-zinc-700 accent-orange-500 rounded-lg cursor-pointer hidden sm:block"
                          />
                        </div>

                        {/* Fullscreen Button */}
                        <button
                          onClick={toggleFullscreen}
                          className="p-1 text-zinc-300 hover:text-orange-400 transition-colors ml-1"
                          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (Strict 9:16)'}
                          aria-label="Toggle 9:16 Fullscreen"
                        >
                          {isFullscreen ? (
                            <Minimize2 className="w-4 h-4" />
                          ) : (
                            <Maximize2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                </>
              ) : (
                /* Direct Video URL Required Error State */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-3 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-base text-white mb-1">
                    Direct Video URL Required
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-4">
                    Unable to stream video from this source. Please ensure the URL points directly to an accessible video file.
                  </p>
                  <div className="text-[10px] font-mono-code bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-zinc-400 break-all max-w-[260px] line-clamp-3">
                    {selectedVideo.videoUrl}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (only in normal modal mode) */}
            {!isFullscreen && (
              <div className="w-full px-4 py-3 border-t border-zinc-800/80 bg-zinc-900/90 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                  {selectedVideo.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 font-medium whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono-code text-orange-400/90 shrink-0 font-semibold">
                  9:16 Vertical
                </span>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
