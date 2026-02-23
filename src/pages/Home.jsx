import React from 'react';
import { LanguageProvider } from '../components/gz/LanguageContext.jsx';
import TopBar from '../components/gz/TopBar';
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
        <TopBar />
        <NavBar />
        <HeroSection />
        <PortfolioSection />
        <PricingSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
  
}