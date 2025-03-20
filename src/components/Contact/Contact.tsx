import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export const Contact: React.FC = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-[#3b1c4d] rounded-[10px] border-none overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-medium text-[#d4af37] mb-4">
                  Didn't find the product?
                </h2>
                <p className="text-white text-lg md:text-xl max-w-2xl">
                  Write your concern to us and our specialist will get back to you.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <Button className="h-[60px] w-full md:w-[162px] bg-white hover:bg-gray-100 text-neutral-800 text-xl font-semibold rounded-none">
                  Request us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};