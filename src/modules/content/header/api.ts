import {Header} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

export async function getHeader(): QueryResponse<Header> {
  const res = await query<Header>("header", {next: {tags: ["header"]}});

  return res;
}
