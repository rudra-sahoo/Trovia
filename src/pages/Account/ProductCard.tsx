// Create a new file at src/components/Products/ProductCard.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImage {
  url: string;
  publicId: string;
}

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  images: ProductImage[];
  createdAt: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  images,
  createdAt
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto scroll through images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full">
        {/* Image carousel */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <img
              key={image.publicId}
              src={image.url}
              alt={`${name} - ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        {/* Image indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-purple-600 font-bold text-xl">
            ₹{price.toLocaleString('en-IN')}
            <span className="text-sm text-gray-500 font-normal">/day</span>
          </p>
          <p className="text-xs text-gray-500">
            Listed {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};