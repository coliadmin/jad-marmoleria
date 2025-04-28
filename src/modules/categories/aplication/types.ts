import {Data} from "@/lib/strapi";

interface DTO {
  nombre: string;
  slug: string;
  descripcion?: string;
}

export type AplicationDTO = Data<DTO>;

export type Aplication = Omit<AplicationDTO, "descripcion"> & {
  descripcion: string;
};
