import {Faq} from "./types";

import {QueryResponse, query, Api} from "@/lib/strapi";

async function getFaqs(): QueryResponse<Faq[]> {
  const res = await query<Faq[]>(
    "faqs?populate[fields][0]=slug&populate[fields][1]=titulo&populate[fields][2]=respuesta",
    {next: {tags: ["faq"]}},
  );

  return res;
}

export const api: Api<Faq> = {
  get: getFaqs,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
