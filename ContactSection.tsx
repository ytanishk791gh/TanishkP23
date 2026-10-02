import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  MessageSquare, 
  Instagram, 
  Linkedin, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Phone, 
  CheckCircle2,
  Clock,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface ContactSectionProps {
  preselectedPlan?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedPlan }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>(preselectedPlan || 'Short Video (Reels/Shorts)');
  const [clientName, setClientName] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState<string>('');

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Generate customized WhatsApp URL
  const generateWhatsAppUrl = () => {
    let message = `Hi Tanishk! I saw your portfolio (${personalInfo.username}).`;
    if (clientName) message += ` My name is ${clientName}.`;
    message += ` I'm interested in: ${projectType}.`;
    if (projectDetails) message += ` Project details: ${projectDetails}`;
    return `https://wa.me/${personalInfo.whatsappRaw}?text=${encodeURIComponent(message)}`;
  };

  // Generate customized Mailto URL
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${clientName || 'New Project'}`);
    let body = `Hi Tanishk,\n\nI came across your portfolio (${personalInfo.username}) and would like to discuss a project.\n\nProject Type: ${projectType}\n`;
    if (clientName) body += `Name: ${clientName}\n`;
    if (projectDetails) body += `\nDetails:\n${projectDetails}\n`;
    body += `\nLooking forward to hearing from you!`;
    return `mailto:${personalInfo.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      handle: personalInfo.whatsapp,
      label: 'Fastest Response • Direct Chat',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      url: generateWhatsAppUrl(),
      rawCopy: personalInfo.whatsapp,
      isPrimary: true,
      color: 'from-emerald-500/20 to-zinc-900 border-emerald-500/40 hover:border-emerald-500',
    },
    {
      id: 'email',
      name: 'Email Address',
      handle: personalInfo.email,
      label: 'Formal Briefs & File Inquiries',
      icon: <Mail className="w-5 h-5 text-orange-400" />,
      url: generateMailtoUrl(),
      rawCopy: personalInfo.email,
      isPrimary: false,
      color: 'from-orange-500/20 to-zinc-900 border-orange-500/40 hover:border-orange-500',
    },
    {
      id: 'instagram',
      name: 'Instagram Profile',
      handle: '@tanishk_023',
      label: 'DM & Follow Creative Updates',
      icon: <Instagram className="w-5 h-5 text-pink-400" />,
      url: personalInfo.instagram,
      rawCopy: personalInfo.instagram,
      isPrimary: false,
      color: 'from-pink-500/20 to-zinc-900 border-pink-500/40 hover:border-pink-500',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      handle: 'Tanishk Yadav',
      label: 'Professional Network & Inquiries',
      icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      url: personalInfo.linkedin,
      rawCopy: personalInfo.linkedin,
      isPrimary: false,
      color: 'from-blue-500/20 to-zinc-900 border-blue-500/40 hover:border-blue-500',
    },
  ];

  return (
    <section id="contact-section" className="py-20 relative">
      {/* Background Ambient Orange Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S COLLABORATE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Let&apos;s Create Something Great.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Have a video, design or content idea? Let&apos;s talk.
          </p>
        </div>

        {/* 4 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => {
            const isCopied = copiedField === method.id;
            return (
              <div
                key={method.id}
                id={`contact-card-${method.id}`}
                className={`relative rounded-3xl p-6 bg-zinc-950/90 border border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group ${
                  method.isPrimary ? 'border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.15)]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {method.icon}
                    </div>

                    <button
                      id={`copy-btn-${method.id}`}
                      onClick={() => copyToClipboard(method.rawCopy, method.id)}
                      title="Copy to clipboard"
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-zinc-400 hover:text-white transition-colors"
                      aria-label={`Copy ${method.name}`}
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <span className="text-[11px] font-mono-code text-orange-400 uppercase tracking-wider">
                    {method.name}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1 break-all group-hover:text-orange-300 transition-colors">
                    {method.handle}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {method.label}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  <a
                    id={`open-link-${method.id}`}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      method.isPrimary
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span>Connect Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* INTERACTIVE PROJECT INQUIRY COMPOSER */}
        {/* ==================================================== */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-950/90 border border-zinc-800/90 p-8 sm:p-10 mb-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono-code mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>QUICK MESSAGE BUILDER</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Send Project Brief Directly
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online • Direct Response</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* 1. Project Type Selector */}
            <div>
              <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2.5">
                1. Select Service / Project Type:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Short Video (₹400)',
                  'Long Video (₹800)',
                  'Monthly Package (₹8,999)',
                  'Graphic Design / Custom'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`p-3 rounded-xl text-xs font-semibold tracking-wide border transition-all text-center ${
                      projectType === type
                        ? 'bg-orange-500 text-black border-orange-500 font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Client Name Input */}
            <div>
              <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2">
                2. Your Name or Channel / Brand Handle (Optional):
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Alex / @creativechannel"
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans"
              />
            </div>

            {/* 3. Details */}
            <div>
              <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2">
                3. Brief Details or Reference Style (Optional):
              </label>
              <textarea
                rows={3}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Tell me a bit about your video footage, duration, deadline, or design requirements..."
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans"
              />
            </div>

            {/* Submit Action Buttons (WhatsApp & Mailto) */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                id="contact-form-whatsapp-btn"
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Via WhatsApp (+91 77239 16961)</span>
              </a>

              <a
                id="contact-form-email-btn"
                href={generateMailtoUrl()}
                className="py-4 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                <span>Send Via Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* FINAL LARGE CTA: START A PROJECT (Opens WhatsApp) */}
        {/* ==================================================== */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-orange-500/60 p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.2)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-xs font-mono-code text-orange-400 uppercase tracking-widest font-bold mb-3 block">
              READY TO ELEVATE YOUR CONTENT?
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
              Let&apos;s Bring Your Vision To Life.
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Message directly on WhatsApp for instant project discussions, raw footage transfers, or monthly content collaboration.
            </p>

            <a
              id="final-cta-start-project"
              href={`https://wa.me/${personalInfo.whatsappRaw}?text=${encodeURIComponent(`Hi Tanishk (${personalInfo.username}), I'm ready to start a project with you!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-black font-display font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3]" />
            </a>

            <div className="flex items-center justify-center gap-4 text-xs font-mono-code text-zinc-400 mt-6">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.whatsapp}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
