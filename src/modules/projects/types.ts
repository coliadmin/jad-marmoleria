import type {Image as Img, Data} from "@/lib/strapi";

interface ProjectDTO {
  nombre: string;
  slug: string;
  descripcion: string;
  imagenes: Img[];
}

export type Project = Data<ProjectDTO>;
