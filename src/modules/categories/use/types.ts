import {Data} from "@/lib/strapi";

interface DTO {
  nombre: string;
  slug: string;
}

export type UseDTO = Data<DTO>;

export type Use = UseDTO;
