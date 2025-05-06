import {Aplication, AplicationDTO} from "./types";

import {query, QueryResponse} from "@/lib/strapi";

function transformAplication(data: AplicationDTO): Aplication {
  return {
    ...data,
    descripcion: data.descripcion ?? "",
  };
}

async function fetchAplicationsList(): QueryResponse<AplicationDTO[]> {
  const res = await query<AplicationDTO[]>(
    "applications?populate[fields][0]=nombre&populate[fields][1]=slug",
    {next: {tags: ["application"]}},
  );

  return res;
}

async function getAplicationsList(): Promise<Aplication[]> {
  const {data} = await fetchAplicationsList();

  if (!data) return [];

  const cpy = data.map((x) => transformAplication(x));

  return cpy;
}

export const api = {
  getList: getAplicationsList,
};
