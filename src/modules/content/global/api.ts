import {Image, QueryResponse, query} from "@/lib/strapi";
import {toUrl} from "@/lib/strapi";
import { GlobalDTO, Global } from "./types";

function transformGlobal(dto: GlobalDTO): Global {
  const imageAlt: Image = {documentId: "", hash: "", id: "", name: "", url: ""}
  const favicon: Image = dto.favicon ? ({...dto.favicon, url: toUrl(dto.favicon.url)}) : imageAlt;
  const shareImage: Image = dto.defaultSeo.shareImage ? ({...dto.defaultSeo.shareImage, url: toUrl(dto.defaultSeo.shareImage.url)}) : favicon;
  const accentColor = dto.accentColor !== "" && dto.accentColor ? dto.accentColor : "#DEB887";

  const defaultSeo: Global["defaultSeo"] = dto.defaultSeo ? ({...dto.defaultSeo, shareImage: shareImage}) :
  {
    metaTitle: dto.siteName,
    metaDescription: dto.siteDescription,
    shareImage: shareImage,
  };

  return {
    ...dto,
    favicon,
    defaultSeo,
    accentColor,
  };
}

export async function fetchGlobal(): QueryResponse<GlobalDTO> {
  try {
    const res = await query<GlobalDTO>(
      "global?populate[favicon][fields][0]=name&populate[favicon][fields][1]=url&populate[favicon][fields][2]=hash&populate[defaultSeo][populate][shareImage][fields][0]=name&populate[defaultSeo][populate][shareImage][fields][1]=url&populate[defaultSeo][populate][shareImage][fields][2]=hash",
      {next: {tags: ["global"]}},
    );

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getGlobal(): Promise<Global> {
  const {data} = await fetchGlobal();

  const cpy = transformGlobal(data);

  return cpy;
}

export const api = {
  get: getGlobal,
};
