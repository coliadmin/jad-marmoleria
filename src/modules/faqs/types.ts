import {Data} from "@/lib/strapi";

interface DTO {
  titulo: string;
  slug: string;
  respuesta: string;
}

export type FaqDTO = Data<DTO>;

export type Faq = FaqDTO;
