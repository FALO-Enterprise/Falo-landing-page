import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import PricingModal from './components/PricingModal';
import ProjectModal, { ProjectData } from './components/ProjectModal';
import { ArrowUp, Mail } from 'lucide-react';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');

  const handleOpenContact = (subject = '') => {
    setContactSubject(subject);
    setContactModalOpen(true);
  };

  const handleOpenPricing = () => {
    setPricingModalOpen(true);
  };

  const handleSelectPricingTier = (tierName: string) => {
    setPricingModalOpen(false);
    handleOpenContact(`Pricing Plan: ${tierName}`);
  };

  const handleSelectService = (serviceName: string) => {
    handleOpenContact(`Service Inquiry: ${serviceName}`);
  };

  const handleOpenProject = (project: ProjectData) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{ overflowX: 'clip' }}
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-[#B600A8]/30 selection:text-white relative"
    >
      {/* 1. HERO SECTION */}
      <HeroSection
        onOpenContact={() => handleOpenContact()}
        onOpenPricing={handleOpenPricing}
      />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onOpenContact={() => handleOpenContact()} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection onOpenProject={handleOpenProject} />

      {/* Subtle Minimal Editorial Footer */}
      <footer className="relative bg-[#0C0C0C] border-t border-[#2B303A] py-12 px-6 md:px-10 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-light">
            <span className="font-semibold text-white tracking-widest text-sm">
              FALO &mdash; 3D CREATOR STUDIO
            </span>
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <a
              href="mailto:hello@falo.studio"
              className="hover:text-white transition-colors flex items-center gap-1.5 lowercase"
            >
              <Mail className="w-3.5 h-3.5 text-[#B600A8]" />
              hello@falo.studio
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70">
              <a
                href="https://artstation.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                ArtStation
              </a>
              <span className="text-white/20">&middot;</span>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Behance
              </a>
              <span className="text-white/20">&middot;</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-white/10 hover:border-white transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultSubject={contactSubject}
      />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSelectTier={handleSelectPricingTier}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        project={selectedProject}
        onClose={() => setProjectModalOpen(false)}
        onInquire={(projectName) => handleOpenContact(`Project: ${projectName}`)}
      />
    </div>
  );
}
