import {Link} from "next-view-transitions";

import {H1, Highlight, P} from "./typo";
import {Whatsapp} from "./icons/whatsapp";

import {getHero} from "@/modules/content/hero";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

export async function Hero() {
  const {
    data: {imagenes, descripcion, titulo},
  } = await getHero();

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
    <section className="mb-8 inline-flex h-[750px] w-full justify-center">
      <div className="max-w-[52rem] flex-1">
        <div className="relative inline-flex gap-2">
          <div className={cn("absolute -z-20 h-[600px] w-[300px] rounded bg-blue-200")}>
            <img alt={p2.name} className="h-full rounded object-cover" src={p2.url} />
          </div>
          <div className="absolute left-60 top-10 -z-10 h-[600px] w-[300px] rounded bg-blue-400">
            <img alt={p1.name} className="h-full rounded object-cover" src={p1.url} />
          </div>
          <div className="absolute left-[30rem] top-20 z-0 h-[600px] w-[300px] rounded bg-blue-600">
            <img alt={p3.name} className="h-full rounded object-cover" src={p3.url} />
          </div>
        </div>
      </div>
      <div className="max-w-lg pt-36">
        <H1 className="">{titleComponent()}</H1>
        <P className={cn("text-xl text-muted-foreground", quicksand.className)}>{descripcion}</P>
        <div className="mt-8 inline-flex gap-2">
          <Link href="https://wa.me/5491169101717" target="_blank" className="flex items-center gap-2">
            <Button className="w-48">
              Contactanos
              <Whatsapp className="size-7" />
             </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">
            Ver catálogo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
