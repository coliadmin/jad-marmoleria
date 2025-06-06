import {Link} from "next-view-transitions";
import {BlocksRenderer, type BlocksContent} from "@strapi/blocks-react-renderer";
import {ChevronDown, ChevronLeft} from "lucide-react";

import {Project} from "../types";

import {BlocksRendererWrapper} from "./blocksrenderer-wrapper";

import {H1, H2, H3, H4, P} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {Whatsapp} from "@/components/icons/whatsapp";
import {cn, toWhatsAppUrl} from "@/lib/utils";
import {api} from "@/api";

type ProjectArticleProps = {
  project: Project;
  children?: React.ReactNode;
};

export async function ProjectArticle({project, children}: ProjectArticleProps) {
  const content: BlocksContent = project.descripcion as unknown as BlocksContent;
  const whatsapp = await api.whatsapp.get();

  const whatsAppUrl = toWhatsAppUrl(whatsapp, project, "proyecto");

  return (
    <article className="w-full lg:border-e lg:border-s">
      <header className="flex items-center justify-between gap-4 border-b">
        <Link
          prefetch
          className={cn(
            "group inline-flex items-center gap-1 px-2 text-sm font-normal text-slate-800/65 hover:underline",
          )}
          href="/projects"
        >
          <ChevronLeft className="ms-2 mt-icon size-4 stroke-1 transition-all duration-100 ease-in-out group-hover:inline-block group-hover:text-foreground" />
          Atrás
        </Link>
        <H2 className="flex-1 border-none py-6 text-4xl md:text-center">{project.nombre}</H2>
      </header>
      <div className="flex w-full flex-col items-center gap-y-6 pt-4 lg:hidden">
        <Link
          className="group relative flex items-center gap-2"
          href={whatsAppUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="btn btn-primary">
            Sacate las dudas
            <Whatsapp className="size-5" />
          </Button>
        </Link>
        <Link
          className="inline-flex items-center text-sm font-normal text-slate-800/65"
          href="#descripcion"
        >
          Más información
          <ChevronDown className="ms-1 size-4 stroke-1" />
        </Link>
      </div>
      <div className="m-auto w-full gap-20 px-6 py-6 lg:inline-flex">
        {children}
        <div className="mx-auto max-w-3xl flex-1 space-y-6 ">
          <div className="prose pt-6 lg:pt-0" id="descripcion">
            <BlocksRendererWrapper content={content} />
          </div>
          <div className="inline-flex w-full justify-center lg:justify-end">
            <footer className="self-end">
              <div className="flex justify-end py-6">
                <Link
                  className="group relative flex items-center gap-2"
                  href={whatsAppUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button className="btn btn-primary">
                    Sacate las dudas
                    <Whatsapp className="size-5" />
                  </Button>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
