
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: GalleryImage[];
}

const Gallery = ({ isOpen, onClose, title, images }: GalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useIsMobile();

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] w-full h-[95vh]' : 'max-w-4xl w-full h-[90vh]'} p-0 flex flex-col`}>
        <DialogHeader className={`${isMobile ? 'p-3 pb-2' : 'p-6 pb-4'} flex-shrink-0 border-b border-border/50`}>
          <DialogTitle className={`font-heading ${isMobile ? 'text-base' : 'text-2xl'} text-primary text-center`}>
            {title} Galerisi
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Ana Resim */}
          <div className={`relative flex-1 bg-muted/30 ${isMobile ? 'mx-2 mb-1' : 'mx-6 mb-4'} overflow-hidden flex items-center justify-center`}>
            <img
              src={images[currentImageIndex]?.src}
              alt={`${title} ${currentImageIndex + 1}`}
              className={`${isMobile ? 'max-w-full max-h-full' : 'w-full h-full'} object-contain`}
            />

            {/* Navigasyon Butonları */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size={isMobile ? "sm" : "icon"}
                  className={`absolute ${isMobile ? 'left-2 top-1/2' : 'left-4 top-1/2'} transform -translate-y-1/2 bg-background/80 backdrop-blur-sm ${isMobile ? 'px-2' : ''}`}
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size={isMobile ? "sm" : "icon"}
                  className={`absolute ${isMobile ? 'right-2 top-1/2' : 'right-4 top-1/2'} transform -translate-y-1/2 bg-background/80 backdrop-blur-sm ${isMobile ? 'px-2' : ''}`}
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Resim Başlık ve Açıklama */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent ${isMobile ? 'p-2' : 'p-4'}`}>
              <h3 className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-lg'} mb-1`}>
                {images[currentImageIndex]?.title}
              </h3>
              <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {images[currentImageIndex]?.description}
              </p>
            </div>

            {/* Resim Sayacı */}
            <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} bg-background/80 backdrop-blur-sm rounded-full ${isMobile ? 'px-2 py-1' : 'px-3 py-1'}`}>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail'lar */}
          {images.length > 1 && (
            <div className={`${isMobile ? 'px-2 pb-2 flex-shrink-0' : 'px-6 pb-6'} flex-shrink-0`}>
              <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 ${isMobile ? 'justify-start' : 'justify-center'}`}>
                {images.map((image, index) => (
                  <button
                    key={`thumbnail-${index}`}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary shadow-md"
                        : "border-border/50 hover:border-primary/70"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
