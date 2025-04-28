import type {Image as Img, Data} from "@/lib/strapi";

export interface DTO {
  nombre: string;
  slug: string;
  descripcion: string;
  portada: Img;
  imagenes: Img[];
  videos?: Img[];
}

export type ProjectDTO = Data<DTO>;

export type Project = Omit<ProjectDTO, "videos"> & {
  videos: Img[];
};
