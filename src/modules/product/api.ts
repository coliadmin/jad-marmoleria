import {Product} from "./types";

import {STRAPI_HOST} from "@/config";
import {Api, Image, query, type QueryResponse} from "@/lib/strapi";

// TODO: Increase performance by reducing the number fields fetched, specify the fields to fetch.
async function getProducts(): QueryResponse<Product[]> {
  const res = await query<Product[]>(
    "products?populate[usos][fields][0]=nombre&populate[usos][fields][1]=slug&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash&fields[0]=nombre&fields[1]=slug&fields[2]=descripcion&fields[3]=espesor&fields[4]=disponibilidad&status=published",
    { next: { tags: ['product'] } });

  const cpy = res;

  res.data.forEach((x, idx) =>
    cpy.data.splice(idx, 1, {...x, portada: {...x.portada, url: STRAPI_HOST + x.portada.url}}),
  );

  return cpy;
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const {data} = await query<Product[]>(
      `products?filters[slug][$contains]=${slug}&populate[usos][fields][0]=nombre&populate[usos][fields][1]=slug&populate[aplicaciones][fields][0]=nombre&populate[aplicaciones][fields][1]=slug&populate[material][fields][0]=nombre&populate[material][fields][1]=slug&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      { next: { tags: ['product'] } });

    return data[0];
  } catch (error) {
    //return null;
    throw error;
  }

  // console.log(data);

  // if (data.length === 0 || data.length > 1 || !data[0]) {
  //   return null;
  // }

  // return data[0];
}

/// Hay que mejorar, hecho para testear!
export async function fetchProductByCategory(category: string, value: string): Promise<Product[]> {
  if (!category && !value) {
    return [];
  }

  try {
    const {data} = await query<Product[]>(
      `products?filters[${category}][slug][$contains]=${value}&populate[usos][fields][0]=nombre&populate[usos][fields][1]=slug&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
      { next: { tags: ['product'] } });

    const cpy = data;

    data.forEach((x, idx) =>
      cpy.splice(idx, 1, {...x, portada: {...x.portada, url: STRAPI_HOST + x.portada.url}}),
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export const api: Api<Product> = {
  get: getProducts,
  fetch: fetchProduct,
};
