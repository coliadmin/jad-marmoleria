import { api } from "@/api";
import { getGlobal } from "@/modules/content/global/api";
import {Metadata} from "next";


export async function getMeta(): Promise<Metadata> {
  const global = await api.global.get();

  const meta = {
    title: global.defaultSeo.metaTitle,
    description: global.defaultSeo.metaDescription,
    icons: {
      icon: global.favicon.url !== "" ? global.favicon.url : "/favicon.ico",
    },
    authors: [
      {
        name: "colidevs CLI",
      },
    ],
    openGraph: {
      title: global.defaultSeo.metaTitle,
      description: global.defaultSeo.metaDescription,
      images: [
        {
          url: global.defaultSeo.shareImage.url,
          alt: "logo " + global.siteName,
        },
      ],
      url: `/`,
      type: "website",
      locale: "es_AR",
      siteName: global.siteName,
    },
  }

  return meta;
};
