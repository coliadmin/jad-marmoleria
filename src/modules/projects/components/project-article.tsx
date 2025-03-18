import {Link} from "next-view-transitions";
import {BlocksRenderer, type BlocksContent} from "@strapi/blocks-react-renderer";

import {Project} from "../types";

import {H1, H2, H3, H4, P} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {Whatsapp} from "@/components/icons/whatsapp";

type ProjectArticleProps = {
  project: Project;
  children?: React.ReactNode;
};

export function ProjectArticle({project, children}: ProjectArticleProps) {
  const content: BlocksContent = project.descripcion as unknown as BlocksContent;

  return (
    <article className="border-e border-s">
      <header className="flex justify-center gap-4 border-b">
        <H2 className=" border-none py-6 text-3xl font-medium">{project.nombre}</H2>
      </header>
      <div className="inline-flex w-full gap-20 px-6 py-6">
        {children}
        <div className="mx-auto max-w-3xl flex-1 space-y-6 ">
          <BlocksRenderer content={content} />
          <div className="inline-flex w-full justify-between">
            <footer className="self-end">
              <div className="flex justify-end py-6">
                <Button className="btn btn-primary">
                  Sacate las dudas
                  <Link className="group relative" href="/" target="_blank">
                    <Whatsapp className="size-5" />
                  </Link>
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
