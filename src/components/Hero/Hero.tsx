import React from 'react';
import { Button } from '../ui/button';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-[#f8f5f9] overflow-hidden">
      <div className="relative w-full">
        <img
          className="w-full h-[552px] object-cover mt-[84px]"
          alt="Hero Background"
          src="/rectangle-8973.png"
        />

        <div className="absolute top-1/2 left-[140px] transform -translate-y-1/2 flex flex-col gap-6 max-w-xl">
          <h1 className="font-['Poppins',Helvetica] font-semibold text-neutral-800 text-[50px] leading-[70px] animate-fade-in">
            Exclusive deal on electronics
          </h1>
          <p className="font-['Open_Sans',Helvetica] font-normal text-[#3c3232] text-xl">
            Connecting Sellers and Seekers with Ease
          </p>
          <Button 
            className="mt-6 h-[60px] w-[162px] bg-[#3b1c4d] hover:bg-[#281f2c] text-white text-xl font-semibold rounded-none transition-all duration-300 hover:scale-105"
          >
            Browse now
          </Button>
        </div>

        <img
          className="absolute w-[420px] h-[350px] top-[166px] right-[164px] object-cover animate-float"
          alt="Electronics"
          src="/rectangle-8984.png"
        />
      </div>
    </section>
  );
};