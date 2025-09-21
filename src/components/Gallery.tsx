
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
      <DialogContent className={`${isMobile ? 'max-w-[95vw] w-full h-[95vh] overflow-hidden' : 'max-w-4xl w-full h-[90vh]'} p-0 fixed`}>
        <DialogHeader className={`${isMobile ? 'p-4 pb-0' : 'p-6 pb-0'} flex-shrink-0`}>
          <DialogTitle className={`font-heading ${isMobile ? 'text-lg' : 'text-2xl'} text-primary`}>
            {title} Galerisi
          </DialogTitle>
        </DialogHeader>

        <div className={`flex-1 flex flex-col ${isMobile ? 'h-full' : 'min-h-0'}`}>
          {/* Ana Resim */}
          <div className={`relative ${isMobile ? 'h-[70vh]' : 'flex-1'} bg-muted rounded-lg ${isMobile ? 'mx-2 mb-2' : 'mx-6 mb-4'} overflow-hidden`}>
            <img
              src={images[currentImageIndex]?.src}
              alt={`${title} ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
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
            <div className={`${isMobile ? 'px-2 pb-2 flex-shrink-0' : 'px-6 pb-6'}`}>
              <div className={`flex gap-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 ${isMobile ? 'snap-x snap-mandatory max-h-12' : ''}`}>
                {images.map((image, index) => (
                  <button
                    key={`thumbnail-${index}`}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 ${isMobile ? 'w-10 h-10 snap-center' : 'w-10 h-10'} rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:scale-105"
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
              {isMobile && images.length > 10 && (
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {currentImageIndex + 1}/{images.length} - Kaydırarak diğer resimleri görebilirsiniz
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
