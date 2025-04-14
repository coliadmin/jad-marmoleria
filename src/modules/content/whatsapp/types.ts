import {Data} from "@/lib/strapi";

interface WhatsAppDTO {
  telefono: number;
  mensaje?: string;
}

export type WhatsApp = Data<WhatsAppDTO>;
