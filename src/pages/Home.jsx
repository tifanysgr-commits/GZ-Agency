import React from 'react';
import { LanguageProvider } from '../components/gz/LanguageContext.jsx';
import NavBar from '../components/gz/NavBar';
import HeroSection from '../components/gz/HeroSection';
import PortfolioSection from '../components/gz/PortfolioSection';
import PricingSection from '../components/gz/PricingSection';
import Footer from '../components/gz/Footer';
import SEOHead from '../components/gz/SEOHead';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white antialiased overflow-x-hidden">
        <SEOHead />
        <div className="relative">
          <HeroSection />
          <div className="fixed inset-x-0 top-0 z-20">
            <NavBar />
          </div>
        </div>
        <PortfolioSection />
        <PricingSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
  
}