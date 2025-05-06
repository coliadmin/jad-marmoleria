import {Instagram, InstagramData} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

async function fetchInstagram(): QueryResponse<InstagramData | null> {
  try {
    const res = await query<InstagramData>("instagram?populate[0]=cuenta", {
      next: {tags: ["instagram"]},
    });

    return res;
  } catch (error) {
    throw error;
  }
}

async function getInstagram(): Promise<Instagram> {
  const {data} = await fetchInstagram();

  if (!data) return {name: "", url: ""};

  const {
    cuenta: {name, url},
  } = data;

  return {name, url};
}

export const api = {
  get: getInstagram,
};
