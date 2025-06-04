import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselProps {
  children: React.ReactNode[]; // Expects an array of React nodes (e.g., MediaCards)
  options?: Parameters<typeof useEmblaCarousel>[0];
}

const Carousel: React.FC<CarouselProps> = ({ children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', ...options },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  console.log("Rendering Carousel with items:", children.length);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!children || children.length === 0) {
    return <p className="text-center text-gray-500">No items to display in carousel.</p>;
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children.map((child, index) => (
            <div className="embla__slide flex-[0_0_auto] min-w-0 pl-4 first:pl-0 last:pr-0" key={index}
                 style={{ flexBasis: 'calc(100% / 4.5)' }} // Adjust for ~4.5 cards visible
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-2 hidden md:flex"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-2 hidden md:flex"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
}
export default Carousel;