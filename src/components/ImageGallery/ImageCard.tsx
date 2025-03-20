import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
  caption: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">{caption}</p>
      </div>
    </div>
  );
};