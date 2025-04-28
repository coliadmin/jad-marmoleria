import {Use, UseDTO} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

async function fetchUsesList(): QueryResponse<UseDTO[]> {
  const res = await query<UseDTO[]>("usos?populate[fields][0]=nombre&populate[fields][1]=slug", {
    next: {tags: ["uso"]},
  });

  return res;
}

async function getUsesList(): Promise<Use[]> {
  const {data} = await fetchUsesList();

  const cpy = data;

  return cpy;
}

export const api = {
  getList: getUsesList,
};
