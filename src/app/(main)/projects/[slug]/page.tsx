import {notFound} from "next/navigation";

import {api} from "@/api";
import {ProjectArticle} from "@/modules/projects/components/project-article";
import {VerticalCarousel} from "@/components/vertical-carousel";
import {Skeleton} from "@/components/ui/skeleton";
import {Image} from "@/lib/strapi";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const projects = await api.projects.getList();

  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({params: {slug}}: ProjectPageProps) {
  const project = await api.projects.get(slug);

  if (!project) {
    return notFound();
  }

  return {
    title: project.nombre,
    description: project.nombre,
    openGraph: {
      title: project.nombre,
      description: project.nombre,
      images: [
        {
          url: project.portada.url,
          alt: project.nombre,
        },
      ],
      url: `/projects/${slug}`,
      type: "article",
      locale: "es_AR",
      siteName: "JAD Marmoleria",
    },
  };
}

export default async function ProjectPage({params: {slug}}: ProjectPageProps) {
  const project = await api.projects.get(slug);

  if (!project) {
    return notFound();
  }

  const multimedia: Image[] = [...project.imagenes, ...project.videos];

  return (
    <section className="container">
      <div className="flex flex-1 items-center">
        <div className="flex w-full max-w-xl flex-1 sm:max-w-2xl md:max-w-5xl lg:mx-auto lg:max-w-[88rem]">
          <ProjectArticle project={project}>
            <aside className="m-auto w-vertical lg:m-0 lg:ms-16">
              {project.imagenes !== null ? (
                <VerticalCarousel images={multimedia} />
              ) : (
                <Skeleton className="h-[33.75rem] w-vertical" />
              )}
            </aside>
          </ProjectArticle>
        </div>
      </div>
    </section>
  );
}
