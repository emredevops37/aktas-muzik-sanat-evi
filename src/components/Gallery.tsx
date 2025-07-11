
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-heading text-2xl text-primary">
            {title} Galerisi
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col">
          {/* Ana Resim */}
          <div className="relative flex-1 bg-muted rounded-lg mx-6 mb-4 overflow-hidden">
            <img
              src={images[currentImageIndex]?.src}
              alt={`${title} ${currentImageIndex + 1}`}
              className="w-full  max-h-[69vh] object-contain"
            />

            {/* Navigasyon Butonları */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Resim Başlık ve Açıklama */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg mb-1">
                {images[currentImageIndex]?.title}
              </h3>
              <p className="text-white/80 text-sm">
                {images[currentImageIndex]?.description}
              </p>
            </div>

            {/* Resim Sayacı */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail'lar */}
          {images.length > 1 && (
            <div className="px-6 pb-6">
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50"
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

export default Gallery;

