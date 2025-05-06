import {Hero, HeroDTO} from "./types";

import {QueryResponse, query} from "@/lib/strapi";
import {toUrl} from "@/lib/strapi";

function transformHero(dto: HeroDTO): Hero {
  return {
    ...dto,
    imagenes: dto.imagenes.map((img) => ({...img, url: toUrl(img.url)})),
  };
}

export async function fetchHero(): QueryResponse<HeroDTO> {
  try {
    const res = await query<HeroDTO>(
      "hero?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url",
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
