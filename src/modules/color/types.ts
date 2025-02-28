import type {Data} from "@/lib/strapi";

interface ColorDTO {
  nombre: string;
  slug: string;
}

export type Color = Data<ColorDTO>;
