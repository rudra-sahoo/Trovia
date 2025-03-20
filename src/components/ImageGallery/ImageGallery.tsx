import React from 'react';
import { ImageCard } from './ImageCard';

const images = [
  {
    src: '/rectangle-8974.png',
    alt: 'Gallery Image 1',
    caption: 'Exclusive Electronics Deal'
  },
  {
    src: '/rectangle-8975.png',
    alt: 'Gallery Image 2',
    caption: 'Premium Products'
  },
  {
    src: '/rectangle-8988.png',
    alt: 'Gallery Image 3',
    caption: 'Featured Items'
  },
  {
    src: '/rectangle-8984.png',
    alt: 'Gallery Image 4',
    caption: 'New Arrivals'
  }
];

export const ImageGallery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
          />
        ))}
      </div>
    </div>
  );
};