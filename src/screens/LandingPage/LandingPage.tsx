import React from 'react';
import { ArrowUpIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from '../../components/Header/Header';
import { Hero } from '../../components/Hero/Hero';
import { Features } from '../../components/Features/Features';
import { About } from '../../components/About/About';
import { Services } from '../../components/Services/Services';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import { Contact } from '../../components/Contact/Contact';
import { FAQ } from '../../components/FAQ/FAQ';
import { Footer } from '../../components/Footer/Footer';

export const LandingPage = (): JSX.Element => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f8f5f9] min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <About />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Button
        variant="ghost"
        onClick={scrollToTop}
        className="fixed bottom-[73px] right-[176px] w-9 h-9 bg-[#f7f7f7] rounded-[18px] p-0 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-[13px] h-[11px]" />
      </Button>
    </div>
  );
};