import {Data, Image} from "@/lib/strapi";

interface DTO {
  logo: Image,
  imagenCentro: Image,
  linkImagenCentro: {name: string, url: string},
  imagenIzquierda: Image,
  linkImagenIzquierda: {name: string, url: string},
  imagenDerecha: Image,
  linkImagenDerecha: {name: string, url: string}
}

export type HeroDTO = Data<DTO>;

export type Hero = HeroDTO;
