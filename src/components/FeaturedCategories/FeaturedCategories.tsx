import React from 'react';
import { Button } from '../ui/button';

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Featured Categories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="/card1.png" 
              alt="Rent Properties" 
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-semibold mb-3">
                Exclusive deal on electronics
              </h3>
              <p className="text-white/90 mb-4">
                Connecting sellers and seekers with ease
              </p>
              <Button 
                className="w-fit bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
              >
                Rent Now
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="/card2.png" 
              alt="Electronics" 
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-semibold mb-3">
                Exclusive deal on electronics
              </h3>
              <p className="text-white/90 mb-4">
                Connecting sellers and seekers with ease
              </p>
              <Button 
                className="w-fit bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
              >
                Rent Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};