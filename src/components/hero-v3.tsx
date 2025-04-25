import {H1, P} from "./typo";

import {toUrl} from "@/lib/strapi";
import {api} from "@/api";
import {Button} from "@/components/ui/button";

type HeroProps = {
  title: string;
  subtitle: string;
};

export async function HeroV3({title, subtitle}: HeroProps) {
  const products = await api.products.getList();

  const p1 = products[0];
  const p2 = products[1];
  const p3 = products[2];

  return (
    <section className="mb-8 mt-8 inline-flex h-[750px] w-full justify-evenly">
      <div className="flex-1">
        <div className="relative inline-flex gap-2">
          <div className="absolute -z-20 h-[300px] w-[600px] rounded bg-blue-200">
            <img
              alt={p2.portada.name}
              className="h-full rounded object-cover"
              src={toUrl(p2.portada.url)}
            />
          </div>
          <div className="absolute left-20 top-10 -z-10 h-[300px] w-[600px] rounded bg-blue-400">
            <img
              alt={p1.portada.name}
              className="h-full rounded object-cover"
              src={toUrl(p1.portada.url)}
            />
          </div>
          <div className="absolute left-40 top-20 z-0 h-[300px] w-[600px] rounded bg-blue-600">
            <img
              alt={p3.portada.name}
              className="h-full rounded object-cover"
              src={toUrl(p3.portada.url)}
            />
          </div>
        </div>
      </div>
      <div className="max-w-lg flex-1 text-pretty pt-32">
        <H1 className="hero-title">{title}</H1>
        <P className="hero-subtitle">{subtitle}</P>
        <div className="inline-flex gap-2">
          <Button className="mt-8 w-48 ">Contactanos</Button>
          <Button className="mt-8" variant="outline">
            Ver catálogo
          </Button>
        </div>
      </div>
    </section>
  );
}
