import type {Project} from "@/modules/projects";

import {Api, query, QueryResponse} from "@/lib/strapi";

export async function getProjects(): QueryResponse<Project[]> {
  const res = await query<Project[]>(
    "projects?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash",
  );

  return res;
}

export const api: Api<Project> = {
  get: getProjects,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
