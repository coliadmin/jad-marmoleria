import type {Meta} from "@/types";

export const {STRAPI_HOST, STRAPI_TOKEN} = process.env;

export type QueryResponse<T> = {
  data: T;
  meta: Meta;
};

export async function query<T>(path: string): Promise<QueryResponse<T>> {
  return fetch(`${STRAPI_HOST}/api/${path}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  }).then((res) => {
    return res.json();
  });
}
