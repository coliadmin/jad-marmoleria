import {Data, Image} from "@/lib/strapi";

interface DTO {
  siteName: string;
  siteDescription: string;
  favicon?: Image;
  defaultSeo: DefaultSeo;
  accentColor: string;
}

interface DefaultSeo {
  metaTitle: string;
  metaDescription: string;
  shareImage?: Image;
}

export type GlobalDTO = Data<DTO>;

export type Global = Omit<GlobalDTO, "favicon" | "defaultSeo"> & {
  favicon: Image;
  defaultSeo: Omit<DefaultSeo, "shareImage"> & {
    shareImage: Image;
  };
};
