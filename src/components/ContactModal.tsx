import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Sparkles, Mail, MessageSquare } from 'lucide-react';
import ContactButton from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling & Rendering',
    budget: '$3,000 - $7,500',
    message: defaultSubject ? `Inquiring regarding ${defaultSubject}: ` : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultSubject) {
      setFormData(prev => ({
        ...prev,
        message: `Inquiring regarding ${defaultSubject}: `,
      }));
    }
  }, [defaultSubject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      service: '3D Modeling & Rendering',
      budget: '$3,000 - $7,500',
      message: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#141416] border border-[#2B303A] rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close contact dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
              Message Received
            </h3>
            <p className="text-[#D7E2EA]/80 max-w-md mx-auto text-sm leading-relaxed">
              Thanks for reaching out! The Falo team will review your project requirements and respond to{' '}
              <span className="text-white font-medium">{formData.email}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-white/10 transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Start A Collaboration
              </span>
              <h2 id="contact-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Let&apos;s Build Something Incredible
              </h2>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">
                Tell me about your 3D assets, brand visual identity, or motion design needs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/80 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#2B303A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#B600A8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/80 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#2B303A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#B600A8] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/80 mb-1.5">
                    Service Scope
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#2B303A] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                  >
                    <option value="3D Modeling & Rendering">3D Modeling & Rendering</option>
                    <option value="Motion Design & Animation">Motion Design & Animation</option>
                    <option value="Full Brand Visual Identity">Full Brand Visual Identity</option>
                    <option value="Web Design & Creative Dev">Web Design & Creative Dev</option>
                    <option value="Other / Bespoke 3D Suite">Other / Bespoke 3D Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/80 mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#2B303A] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                  >
                    <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    <option value="$3,000 - $7,500">$3,000 - $7,500</option>
                    <option value="$7,500 - $15,000">$7,500 - $15,000</option>
                    <option value="$15,000+">$15,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/80 mb-1.5">
                  Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your concept, deliverables, references or deadlines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#2B303A] rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-[#D7E2EA]/60 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> hello@falo.studio
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-white font-medium uppercase tracking-wider text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
