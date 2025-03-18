import {api} from "@/api";
import {H3} from "@/components/typo";
import {ProductLink} from "@/modules/product";
import {ProjectArticle} from "@/modules/projects/components/project-article";

export default async function ProjectsPage() {
  const {data} = await api.projects.get();

  return (
    <section className="container flex border-e border-s">
      <section className="flex-1 border-s">
        <header className="w-full pb-2">
          <H3 className="border-b py-3 text-center">Our Work</H3>
        </header>
        <ul className="grid grid-cols-3 gap-10 py-8">
          {data.map((x) => (
            <li key={x.id} className="inline-flex max-w-[19rem] justify-self-center ">
              {/* <ProjectArticle project={x}> */}
              <ProductLink path="projects" product={x} ratio={1} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
