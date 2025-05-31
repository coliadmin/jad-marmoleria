import * as path from "path";

import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import { WhatsApp } from "@/modules/content/whatsapp";
import { Product } from "@/modules/product";
import { Project } from "@/modules/projects";

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

export function toWhatsAppUrl(whatsapp: WhatsApp, object?: Product | Project, type?: "producto" | "proyecto"): string {

  const message = createWhatsAppMessage(whatsapp.mensaje, object, type);

  const url = "https://api.whatsapp.com/send?phone=" + whatsapp.telefono + "&text=" + encodeURIComponent(message);

  return url;
}

export function createWhatsAppMessage(message: string, object?: Product | Project, type?: string): string {

  if(message.length === 0) {
    return "";
  }

  const start = message.indexOf("{");
  const end = message.indexOf("}");

  const startM = message.split("{")[0];
  const endM = message.split("}")[1];

  if(!object){
    return startM + endM;
  }

  const insertProduct = message.substring(start + 1, end) + " " + type + " " + object.nombre + ",";
  const completeMessage = `${startM}${insertProduct}${endM}`;

  return completeMessage;
}
