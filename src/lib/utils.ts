import * as path from "path";

import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFileExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

export function isImageOrVideo(filePath: string): "image" | "video" | null {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".webm"];

  const ext = getFileExtension(filePath);

  if (imageExtensions.includes(ext)) {
    return "image";
  } else if (videoExtensions.includes(ext)) {
    return "video";
  } else {
    return null;
  }
}

export function toWhatsAppUrl(telefono: number) {
  const url = "https://wa.me/" + telefono;

  return url;
}
