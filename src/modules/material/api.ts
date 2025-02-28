import {Material} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

async function getMaterials(): QueryResponse<Material[]> {
  const res = await query<Material[]>(
    "materials?populate[fields][0]=nombre&populate[fields][1]=slug",
  );

  return res;
}

export const api: Api<Material> = {
  get: getMaterials,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
