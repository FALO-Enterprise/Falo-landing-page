import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onOpenPricing,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar with Old Logo on the Left and Nav Links on the Right */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <header className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8">
          {/* Old Logo on Top Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
            aria-label="Falo Studio Home"
          >
            <img
              src="/assets/aistudio/falo-logo-transparent.png"
              alt="Falo Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_12px_rgba(182,0,168,0.4)]"
            />
            <span className="font-black tracking-widest uppercase text-base sm:text-lg md:text-xl text-white group-hover:text-[#D7E2EA] transition-colors">
              Falo
            </span>
          </a>

          {/* Nav Links on the Right */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-4 sm:gap-7 md:gap-9 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.3rem]"
          >
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onOpenPricing}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Price
            </button>
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 px-2 sm:px-4">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[10vw] sm:text-[11vw] md:text-[11.6vw] lg:text-[12.2vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, we are falo
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Center Emblem: New Neon Glass Star Emblem with Magnetic Effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[300px] md:w-[380px] lg:w-[440px] top-1/2 -translate-y-1/2 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="https://i.imgur.com/G9oDriL.png"
              alt="Falo 3D Neon Glass Star Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_45px_rgba(182,0,168,0.45)] drop-shadow-[0_30px_70px_rgba(89,230,252,0.3)] filter brightness-105"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full gap-4">
        <FadeIn delay={0.35} y={20} className="shrink-1">
          <p
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            a modern technology studio specializing in software development, web applications, and innovative digital solutions that help businesses grow and succeed in the digital world.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="shrink-0">
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
