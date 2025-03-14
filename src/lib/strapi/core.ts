import type {CategoryIcon, QueryResponse} from "./types";

import {Exterior} from "@/components/icons/exterior";
import {Interior} from "@/components/icons/interior";
import {STRAPI_HOST, STRAPI_TOKEN} from "@/config";
import {Kitchen} from "@/components/icons/kitchen";
import {Bathroom} from "@/components/icons/bathroom";

export async function query<T>(path: string): QueryResponse<T> {
  const url = `${STRAPI_HOST}/api/${path}`;
  const prom = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  const res = await prom.json();

  if (res.data === null) {
    const err = JSON.stringify(res);

    throw new Error(`${url} - ${err}`);
  }

  return res;
}

export function toUrl(url: string) {
  return `${STRAPI_HOST}${url}`;
}

export const categoryXPlural: Record<string, string> = {
  color: "colors",
  usos: "usos",
  material: "materials",
  aplicaciones: "applications",
};

// export const categoryXIcon: Record<string, React.ReactNode> = {
//   interior: <Interior>,
//   exterior: Exterior,
//   "mesadas-de-cocina": Kitchen,
//   "mesadas-de-bano": Bathroom,
// };
