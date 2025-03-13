import {Aplication} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

async function getAplications(): QueryResponse<Aplication[]> {
  const res = await query<Aplication[]>(
    "applications?populate[fields][0]=nombre&populate[fields][1]=slug",
  );

  return res;
}

export const api: Api<Aplication> = {
  get: getAplications,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
