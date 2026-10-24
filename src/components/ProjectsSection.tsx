import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import { ProjectData } from './ProjectModal';
import { calculateCardScale, calculateCardTop } from '../utils/math';

export const PROJECTS_DATA: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    description:
      'A bespoke 3D identity and tactile motion universe crafted for an avant-garde digital production agency, emphasizing futuristic industrial materials and raytraced chrome mechanics.',
    tools: ['Cinema 4D', 'Octane Render', 'After Effects', 'Redshift'],
    year: '2026',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    deliverables: ['3D Keyvisuals', 'Product Geometry', 'Motion Stills', 'Interactive Turnaround'],
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    description:
      'Exploration of bio-organic forms, translucent refraction textures, and atmospheric ambient illumination designed as an experimental showcase for spatial computing interfaces.',
    tools: ['Blender 4.2', 'Houdini FX', 'Substance 3D', 'Unreal Engine 5'],
    year: '2026',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    deliverables: ['Sculpted Biomes', 'Subsurface Shaders', 'Volumetric Renders', 'Design System'],
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    description:
      'High-fidelity digital twin and product visualization suite for Solaris, featuring precision engineered modular hardware components under cinematic studio rim lighting.',
    tools: ['Cinema 4D', 'Redshift', 'Figma', 'DaVinci Resolve'],
    year: '2025',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    deliverables: ['Industrial Renders', 'CAD Conversion', 'Interactive Web 3D', 'Print Collateral'],
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = calculateCardScale(index, totalCards);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const topOffset = calculateCardTop(index, 28);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(5rem + ${topOffset}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl relative transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(182,0,168,0.15)] flex flex-col justify-between"
      >
        {/* Top Row: Number, Category label, Project name, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              className="font-black text-white leading-none tracking-tighter tabular-nums select-none"
            >
              {project.number}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                {project.category}
              </span>
              <span className="hidden sm:inline text-white/30">/</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-4 sm:pt-6 items-stretch">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div
              onClick={() => onOpenProject(project)}
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191e] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="230" viewBox="0 0 400 230"><rect width="400" height="230" fill="%231a1b22"/><text x="50%" y="50%" fill="%23646973" font-family="sans-serif" font-size="14" text-anchor="middle">Render View 1</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-black/60 text-white text-xs uppercase tracking-wider backdrop-blur-sm border border-white/20">
                  Expand
                </span>
              </div>
            </div>

            <div
              onClick={() => onOpenProject(project)}
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191e] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="340" viewBox="0 0 400 340"><rect width="400" height="340" fill="%231a1b22"/><text x="50%" y="50%" fill="%23646973" font-family="sans-serif" font-size="14" text-anchor="middle">Render View 2</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-black/60 text-white text-xs uppercase tracking-wider backdrop-blur-sm border border-white/20">
                  Expand
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image */}
          <div className="md:col-span-7">
            <div
              onClick={() => onOpenProject(project)}
              className="relative w-full h-[260px] sm:h-[320px] md:h-full min-h-[260px] md:min-h-[400px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191e] border border-white/5 cursor-pointer group"
            >
              <img
                src={project.col2Image}
                alt={`${project.name} hero render`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%231a1b22"/><text x="50%" y="50%" fill="%23646973" font-family="sans-serif" font-size="16" text-anchor="middle">Main Keyvisual</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-5 py-2 rounded-full bg-black/60 text-white text-xs uppercase tracking-wider backdrop-blur-sm border border-white/20">
                  View Case Study
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Project" (singular) */}
        <FadeIn delay={0} y={40} className="mb-14 sm:mb-20 text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 sticky-stacking cards */}
        <div className="relative space-y-12 sm:space-y-16">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
