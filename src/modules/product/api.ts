import {Color} from "../categories/color";
import {Material} from "../categories/material";
import { Project, ProjectDTO} from "../projects";

import {Product, ProductDTO} from "./types";

import {STRAPI_HOST} from "@/config";
import {query, type QueryResponse} from "@/lib/strapi";

// TODO: Increase performance by reducing the number fields fetched, specify the fields to fetch.

function transformProject(dto: ProjectDTO): Project {
  return {
    ...dto,
    imagenes: [],
    videos: [],
    portada: {...dto.portada, url: STRAPI_HOST + dto.portada.url},
  };
}

function transformProduct(dto: ProductDTO): Product {
  const colorAlt: Color = {documentId: "", id: "", nombre: "", slug: ""};
  const materialAlt: Material = {documentId: "", id: "", nombre: "", slug: "", descripcion: ""};

  return {
    ...dto,
    espesor: dto.espesor ?? "",
    color: dto.color ?? colorAlt,
    material: dto.material ?? materialAlt,
    imagenes: dto.imagenes.map((img) => ({...img, url: STRAPI_HOST + img.url})),
    portada: {...dto.portada, url: STRAPI_HOST + dto.portada.url},
    usos: dto.usos?.map((uso) => ({...uso, slug: uso.slug})) ?? [],
    aplicaciones:
      dto.aplicaciones?.map((aplicacion) => ({...aplicacion, slug: aplicacion.slug})) ?? [],
    proyectos:
      dto.proyectos?.map((project) => transformProject(project)) ?? []
  };
}

async function fetchProduct(slug: string): QueryResponse<ProductDTO[] | null> {
  try {
    const res = await query<ProductDTO[]>(
      `products?filters[slug][$contains]=${slug}&&populate[proyectos][fields][0]=nombre&populate[proyectos][fields][1]=slug&populate[proyectos][populate][portada][fields][0]=name&populate[proyectos][populate][portada][fields][1]=url&populate[proyectos][populate][portada][fields][2]=hash&populate[usos][fields][0]=nombre&populate[usos][fields][1]=slug&populate[aplicaciones][fields][0]=nombre&populate[aplicaciones][fields][1]=slug&populate[material][fields][0]=nombre&populate[material][fields][1]=slug&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      {next: {tags: ["product"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function fetchProductsByCategory(
  category: string,
  value: string,
): QueryResponse<ProductDTO[] | null> {
  try {
    const res = await query<ProductDTO[]>(
      `products?filters[${category}][slug][$contains]=${value}&populate[usos][fields][0]=nombre&populate[usos][fields][1]=slug&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      {next: {tags: ["product"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function fetchProductsList(): QueryResponse<ProductDTO[]> {
  try {
    const res = await query<ProductDTO[]>(
      "products?populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash",
      {next: {tags: ["product"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const {data} = await fetchProduct(slug);

    if (!data[0]) return null;

    const cpy = transformProduct(data[0]);

    return cpy;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategory(category: string, value: string): Promise<Product[]> {
  if (!category && !value) {
    return [];
  }

  try {
    const {data} = await fetchProductsByCategory(category, value);

    if (!data) return [];
    const cpy = data.map((x) => transformProduct(x));

    return cpy;
  } catch (error) {
    throw error;
  }
}

async function getProductsList(): Promise<Product[]> {
  const {data} = await fetchProductsList();

  if (!data) return [];

  const cpy = data.map((x) => transformProduct(x));

  return cpy;
}

export const api = {
  get: getProduct,
  getList: getProductsList,
  getByCategory: getProductsByCategory,
};
