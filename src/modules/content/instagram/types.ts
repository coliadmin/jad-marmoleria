import {Data} from "@/lib/strapi";

interface InstagramDTO {
  cuenta: Instagram;
}

export type InstagramData = Data<InstagramDTO>;

export type Instagram = {name: string; url: string};
