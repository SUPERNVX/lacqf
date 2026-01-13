'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageDropdown from './LanguageDropdown';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedThemeToggler } from './ThemeToggle';
import DesktopNavigation from './Navigation/DesktopNavigation';
import MobileNavigation from './Navigation/MobileNavigation';

const Navigation = ({ sections }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  // Use Intersection Observer API for more efficient active section detection
  useEffect(() => {
    let scrollThrottled = false;
    
    const handleScroll = () => {
      if (!scrollThrottled) {
        scrollThrottled = true;
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsScrolled(scrollTop > 10);
          scrollThrottled = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Set up Intersection Observer for section detection
    const sectionElements = sections.map(section => 
      document.getElementById(section.id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.5, 
        rootMargin: '-20% 0px -70% 0px' 
      }
    );

    sectionElements.forEach(el => el && observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionElements.forEach(el => el && observer.unobserve(el));
    };
  }, [sections]); // Now we need sections dependency for observer setup

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  }, [setIsMobileMenuOpen]);

  return (
    <>
      {/* Accessibility: let keyboard users skip the header quickly */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:border skip-link"
      >
        Pular para conteúdo principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md border-b py-2 nav-header-scrolled' 
            : 'py-4 nav-header-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-bold font-title focus:outline-none focus:ring-2 focus:rounded nav-link"
            >
              <Image
                src="/images/lacqf/logo.webp"
                alt="LACQ Feynman Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span>LACQ Feynman</span>
            </Link>

            {/* Mobile menu button — toggles an inline drawer below the header */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:rounded mobile-menu-btn"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div className="hidden md:flex items-center gap-6">
                <DesktopNavigation 
                  sections={sections} 
                  activeSection={activeSection} 
                  scrollToSection={scrollToSection} 
                />
                <div className="flex items-center gap-4">
                  <AnimatedThemeToggler />
                  <LanguageDropdown />
                </div>
              </div>
            </div>
          </div>

          {/* The mobile drawer appears below the header when open */}
          <MobileNavigation 
            sections={sections} 
            activeSection={activeSection} 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
            scrollToSection={scrollToSection} 
          />
        </div>
      </header>

      <div className="h-14 md:h-16 lg:h-20" />
    </>
  );
};

export default Navigation;
