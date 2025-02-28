import {Color} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

async function getColors(): QueryResponse<Color[]> {
  const res = await query<Color[]>("colors?populate[fields][0]=nombre&populate[fields][1]=slug");

  return res;
}

export const api: Api<Color> = {
  get: getColors,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
