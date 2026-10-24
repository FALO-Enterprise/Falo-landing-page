import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Sparkles, Layers, Box, Cpu } from 'lucide-react';
import ContactButton from './ContactButton';

export interface ProjectData {
  number: string;
  name: string;
  category: 'Client' | 'Personal';
  description: string;
  tools: string[];
  year: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  deliverables: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onInquire,
}) => {
  const [activeImage, setActiveImage] = useState<string>(project?.col2Image || '');

  useEffect(() => {
    if (project) {
      setActiveImage(project.col2Image);
    }
  }, [project]);

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

  if (!isOpen || !project) return null;

  const allImages = [project.col2Image, project.col1Image1, project.col1Image2];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#121316] border border-[#2B303A] rounded-[36px] p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close project showcase"
          className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/70 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Showcase Image & Gallery Selector */}
          <div className="w-full lg:w-3/5 space-y-4">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-[28px] overflow-hidden bg-black/50 border border-[#2B303A]">
              <img
                src={activeImage || project.col2Image}
                alt={`${project.name} 3D render preview`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231a1b22"/><text x="50%" y="50%" fill="%23d7e2ea" font-family="sans-serif" font-size="20" text-anchor="middle">3D Artwork Render</text></svg>';
                }}
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#D7E2EA] border border-white/10">
                {project.category} Showcase
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img
                      ? 'border-[#B600A8] scale-102 shadow-lg shadow-[#B600A8]/20'
                      : 'border-[#2B303A] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-2">
                <span className="font-mono text-[#B600A8] font-bold text-sm">
                  {project.number}
                </span>
                <span>/</span>
                <span>{project.category}</span>
                <span>/</span>
                <span>{project.year}</span>
              </div>

              <h2 id="project-modal-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                {project.name}
              </h2>

              <p className="text-sm text-[#D7E2EA]/80 leading-relaxed mb-6 font-light">
                {project.description}
              </p>

              <div className="space-y-4 pt-2 border-t border-[#2B303A]">
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-[#B600A8]" /> Core Deliverables
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#D7E2EA]/80">
                    {project.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B600A8]" /> Tools & Engine Pipeline
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[#D7E2EA]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2B303A] flex flex-col sm:flex-row items-center gap-3">
              <ContactButton
                label="Commission Similar"
                onClick={() => {
                  onClose();
                  onInquire(project.name);
                }}
                className="w-full sm:w-auto"
              />
              <a
                href={activeImage}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-white/10 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>View Full 4K</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
