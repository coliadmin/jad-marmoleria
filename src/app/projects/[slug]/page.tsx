import {ChevronRight} from "lucide-react";

import {api} from "@/api";
import {H2, H3} from "@/components/typo";
import {ProjectArticle} from "@/modules/projects/components/project-article";
import {VerticalCarousel} from "@/components/vertical-carousel";
import {Skeleton} from "@/components/ui/skeleton";

export default async function ProjectPage() {
  const {data} = await api.projects.get();

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
