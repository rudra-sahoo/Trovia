import React from 'react';
import { Card, CardContent } from '../ui/card';
import { StarIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Student",
    content: "Trovia has made buying and selling electronics so much easier for students. The platform is user-friendly and secure.",
    rating: 5,
    image: "/rectangle-8972.png"
  },
  {
    name: "Michael Chen",
    role: "Seller",
    content: "Great platform for reaching college students. The verification process makes transactions safe and reliable.",
    rating: 5,
    image: "/rectangle-8972.png"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#f8f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center text-neutral-800 mb-16">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};