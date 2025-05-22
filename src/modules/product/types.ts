import type {Data, Image} from "@/lib/strapi";

import {Use} from "../categories/use";
import {Color} from "../categories/color";
import {Material} from "../categories/material";
import {Aplication} from "../categories/aplication";
import { Project } from "../projects";

export interface DTO {
  nombre: string;
  slug: string;
  descripcion: string;
  espesor?: string;
  disponibilidad: boolean;
  portada: Image;
  imagenes: Image[];
  proyectos?: Project[];
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
  "espesor" | "color" | "material" | "usos" | "aplicaciones" | "proyectos"
> & {
  espesor: string;
  color: Color;
  material: Material;
  usos: Use[];
  aplicaciones: Aplication[];
  proyectos: Project[];
};
