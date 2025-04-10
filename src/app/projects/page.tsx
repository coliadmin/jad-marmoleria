import {api} from "@/api";
import {H3} from "@/components/typo";
import {ProductLink} from "@/modules/product";

export default async function ProjectsPage() {
  const {data} = await api.projects.get();

  return (
    <section className="container flex lg:border-e lg:border-s">
      <section className="flex-1">
        <header className="w-full border-b pb-0">
          <H3 className="py-3 text-center">Our Work</H3>
        </header>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 py-8">
          {data.map((x) => (
            <li key={x.id} className="inline-flex max-w-[19rem] justify-self-center ">
              <ProductLink path="projects" product={x} ratio={1} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
