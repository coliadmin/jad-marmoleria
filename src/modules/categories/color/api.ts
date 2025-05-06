import {Color, ColorDTO} from "./types";

import {query, QueryResponse} from "@/lib/strapi";

async function fetchColorsList(): QueryResponse<ColorDTO[]> {
  const res = await query<ColorDTO[]>(
    "colors?populate[fields][0]=nombre&populate[fields][1]=slug",
    {next: {tags: ["color"]}},
  );

  return res;
}

async function getColorsList(): Promise<Color[]> {
  const {data} = await fetchColorsList();

  const cpy = data;

  return cpy;
}

export const api = {
  getList: getColorsList,
};
