import {Header, HeaderDTO} from "./types";

import {QueryResponse, query, toUrl} from "@/lib/strapi";

async function fetchHeader(): QueryResponse<HeaderDTO> {
  const res = await query<HeaderDTO>("header?populate[logo][fields][0]=name&populate[logo][fields][1]=url&populate[logo][fields][2]=hash", {next: {tags: ["header"]}});

  return res;
}

async function getHeader(): Promise<Header> {
  const {data} = await fetchHeader();

  const cpy = {...data, logo: {...data.logo, url: toUrl(data.logo.url)}}

  return cpy;
}

export const api = {
  get: getHeader,
};
