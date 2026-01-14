'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero({ id }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Get base path for GitHub Pages compatibility
  const basePath = process.env.BASE_PATH || '';

  // Video sources based on theme
  const videoSrc = isDark ? `${basePath}/videos/Hero dark.mp4` : `${basePath}/videos/Hero light.mp4`;

  return (
    <section
      id={id}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        key={videoSrc} // Force re-render when theme changes
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        {/* WebM format (better compression) */}
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        {/* MP4 fallback for broader compatibility */}
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-title font-black text-white mb-6 leading-none tracking-tight">
          LACQ FEYNMAN
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
          Liga Acadêmica de Computação Quântica
        </p>

        {/* Optional: Call to action or scroll indicator */}
        <div className="mt-12 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white/70 text-sm mt-2">{t('heroScrollText')}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }

        .scroll-indicator {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
