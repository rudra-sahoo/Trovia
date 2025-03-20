import React from 'react';
import { Button } from '../ui/button';

export const About: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#f5edfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-neutral-800 mb-8">
            ABOUT US
          </h2>
          <p className="text-[#5f5f5f] text-lg max-w-4xl mx-auto leading-relaxed">
            Trovia is a smart listing platform designed for college students to
            effortlessly buy, sell, and connect. Whether you're looking for
            study materials, renting essentials, or selling pre-owned items,
            Trovia makes the process simple, secure, and hassle-free.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="/rectangle-8975.png"
              alt="About Us"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button className="h-[60px] w-[162px] bg-[#3b1c4d] hover:bg-[#281f2c] text-white text-xl font-semibold rounded-none transition-all duration-300 hover:scale-105">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};