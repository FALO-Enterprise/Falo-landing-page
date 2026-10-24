import React, { useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

const TIERS = [
  {
    name: 'Concept & 3D Still',
    price: '$2,400',
    description: 'Perfect for startups and indie brands seeking high-impact hero visual assets.',
    features: [
      '1 bespoke 3D hero model & composition',
      '3 ultra-high-resolution renders (8K)',
      'Custom lighting & material shaders',
      'Transparent PNGs + source project files',
      '2 revision rounds included',
    ],
    highlight: false,
  },
  {
    name: 'Commercial Keyvisuals',
    price: '$4,800',
    description: 'Comprehensive 3D visual language for product launches and campaigns.',
    features: [
      'Multi-angle product & environment suite',
      '6 high-res hero renders + detail closeups',
      'Turnaround 360-degree interactive view',
      'Social cutouts & web-optimized assets',
      'Cinema 4D / Blender master scenes',
      '3 revision rounds included',
    ],
    highlight: true,
  },
  {
    name: 'Dynamic Motion & Brand',
    price: '$8,500',
    description: 'Cinematic 3D animation and full sensory visual identity package.',
    features: [
      '15–30s photorealistic 3D motion reel',
      'Full brand asset integration & typography',
      'Custom simulation (cloth, fluids, particles)',
      'Sound design & audio mixing ready',
      'Multi-format delivery (16:9, 9:16, 1:1)',
      'Dedicated project Slack channel',
    ],
    highlight: false,
  },
];

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#141416] border border-[#2B303A] rounded-[36px] p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close pricing dialog"
          className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Direct & Transparent
          </span>
          <h2 id="pricing-modal-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            3D Production Rates
          </h2>
          <p className="text-sm text-[#D7E2EA]/70 mt-2 max-w-lg mx-auto">
            Flexible production packages built for creators, design agencies, and ambitious brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl p-6 border transition-all ${
                tier.highlight
                  ? 'bg-[#1b1c22] border-[#B600A8] shadow-lg shadow-[#B600A8]/10'
                  : 'bg-[#0E0F12] border-[#2B303A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider">
                    {tier.name}
                  </h3>
                  {tier.highlight && (
                    <span className="text-[10px] font-semibold tracking-widest uppercase bg-[#B600A8]/20 text-[#B600A8] border border-[#B600A8]/40 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-2 tabular-nums">
                  {tier.price}
                </div>
                <p className="text-xs text-[#D7E2EA]/70 mb-5 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#D7E2EA]/90">
                      <Check className="w-3.5 h-3.5 text-[#B600A8] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectTier(tier.name);
                }}
                className={`w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white hover:brightness-110 shadow-md'
                    : 'border border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-white/10'
                }`}
              >
                Inquire For {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
