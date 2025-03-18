import type {Project} from "@/modules/projects";

import {Api, query, QueryResponse} from "@/lib/strapi";

export async function getProjects(): QueryResponse<Project[]> {
  const res = await query<Project[]>(
    "projects?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash",
  );

export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const {data} = await query<Project[]>(
      `projects?filters[slug][$contains]=${slug}&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
    );

    return data[0];
  } catch (error) {
    throw error;
  }
}

export const api: Api<Project> = {
  get: getProjects,
  fetch: fetchProject,
};
