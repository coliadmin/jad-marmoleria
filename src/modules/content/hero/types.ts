import {Data, Image} from "@/lib/strapi";

interface HeroDTO {
  titulo: string;
  descripcion: string;
  imagenes: Image[];
}

export type Hero = Data<HeroDTO>;
