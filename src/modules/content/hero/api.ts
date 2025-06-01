import {Hero, HeroDTO} from "./types";

import {QueryResponse, query} from "@/lib/strapi";
import {toUrl} from "@/lib/strapi";

function transformHero(dto: HeroDTO): Hero {

  const obj = {
    ...dto,
    logo: {...dto.logo, url: toUrl(dto.logo.url)},
    imagenCentro: {...dto.imagenCentro, url: toUrl(dto.imagenCentro.url)},
    imagenDerecha: {...dto.imagenDerecha, url: toUrl(dto.imagenDerecha.url)},
    imagenIzquierda: {...dto.imagenIzquierda, url: toUrl(dto.imagenIzquierda.url)}
  };
  
  return obj
}

export async function fetchHero(): QueryResponse<HeroDTO> {
  try {
    const res = await query<HeroDTO>(
      "hero?populate[logo][fields][0]=name&populate[logo][fields][1]=url&populate[logo][fields][2]=hash&populate[imagenCentro][fields][1]=name&populate[imagenCentro][fields][2]=url&populate[linkImagenCentro][fields][1]=name&populate[linkImagenCentro][fields][2]=url&populate[imagenIzquierda][fields][1]=name&populate[imagenIzquierda][fields][2]=url&populate[linkImagenIzquierda][fields][1]=name&populate[linkImagenIzquierda][fields][2]=url&populate[imagenDerecha][fields][1]=name&populate[imagenDerecha][fields][2]=url&populate[linkImagenDerecha][fields][1]=name&populate[linkImagenDerecha][fields][2]=url",
      {next: {tags: ["hero"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getHero(): Promise<Hero> {
  const {data} = await fetchHero();

  const cpy = transformHero(data);

  return cpy;
}

export const api = {
  get: getHero,
};
