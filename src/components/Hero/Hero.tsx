import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/hero1.avif',
    '/hero2.jpeg',
    '/hero3.avif'
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#f8f5f9]">
      {/* Remove min-h-screen and adjust the height calculations */}
      <div className="relative w-full h-[calc(100vh-64px)] mt-16"> {/* Changed from mt-[84px] to mt-16 to match header height */}
        {/* Image Carousel */}
        <div className="relative w-full h-full overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
                currentImage === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={img}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Navigation Buttons - Added z-20 to ensure they're clickable */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImage === index ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black/20 z-10">
            <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 flex flex-col gap-6 max-w-xl text-white z-20">
              <h1 className="font-['Poppins',Helvetica] font-semibold text-4xl md:text-[50px] leading-tight md:leading-[70px] animate-fade-in">
                Exclusive deal on electronics
              </h1>
              <p className="font-['Open_Sans',Helvetica] font-normal text-lg md:text-xl">
                Connecting Sellers and Seekers with Ease
              </p>
              <Button 
                className="mt-6 h-[60px] w-[162px] bg-[#3b1c4d] hover:bg-[#281f2c] text-white text-xl font-semibold rounded-none transition-all duration-300 hover:scale-105"
              >
                Browse now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Add z-20 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </section>
  );
};