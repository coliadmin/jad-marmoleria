import {Data} from "@/lib/strapi";

interface FaqDTO {
  titulo: string;
  slug: string;
  respuesta: string;
}

export type Faq = Data<FaqDTO>;
