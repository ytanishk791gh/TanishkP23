import React, { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { personalInfo } from '../data/portfolioData';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Film, 
  Palette, 
  User, 
  Mail,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenMediaHelper?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activePage, 
  setActivePage,
  onOpenMediaHelper 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'work', label: 'Work', icon: <Film className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-orange-500/30 flex items-center justify-center group-hover:border-orange-500/80 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300">
              <span className="font-display font-black text-orange-500 text-sm tracking-tight">T23</span>
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-orange-400 transition-colors">
                {personalInfo.username}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono-code">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available for Projects</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-zinc-800 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenMediaHelper && (
              <button
                id="nav-media-helper-btn"
                onClick={onOpenMediaHelper}
                title="Asset & Media Guide"
                className="p-2 rounded-full text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/60 border border-zinc-800 hover:border-orange-500/30 transition-all text-xs flex items-center gap-1.5 px-3"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono-code">Media Files</span>
              </button>
            )}

            <button
              id="nav-cta-work-together"
              onClick={() => handleNavClick('contact')}
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-[1px] focus:outline-none"
            >
              <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-950 group-hover:bg-opacity-80 transition-all text-xs font-semibold uppercase tracking-wider text-orange-400 group-hover:text-white">
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/40 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-4 pt-4 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800/80 text-white border border-orange-500/40 text-orange-400'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-orange-500' : 'text-zinc-500'}>{item.icon}</span>
                    <span className="uppercase tracking-wider">{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                </button>
              );
            })}

            <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
              <button
                id="mobile-nav-cta"
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {onOpenMediaHelper && (
                <button
                  id="mobile-nav-media-guide"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMediaHelper();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono-code flex items-center justify-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Media Files & Upload Guide</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
