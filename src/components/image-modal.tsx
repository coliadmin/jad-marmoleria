"use client";

import { useState } from "react";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import React from "react";

type ImageModalProps = {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  onImageClick?: () => void;
  images?: Array<{ src: string; alt: string }>;
  initialIndex?: number;
  onModalOpen?: () => void;
  onModalClose?: () => void;
};

export function ImageModal({
  src,
  alt,
  className,
  children,
  onImageClick,
  images,
  initialIndex = 0,
  onModalOpen,
  onModalClose
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleZoomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    onModalOpen?.();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onImageClick) {
      onImageClick();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onModalClose?.();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "ArrowLeft" && images && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (e.key === "ArrowRight" && images && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
    }
  }, [isOpen, currentIndex, images]);

  const currentImage = images && images.length > 0 ? images[currentIndex] : { src, alt };
  const hasNavigation = images && images.length > 1;

  return (
    <>
      <div className="group relative">
        <div onClick={handleImageClick}>
          {children}
        </div>
        <Button
          onClick={handleZoomClick}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-3 shadow-lg transition-all hover:bg-white hover:scale-110"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} className="p-0">
        <div className="relative flex items-center justify-center">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={cn("h-auto max-h-[80vh] w-auto max-w-full object-contain", className)}
          />

          {hasNavigation && (
            <>
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </Button>

              <Button
                onClick={handleNext}
                disabled={currentIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
