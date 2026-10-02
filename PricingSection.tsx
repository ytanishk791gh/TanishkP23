import React from 'react';
import { ActivePage } from '../types';
import { pricingPlans } from '../data/portfolioData';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  CreditCard, 
  Clock, 
  Zap, 
  ShieldCheck,
  MessageCircle,
  Film
} from 'lucide-react';

interface PricingSectionProps {
  setActivePage: (page: ActivePage) => void;
  onSelectPlan?: (planTitle: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  setActivePage,
  onSelectPlan 
}) => {

  const handleGetStarted = (planTitle: string) => {
    if (onSelectPlan) {
      onSelectPlan(planTitle);
    }
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="pricing-section" className="py-20 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-code mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSPARENT RATES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Simple, Clear Pricing.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Straightforward pricing tailored for creators, personal brands, and businesses looking for consistent, high-impact edits.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {pricingPlans.map((plan) => {
            const isHighlight = plan.isHighlighted;
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border-2 border-orange-500/80 shadow-[0_0_50px_rgba(249,115,22,0.25)] lg:-translate-y-2'
                    : 'bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700'
                }`}
              >
                {/* Highlight Badge */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black text-[11px] font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge || 'POPULAR CHOICE'}</span>
                  </div>
                )}

                <div>
                  {/* Title & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-black text-2xl text-white">
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-orange-400 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <Clock className="w-3 h-3" />
                      <span>{plan.duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-zinc-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-zinc-400 text-sm font-medium">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-orange-400/90 font-medium mt-2">
                      Suitable for: <span className="text-zinc-300">{plan.suitableFor}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] uppercase tracking-wider font-mono-code text-zinc-400 font-semibold mb-2">
                      What&apos;s Included:
                    </div>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${isHighlight ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-orange-400'}`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  id={`pricing-btn-${plan.id}`}
                  onClick={() => handleGetStarted(plan.title)}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isHighlight
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-orange-500/50'
                  }`}
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Requirements Note Banner */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-300 font-medium mb-1">
            <MessageCircle className="w-4 h-4 text-orange-400" />
            <span>Custom requirements can be discussed before starting.</span>
          </div>
          <p className="text-xs text-zinc-400">
            Have a bulk project, unique visual style, or urgent timeline? Message directly on WhatsApp to coordinate.
          </p>
        </div>

      </div>
    </section>
  );
};
