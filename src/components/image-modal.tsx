"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type ImageModalProps = {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  onImageClick?: () => void;
};

export function ImageModal({ src, alt, className, children, onImageClick }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleZoomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
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
  };

  return (
    <>
      <div className="group relative">
        <div onClick={handleImageClick}>
          {children}
        </div>
        <Button
          onClick={handleZoomClick}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} className="p-0">
        <img
          src={src}
          alt={alt}
          className={cn("h-auto max-h-[80vh] w-auto max-w-full object-contain", className)}
        />
      </Modal>
    </>
  );
}
