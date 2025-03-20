import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-[#d4af37]" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your needs"
  },
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-[#d4af37]" />,
    title: "Free Delivery",
    description: "Fast and free shipping on all orders"
  },
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-[#d4af37]" />,
    title: "Quality Guarantee",
    description: "100% satisfaction guaranteed on all products"
  },
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-[#d4af37]" />,
    title: "Secured Payments",
    description: "Safe and secure payment processing"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#3b1c4d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#d4af37] mb-6">
            Why Choose Us
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Experience the best in electronics shopping with our premium services and guarantees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-[#d4af37] hover:bg-[#c19b20] text-[#3b1c4d] text-lg font-semibold px-8 py-3 rounded-none">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};