import {ProductDTO, Product, Image} from "./types";

import {query, type QueryResponse, STRAPI_HOST} from "@/lib/stripe";

// TODO: Increase performance by reducing the number fields fetched, specify the fields to fetch.
export async function getProducts(): Promise<QueryResponse<Product[]>> {
  const {data, meta} = await query<ProductDTO[]>("products?populate=imagenes&populate=portada");

  const withImages: Product[] = data.map((product: ProductDTO) => {
    const portada: Image = {
      id: product.portada.id,
      url: `${STRAPI_HOST}${product.portada.url}`,
      alt: product.portada.alternativeText || "",
    };

    const data: Product = {...product, imagenes: [], portada: portada};

    if (!product.imagenes) {
      return data;
    }

    const images: Image[] = product.imagenes.map((image) => ({
      id: image.id,
      url: `${STRAPI_HOST}${image.url}`,
      alt: image.alternativeText || "",
    }));

    data.imagenes = images;

    return data;
  });

  return {data: withImages, meta};
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const {data} = await getProducts();

  const p = data.find((product) => product.slug === slug);

  return p || null;
}
