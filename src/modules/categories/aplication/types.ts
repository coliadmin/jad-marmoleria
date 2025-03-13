import {Data} from "@/lib/strapi";

interface AplicationDTO {
  nombre: string;
  slug: string;
}

export type Aplication = Data<AplicationDTO>;
