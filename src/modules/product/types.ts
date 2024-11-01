import type {Data, Image} from "@/lib/strapi";

export interface ProductDTO {
  nombre: string;
  slug: string;
  descripcion: string | null;
  espesor: string | null;
  uso: string | null;
  disponibilidad: boolean;
  portada: Image;
  imagenes: Image[];
}

export type Product = Data<ProductDTO>;
