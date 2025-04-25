import {WhatsApp, WhatsAppDTO} from "./types";

import {QueryResponse, query} from "@/lib/strapi";

async function fetchWhatsApp(): QueryResponse<WhatsAppDTO | null> {
  try {
    const res = await query<WhatsAppDTO>("whatsapp", {
      next: {tags: ["whatsapp"]},
    });

    return res;
  } catch (error) {
    throw error;
  }
}

async function getWhatsApp(): Promise<WhatsApp> {
  const {data} = await fetchWhatsApp();

  const cpy = {...data, mensaje: data.mensaje ?? ""};

  return cpy;
}

export const api = {
  get: getWhatsApp,
};
