import {Data} from "@/lib/strapi";

interface MaterialDTO {
  nombre: string;
  slug: string;
}

export type Material = Data<MaterialDTO>;
