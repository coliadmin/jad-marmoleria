import { api } from "@/api";
import { getGlobal } from "@/modules/content/global/api";
import {Metadata} from "next";


export async function getMeta(): Promise<Metadata> {
  const global = await api.global.get();

  const meta = {
    title: global.siteName,
    description: global.siteDescription,
       authors: [
      {
        name: "colidevs CLI",
      },
    ],
    openGraph: {
      title: global.siteName,
      description:
        global.siteDescription,
      images: [
        {
          url: global.favicon.url,
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
