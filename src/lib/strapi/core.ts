import type {QueryResponse} from "./types";

export const {STRAPI_HOST, STRAPI_TOKEN} = process.env;

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
