import {z} from "zod";

export interface ImageDTO {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export const imageSchema = z.object({
  id: z.number(),
  url: z.string(),
  alt: z.string(),
});

export type Image = z.infer<typeof imageSchema>;

export const productSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  slug: z.string(),
  descripcion: z.string().nullable(),
  espesor: z.string().nullable(),
  uso: z.string().nullable(),
  disponibilidad: z.boolean(),
  portada: imageSchema,
  imagenes: z.array(imageSchema),
});

export type Product = z.infer<typeof productSchema>;

export type ProductDTO = Omit<Product, "imagenes" | "portada"> & {
  imagenes: ImageDTO[];
  portada: ImageDTO;
};
