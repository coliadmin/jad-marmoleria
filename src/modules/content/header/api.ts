import {Header, HeaderDTO} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

async function fetchHeader(): QueryResponse<HeaderDTO> {
  const res = await query<HeaderDTO>("header", {next: {tags: ["header"]}});

  return res;
}

async function getHeader(): Promise<Header> {
  const {data} = await fetchHeader();

  return data;
}

export const api = {
  get: getHeader,
};
