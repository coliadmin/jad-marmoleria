import {WhatsApp} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

export async function getWhatsApp(): QueryResponse<WhatsApp> {
  const res = await query<WhatsApp>("whatsapp");

  return res;
}
