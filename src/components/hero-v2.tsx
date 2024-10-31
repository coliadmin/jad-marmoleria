import {H1, P} from "./typo";

import {toUrl} from "@/lib/strapi";
import {api} from "@/api";
import {Button} from "@/components/ui/button";

type HeroProps = {
  title: string;
  subtitle: string;
};

export async function HeroV2({title, subtitle}: HeroProps) {
  const products = await api.products.get();

  const p1 = products.data[0];
  const p2 = products.data[1];
  const p3 = products.data[2];

  return (
    <div className="grid grid-cols-5 grid-rows-7 gap-0">
      <div className="col-span-4 row-span-5 h-[36rem]">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p1.portada.url)}
        />
      </div>
      <div className="col-start-5 row-span-3 border-b border-s">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p2.portada.url)}
        />
      </div>
      <div className="col-start-5 row-span-4 row-start-4 border-b border-s">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p1.portada.url)}
        />
      </div>
      <div className="row-span-2 row-start-6 border-b border-e border-t">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p2.portada.url)}
        />
      </div>
      <div className="row-span-2 row-start-6 border-b border-e border-t">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p1.portada.url)}
        />
      </div>
      <div className="row-span-2 row-start-6 border-b border-e border-t">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p2.portada.url)}
        />
      </div>
      <div className="row-span-2 row-start-6 border-b border-t">
        <img
          alt="Imagen 1"
          className="h-full max-h-full w-full max-w-full object-cover"
          src={toUrl(p1.portada.url)}
        />
      </div>
    </div>
  );
}
