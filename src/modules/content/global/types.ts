import {Data, Image} from "@/lib/strapi";

interface DTO {
  siteName: string;
  siteDescription: string;
  favicon?: Image;
}

interface DefaultSeo {
  metaTitle: string;
  metaDescription: string;
  shareImage?: Image;
}

export type GlobalDTO = Data<DTO> & DefaultSeo;

export type Global = Omit<GlobalDTO, "favicon" | "shareImage" > & {
  favicon: Image;
  shareImage: Image;
};
