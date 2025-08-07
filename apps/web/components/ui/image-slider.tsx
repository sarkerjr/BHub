'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ImageSliderProps {
  images: Array<{
    id: number;
    url: string;
    alt?: string;
  }>;
  className?: string;
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'w-full bg-gray-100 rounded-lg flex items-center justify-center h-64',
          className
        )}
      >
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className={'relative w-full overflow-hidden rounded-lg'}>
      <div className="relative h-full w-full" style={{ aspectRatio: '16/9' }}>
        {images[currentIndex]?.url ? (
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20font-family%3D%22Arial%22%20font-size%3D%2224%22%20text-anchor%3D%22middle%22%20fill%3D%22%236b7280%22%3EImage%20not%20available%3C%2Ftext%3E%3C%2Fsvg%3E';
              }}
              unoptimized={process.env.NODE_ENV !== 'production'}
              priority
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-muted-foreground">Image not available</p>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex items-center justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-primary/50 hover:bg-primary/70'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
