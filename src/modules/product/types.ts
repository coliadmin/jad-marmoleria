import type {Data, Image} from "@/lib/strapi";

import {Use} from "../categories/use";
import {Color} from "../categories/color";
import {Material} from "../categories/material";
import {Aplication} from "../categories/aplication";

export interface ProductDTO {
  nombre: string;
  slug: string;
  descripcion: string | null;
  espesor: string | null;
  disponibilidad: boolean;
  portada: Image;
  imagenes: Image[];
}

interface Categories {
  color: Color;
  material: Material;
  usos: Use[] | null;
  aplicaciones: Aplication[] | null;
}

export type Product = Data<ProductDTO> & Categories;
