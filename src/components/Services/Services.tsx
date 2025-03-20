import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface Service {
  title: string;
  description: string;
  image: string;
  price?: string;
}

const services: Service[] = [
  {
    title: "Buy Electronics",
    description: "Find the latest electronics at great prices",
    image: "/rectangle-8988.png",
    price: "$18.0"
  },
  {
    title: "Sell Items",
    description: "List your items for sale easily",
    image: "/rectangle-8988.png"
  },
  {
    title: "Rent Equipment",
    description: "Rent electronics and equipment",
    image: "/rectangle-8974.png"
  }
];

export const Services: React.FC = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center text-neutral-800 mb-16">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-[#3b1c4d82] rounded-[30px] border-none overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
            >
              <CardContent className="p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 mb-4">
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="text-2xl font-semibold text-[#d4af37] mb-4">
                      {service.price}
                    </p>
                  )}
                  <Button className="w-full bg-white hover:bg-gray-100 text-[#3b1c4d] text-xl font-semibold rounded-none">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};