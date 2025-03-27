import type {Project} from "@/modules/projects";

import {Api, query, QueryResponse, toUrl} from "@/lib/strapi";
import {STRAPI_HOST} from "@/config";

export async function getProjects(): QueryResponse<Project[]> {
  const res = await query<Project[]>(
    "projects?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[videos][fields][0]=name&populate[videos][fields][1]=url&populate[videos][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash",
    { next: { tags: ['project'] } });

  const cpy = res;

  res.data.forEach((x, idx) => {
    cpy.data.splice(idx, 1, {
      ...x,
      portada: {...x.portada, url: STRAPI_HOST + x.portada.url},
      imagenes: x.imagenes.map((x) => ({...x, url: STRAPI_HOST + x.url})),
      videos: x.videos.map((x) => ({...x, url: STRAPI_HOST + x.url})),
    });
  });

  return cpy;
}

export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const {data} = await query<Project[]>(
      `projects?filters[slug][$contains]=${slug}&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[videos][fields][0]=name&populate[videos][fields][1]=url&populate[videos][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      { next: { tags: ['project'] } });

    const cpy = data;

    data.forEach((x, idx) => {
      cpy.splice(idx, 1, {
        ...x,
        portada: {...x.portada, url: STRAPI_HOST + x.portada.url},
        imagenes: x.imagenes.map((x) => ({...x, url: STRAPI_HOST + x.url})),
        videos: x.videos.map((x) => ({...x, url: STRAPI_HOST + x.url})),
      });
    });

    return data[0];
  } catch (error) {
    throw error;
  }
}

export const api: Api<Project> = {
  get: getProjects,
  fetch: fetchProject,
};
