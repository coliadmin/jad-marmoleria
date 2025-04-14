import {WhatsApp} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

export async function getWhatsApp(): QueryResponse<WhatsApp> {
  const res = await query<WhatsApp>("whatsapp", {
    next: {tags: ["whatsapp"]},
  });

  return res;
}
