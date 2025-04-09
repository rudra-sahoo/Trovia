import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const trustPoints = [
  "Transparency & Reliability",
  "Seamless User Experience",
  "Security & Trust",
  "Innovation & Efficiency",
  "Customer Support & Engagement"
];

export const Features: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#3b1c4d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#d4af37] mb-6">
            Why our clients trust us
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Trovia is a smart listing platform designed for college students to effortlessly buy, sell, and connect. Whether you're looking
            for study materials, renting essentials, or selling pre-owned items, Trovia makes the process simple, secure, and hassle-free.
            With a user-friendly interface and verified listings, it ensures a trustworthy experience for all students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Trust points */}
          <div className="space-y-4">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                <span className="text-white text-lg">{point}</span>
              </div>
            ))}
            <div className="mt-8">
              <Button className="bg-[#d4af37] hover:bg-[#c19b20] text-[#3b1c4d]">
                Sell
              </Button>
            </div>
          </div>

          {/* Right side: Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/feature1.png"
              alt="Trust Feature 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="/feature2.png"
              alt="Trust Feature 2"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="/feature3.png"
              alt="Trust Feature 3"
              className="w-full h-48 object-cover rounded-lg col-span-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};