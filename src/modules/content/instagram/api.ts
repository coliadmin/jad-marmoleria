import {Instagram, InstagramData} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

export async function getInstagram(): Promise<Instagram> {
  const res = await query<InstagramData>("instagram?populate[0]=cuenta", {
    next: {tags: ["instagram"]},
  });

  const {
    data: {
      cuenta: {name, url},
    },
  } = res;

  return {name, url};
}
