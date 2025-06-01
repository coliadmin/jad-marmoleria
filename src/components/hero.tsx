/*
import {Link} from "next-view-transitions";

import {H1, Highlight, P} from "./typo";
import {Whatsapp} from "./icons/whatsapp";

import {getHero} from "@/modules/content/hero";
import {Button} from "@/components/ui/button";
import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {api} from "@/api";

export async function Hero() {
  const {titulo, descripcion, imagenes} = await getHero();

  const whatsapp = await api.whatsapp.get();

  const whatsAppUrl = toWhatsAppUrl(whatsapp);

  const startH = titulo.indexOf("{");
  const endH = titulo.indexOf("}");

  const h = titulo.substring(startH + 1, endH);

  const startTitle = titulo.split("{")[0];
  const endTitle = titulo.split("}")[1];

  const titleComponent = () => {
    return (
      <span className="text-pretty font-bold leading-[4rem]">
        {startTitle} <Highlight>{h}</Highlight> {endTitle}
      </span>
    );
  };

  const p1 = imagenes[0];
  const p2 = imagenes[1];
  const p3 = imagenes[2];

  return (
    <section className="mb-8 inline-flex h-[38rem] w-full justify-center p-2 lg:h-[750px] lg:p-0">
      <div className="hidden flex-1 lg:block lg:max-w-lg xl:max-w-2xl 2xl:max-w-[52rem]">
        <div className="relative inline-flex gap-2">
          <div className={cn("absolute -z-20 h-[600px] w-[300px] rounded bg-blue-200")}>
            <img alt={p2.name} className="h-full rounded object-cover" src={p2.url} />
          </div>
          <div className="absolute left-36 top-10 -z-10 h-[600px] w-[300px] rounded bg-blue-400 xl:left-40 2xl:left-60">
            <img alt={p1.name} className="h-full rounded object-cover" src={p1.url} />
          </div>
          <div className="absolute left-80 top-20 z-0 hidden h-[600px] w-[300px] rounded bg-blue-600 xl:block 2xl:left-[30rem]">
            <img alt={p3.name} className="h-full rounded object-cover" src={p3.url} />
          </div>
        </div>
      </div>
      <div className="m-auto mt-24 max-w-lg lg:m-0 lg:pl-6 lg:pt-36 xl:pl-0">
        <H1 className="">{titleComponent()}</H1>
        <P className={cn("text-xl text-muted-foreground", quicksand.className)}>{descripcion}</P>
        <div className="mt-8 inline-flex gap-2">
          <Link
            className="flex items-center gap-2"
            href={whatsAppUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="w-48">
              Contactanos
              <Whatsapp className="size-7" />
            </Button>
          </Link>
          <Link prefetch href="/products">
            <Button variant="outline">Ver catálogo</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
*/