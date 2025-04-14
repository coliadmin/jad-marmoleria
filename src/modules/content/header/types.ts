import {Data} from "@/lib/strapi";

interface HeaderDTO {
  title: string;
  home: string;
  products: string;
  projects: string;
}

export type Header = Data<HeaderDTO>;
