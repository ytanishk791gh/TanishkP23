import React from 'react';
import { ActivePage } from '../types';
import { personalInfo } from '../data/portfolioData';
import { 
  Instagram, 
  Linkedin, 
  MessageSquare, 
  Mail, 
  ArrowUp, 
  Heart,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
              <span className="font-display font-black text-xl text-white tracking-wider">
                {personalInfo.username}
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              {personalInfo.name} — Video Editor & Visual Designer
            </p>
          </div>

          {/* Clickable Social & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              id="footer-whatsapp-link"
              href={`https://wa.me/${personalInfo.whatsappRaw}?text=${encodeURIComponent(`Hi Tanishk, I'm reaching out from your portfolio.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              id="footer-instagram-link"
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-pink-500/50 hover:text-pink-400 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a
              id="footer-linkedin-link"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/50 hover:text-blue-400 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              id="footer-email-link"
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/50 hover:text-orange-400 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-zinc-400 hover:text-white transition-all hover:scale-110"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name} ({personalInfo.username}). All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>5+ Years Video Editing & Visual Design</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
