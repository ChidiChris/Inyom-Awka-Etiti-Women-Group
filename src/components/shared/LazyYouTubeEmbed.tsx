import { useState, useCallback } from "react";
import { Play } from "lucide-react";

interface LazyYouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault";
}

export const LazyYouTubeEmbed = ({ 
  videoId, 
  title, 
  thumbnailQuality = "maxresdefault" 
}: LazyYouTubeEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const handleClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-elevated bg-muted">
      {!isLoaded ? (
        <button
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className="group w-full h-full relative cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Play video: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={`Video thumbnail: ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-focus-visible:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground fill-primary-foreground ml-1" />
            </div>
          </div>
          
          {/* Video Title for Screen Readers */}
          <span className="sr-only">{title}</span>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
};