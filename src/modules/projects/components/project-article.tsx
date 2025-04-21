import {Link} from "next-view-transitions";
import {BlocksRenderer, type BlocksContent} from "@strapi/blocks-react-renderer";
import {ChevronDown, ChevronLeft} from "lucide-react";

import {Project} from "../types";
import {BlocksRendererWrapper} from "./blocksrenderer-wrapper";

import {H1, H2, H3, H4, P} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {Whatsapp} from "@/components/icons/whatsapp";
import {cn, toWhatsAppUrl} from "@/lib/utils";
import {getWhatsApp} from "@/modules/content/whatsapp/api";

type ProjectArticleProps = {
  project: Project;
  children?: React.ReactNode;
};

export async function ProjectArticle({project, children}: ProjectArticleProps) {
  const content: BlocksContent = project.descripcion as unknown as BlocksContent;
  const {data: whatsapp} = await getWhatsApp();

  const whatsAppUrl = toWhatsAppUrl(whatsapp.telefono);

  return (
    <article className="lg:border-e lg:border-s">
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
        <H2 className="flex-1 border-none py-6 md:text-center text-4xl">{project.nombre}</H2>
      </header>
      <div className="pt-4 lg:hidden flex flex-col items-center w-full gap-y-6">
        <Link className="group relative flex items-center gap-2" href={whatsAppUrl} target="_blank">
           <Button className="btn btn-primary">
              Sacate las dudas
             <Whatsapp className="size-5" />
            </Button>
         </Link>
         <Link className="text-sm inline-flex items-center font-normal text-slate-800/65" href='#descripcion'>Más información
          <ChevronDown className="ms-1 size-4 stroke-1" />
        </Link>
      </div>
      <div className="lg:inline-flex m-auto w-full gap-20 px-6 py-6">
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
