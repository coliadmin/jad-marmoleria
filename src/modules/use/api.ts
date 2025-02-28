import {Use} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

async function getUses(): QueryResponse<Use[]> {
  const res = await query<Use[]>("usos?populate[fields][0]=nombre&populate[fields][1]=slug");

  return res;
}

export const api: Api<Use> = {
  get: getUses,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
