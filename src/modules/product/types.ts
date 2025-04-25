import type {Data, Image} from "@/lib/strapi";

import {Use} from "../categories/use";
import {Color} from "../categories/color";
import {Material} from "../categories/material";
import {Aplication} from "../categories/aplication";

export interface DTO {
  nombre: string;
  slug: string;
  descripcion?: string;
  espesor?: string;
  disponibilidad: boolean;
  portada: Image;
  imagenes?: Image[];
}
interface Categories {
  color?: Color;
  material?: Material;
  usos?: Use[];
  aplicaciones?: Aplication[];
}

export type ProductDTO = Data<DTO> & Categories;

export type Product = Omit<
  ProductDTO,
  "descripcion" | "espesor" | "color" | "material" | "imagenes" | "usos" | "aplicaciones"
> & {
  descripcion: string;
  espesor: string;
  color: Color;
  material: Material;
  imagenes: Image[];
  usos: Use[];
  aplicaciones: Aplication[];
};
