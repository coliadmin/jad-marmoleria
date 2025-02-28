import type {Data, Image} from "@/lib/strapi";

import {Use} from "../use";

export interface ProductDTO {
  nombre: string;
  slug: string;
  descripcion: string | null;
  espesor: string | null;
  usos: Use[] | null;
  disponibilidad: boolean;
  portada: Image;
  imagenes: Image[];
}

export type Product = Data<ProductDTO>;
