import {Product} from "./types";

import {Api, Image, query, type QueryResponse} from "@/lib/strapi";

// TODO: Increase performance by reducing the number fields fetched, specify the fields to fetch.
async function getProducts(): QueryResponse<Product[]> {
  return await query<Product[]>(
    "products?populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash&fields[0]=nombre&fields[1]=slug&fields[2]=descripcion&fields[3]=espesor&fields[4]=uso&fields[5]=disponibilidad&status=published",
  );
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const {data} = await query<Product[]>(
      `products?filters[slug][$contains]=${slug}&populate[imagenes][fields][0]=name&populate[imagenes][fields][1]=url&populate[imagenes][fields][2]=hash&populate[portada][fields][0]=name&populate[portada][fields][1]=url&populate[portada][fields][2]=hash`,
    );

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

export const api: Api<Product> = {
  get: getProducts,
  fetch: fetchProduct,
};
