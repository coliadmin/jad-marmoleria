import {Data} from "@/lib/strapi";

interface DTO {
  telefono: number;
  mensaje?: string;
}

export type WhatsAppDTO = Data<DTO>;

export type WhatsApp = Omit<WhatsAppDTO, "mensaje"> & {
  mensaje: string;
};
