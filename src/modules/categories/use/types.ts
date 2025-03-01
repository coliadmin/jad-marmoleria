import {Data} from "@/lib/strapi";

interface UseDTO {
  nombre: string;
  slug: string;
}

export type Use = Data<UseDTO>;
