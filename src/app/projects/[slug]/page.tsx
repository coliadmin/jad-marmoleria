import {ChevronRight} from "lucide-react";

import {api} from "@/api";
import {H2, H3} from "@/components/typo";
import {ProjectArticle} from "@/modules/projects/components/project-article";
import {VerticalCarousel} from "@/components/vertical-carousel";
import {Skeleton} from "@/components/ui/skeleton";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const {data} = await api.projects.get();

  return data.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({params: {slug}}: ProjectPageProps) {
  const project = await api.projects.fetch(slug);

  if (!project) {
    return notFound();
  }

  return {
    title: project.nombre,
    description: project.descripcion,
    image: project.portada.url,
  };
}

export default async function ProjectPage({params: {slug}}: ProjectPageProps) {

  return (
    <section className="container">
      <div className="flex flex-1 items-center">
        <ul className="mx-2 flex-1">
          {data.map((x) => (
            <li key={x.id}>
              <ProjectArticle project={x}>
                <aside className="ms-16 w-vertical">
                  {x.imagenes !== null ? (
                    <VerticalCarousel images={[...x.imagenes, ...x.videos]} />
                  ) : (
                    <Skeleton className="h-[33.75rem] w-vertical" />
                  )}
                </aside>
              </ProjectArticle>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
