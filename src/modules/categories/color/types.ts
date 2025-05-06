import type {Data} from "@/lib/strapi";

interface DTO {
  nombre: string;
  slug: string;
}

export type ColorDTO = Data<DTO>;

export type Color = ColorDTO;
