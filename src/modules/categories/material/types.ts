import {Data} from "@/lib/strapi";

interface DTO {
  nombre: string;
  slug: string;
  descripcion?: string;
}

export type MaterialDTO = Data<DTO>;

export type Material = Omit<MaterialDTO, "descripcion"> & {
  descripcion: string;
};
