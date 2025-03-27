import {Hero} from "./types";

import {QueryResponse, query} from "@/lib/strapi";
import {toUrl} from "@/lib/strapi";

export async function getHero(): QueryResponse<Hero> {
  const res = await fetchHero();

  const cpy = res;

  res.data.imagenes.forEach((x, idx) => {
    cpy.data.imagenes.splice(idx, 1, {...x, url: toUrl(x.url)});
  });

  return cpy;
}

export async function fetchHero(): QueryResponse<Hero> {
  try {
    const res = await query<Hero>(
      "hero?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url",
      { next: { tags: ['hero'] } });

    return res;
  } catch (error) {
    //return null;
    throw error;
  }
}
