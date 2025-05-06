import {Data} from "@/lib/strapi";

interface DTO {
  title: string;
  home: string;
  products: string;
  projects: string;
}

export type HeaderDTO = Data<DTO>;

export type Header = HeaderDTO;
