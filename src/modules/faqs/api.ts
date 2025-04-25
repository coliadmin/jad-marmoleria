import {Faq, FaqDTO} from "./types";

import {query, QueryResponse} from "@/lib/strapi";

function transformFaq(dto: FaqDTO): Faq {
  return {
    ...dto,
    respuesta: dto.respuesta ?? "",
  };
}

async function fetchFaqsList(): QueryResponse<FaqDTO[]> {
  try {
    const res = await query<FaqDTO[]>(
      "faqs?populate[fields][0]=slug&populate[fields][1]=titulo&populate[fields][2]=respuesta",
      {next: {tags: ["faq"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function getFaqsList(): Promise<Faq[]> {
  const {data} = await fetchFaqsList();

  if (!data) return [];

  const cpy = data.map((x) => transformFaq(x));

  return cpy;
}

export const api = {
  getList: getFaqsList,
};
