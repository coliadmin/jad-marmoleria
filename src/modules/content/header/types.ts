import {Data, Image} from "@/lib/strapi";

interface DTO {
  title: string;
  home: string;
  products: string;
  projects: string;
  logo: Image
}

export type HeaderDTO = Data<DTO>;

export type Header = HeaderDTO;
