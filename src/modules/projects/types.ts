import type {Image as Img, Data} from "@/lib/strapi";

interface ProjectDTO {
  nombre: string;
  slug: string;
  descripcion: string;
  portada: Img;
  imagenes: Img[];
  videos: Img[];
}

export type Project = Data<ProjectDTO>;
