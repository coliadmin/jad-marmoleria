import {Data, Image} from "@/lib/strapi";

interface DTO {
  titulo: string;
  descripcion: string;
  imagenes: Image[];
}

export type HeroDTO = Data<DTO>;

export type Hero = HeroDTO;
