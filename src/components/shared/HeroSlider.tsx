import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  currentSlideIndex?: number;
  onSlideChange?: (index: number) => void;
}

export function HeroSlider({
  slides,
  autoPlayInterval = 5000,
  className,
  overlay = false,
  children,
  showDots = true,
  showArrows = true,
  currentSlideIndex,
  onSlideChange,
}: HeroSliderProps) {
  const [internalSlide, setInternalSlide] = useState(0);
  const currentSlide = currentSlideIndex !== undefined ? currentSlideIndex : internalSlide;

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    if (onSlideChange) {
      onSlideChange(next);
    } else {
      setInternalSlide(next);
    }
  }, [currentSlide, slides.length, onSlideChange]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    if (onSlideChange) {
      onSlideChange(prev);
    } else {
      setInternalSlide(prev);
    }
  }, [currentSlide, slides.length, onSlideChange]);

  const goToSlide = (index: number) => {
    if (onSlideChange) {
      onSlideChange(index);
    } else {
      setInternalSlide(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-1000 ease-out",
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Subtle dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/70" />

      {/* Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[calc(50%-60px)] sm:left-4 lg:left-6 bottom-8 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-all duration-300 z-20 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[calc(50%-60px)] sm:right-4 lg:right-6 bottom-8 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-all duration-300 z-20 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots - only show if showDots is true */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500",
                index === currentSlide
                  ? "bg-primary-foreground w-8"
                  : "bg-primary-foreground/40 w-2.5 hover:bg-primary-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}