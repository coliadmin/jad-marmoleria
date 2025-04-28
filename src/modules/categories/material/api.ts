import {Material, MaterialDTO} from "./types";

import {Api, query, QueryResponse} from "@/lib/strapi";

function transformMaterial(dto: MaterialDTO): Material {
  return {
    ...dto,
    descripcion: dto.descripcion ?? "",
  };
}

async function fetchMaterialsList(): QueryResponse<MaterialDTO[]> {
  const res = await query<MaterialDTO[]>(
    "materials?populate[fields][0]=nombre&populate[fields][1]=slug",
    {next: {tags: ["material"]}},
  );

  return res;
}

async function getMaterialsList(): Promise<Material[]> {
  const {data} = await fetchMaterialsList();

  const cpy = data.map((x) => transformMaterial(x));

  return cpy;
}

export const api = {
  getList: getMaterialsList,
};
