import type {Project, ProjectDTO} from "@/modules/projects";

import {query, QueryResponse} from "@/lib/strapi";
import {STRAPI_HOST} from "@/config";

function transformProject(dto: ProjectDTO): Project {
  return {
    ...dto,
    descripcion: dto.descripcion ?? "",
    imagenes: dto.imagenes?.map((img) => ({...img, url: STRAPI_HOST + img.url})) ?? [],
    videos: dto.videos?.map((video) => ({...video, url: STRAPI_HOST + video.url})) ?? [],
    portada: {...dto.portada, url: STRAPI_HOST + dto.portada.url},
  };
}

async function fetchProject(slug: string): QueryResponse<ProjectDTO[] | null> {
  try {
    const res = await query<ProjectDTO[]>(
      `projects?filters[slug][$contains]=${slug}&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[videos][fields][0]=name&populate[videos][fields][1]=url&populate[videos][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      {next: {tags: ["project"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function fetchProjectsList(): QueryResponse<ProjectDTO[] | null> {
  try {
    const res = await query<ProjectDTO[]>(
      "projects?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[videos][fields][0]=name&populate[videos][fields][1]=url&populate[videos][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash",
      {next: {tags: ["project"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const {data} = await fetchProject(slug);

    if (!data[0]) return null;

    const cpy = transformProject(data[0]);

    return cpy;
  } catch (error) {
    throw error;
  }
}

async function getProjectsList(): Promise<Project[]> {
  const {data} = await fetchProjectsList();

  if (!data) return [];

  const cpy = data.map((x) => transformProject(x));

  return cpy;
}

export const api = {
  get: getProject,
  getList: getProjectsList,
};
