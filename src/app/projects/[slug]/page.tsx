import {notFound} from "next/navigation";

import {api} from "@/api";
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
  const project = await api.projects.fetch(slug);

  if (!project) {
    return notFound();
  }

  const multimedia = [...project.imagenes, ...project.videos];

  return (
    <section className="container">
      <div className="flex flex-1 items-center">
        <div className="flex-1 lg:mx-2">
          <ProjectArticle project={project}>
            <aside className="m-auto lg:ms-16 lg:m-0 w-vertical">
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
