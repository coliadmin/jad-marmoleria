
import {api} from "@/api";
import {H3} from "@/components/typo";
import {ProductLink} from "@/modules/product";
import { getMeta } from "../../../../public/assets/meta";

export async function generateMetadata() {
  const header = await api.header.get();
  const meta = await getMeta();

  return {
    title: meta.title + " - " + header.projects,
    openGraph: {
      title: meta.openGraph?.title + " - " + header.projects,
      url: "/projects",
    },
  }
};

export default async function ProjectsPage() {
  const projects = await api.projects.getList();

  return (
    <section className="container flex max-w-xl sm:max-w-2xl md:max-w-5xl lg:max-w-[88rem] lg:border-e lg:border-s">
      <section className="flex-1">
        <header className="w-full border-b pb-0">
          <H3 className="py-3 text-center">Our Work</H3>
        </header>
        <ul className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((x) => (
            <li key={x.id} className="inline-flex max-w-[19rem] justify-self-center ">
              <ProductLink
                className="w-vertical border p-2 transition-all duration-200 ease-in-out group-hover:border-foreground group-hover:bg-slate-100"
                path="projects"
                product={x}
                ratio={1}
              />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
