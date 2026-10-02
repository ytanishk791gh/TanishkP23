import React from 'react';
import { ActivePage } from '../types';
import { personalInfo, workflowSteps } from '../data/portfolioData';
import { 
  User, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Film, 
  Palette, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface AboutSectionProps {
  setActivePage: (page: ActivePage) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setActivePage }) => {
  return (
    <section id="about-section" className="py-20 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-4">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT THE CREATOR</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Crafting Visual Stories That Hold Attention.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed">
            I am Tanishk Yadav — a dedicated video editor and visual designer with over 5+ years of hands-on experience turning raw footage into impactful, high-retention video content and eye-catching visual designs.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Personal Philosophy & Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-zinc-950/80 border border-zinc-800/90 p-8">
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2.5">
                <Target className="w-5 h-5 text-orange-400" />
                <span>My Approach To Editing</span>
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                Great video editing is invisible when it needs to be and electrifying when the moment demands it. Over the last 5+ years, I have honed the craft of rhythmic pacing, seamless transitions, sound design that drives emotion, and color grading that elevates atmosphere.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-orange-400 font-display font-black text-2xl mb-1">5+ Years</div>
                  <div className="text-xs text-zinc-300 font-medium">Daily Creative Experience</div>
                  <p className="text-[11px] text-zinc-400 mt-1">Deep mastery over video rhythms and visual aesthetics.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-amber-400 font-display font-black text-2xl mb-1">Retention First</div>
                  <div className="text-xs text-zinc-300 font-medium">Built For Modern Viewers</div>
                  <p className="text-[11px] text-zinc-400 mt-1">Hooks, speed ramping, and captions tailored for engagement.</p>
                </div>
              </div>
            </div>

            {/* Quick Principles */}
            <div className="rounded-3xl bg-zinc-950/80 border border-zinc-800/90 p-8 space-y-4">
              <h3 className="font-display font-bold text-lg text-white mb-2">
                What You Can Expect Working With Me:
              </h3>
              
              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <div className="mt-1 rounded-full p-0.5 bg-orange-500/20 text-orange-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white">Direct Communication:</strong> You work directly with me (Tanishk), ensuring your vision is understood and executed without unnecessary intermediaries.
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <div className="mt-1 rounded-full p-0.5 bg-orange-500/20 text-orange-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white">Pacing & Sound Detail:</strong> Every beat, sound effect (SFX), and transition is placed with intent to keep viewers hooked from the first second.
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <div className="mt-1 rounded-full p-0.5 bg-orange-500/20 text-orange-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white">Design Consistency:</strong> Matching thumbnails, banners, and overlays to create a cohesive brand identity for your channel or page.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Workflow */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-zinc-950/80 border border-zinc-800/90 p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono-code mb-4">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>STEP-BY-STEP PROCESS</span>
              </div>
              
              <h3 className="font-display font-black text-2xl text-white mb-6">
                How A Project Unfolds
              </h3>

              <div className="space-y-6">
                {workflowSteps.map((item, i) => (
                  <div key={item.step} className="flex items-start gap-4 relative">
                    {/* Step Number Circle */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-orange-500/30 text-orange-400 font-mono-code font-bold text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Connecting line */}
                    {i < workflowSteps.length - 1 && (
                      <div className="absolute top-10 left-5 w-[1px] h-6 bg-zinc-800 -translate-x-1/2 pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Direct CTA */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <button
                  onClick={() => setActivePage('contact')}
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                  <span>DISCUSS YOUR PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
